import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { nombreMes } from "../lib/inflacion";
import { CAMPO_MONEDA, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.intereses-de-mora",
  mercado: "ve",
  concepto: "propio",
  slug: "intereses-de-mora-laboral",
  estado: "publicado",
  requiere: {
    "ve.tasa-activa": "serie",
    "ve.plazo-pago-prestaciones-dias": "numero",
  },
  campos: [
    { ...CAMPO_MONEDA, etiqueta: "En qué moneda está la deuda" },
    { id: "monto", tipo: "numero", etiqueta: "Monto que te deben", min: 0 },
    {
      id: "concepto",
      tipo: "opcion",
      etiqueta: "Qué te deben",
      opciones: [
        { valor: "prestaciones", etiqueta: "Prestaciones sociales o indemnización por despido" },
        { valor: "salario", etiqueta: "Salario u otro pago con fecha fija" },
      ],
      porDefecto: "prestaciones",
    },
    { id: "fecha", tipo: "fecha", etiqueta: "Fecha de salida (prestaciones) o en que te tenían que pagar (salario)" },
    { id: "fechaPago", tipo: "fecha", etiqueta: "Fecha en que te pagan o calcular hasta", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    // Art. 142 f: las prestaciones se pagan dentro de los 5 días siguientes a la salida; la mora corre después.
    const vence = entrada.concepto === "prestaciones" ? sumarDias(entrada.fecha, valores["ve.plazo-pago-prestaciones-dias"]) : entrada.fecha;
    if (entrada.fechaPago < entrada.fecha) throw new ErrorEntrada("La fecha de pago tiene que ser posterior a la de la deuda.", "fechaPago");
    const dias = Math.max(0, diasEntre(vence, entrada.fechaPago));
    const { fecha, valor: tasa } = valores["ve.tasa-activa"];
    const intereses = redondear((entrada.monto * tasa * dias) / 100 / 365);
    const m = entrada.moneda;
    const [i, t] = [intereses, redondear(entrada.monto + intereses)].map((x) => enMoneda(x, m));
    const observaciones = [
      "Usamos la última tasa activa publicada por el BCV para todo el período, con interés simple por días. Un juez puede calcularlo mes a mes con la tasa de cada mes.",
    ];
    if (dias === 0) observaciones.unshift("Todavía estás dentro del plazo de pago: no hay mora.");
    return {
      vence,
      dias,
      tasa,
      mesTasa: nombreMes(fecha),
      interesesBs: i.bs,
      interesesUsd: i.usd,
      totalBs: t.bs,
      totalUsd: t.usd,
      observaciones,
    };
  },
  resultado: [
    { clave: "vence", etiqueta: "Fecha límite de pago", formato: "fecha" },
    { clave: "dias", etiqueta: "Días de atraso", formato: "dias" },
    { clave: "tasa", etiqueta: "Tasa activa anual del BCV", formato: "porcentaje" },
    { clave: "mesTasa", etiqueta: "Mes de la tasa", formato: "texto" },
    { clave: "interesesBs", etiqueta: "Intereses de mora", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "interesesUsd", etiqueta: "Intereses de mora", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "totalBs", etiqueta: "Deuda más intereses", formato: "moneda", moneda: "VES" },
    { clave: "totalUsd", etiqueta: "Deuda más intereses", formato: "moneda", moneda: "USD" },
  ],
});
