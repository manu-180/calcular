import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.tredicesima",
  mercado: "it",
  concepto: "bono-semestral",
  slug: "calcolo-tredicesima",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "retribuzione", tipo: "moneda", etiqueta: "Retribuzione mensile lorda", ayuda: "Quella di dicembre, senza straordinari né rimborsi.", min: 0, porDefecto: 2000 },
    { id: "mesi", tipo: "entero", etiqueta: "Mesi lavorati da gennaio a dicembre", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(e, _v, { redondear }) {
    if (e.mesi < 0 || e.mesi > 12) throw new ErrorEntrada("I mesi vanno da 0 a 12.", "mesi");
    const rateo = redondear(e.retribuzione / 12);
    return {
      tredicesima: redondear((e.retribuzione * e.mesi) / 12),
      rateo,
      observaciones: [
        "Di solito una frazione di mese di almeno 15 giorni conta come mese intero: controlla cosa dice il tuo contratto collettivo.",
        "L'importo è lordo: sulla tredicesima si pagano contributi e IRPEF, ma non si applicano le detrazioni per lavoro.",
      ],
    };
  },
  resultado: [
    { clave: "tredicesima", etiqueta: "Tredicesima lorda", formato: "moneda", destacada: true },
    { clave: "rateo", etiqueta: "Rateo mensile", formato: "moneda" },
  ],
});
