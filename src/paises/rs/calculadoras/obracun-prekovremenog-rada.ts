import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.obracun-prekovremenog-rada",
  mercado: "rs",
  concepto: "horas-extra",
  slug: "obracun-prekovremenog-rada",
  estado: "publicado",
  requiere: {
    "rs.prekovremeni-uvecanje": "numero",
    "rs.nocni-uvecanje": "numero",
    "rs.praznik-uvecanje": "numero",
    "rs.prekovremeni-limit": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Osnovna mesečna bruto zarada", min: 0, porDefecto: 130500 },
    { id: "casovaMesecno", tipo: "numero", etiqueta: "Radni časovi u mesecu", min: 1, max: 300, porDefecto: 174 },
    { id: "prekovremeni", tipo: "numero", etiqueta: "Prekovremeni časovi u mesecu", min: 0, porDefecto: 10 },
    { id: "nedeljno", tipo: "numero", etiqueta: "Najviše prekovremenih časova u jednoj nedelji", min: 0, porDefecto: 5 },
    { id: "nocni", tipo: "si-no", etiqueta: "Prekovremeni rad je bio noću", porDefecto: false },
    { id: "praznik", tipo: "si-no", etiqueta: "Prekovremeni rad je bio na praznik", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const cenaCasa = redondear(e.bruto / e.casovaMesecno);
    const procenat = v["rs.prekovremeni-uvecanje"] + (e.nocni ? v["rs.nocni-uvecanje"] : 0) + (e.praznik ? v["rs.praznik-uvecanje"] : 0);
    const uvecanje = redondear((cenaCasa * e.prekovremeni * procenat) / 100);
    const osnovno = redondear(cenaCasa * e.prekovremeni);
    const limit = v["rs.prekovremeni-limit"];
    const observaciones: string[] = [];
    if (e.nedeljno > limit) observaciones.push(`Prekovremeni rad ne može da traje duže od ${limit} časova nedeljno.`);
    return { ukupno: redondear(osnovno + uvecanje), cenaCasa, procenat, osnovno, uvecanje, observaciones };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Bruto za prekovremene časove", formato: "moneda", destacada: true },
    { clave: "cenaCasa", etiqueta: "Bruto cena časa", formato: "moneda" },
    { clave: "procenat", etiqueta: "Uvećanje", formato: "porcentaje", decimales: 0 },
    { clave: "osnovno", etiqueta: "Osnovna vrednost časova", formato: "moneda" },
    { clave: "uvecanje", etiqueta: "Uvećanje u dinarima", formato: "moneda" },
  ],
});
