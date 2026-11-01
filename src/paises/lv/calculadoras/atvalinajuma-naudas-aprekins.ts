import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.atvalinajuma-naudas-aprekins",
  mercado: "lv",
  concepto: "vacaciones",
  slug: "atvalinajuma-naudas-aprekins",
  estado: "publicado",
  requiere: { "lv.atvalinajums-nedelas": "numero", "lv.videja-izpelna-periods": "numero" },
  campos: [
    { id: "samaksa", tipo: "moneda", etiqueta: "Darba samaksa pēdējos sešos kalendāra mēnešos kopā", min: 0, porDefecto: 10500, ayuda: "Alga, piemaksas un prēmijas." },
    { id: "nostradatas", tipo: "entero", etiqueta: "Nostrādātās dienas šajos mēnešos", min: 1, max: 190, porDefecto: 125 },
    { id: "dienas", tipo: "entero", etiqueta: "Darba dienas atvaļinājuma laikā", min: 1, max: 60, porDefecto: 20, ayuda: "Četras nedēļas piecu dienu darba nedēļā ir 20 darba dienas. Svētku dienas neskaita." },
  ],
  calcular(e, v, { redondear }) {
    if (e.samaksa <= 0) throw new ErrorEntrada("Ievadiet darba samaksu, kas lielāka par nulli.", "samaksa");
    if (e.nostradatas <= 0) throw new ErrorEntrada("Ievadiet nostrādāto dienu skaitu.", "nostradatas");
    const diena = e.samaksa / e.nostradatas;
    return { nauda: redondear(diena * e.dienas), diena: redondear(diena), minimums: v["lv.atvalinajums-nedelas"] };
  },
  resultado: [
    { clave: "nauda", etiqueta: "Atvaļinājuma nauda (bruto)", formato: "moneda", destacada: true },
    { clave: "diena", etiqueta: "Dienas vidējā izpeļņa", formato: "moneda" },
    { clave: "minimums", etiqueta: "Likumā noteiktais atvaļinājuma minimums", formato: "semanas" },
  ],
});
