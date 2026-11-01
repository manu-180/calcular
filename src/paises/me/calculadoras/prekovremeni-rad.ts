import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "me.prekovremeni-rad",
  mercado: "me",
  concepto: "horas-extra",
  slug: "prekovremeni-rad",
  estado: "publicado",
  requiere: {
    "me.prekovremeni-uvecanje": "numero",
    "me.nocni-uvecanje": "numero",
    "me.praznik-uvecanje": "numero",
    "me.prekovremeni-sedmicno": "numero",
    "me.puno-radno-vrijeme": "numero",
    "me.prekovremeni-prosjek": "numero",
    "me.nedjelja-uvecanje": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Osnovna mjesečna bruto zarada", min: 0, porDefecto: 1000 },
    { id: "casovaMjesecno", tipo: "numero", etiqueta: "Radnih časova u mjesecu", ayuda: "Pri 40 časova sedmično u prosjeku je oko 173 časa.", min: 1, max: 300, porDefecto: 173 },
    { id: "prekovremeni", tipo: "numero", etiqueta: "Prekovremenih časova", min: 0, porDefecto: 10 },
    { id: "sedmicno", tipo: "numero", etiqueta: "Najviše časova rada u jednoj sedmici", min: 0, max: 168, porDefecto: 45 },
    { id: "nocni", tipo: "si-no", etiqueta: "Rad je bio noću", porDefecto: false },
    { id: "praznik", tipo: "si-no", etiqueta: "Rad je bio na državni ili vjerski praznik", porDefecto: false },
    { id: "ugovoreno", tipo: "numero", etiqueta: "Veće uvećanje po ugovoru, u procentima", ayuda: "Nije obavezno. Važi ako je ugovoreno više od opšteg minimuma.", min: 0, max: 300, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const cas = redondear(e.bruto / e.casovaMjesecno);
    const osnovno = Math.max(v["me.prekovremeni-uvecanje"], e.ugovoreno ?? 0);
    const procenat = osnovno + (e.nocni ? v["me.nocni-uvecanje"] : 0) + (e.praznik ? v["me.praznik-uvecanje"] : 0);
    const osnova = redondear(cas * e.prekovremeni);
    const uvecanje = redondear((osnova * procenat) / 100);
    const observaciones: string[] = [];
    if (e.sedmicno > v["me.prekovremeni-sedmicno"]) observaciones.push("Sedmično radno vrijeme ne može da bude duže od 50 časova, osim izuzetka iz kolektivnog ugovora (Zakon o radu, čl. 64).");
    return { ukupno: redondear(osnova + uvecanje), cas, procenat, osnova, uvecanje, observaciones };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Bruto za prekovremeni rad", formato: "moneda", destacada: true },
    { clave: "cas", etiqueta: "Bruto vrijednost časa", formato: "moneda" },
    { clave: "procenat", etiqueta: "Uvećanje", formato: "porcentaje", decimales: 0 },
    { clave: "osnova", etiqueta: "Časovi po osnovnoj cijeni", formato: "moneda" },
    { clave: "uvecanje", etiqueta: "Iznos uvećanja", formato: "moneda" },
  ],
});
