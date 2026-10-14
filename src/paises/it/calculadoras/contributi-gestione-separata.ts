import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.contributi-gestione-separata",
  mercado: "it",
  concepto: "aportes-seguridad-social",
  slug: "contributi-gestione-separata",
  estado: "publicado",
  requiere: {
    "it.aliquote-gestione-separata": "mapa",
    "it.massimale-contributivo": "numero",
    "it.minimale-autonomi": "numero",
    "it.rivalsa-inps": "numero",
  },
  campos: [
    { id: "profilo", tipo: "opcion-dato", dato: "it.aliquote-gestione-separata", etiqueta: "La tua posizione", porDefecto: "professionista" },
    {
      id: "reddito",
      tipo: "moneda",
      etiqueta: "Reddito o compensi dell'anno",
      ayuda: "Per i professionisti è il reddito imponibile della partita IVA; per i collaboratori, i compensi lordi.",
      min: 0,
      porDefecto: 30000,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.reddito < 0) throw new ErrorEntrada("Il reddito non può essere negativo.", "reddito");
    const aliquota = enMapa(v["it.aliquote-gestione-separata"], e.profilo);
    const massimale = v["it.massimale-contributivo"];
    const minimale = v["it.minimale-autonomi"];
    const base = Math.min(e.reddito, massimale);
    const totale = redondear(porcentaje(base, aliquota));
    const collaboratore = e.profilo.startsWith("collaboratore");
    const aTuoCarico = redondear(collaboratore ? totale / 3 : totale);
    const contributoPieno = porcentaje(minimale, aliquota);
    const mesi = contributoPieno > 0 ? Math.min(12, Math.floor((12 * totale) / contributoPieno + 1e-9)) : 0;
    const observaciones: string[] = [];
    if (e.reddito > massimale) observaciones.push("Oltre il massimale annuo non si pagano contributi: il calcolo si ferma lì.");
    if (mesi < 12) observaciones.push("Sotto il minimale l'INPS accredita solo una parte dell'anno ai fini della pensione.");
    if (collaboratore) observaciones.push("Per i collaboratori i contributi li versa il committente, che ne paga due terzi e trattiene un terzo dal tuo compenso.");
    return {
      aliquota,
      totale,
      aTuoCarico,
      committente: redondear(totale - aTuoCarico),
      mesi,
      observaciones,
    };
  },
  resultado: [
    { clave: "aTuoCarico", etiqueta: "Contributi a tuo carico", formato: "moneda", destacada: true },
    { clave: "totale", etiqueta: "Contributi totali", formato: "moneda" },
    { clave: "committente", etiqueta: "Quota del committente", formato: "moneda", ocultarSiCero: true },
    { clave: "aliquota", etiqueta: "Aliquota applicata", formato: "porcentaje" },
    { clave: "mesi", etiqueta: "Mesi accreditati per la pensione", formato: "meses", decimales: 0 },
  ],
});
