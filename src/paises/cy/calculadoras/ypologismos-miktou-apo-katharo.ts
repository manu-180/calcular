import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { elegxosTeknon, misthodosia, OPCIONES_MISTHON, REQUIERE_MISTHOU } from "../lib/misthos";

export default definirCalculadora({
  id: "cy.ypologismos-miktou-apo-katharo",
  mercado: "cy",
  concepto: "propio",
  slug: "ypologismos-miktou-apo-katharo",
  estado: "publicado",
  requiere: REQUIERE_MISTHOU,
  campos: [
    { id: "kathara", tipo: "moneda", etiqueta: "Καθαρός μηνιαίος μισθός που θέλετε", min: 0, porDefecto: 2000 },
    { id: "misthoi", tipo: "opcion", etiqueta: "Μισθοί τον χρόνο", opciones: OPCIONES_MISTHON, porDefecto: "12" },
    { id: "tekna", tipo: "entero", etiqueta: "Εξαρτώμενα τέκνα", min: 0, max: 15, porDefecto: 0 },
    { id: "monogoneas", tipo: "si-no", etiqueta: "Μονογονεϊκή οικογένεια", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.kathara <= 0) throw new ErrorEntrada("Εισάγετε καθαρό μισθό μεγαλύτερο από το μηδέν.", "kathara");
    if (e.kathara > 100000) throw new ErrorEntrada("Εισάγετε καθαρό μισθό έως 100.000 € τον μήνα.", "kathara");
    elegxosTeknon(e.tekna);
    const misthoi = Number(e.misthoi);
    // El neto crece con el bruto: bisección hasta el céntimo.
    let kato = e.kathara;
    let pano = e.kathara * 3;
    for (let i = 0; i < 60 && pano - kato > 0.001; i++) {
      const mesi = (kato + pano) / 2;
      if (misthodosia(mesi, misthoi, e.tekna, e.monogoneas, v, redondear).katharaMina < e.kathara) kato = mesi;
      else pano = mesi;
    }
    let miktos = redondear(pano);
    while (misthodosia(miktos - 0.01, misthoi, e.tekna, e.monogoneas, v, redondear).katharaMina >= e.kathara) miktos = redondear(miktos - 0.01);
    const m = misthodosia(miktos, misthoi, e.tekna, e.monogoneas, v, redondear);
    return { miktos, katharaMina: m.katharaMina, kaMina: m.kaMina, gesyMina: m.gesyMina, forosMina: m.forosMina, miktaEtous: m.miktaEtous };
  },
  resultado: [
    { clave: "miktos", etiqueta: "Μεικτός μηνιαίος μισθός", formato: "moneda", destacada: true },
    { clave: "katharaMina", etiqueta: "Καθαρός μισθός που προκύπτει", formato: "moneda" },
    { clave: "kaMina", etiqueta: "Κοινωνικές Ασφαλίσεις τον μήνα", formato: "moneda" },
    { clave: "gesyMina", etiqueta: "ΓεΣΥ τον μήνα", formato: "moneda" },
    { clave: "forosMina", etiqueta: "Φόρος εισοδήματος τον μήνα", formato: "moneda" },
    { clave: "miktaEtous", etiqueta: "Μεικτές αποδοχές του έτους", formato: "moneda" },
  ],
});
