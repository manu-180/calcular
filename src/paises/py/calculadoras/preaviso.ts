import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { antiguedad } from "../lib/fechas";
import { diasPreaviso } from "../lib/laboral";

export default definirCalculadora({
  id: "py.preaviso",
  mercado: "py",
  concepto: "preaviso",
  slug: "preaviso",
  estado: "publicado",
  requiere: {
    "py.preaviso-dias": "mapa",
    "py.divisor-salario-diario": "numero",
    "py.preaviso-omitido-trabajador": "numero",
  },
  campos: [
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Quién termina el contrato",
      opciones: [
        { valor: "empleador", etiqueta: "El empleador me despide sin causa" },
        { valor: "trabajador", etiqueta: "Yo renuncio" },
      ],
      porDefecto: "empleador",
    },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual promedio de los últimos 6 meses",
      ayuda: "Con horas extra y comisiones.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "aviso", tipo: "fecha", etiqueta: "Fecha del aviso", porDefecto: "hoy" },
    {
      id: "preavisoDado",
      tipo: "si-no",
      etiqueta: "El preaviso se dio por escrito y se va a trabajar completo",
      ayuda: "Si el despido o la renuncia fue de un día para el otro, dejalo en No.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.aviso < entrada.ingreso) throw new ErrorEntrada("La fecha del aviso tiene que ser posterior a la fecha de ingreso.", "aviso");
    const a = antiguedad(entrada.ingreso, entrada.aviso);
    const dias = diasPreaviso(valores["py.preaviso-dias"], a);
    const monto = redondear((entrada.salario / valores["py.divisor-salario-diario"]) * dias);
    const despido = entrada.quien === "empleador";
    // Art. 90: si lo omite el empleador paga el salario del período; si lo omite el trabajador, la mitad.
    const pagaEmpleador = despido && !entrada.preavisoDado ? monto : 0;
    const debeTrabajador = !despido && !entrada.preavisoDado ? redondear(porcentaje(monto, valores["py.preaviso-omitido-trabajador"])) : 0;
    const observaciones: string[] = [];
    if (despido && entrada.preavisoDado) observaciones.push("Mientras corre el preaviso tenés dos horas libres por día (o un día por semana) para buscar trabajo, sin descuento de salario.");
    if (a.anios === 0 && a.meses < 2) observaciones.push("Durante el período de prueba no hay preaviso. Fijate cuánto dura el tuyo en la calculadora de período de prueba.");
    observaciones.push("El preaviso no corre si el despido o la renuncia tienen causa justificada.");
    return {
      diasPreaviso: dias,
      fin: sumarDias(entrada.aviso, dias),
      monto,
      pagaEmpleador,
      debeTrabajador,
      observaciones,
    };
  },
  resultado: [
    { clave: "diasPreaviso", etiqueta: "Días de preaviso", formato: "dias", destacada: true },
    { clave: "fin", etiqueta: "El preaviso termina el", formato: "fecha" },
    { clave: "monto", etiqueta: "Salario de esos días", formato: "moneda" },
    { clave: "pagaEmpleador", etiqueta: "El empleador te tiene que pagar", formato: "moneda", destacada: true, ocultarSiCero: true },
    { clave: "debeTrabajador", etiqueta: "Le debés al empleador (la mitad)", formato: "moneda", destacada: true, ocultarSiCero: true },
  ],
});
