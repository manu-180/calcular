import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.atvalinajuma-naudas-aprekins",
  mercado: "lv",
  concepto: "vacaciones",
  slug: "atvalinajuma-naudas-aprekins",
  estado: "borrador",
  requiere: { "lv.atvalinajums-nedelas": "numero", "lv.videja-izpelna-menesi": "numero" },
  campos: [
    { id: "samaksa", tipo: "moneda", etiqueta: "Darba samaksa pēdējos sešos mēnešos kopā", min: 0, porDefecto: 10500 },
    { id: "dienasPeriode", tipo: "entero", etiqueta: "Kalendāra dienas šajos mēnešos", min: 1, max: 190, porDefecto: 181 },
    { id: "dienas", tipo: "entero", etiqueta: "Atvaļinājuma kalendāra dienas", min: 1, max: 60, porDefecto: 28 },
  ],
  calcular(e, v, { redondear }) {
    if (e.samaksa <= 0) throw new ErrorEntrada("Ievadiet darba samaksu, kas lielāka par nulli.", "samaksa");
    const dienas = v["lv.atvalinajums-nedelas"] * 7;
    const videjaDiena = e.samaksa / e.dienasPeriode;
    return { nauda: redondear(videjaDiena * e.dienas), videjaDiena: redondear(videjaDiena), obligatasDienas: dienas };
  },
  resultado: [
    { clave: "nauda", etiqueta: "Atvaļinājuma nauda (bruto)", formato: "moneda", destacada: true },
    { clave: "videjaDiena", etiqueta: "Vidējā izpeļņa dienā", formato: "moneda" },
    { clave: "obligatasDienas", etiqueta: "Likumā noteiktais minimums", formato: "dias" },
  ],
});
