import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.slimibas-naudas-aprekins",
  mercado: "lv",
  concepto: "propio",
  slug: "slimibas-naudas-aprekins",
  estado: "borrador",
  requiere: { "lv.slimibas-nauda-2-3": "numero", "lv.slimibas-nauda-4-9": "numero", "lv.slimibas-pabalsts": "numero" },
  campos: [
    { id: "videjaDiena", tipo: "moneda", etiqueta: "Vidējā izpeļņa dienā", min: 0, porDefecto: 80 },
    { id: "dienas", tipo: "entero", etiqueta: "Slimības dienas pēc kārtas", min: 1, max: 364, porDefecto: 9 },
  ],
  calcular(e, v, { redondear }) {
    if (e.videjaDiena <= 0) throw new ErrorEntrada("Ievadiet vidējo izpeļņu, kas lielāka par nulli.", "videjaDiena");
    const d23 = Math.max(0, Math.min(e.dienas, 3) - 1);
    const d49 = Math.max(0, Math.min(e.dienas, 9) - 3);
    const d10 = Math.max(0, e.dienas - 9);
    const devejs = redondear(porcentaje(e.videjaDiena * d23, v["lv.slimibas-nauda-2-3"]) + porcentaje(e.videjaDiena * d49, v["lv.slimibas-nauda-4-9"]));
    const vsaa = redondear(porcentaje(e.videjaDiena * d10, v["lv.slimibas-pabalsts"]));
    return { kopa: redondear(devejs + vsaa), devejs, vsaa };
  },
  resultado: [
    { clave: "kopa", etiqueta: "Kopā par slimības periodu (bruto)", formato: "moneda", destacada: true },
    { clave: "devejs", etiqueta: "Slimības nauda no darba devēja", formato: "moneda" },
    { clave: "vsaa", etiqueta: "Slimības pabalsts no VSAA", formato: "moneda" },
  ],
});
