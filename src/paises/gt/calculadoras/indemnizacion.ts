import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import {
  DIAS_ANIO,
  DIAS_MES,
  diasInclusivos,
  MES_INICIO_AGUINALDO,
  MES_INICIO_BONO_14,
  periodoTrabajado,
  ultimoAniversario,
} from "../prestaciones";

export default definirCalculadora({
  id: "gt.indemnizacion",
  mercado: "gt",
  concepto: "liquidacion-final",
  slug: "indemnizacion",
  estado: "publicado",
  requiere: {
    "gt.indemnizacion-meses-por-anio": "numero",
    "gt.aguinaldo": "numero",
    "gt.bono-14": "numero",
    "gt.vacaciones-dias-habiles": "numero",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó la relación laboral",
      opciones: [
        { valor: "despido", etiqueta: "Lo despidieron sin causa justa" },
        { valor: "despido-indirecto", etiqueta: "Renunció por una falta grave del patrono" },
        { valor: "renuncia", etiqueta: "Renunció" },
        { valor: "despido-justificado", etiqueta: "Lo despidieron con causa justa" },
      ],
      porDefecto: "despido",
    },
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Promedio de su salario de los últimos seis meses",
      min: 0,
      ayuda: "Sume lo que ganó cada uno de esos meses (con horas extra, sin la bonificación incentivo) y divídalo entre seis.",
    },
    {
      id: "vacacionesPendientes",
      tipo: "numero",
      etiqueta: "Días de vacaciones de años anteriores que no gozó",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaIngreso > entrada.fechaSalida) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior a la de salida.", "fechaIngreso");
    const diasServicio = diasInclusivos(entrada.fechaIngreso, entrada.fechaSalida);
    const conIndemnizacion = entrada.motivo === "despido" || entrada.motivo === "despido-indirecto";

    const sextoAguinaldo = porcentaje(entrada.promedio, valores["gt.aguinaldo"]) / 12;
    const sextoBono14 = porcentaje(entrada.promedio, valores["gt.bono-14"]) / 12;
    const salarioIndemnizable = redondear(entrada.promedio + sextoAguinaldo + sextoBono14);
    const indemnizacion = conIndemnizacion
      ? redondear((salarioIndemnizable * valores["gt.indemnizacion-meses-por-anio"] * diasServicio) / DIAS_ANIO)
      : 0;

    const pAguinaldo = periodoTrabajado(entrada.fechaIngreso, entrada.fechaSalida, MES_INICIO_AGUINALDO);
    const aguinaldo = redondear((porcentaje(entrada.promedio, valores["gt.aguinaldo"]) * pAguinaldo.dias) / DIAS_ANIO);
    const pBono14 = periodoTrabajado(entrada.fechaIngreso, entrada.fechaSalida, MES_INICIO_BONO_14);
    const bono14 = redondear((porcentaje(entrada.promedio, valores["gt.bono-14"]) * pBono14.dias) / DIAS_ANIO);

    const desdeAniversario = Math.min(DIAS_ANIO, diasInclusivos(ultimoAniversario(entrada.fechaIngreso, entrada.fechaSalida), entrada.fechaSalida));
    const diasVacaciones = redondear((valores["gt.vacaciones-dias-habiles"] * desdeAniversario) / DIAS_ANIO + entrada.vacacionesPendientes);
    const vacaciones = redondear((entrada.promedio / DIAS_MES) * diasVacaciones);

    const observaciones: string[] = [];
    if (conIndemnizacion) {
      observaciones.push("La indemnización se calcula con su promedio más la sexta parte del aguinaldo y del Bono 14, que es como se aplica en la práctica.");
    } else {
      observaciones.push("Si renunció o lo despidieron con causa justa, no le corresponde indemnización, pero sí el aguinaldo, el Bono 14 y las vacaciones que le falten.");
    }
    observaciones.push("Las vacaciones se pagan con el salario diario (promedio dividido entre 30).");
    return {
      diasServicio,
      salarioIndemnizable,
      indemnizacion,
      aguinaldo,
      bono14,
      diasVacaciones,
      vacaciones,
      total: redondear(indemnizacion + aguinaldo + bono14 + vacaciones),
      observaciones,
    };
  },
  resultado: [
    { clave: "diasServicio", etiqueta: "Días de servicio", formato: "dias" },
    { clave: "salarioIndemnizable", etiqueta: "Salario para la indemnización (con sextos)", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización por tiempo servido", formato: "moneda", ocultarSiCero: true },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "bono14", etiqueta: "Bono 14 proporcional", formato: "moneda" },
    { clave: "diasVacaciones", etiqueta: "Días de vacaciones a pagar", formato: "numero", decimales: 2 },
    { clave: "vacaciones", etiqueta: "Vacaciones", formato: "moneda" },
    { clave: "total", etiqueta: "Total a recibir", formato: "moneda", destacada: true },
  ],
});
