import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bajarAlDolar, desgloseEscala } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.buyer-stamp-duty",
  mercado: "sg",
  concepto: "propio",
  slug: "buyer-stamp-duty",
  estado: "publicado",
  requiere: {
    "sg.bsd-residencial": "escala",
    "sg.bsd-no-residencial": "escala",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Purchase price or market value, whichever is higher", min: 0, porDefecto: 1500000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of property",
      opciones: [
        { valor: "residencial", etiqueta: "Residential (HDB flat, condo, landed home)" },
        { valor: "no-residencial", etiqueta: "Non-residential (shop, office, industrial)" },
      ],
      porDefecto: "residencial",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the price of the property.", "precio");
    const escala = entrada.tipo === "residencial" ? v["sg.bsd-residencial"] : v["sg.bsd-no-residencial"];
    const bsd = Math.max(1, bajarAlDolar(aplicarEscalaMarginal(escala, entrada.precio)));
    return {
      bsd,
      efectiva: (bsd / entrada.precio) * 100,
      observaciones: [
        ...desgloseEscala(escala, entrada.precio, redondear),
        "BSD is rounded down to the dollar. Buyers who already own a home, PRs, foreigners and companies may also pay Additional Buyer's Stamp Duty on a residential property.",
      ],
    };
  },
  resultado: [
    { clave: "bsd", etiqueta: "Buyer's Stamp Duty", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "Share of the price", formato: "porcentaje", decimales: 2 },
  ],
});
