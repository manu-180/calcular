import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.costo-patronal",
  mercado: "gt",
  concepto: "costo-empleador",
  slug: "costo-patronal",
  estado: "publicado",
  requiere: {
    "gt.igss-patronal-ivs": "numero",
    "gt.igss-patronal-ema": "numero",
    "gt.irtra": "numero",
    "gt.intecap": "numero",
    "gt.bonificacion-incentivo": "numero",
    "gt.aguinaldo": "numero",
    "gt.bono-14": "numero",
    "gt.vacaciones-dias-habiles": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual del trabajador", min: 0, ayuda: "Sin la bonificación incentivo." },
    { id: "bonificacion", tipo: "si-no", etiqueta: "Paga la bonificación incentivo", porDefecto: true },
    {
      id: "reservaIndemnizacion",
      tipo: "si-no",
      etiqueta: "Incluir la reserva para indemnización",
      porDefecto: true,
      ayuda: "Lo que conviene apartar cada mes por si la relación termina con despido.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    const s = entrada.salario;
    const cuotaIgss = redondear(porcentaje(s, valores["gt.igss-patronal-ivs"] + valores["gt.igss-patronal-ema"]));
    const irtra = redondear(porcentaje(s, valores["gt.irtra"]));
    const intecap = redondear(porcentaje(s, valores["gt.intecap"]));
    const aguinaldo = redondear(porcentaje(s, valores["gt.aguinaldo"]) / 12);
    const bono14 = redondear(porcentaje(s, valores["gt.bono-14"]) / 12);
    const vacaciones = redondear(((s / DIAS_MES) * valores["gt.vacaciones-dias-habiles"]) / 12);
    // La indemnización se paga con el salario más la sexta parte del aguinaldo y del Bono 14 (una doceava
    // parte del salario cada una): la reserva mensual es un doceavo de ese salario.
    const indemnizacion = entrada.reservaIndemnizacion
      ? redondear((s + porcentaje(s, valores["gt.aguinaldo"]) / 12 + porcentaje(s, valores["gt.bono-14"]) / 12) / 12)
      : 0;
    const bonificacion = entrada.bonificacion ? valores["gt.bonificacion-incentivo"] : 0;
    const total = redondear(s + bonificacion + cuotaIgss + irtra + intecap + aguinaldo + bono14 + vacaciones + indemnizacion);
    return {
      salario: s,
      bonificacion,
      cuotaIgss,
      irtra,
      intecap,
      aguinaldo,
      bono14,
      vacaciones,
      indemnizacion,
      total,
      recargo: s > 0 ? redondear(((total - s) / s) * 100) : 0,
      observaciones: [
        "El aguinaldo, el Bono 14, las vacaciones y la indemnización se muestran como lo que conviene apartar cada mes.",
        "Las vacaciones se valoran con el salario diario (salario entre 30).",
      ],
    };
  },
  resultado: [
    { clave: "salario", etiqueta: "Salario", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación incentivo", formato: "moneda", ocultarSiCero: true },
    { clave: "cuotaIgss", etiqueta: "Cuota patronal del IGSS", formato: "moneda" },
    { clave: "irtra", etiqueta: "IRTRA", formato: "moneda" },
    { clave: "intecap", etiqueta: "INTECAP", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo (reserva del mes)", formato: "moneda" },
    { clave: "bono14", etiqueta: "Bono 14 (reserva del mes)", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones (reserva del mes)", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización (reserva del mes)", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Costo total al mes", formato: "moneda", destacada: true },
    { clave: "recargo", etiqueta: "Costo por encima del salario", formato: "porcentaje" },
  ],
});
