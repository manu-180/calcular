import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { ekptosiTeknon, elegxosTeknon } from "../lib/misthos";

export default definirCalculadora({
  id: "cy.ypologismos-forou-eisodimatos",
  mercado: "cy",
  concepto: "impuesto-renta",
  slug: "ypologismos-forou-eisodimatos",
  estado: "publicado",
  requiere: {
    "cy.klimaka-forou": "escala",
    "cy.orio-ekptosis-eisforon": "numero",
    "cy.ekptosi-teknou": "mapa",
    "cy.ekptosi-stegasis": "numero",
    "cy.ekptosi-energeias": "numero",
    "cy.ekptosi-asfalisis-katoikias": "numero",
    "cy.eisodimatika-kritiria": "mapa",
  },
  campos: [
    { id: "eisodima", tipo: "moneda", etiqueta: "Ακαθάριστο εισόδημα του έτους", min: 0, porDefecto: 40000 },
    { id: "eisfores", tipo: "moneda", etiqueta: "Εισφορές ΚΑ, ΓεΣΥ, ταμεία προνοίας και ασφάλιστρα ζωής", min: 0, porDefecto: 0 },
    { id: "tekna", tipo: "entero", etiqueta: "Εξαρτώμενα τέκνα", min: 0, max: 15, porDefecto: 0 },
    { id: "monogoneas", tipo: "si-no", etiqueta: "Μονογονεϊκή οικογένεια", porDefecto: false },
    { id: "stegasi", tipo: "moneda", etiqueta: "Ενοίκιο ή τόκοι στεγαστικού κύριας κατοικίας που πληρώσατε", min: 0, porDefecto: 0 },
    { id: "energeia", tipo: "moneda", etiqueta: "Δαπάνη για ενεργειακή αναβάθμιση ή ηλεκτρικό όχημα", min: 0, porDefecto: 0 },
    { id: "asfalisi", tipo: "moneda", etiqueta: "Ασφάλιστρα κατοικίας για φυσικές καταστροφές", min: 0, porDefecto: 0 },
    {
      id: "kritiria",
      tipo: "si-no",
      etiqueta: "Είστε εντός των εισοδηματικών κριτηρίων",
      porDefecto: true,
      ayuda: "Οι εκπτώσεις για τέκνα, στέγαση και ενέργεια δίνονται μόνο αν το εισόδημα (ατομικό ή οικογενειακό) δεν ξεπερνά τα όρια.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.eisodima <= 0) throw new ErrorEntrada("Εισάγετε εισόδημα μεγαλύτερο από το μηδέν.", "eisodima");
    elegxosTeknon(e.tekna);
    const ekptosiEisforon = redondear(Math.min(e.eisfores, porcentaje(e.eisodima, v["cy.orio-ekptosis-eisforon"])));
    const tekna = e.kritiria ? ekptosiTeknon(v, e.tekna, e.monogoneas) : 0;
    const stegasi = e.kritiria ? Math.min(e.stegasi, v["cy.ekptosi-stegasis"]) : 0;
    const energeia = e.kritiria ? Math.min(e.energeia, v["cy.ekptosi-energeias"]) : 0;
    const asfalisi = Math.min(e.asfalisi, v["cy.ekptosi-asfalisis-katoikias"]);
    const ekptoseis = redondear(ekptosiEisforon + tekna + stegasi + energeia + asfalisi);
    const forologiteo = redondear(Math.max(0, e.eisodima - ekptoseis));
    const foros = redondear(aplicarEscalaMarginal(v["cy.klimaka-forou"], forologiteo));
    const observaciones: string[] = [];
    if (e.eisfores > ekptosiEisforon) observaciones.push("Οι εισφορές και τα ασφάλιστρα εκπίπτουν μόνο μέχρι το ένα πέμπτο του εισοδήματος.");
    if (e.energeia > energeia && e.kritiria) observaciones.push("Το υπόλοιπο της δαπάνης για ενεργειακή αναβάθμιση μπορεί να μεταφερθεί στα επόμενα τέσσερα έτη.");
    return {
      foros,
      ekptoseis,
      forologiteo,
      mesos: redondear((foros / e.eisodima) * 100),
      orikos: (v["cy.klimaka-forou"].filter((f) => forologiteo > f.desde).at(-1) ?? v["cy.klimaka-forou"][0]).tasa,
      kathara: redondear(e.eisodima - foros),
      observaciones,
    };
  },
  resultado: [
    { clave: "foros", etiqueta: "Φόρος εισοδήματος του έτους", formato: "moneda", destacada: true },
    { clave: "ekptoseis", etiqueta: "Σύνολο εκπτώσεων", formato: "moneda" },
    { clave: "forologiteo", etiqueta: "Φορολογητέο εισόδημα", formato: "moneda" },
    { clave: "mesos", etiqueta: "Μέσος φορολογικός συντελεστής", formato: "porcentaje", decimales: 2 },
    { clave: "orikos", etiqueta: "Οριακός συντελεστής", formato: "porcentaje", decimales: 0 },
    { clave: "kathara", etiqueta: "Εισόδημα μετά τον φόρο", formato: "moneda" },
  ],
});
