import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.virsstundu-aprekins",
  mercado: "lv",
  concepto: "horas-extra",
  slug: "virsstundu-aprekins",
  estado: "borrador",
  requiere: { "lv.virsstundu-piemaksa": "numero" },
  campos: [
    { id: "likme", tipo: "moneda", etiqueta: "Stundas algas likme", min: 0, porDefecto: 10 },
    { id: "stundas", tipo: "numero", etiqueta: "Virsstundu skaits", min: 0, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    if (e.likme <= 0) throw new ErrorEntrada("Ievadiet stundas likmi, kas lielāka par nulli.", "likme");
    const pamata = e.likme * e.stundas;
    const piemaksa = porcentaje(pamata, v["lv.virsstundu-piemaksa"]);
    return { kopa: redondear(pamata + piemaksa), pamata: redondear(pamata), piemaksa: redondear(piemaksa) };
  },
  resultado: [
    { clave: "kopa", etiqueta: "Samaksa par virsstundām", formato: "moneda", destacada: true },
    { clave: "pamata", etiqueta: "Stundas likme", formato: "moneda" },
    { clave: "piemaksa", etiqueta: "Piemaksa", formato: "moneda" },
  ],
});
