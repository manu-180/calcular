import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { stampDuty } from "../lib/impuestos";

export default definirCalculadora({
  id: "hk.stamp-duty-calculator",
  mercado: "hk",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "hk.avd-residential": "escala",
    "hk.avd-non-residential": "escala",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Price or value of the property, whichever is higher", min: 0, porDefecto: 8000000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of property",
      opciones: [
        { valor: "residential", etiqueta: "Residential" },
        { valor: "non-residential", etiqueta: "Non-residential (shop, office, industrial)" },
      ],
      porDefecto: "residential",
    },
  ],
  calcular(entrada, v) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the price of the property.", "precio");
    const escala = entrada.tipo === "residential" ? v["hk.avd-residential"] : v["hk.avd-non-residential"];
    const avd = stampDuty(escala, entrada.precio);
    let fila = escala[0];
    for (const f of escala) if (entrada.precio > f.desde) fila = f;
    const observaciones = [
      fila.cuotaFija !== undefined && fila.desde > 0
        ? "This price falls in a marginal relief band, so the duty is a fixed amount plus a share of the excess instead of the full rate."
        : "The rate for this band applies to the whole price.",
      "The duty is rounded up to the next dollar.",
    ];
    return { avd, efectiva: (avd / entrada.precio) * 100, observaciones };
  },
  resultado: [
    { clave: "avd", etiqueta: "Ad valorem stamp duty", formato: "moneda", destacada: true, decimales: 0 },
    { clave: "efectiva", etiqueta: "Share of the price", formato: "porcentaje", decimales: 2 },
  ],
});
