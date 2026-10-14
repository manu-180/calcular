import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.quattordicesima",
  mercado: "it",
  concepto: "propio",
  slug: "calcolo-quattordicesima",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "retribuzione", tipo: "moneda", etiqueta: "Retribuzione mensile lorda", ayuda: "Quella di giugno, senza straordinari né rimborsi.", min: 0, porDefecto: 2000 },
    { id: "mesi", tipo: "entero", etiqueta: "Mesi lavorati da luglio a giugno", ayuda: "Il periodo che conta va dal 1° luglio dell'anno prima al 30 giugno.", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(e, _v, { redondear }) {
    if (e.mesi < 0 || e.mesi > 12) throw new ErrorEntrada("I mesi vanno da 0 a 12.", "mesi");
    return {
      quattordicesima: redondear((e.retribuzione * e.mesi) / 12),
      rateo: redondear(e.retribuzione / 12),
      observaciones: [
        "La quattordicesima non è prevista dalla legge per tutti: spetta solo se il tuo contratto collettivo la prevede, come quelli del commercio e del turismo.",
      ],
    };
  },
  resultado: [
    { clave: "quattordicesima", etiqueta: "Quattordicesima lorda", formato: "moneda", destacada: true },
    { clave: "rateo", etiqueta: "Rateo mensile", formato: "moneda" },
  ],
});
