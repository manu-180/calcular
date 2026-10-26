import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { elegxosTeknon, misthodosia, OPCIONES_MISTHON, REQUIERE_MISTHOU } from "../lib/misthos";

export default definirCalculadora({
  id: "cy.ypologismos-katharou-misthou",
  mercado: "cy",
  concepto: "sueldo-neto",
  slug: "ypologismos-katharou-misthou",
  estado: "publicado",
  requiere: REQUIERE_MISTHOU,
  campos: [
    { id: "miktos", tipo: "moneda", etiqueta: "Μεικτός μηνιαίος μισθός", min: 0, porDefecto: 2000 },
    { id: "misthoi", tipo: "opcion", etiqueta: "Μισθοί τον χρόνο", opciones: OPCIONES_MISTHON, porDefecto: "12" },
    { id: "tekna", tipo: "entero", etiqueta: "Εξαρτώμενα τέκνα", min: 0, max: 15, porDefecto: 0, ayuda: "Η έκπτωση για τέκνα ισχύει μόνο αν το οικογενειακό εισόδημα είναι εντός των εισοδηματικών κριτηρίων." },
    { id: "monogoneas", tipo: "si-no", etiqueta: "Μονογονεϊκή οικογένεια", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.miktos <= 0) throw new ErrorEntrada("Εισάγετε μεικτό μισθό μεγαλύτερο από το μηδέν.", "miktos");
    elegxosTeknon(e.tekna);
    const misthoi = Number(e.misthoi);
    const m = misthodosia(e.miktos, misthoi, e.tekna, e.monogoneas, v, redondear);
    const observaciones: string[] = [];
    if (m.plafonKa) observaciones.push("Ο μισθός ξεπερνά το ανώτατο όριο ασφαλιστέων αποδοχών. Οι Κοινωνικές Ασφαλίσεις υπολογίζονται μόνο μέχρι το όριο.");
    if (m.forosEtous === 0) observaciones.push("Το φορολογητέο εισόδημα είναι μέσα στο αφορολόγητο ποσό. Δεν πληρώνετε φόρο εισοδήματος.");
    return {
      katharaMina: m.katharaMina,
      kaMina: m.kaMina,
      gesyMina: m.gesyMina,
      forosMina: m.forosMina,
      miktaEtous: m.miktaEtous,
      ekptosiEisforon: m.ekptosiEisforon,
      ekptosiTeknon: m.ekptosiTeknon,
      forologiteo: m.forologiteo,
      forosEtous: m.forosEtous,
      katharaEtous: m.katharaEtous,
      observaciones,
    };
  },
  resultado: [
    { clave: "katharaMina", etiqueta: "Καθαρός μηνιαίος μισθός", formato: "moneda", destacada: true },
    { clave: "kaMina", etiqueta: "Κοινωνικές Ασφαλίσεις τον μήνα", formato: "moneda" },
    { clave: "gesyMina", etiqueta: "Εισφορά ΓεΣΥ τον μήνα", formato: "moneda" },
    { clave: "forosMina", etiqueta: "Φόρος εισοδήματος τον μήνα", formato: "moneda" },
    { clave: "miktaEtous", etiqueta: "Μεικτές αποδοχές του έτους", formato: "moneda" },
    { clave: "ekptosiEisforon", etiqueta: "Έκπτωση για εισφορές", formato: "moneda" },
    { clave: "ekptosiTeknon", etiqueta: "Έκπτωση για τέκνα", formato: "moneda", ocultarSiCero: true },
    { clave: "forologiteo", etiqueta: "Φορολογητέο εισόδημα", formato: "moneda" },
    { clave: "forosEtous", etiqueta: "Φόρος εισοδήματος του έτους", formato: "moneda" },
    { clave: "katharaEtous", etiqueta: "Καθαρές αποδοχές του έτους", formato: "moneda" },
  ],
  mundo: { bruto: "miktos", periodoBruto: "mes", neto: "katharaMina", periodoNeto: "mes", pagasAnuales: 12, entrada: { misthoi: "12", tekna: 0, monogoneas: false } },
});
