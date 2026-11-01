import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

const DITE_MUAJ = 30;

export default definirCalculadora({
  id: "al.pagesa-e-barnise",
  mercado: "al",
  concepto: "propio",
  slug: "pagesa-e-barnise",
  estado: "publicado",
  requiere: { "al.barni": "mapa", "al.barni-dite": "mapa", "al.paga-minimale": "numero", "al.shperblim-lindje": "numero" },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Paga neto mesatare e 12 muajve të fundit", min: 0, porDefecto: 70000 },
    { id: "femije", tipo: "entero", etiqueta: "Numri i fëmijëve që lindin", min: 1, max: 6, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Vendosni pagën neto mesatare.", "neto");
    const d = v["al.barni-dite"];
    const shume = e.femije > 1;
    const gjithsej = enMapa(d, shume ? "gjithsej-shume" : "gjithsej");
    const lart = enMapa(d, shume ? "para-shume" : "para") + enMapa(d, "pas-e-larte");
    const poshte = gjithsej - lart;
    const ditore = e.neto / DITE_MUAJ;
    const pjesaLarte = redondear((ditore * lart * enMapa(v["al.barni"], "e-larte")) / 100);
    const pjesaPoshte = redondear((ditore * poshte * enMapa(v["al.barni"], "e-ulet")) / 100);
    const shperblimi = redondear(((v["al.paga-minimale"] * v["al.shperblim-lindje"]) / 100) * e.femije);
    return {
      total: redondear(pjesaLarte + pjesaPoshte + shperblimi),
      pjesaLarte,
      pjesaPoshte,
      shperblimi,
      gjithsej,
      observaciones: ["E drejta kërkon të paktën 12 muaj sigurim. Mesatarja ditore llogaritet këtu me 30 ditë në muaj."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Gjithsej për barrëlindjen", formato: "moneda", destacada: true },
    { clave: "pjesaLarte", etiqueta: "Para lindjes dhe 150 ditë pas saj", formato: "moneda" },
    { clave: "pjesaPoshte", etiqueta: "Periudha në vazhdim", formato: "moneda" },
    { clave: "shperblimi", etiqueta: "Shpërblimi për lindje", formato: "moneda" },
    { clave: "gjithsej", etiqueta: "Ditët e përfitimit", formato: "dias" },
  ],
});
