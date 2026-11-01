import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "md.indemnizatie-unica-la-nastere",
  mercado: "md",
  concepto: "propio",
  slug: "indemnizatie-unica-la-nastere",
  estado: "publicado",
  requiere: { "md.indemnizatie-nastere": "numero", "md.ingrijire-copil-2-ani": "numero" },
  campos: [
    { id: "copii", tipo: "entero", etiqueta: "Copii născuți vii", min: 1, max: 6, porDefecto: 1, ayuda: "La gemeni, indemnizația se acordă pentru fiecare copil." },
  ],
  calcular(e, v) {
    if (e.copii < 1) throw new ErrorEntrada("Introduceți cel puțin un copil.", "copii");
    const unica = v["md.indemnizatie-nastere"];
    return {
      total: unica * e.copii,
      unica,
      ingrijireLunar: v["md.ingrijire-copil-2-ani"] * e.copii,
      ingrijire24: v["md.ingrijire-copil-2-ani"] * e.copii * 24,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Indemnizația unică la naștere", formato: "moneda", destacada: true },
    { clave: "unica", etiqueta: "Suma pentru un copil", formato: "moneda" },
    { clave: "ingrijireLunar", etiqueta: "Indemnizația lunară pentru îngrijirea copilului până la 2 ani", formato: "moneda" },
    { clave: "ingrijire24", etiqueta: "Îngrijirea copilului în 24 de luni, în total", formato: "moneda" },
  ],
});
