import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

function claveIrpf(moneda: "uyu" | "ui" | "usd", dias: number): string {
  if (dias <= 365) return `${moneda}-1`;
  if (moneda === "usd") return "usd-mas";
  return dias <= 365 * 3 ? `${moneda}-3` : `${moneda}-mas`;
}

export default definirCalculadora({
  id: "uy.plazo-fijo",
  mercado: "uy",
  concepto: "plazo-fijo",
  slug: "plazo-fijo",
  estado: "publicado",
  requiere: {
    "uy.irpf-intereses": "mapa",
  },
  campos: [
    { id: "capital", tipo: "numero", etiqueta: "Monto que depositás", min: 0, porDefecto: 100000 },
    {
      id: "moneda",
      tipo: "opcion",
      etiqueta: "Moneda del depósito",
      opciones: [
        { valor: "uyu", etiqueta: "Pesos (tasa fija)" },
        { valor: "ui", etiqueta: "Unidades indexadas (UI)" },
        { valor: "usd", etiqueta: "Dólares" },
      ],
      porDefecto: "uyu",
    },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa nominal anual que te ofrece el banco", min: 0, max: 100, porDefecto: 5 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 180 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.capital <= 0) throw new ErrorEntrada("Escribí cuánto vas a depositar.", "capital");
    const interes = redondear((entrada.capital * entrada.tasa * entrada.dias) / 100 / 365);
    const tasaIrpf = enMapa(valores["uy.irpf-intereses"], claveIrpf(entrada.moneda, entrada.dias));
    const irpf = redondear(porcentaje(interes, tasaIrpf));
    const neto = redondear(interes - irpf);
    return {
      interes,
      tasaIrpf,
      irpf,
      neto,
      total: redondear(entrada.capital + neto),
      observaciones: [
        "Los montos están en la moneda del depósito. En UI, el capital además se ajusta por inflación.",
        "El banco retiene el IRPF al pagarte los intereses. La tasa que te ofrecen puede cambiar según el banco y el monto.",
      ],
    };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses ganados", formato: "numero", decimales: 2 },
    { clave: "tasaIrpf", etiqueta: "IRPF sobre los intereses", formato: "porcentaje" },
    { clave: "irpf", etiqueta: "IRPF que te retienen", formato: "numero", decimales: 2 },
    { clave: "neto", etiqueta: "Intereses después del IRPF", formato: "numero", decimales: 2, destacada: true },
    { clave: "total", etiqueta: "Lo que cobrás al vencimiento", formato: "numero", decimales: 2 },
  ],
});
