import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "md.polita-de-asigurare-medicala",
  mercado: "md",
  concepto: "propio",
  slug: "polita-de-asigurare-medicala",
  estado: "publicado",
  requiere: { "md.prima-medicala-fixa": "numero", "md.prima-medicala-fixa-redusa": "numero" },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Categoria de plătitor",
      opciones: [
        { valor: "generala", etiqueta: "Suma fixă generală" },
        { valor: "redusa", etiqueta: "Pct. 1, 3 și 4 din anexa nr. 2 la Legea nr. 1593/2002" },
      ],
      porDefecto: "generala",
      ayuda: "Categoriile cu suma mai mică sunt enumerate în anexa nr. 2 la Legea nr. 1593/2002.",
    },
    { id: "persoane", tipo: "entero", etiqueta: "Pentru câte persoane cumpărați polița", min: 1, max: 10, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.persoane < 1) throw new ErrorEntrada("Introduceți cel puțin o persoană.", "persoane");
    const suma = e.categorie === "redusa" ? v["md.prima-medicala-fixa-redusa"] : v["md.prima-medicala-fixa"];
    return { total: suma * e.persoane, suma, peLuna: redondear(suma / 12) };
  },
  resultado: [
    { clave: "total", etiqueta: "De plătit pentru polița pe 2026", formato: "moneda", destacada: true },
    { clave: "suma", etiqueta: "Prima pentru o persoană", formato: "moneda" },
    { clave: "peLuna", etiqueta: "Echivalentul pe lună", formato: "moneda" },
  ],
});
