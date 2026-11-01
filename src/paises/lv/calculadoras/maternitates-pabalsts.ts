import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.maternitates-pabalsts",
  mercado: "lv",
  concepto: "propio",
  slug: "maternitates-pabalsts",
  estado: "publicado",
  requiere: { "lv.maternitates-pabalsts": "numero", "lv.maternitates-max-dienas": "numero" },
  campos: [
    { id: "alga12", tipo: "moneda", etiqueta: "Apdrošināšanas iemaksu alga par 12 mēnešiem kopā", min: 0, porDefecto: 18000, ayuda: "Periods beidzas divus mēnešus pirms atvaļinājuma sākuma mēneša." },
    { id: "dienas12", tipo: "entero", etiqueta: "Kalendāra dienas šajos 12 mēnešos", min: 1, max: 366, porDefecto: 365 },
    { id: "dienas", tipo: "entero", etiqueta: "Pabalsta kalendāra dienas", min: 1, max: 140, porDefecto: 112, ayuda: "Parasti 56 + 56. Pirmā vai otrā daļa var būt 70 dienas." },
  ],
  calcular(e, v, { redondear }) {
    if (e.alga12 <= 0) throw new ErrorEntrada("Ievadiet iemaksu algu, kas lielāka par nulli.", "alga12");
    if (e.dienas > v["lv.maternitates-max-dienas"]) throw new ErrorEntrada("Pabalsta ilgākais periods ir 140 dienas.", "dienas");
    const diena = e.alga12 / e.dienas12;
    return { pabalsts: redondear(porcentaje(diena * e.dienas, v["lv.maternitates-pabalsts"])), diena: redondear(diena) };
  },
  resultado: [
    { clave: "pabalsts", etiqueta: "Maternitātes pabalsts par periodu", formato: "moneda", destacada: true },
    { clave: "diena", etiqueta: "Vidējā iemaksu alga dienā", formato: "moneda" },
  ],
});
