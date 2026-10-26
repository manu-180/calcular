import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// El Duty on Documents and Transfers Act cobra «por cada €100 o fracción»: la base se redondea
// hacia arriba al centenar antes de aplicar la tasa.
function derecho(base: number, tasa: number): number {
  if (base <= 0) return 0;
  return Math.ceil(base / 100) * tasa;
}

export default definirCalculadora({
  id: "mt.stamp-duty-calculator",
  mercado: "mt",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "mt.duty-rates": "mapa",
    "mt.duty-thresholds": "mapa",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Price or market value, whichever is higher", min: 0, porDefecto: 300000 },
    {
      id: "comprador",
      tipo: "opcion",
      etiqueta: "You are buying",
      opciones: [
        { valor: "first-time", etiqueta: "Your first home (first-time buyer)" },
        { valor: "sole-residence", etiqueta: "A home to live in as your only residence" },
        { valor: "other", etiqueta: "Any other property" },
      ],
      porDefecto: "first-time",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the price of the property.", "precio");
    const tasas = v["mt.duty-rates"];
    const limites = v["mt.duty-thresholds"];
    const normal = enMapa(tasas, "standard");
    let duty: number;
    let exento = 0;
    if (entrada.comprador === "first-time") {
      exento = Math.min(entrada.precio, enMapa(limites, "first-time-buyer"));
      duty = derecho(entrada.precio - exento, normal);
    } else if (entrada.comprador === "sole-residence") {
      const reducida = Math.min(entrada.precio, enMapa(limites, "sole-residence"));
      duty = derecho(reducida, enMapa(tasas, "sole-residence")) + derecho(entrada.precio - reducida, normal);
    } else {
      duty = derecho(entrada.precio, normal);
    }
    const sinAlivio = derecho(entrada.precio, normal);
    return {
      duty: redondear(duty),
      efectiva: redondear((duty / entrada.precio) * 100),
      ahorro: redondear(sinAlivio - duty),
      exento,
    };
  },
  resultado: [
    { clave: "duty", etiqueta: "Duty on the deed", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "As a share of the price", formato: "porcentaje", decimales: 2 },
    { clave: "ahorro", etiqueta: "Saving compared with the normal rate", formato: "moneda", ocultarSiCero: true },
    { clave: "exento", etiqueta: "Part of the price with no duty", formato: "moneda", ocultarSiCero: true },
  ],
});
