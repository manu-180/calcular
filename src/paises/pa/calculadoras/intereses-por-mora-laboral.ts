import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";

const DIAS_ANIO = 365;

export default definirCalculadora({
  id: "pa.intereses-por-mora-laboral",
  mercado: "pa",
  concepto: "propio",
  slug: "intereses-por-mora-laboral",
  estado: "publicado",
  requiere: {
    "pa.interes-mora-laboral": "numero",
    "pa.recargo-condena-salarios": "numero",
  },
  campos: [
    {
      id: "monto",
      tipo: "moneda",
      etiqueta: "Monto que te deben",
      ayuda: "Salarios, vacaciones, prima, indemnización u otras prestaciones sin pagar.",
      min: 0,
    },
    { id: "desde", tipo: "fecha", etiqueta: "Fecha en que te lo tenían que pagar" },
    { id: "hasta", tipo: "fecha", etiqueta: "Fecha de pago o de hoy", porDefecto: "hoy" },
    {
      id: "sentenciaSalarios",
      tipo: "si-no",
      etiqueta: "Son salarios reconocidos en una sentencia",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.hasta < entrada.desde) throw new ErrorEntrada("La fecha de pago tiene que ser igual o posterior a la fecha en que te debían pagar.", "hasta");
    const dias = diasEntre(entrada.desde, entrada.hasta);
    const intereses = redondear((porcentaje(entrada.monto, valores["pa.interes-mora-laboral"]) * dias) / DIAS_ANIO);
    const recargo = entrada.sentenciaSalarios ? redondear(porcentaje(entrada.monto, valores["pa.recargo-condena-salarios"])) : 0;
    return {
      dias,
      intereses,
      recargo,
      total: redondear(entrada.monto + intereses + recargo),
      observaciones: [
        "El interés es simple y corre desde el día en que el pago era exigible. El recargo de la sentencia vale solo para salarios.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de atraso", formato: "dias" },
    { clave: "intereses", etiqueta: "Intereses por mora", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo de la sentencia", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
