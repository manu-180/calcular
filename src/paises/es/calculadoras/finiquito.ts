import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { diasDelAnio, diasInclusivos, primeroDeEnero } from "../lib/fechas";

function inicioSemestre(f: FechaISO): FechaISO {
  return `${f.slice(0, 4)}-${Number(f.slice(5, 7)) <= 6 ? "01" : "07"}-01` as FechaISO;
}

function finSemestre(f: FechaISO): FechaISO {
  return `${f.slice(0, 4)}-${Number(f.slice(5, 7)) <= 6 ? "06-30" : "12-31"}` as FechaISO;
}

export default definirCalculadora({
  id: "es.finiquito",
  mercado: "es",
  concepto: "liquidacion-final",
  slug: "finiquito",
  estado: "publicado",
  requiere: {
    "es.vacaciones-dias": "numero",
    "es.fin-contrato-dias": "numero",
  },
  campos: [
    { id: "alta", tipo: "fecha", etiqueta: "Fecha de inicio del contrato", min: "1970-01-01" },
    { id: "baja", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    { id: "bruto", tipo: "moneda", etiqueta: "Sueldo bruto anual", min: 0, porDefecto: 25000 },
    {
      id: "pagas",
      tipo: "opcion",
      etiqueta: "Número de pagas",
      opciones: [
        { valor: "14", etiqueta: "14 pagas (dos extra sin prorratear)" },
        { valor: "12", etiqueta: "12 pagas (extras prorrateadas)" },
      ],
      porDefecto: "14",
    },
    { id: "diasSinCobrar", tipo: "entero", etiqueta: "Días del último mes que aún no cobraste", min: 0, max: 31, porDefecto: 0 },
    { id: "vacacionesDisfrutadas", tipo: "numero", etiqueta: "Días de vacaciones disfrutados este año", min: 0, porDefecto: 0 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Motivo del fin del contrato",
      opciones: [
        { valor: "voluntaria", etiqueta: "Baja voluntaria" },
        { valor: "fin-temporal", etiqueta: "Fin de contrato temporal" },
        { valor: "despido", etiqueta: "Despido (la indemnización va aparte)" },
      ],
      porDefecto: "voluntaria",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.baja < entrada.alta) throw new ErrorEntrada("El último día tiene que ser posterior al inicio del contrato.", "baja");
    const pagas = entrada.pagas === "12" ? 12 : 14;
    const mensual = entrada.bruto / pagas;
    const valorDia = mensual / 30;

    const salarioPendiente = redondear(valorDia * Math.min(entrada.diasSinCobrar, 30));

    const desdeAnio = entrada.alta > primeroDeEnero(entrada.baja) ? entrada.alta : primeroDeEnero(entrada.baja);
    const diasAnio = diasInclusivos(desdeAnio, entrada.baja);
    const vacacionesGeneradas = redondear((valores["es.vacaciones-dias"] * diasAnio) / diasDelAnio(Number(entrada.baja.slice(0, 4))));
    const vacacionesPendientes = redondear(vacacionesGeneradas - entrada.vacacionesDisfrutadas);
    const vacaciones = redondear(vacacionesPendientes * valorDia);

    let pagasExtra = 0;
    if (pagas === 14) {
      const desdeSemestre = entrada.alta > inicioSemestre(entrada.baja) ? entrada.alta : inicioSemestre(entrada.baja);
      pagasExtra = redondear((mensual * diasInclusivos(desdeSemestre, entrada.baja)) / diasInclusivos(inicioSemestre(entrada.baja), finSemestre(entrada.baja)));
    }

    const diasContrato = diasInclusivos(entrada.alta, entrada.baja);
    const indemnizacion =
      entrada.motivo === "fin-temporal" ? redondear(((valores["es.fin-contrato-dias"] * diasContrato) / 365) * (entrada.bruto / 365)) : 0;

    const observaciones: string[] = [];
    if (vacacionesPendientes < 0) observaciones.push("Disfrutaste más vacaciones de las generadas: ese exceso se descuenta.");
    if (pagas === 14) observaciones.push("Las pagas extra se calculan con devengo semestral (enero a junio y julio a diciembre). Si tu convenio dice otra cosa, el importe cambia.");
    if (entrada.motivo === "despido") observaciones.push("La indemnización por despido no forma parte del finiquito. Calcúlala aparte.");
    return {
      salarioPendiente,
      vacacionesPendientes,
      vacaciones,
      pagasExtra,
      indemnizacion,
      total: redondear(salarioPendiente + vacaciones + pagasExtra + indemnizacion),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total bruto del finiquito", formato: "moneda", destacada: true },
    { clave: "salarioPendiente", etiqueta: "Salario de los días no cobrados", formato: "moneda", ocultarSiCero: true },
    { clave: "vacacionesPendientes", etiqueta: "Días de vacaciones pendientes", formato: "dias", decimales: 2 },
    { clave: "vacaciones", etiqueta: "Vacaciones no disfrutadas", formato: "moneda" },
    { clave: "pagasExtra", etiqueta: "Parte proporcional de la paga extra", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Indemnización por fin de contrato", formato: "moneda", ocultarSiCero: true },
  ],
});
