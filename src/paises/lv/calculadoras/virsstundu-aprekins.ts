import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.virsstundu-aprekins",
  mercado: "lv",
  concepto: "horas-extra",
  slug: "virsstundu-aprekins",
  estado: "publicado",
  requiere: { "lv.virsstundu-piemaksa": "numero" },
  campos: [
    { id: "likme", tipo: "moneda", etiqueta: "Stundas algas likme", min: 0, porDefecto: 10 },
    { id: "stundas", tipo: "numero", etiqueta: "Virsstundu skaits", min: 0, porDefecto: 8 },
    { id: "lielaka", tipo: "porcentaje", etiqueta: "Līgumā noteiktā lielāka piemaksa", min: 0, requerido: false, ayuda: "Ja līgumā nav citas likmes, atstājiet tukšu." },
  ],
  calcular(e, v, { redondear }) {
    if (e.likme <= 0) throw new ErrorEntrada("Ievadiet stundas likmi, kas lielāka par nulli.", "likme");
    if (e.stundas <= 0) throw new ErrorEntrada("Ievadiet virsstundu skaitu.", "stundas");
    const likme = e.lielaka === null ? v["lv.virsstundu-piemaksa"] : Math.max(v["lv.virsstundu-piemaksa"], e.lielaka);
    const pamata = redondear(e.likme * e.stundas);
    const piemaksa = redondear(porcentaje(pamata, likme));
    return { kopa: redondear(pamata + piemaksa), pamata, piemaksa, likme };
  },
  resultado: [
    { clave: "kopa", etiqueta: "Samaksa par virsstundām (bruto)", formato: "moneda", destacada: true },
    { clave: "pamata", etiqueta: "Parastā samaksa par šīm stundām", formato: "moneda" },
    { clave: "piemaksa", etiqueta: "Piemaksa", formato: "moneda" },
    { clave: "likme", etiqueta: "Piemērotā piemaksas likme", formato: "porcentaje" },
  ],
});
