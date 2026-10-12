import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const SERIES = { "28": "mx.cetes-28", "91": "mx.cetes-91", "182": "mx.cetes-182", "364": "mx.cetes-364" } as const;

export default definirCalculadora({
  id: "mx.cetes",
  mercado: "mx",
  concepto: "plazo-fijo",
  slug: "cetes",
  estado: "publicado",
  requiere: {
    "mx.cetes-28": "serie",
    "mx.cetes-91": "serie",
    "mx.cetes-182": "serie",
    "mx.cetes-364": "serie",
    "mx.retencion-isr-intereses": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Cuánto quieres invertir", min: 0, porDefecto: 10000 },
    {
      id: "plazo",
      tipo: "opcion",
      etiqueta: "Plazo",
      opciones: [
        { valor: "28", etiqueta: "28 días" },
        { valor: "91", etiqueta: "91 días" },
        { valor: "182", etiqueta: "182 días" },
        { valor: "364", etiqueta: "364 días" },
      ],
      porDefecto: "28",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (!(entrada.plazo in SERIES)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const serie = valores[SERIES[entrada.plazo]];
    const dias = Number(entrada.plazo);
    // Los CETES rinden sobre año de 360 días; la retención del ISR es una tasa anual sobre el capital,
    // que se prorratea por los días de la inversión sobre 365.
    const bruto = redondear((porcentaje(entrada.monto, serie.valor) * dias) / 360);
    const retencion = redondear((porcentaje(entrada.monto, valores["mx.retencion-isr-intereses"]) * dias) / 365);
    const neto = redondear(bruto - retencion);
    return {
      tasa: serie.valor,
      fecha: serie.fecha,
      bruto,
      retencion,
      neto,
      final: redondear(entrada.monto + neto),
      tasaNeta: entrada.monto > 0 ? ((neto / entrada.monto) * 360 * 100) / dias : 0,
      observaciones: ["Es una estimación con la tasa de la última subasta. En Cetesdirecto compras títulos de 10 pesos, así que el monto invertido puede variar unos centavos."],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa de la última subasta (anual)", formato: "porcentaje", decimales: 2 },
    { clave: "fecha", etiqueta: "Fecha de la subasta", formato: "fecha" },
    { clave: "bruto", etiqueta: "Rendimiento bruto", formato: "moneda" },
    { clave: "retencion", etiqueta: "ISR retenido", formato: "moneda" },
    { clave: "neto", etiqueta: "Ganancia neta", formato: "moneda", destacada: true },
    { clave: "final", etiqueta: "Lo que recibes al vencimiento", formato: "moneda" },
    { clave: "tasaNeta", etiqueta: "Tasa neta anual", formato: "porcentaje", decimales: 2 },
  ],
});
