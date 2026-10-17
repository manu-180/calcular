import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.ferie",
  mercado: "it",
  concepto: "vacaciones",
  slug: "calcolo-ferie-maturate",
  estado: "publicado",
  requiere: {
    "it.ferie-minime": "numero",
  },
  campos: [
    { id: "settimane", tipo: "numero", etiqueta: "Settimane di ferie l'anno previste dal contratto", min: 0, max: 10, porDefecto: 4 },
    {
      id: "giorni",
      tipo: "opcion",
      etiqueta: "Giorni lavorativi a settimana",
      opciones: [
        { valor: "5", etiqueta: "5 giorni (da lunedì a venerdì)" },
        { valor: "6", etiqueta: "6 giorni (da lunedì a sabato)" },
      ],
      porDefecto: "5",
    },
    { id: "mesi", tipo: "entero", etiqueta: "Mesi lavorati quest'anno", min: 0, max: 12, porDefecto: 12 },
    { id: "goduti", tipo: "numero", etiqueta: "Giorni di ferie già goduti quest'anno", min: 0, porDefecto: 0 },
    { id: "oreGiorno", tipo: "numero", etiqueta: "Ore di lavoro al giorno", min: 1, max: 12, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    const minime = v["it.ferie-minime"];
    if (e.settimane < minime) throw new ErrorEntrada(`La legge garantisce almeno ${minime} settimane di ferie l'anno: inserisci un valore uguale o maggiore.`, "settimane");
    if (e.mesi < 0 || e.mesi > 12) throw new ErrorEntrada("I mesi vanno da 0 a 12.", "mesi");
    const annui = e.settimane * Number(e.giorni);
    const maturati = redondear((annui * e.mesi) / 12);
    const residui = redondear(maturati - e.goduti);
    const observaciones: string[] = [];
    if (residui < 0) observaciones.push("Hai già goduto più giorni di quelli maturati finora: la differenza si recupera con le ferie dei prossimi mesi.");
    return {
      annui,
      maturati,
      residui,
      oreResidue: redondear(Math.max(0, residui) * e.oreGiorno),
      observaciones,
    };
  },
  resultado: [
    { clave: "residui", etiqueta: "Giorni di ferie ancora da godere", formato: "dias", destacada: true, decimales: 2 },
    { clave: "maturati", etiqueta: "Giorni maturati finora", formato: "dias", decimales: 2 },
    { clave: "annui", etiqueta: "Giorni di ferie in un anno intero", formato: "dias", decimales: 0 },
    { clave: "oreResidue", etiqueta: "Ore di ferie residue", formato: "horas", decimales: 2 },
  ],
});
