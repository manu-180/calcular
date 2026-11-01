import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.slimibas-naudas-aprekins",
  mercado: "lv",
  concepto: "propio",
  slug: "slimibas-naudas-aprekins",
  estado: "publicado",
  requiere: {
    "lv.slimibas-nauda-2-3": "numero",
    "lv.slimibas-nauda-4-9": "numero",
    "lv.slimibas-pabalsts": "numero",
    "lv.slimibas-nedelas": "numero",
  },
  campos: [
    { id: "izpelna", tipo: "moneda", etiqueta: "Dienas vidējā izpeļņa", min: 0, porDefecto: 80, ayuda: "Darba devēja dienām: no pēdējiem sešiem mēnešiem." },
    { id: "iemaksuAlga", tipo: "moneda", etiqueta: "Vidējā iemaksu alga dienā", min: 0, porDefecto: 55, ayuda: "VSAA dienām: iemaksu alga par 12 mēnešiem, dalīta ar kalendāra dienām." },
    { id: "dienas", tipo: "entero", etiqueta: "Slimības dienas pēc kārtas", min: 1, max: 364, porDefecto: 14 },
  ],
  calcular(e, v, { redondear }) {
    if (e.izpelna <= 0) throw new ErrorEntrada("Ievadiet izpeļņu, kas lielāka par nulli.", "izpelna");
    if (e.iemaksuAlga <= 0) throw new ErrorEntrada("Ievadiet iemaksu algu, kas lielāka par nulli.", "iemaksuAlga");
    const d23 = Math.max(0, Math.min(e.dienas, 3) - 1);
    const d49 = Math.max(0, Math.min(e.dienas, 9) - 3);
    const d10 = Math.max(0, e.dienas - 9);
    const devejs = redondear(porcentaje(e.izpelna * d23, v["lv.slimibas-nauda-2-3"]) + porcentaje(e.izpelna * d49, v["lv.slimibas-nauda-4-9"]));
    const vsaa = redondear(porcentaje(e.iemaksuAlga * d10, v["lv.slimibas-pabalsts"]));
    const piezimes = e.dienas > v["lv.slimibas-nedelas"] * 7 ? ["Pēc 26 nedēļām pabalstu izmaksā tikai ar valsts ārstu komisijas atzinumu, līdz 52 nedēļām."] : [];
    return { kopa: redondear(devejs + vsaa), devejs, vsaa, observaciones: piezimes };
  },
  resultado: [
    { clave: "kopa", etiqueta: "Kopā par slimības periodu (bruto)", formato: "moneda", destacada: true },
    { clave: "devejs", etiqueta: "Slimības nauda no darba devēja", formato: "moneda" },
    { clave: "vsaa", etiqueta: "Slimības pabalsts no VSAA", formato: "moneda", ocultarSiCero: true },
  ],
});
