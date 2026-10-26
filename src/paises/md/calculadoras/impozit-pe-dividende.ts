import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "md.impozit-pe-dividende",
  mercado: "md",
  concepto: "propio",
  slug: "impozit-pe-dividende",
  estado: "publicado",
  requiere: { "md.impozit-dividende": "numero" },
  campos: [
    {
      id: "tip",
      tipo: "opcion",
      etiqueta: "Ce sumă cunoașteți",
      opciones: [
        { valor: "brut", etiqueta: "Dividendul brut, înainte de impozit" },
        { valor: "net", etiqueta: "Dividendul net, primit în cont" },
      ],
      porDefecto: "brut",
    },
    { id: "suma", tipo: "moneda", etiqueta: "Suma", min: 0, porDefecto: 10000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Introduceți o sumă mai mare decât zero.", "suma");
    const cota = v["md.impozit-dividende"];
    const brut = e.tip === "brut" ? redondear(e.suma) : redondear(e.suma / (1 - cota / 100));
    const impozit = redondear((brut * cota) / 100);
    return { net: redondear(brut - impozit), impozit, brut, cota };
  },
  resultado: [
    { clave: "net", etiqueta: "Dividendul net", formato: "moneda", destacada: true },
    { clave: "impozit", etiqueta: "Impozitul reținut la sursă", formato: "moneda" },
    { clave: "brut", etiqueta: "Dividendul brut", formato: "moneda" },
    { clave: "cota", etiqueta: "Cota impozitului", formato: "porcentaje", decimales: 0 },
  ],
});
