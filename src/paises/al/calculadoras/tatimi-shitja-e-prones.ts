import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.tatimi-shitja-e-prones",
  mercado: "al",
  concepto: "propio",
  slug: "tatimi-shitja-e-prones",
  estado: "publicado",
  requiere: { "al.tatim-investim": "numero" },
  campos: [
    { id: "shitja", tipo: "moneda", etiqueta: "Çmimi i shitjes në kontratë", min: 0, porDefecto: 20000000 },
    { id: "referenca", tipo: "moneda", etiqueta: "Çmimi referues", min: 0, requerido: false, ayuda: "Nëse çmimi referues është më i lartë, ligji merr atë." },
    { id: "blerja", tipo: "moneda", etiqueta: "Çmimi i blerjes", min: 0, porDefecto: 15000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.shitja <= 0) throw new ErrorEntrada("Vendosni çmimin e shitjes.", "shitja");
    const baza = Math.max(e.shitja, e.referenca ?? 0);
    const fitimi = Math.max(0, baza - e.blerja);
    const tatimi = redondear((fitimi * v["al.tatim-investim"]) / 100);
    return { tatimi, baza, fitimi, neto: redondear(e.shitja - tatimi) };
  },
  resultado: [
    { clave: "tatimi", etiqueta: "Tatimi mbi fitimin nga shitja", formato: "moneda", destacada: true },
    { clave: "baza", etiqueta: "Çmimi i shitjes për tatim", formato: "moneda" },
    { clave: "fitimi", etiqueta: "Fitimi i tatueshëm", formato: "moneda" },
    { clave: "neto", etiqueta: "Ju mbetet nga shitja", formato: "moneda" },
  ],
});
