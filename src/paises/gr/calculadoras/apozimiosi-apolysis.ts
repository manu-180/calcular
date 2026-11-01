import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { anaEti, elegxosEton } from "../lib/apolysi";
import { REQUIERE_PAGES } from "../lib/foros";

export default definirCalculadora({
  id: "gr.apozimiosi-apolysis",
  mercado: "gr",
  concepto: "indemnizacion-despido",
  slug: "apozimiosi-apolysis",
  estado: "publicado",
  requiere: {
    ...REQUIERE_PAGES,
    "gr.apozimiosi-mines": "mapa",
    "gr.proeidopoiisi-mines": "mapa",
    "gr.apozimiosi-orio-imeromisthia": "numero",
    "gr.katotato-imeromisthio": "numero",
    "gr.apozimiosi-metavatiki": "mapa",
  },
  campos: [
    { id: "miktos", tipo: "moneda", etiqueta: "Μικτός μηνιαίος μισθός (τελευταίος μήνας, πλήρης απασχόληση)", min: 0, porDefecto: 1500 },
    { id: "eti", tipo: "entero", etiqueta: "Συμπληρωμένα έτη στον εργοδότη", min: 0, max: 60, porDefecto: 5 },
    { id: "proeidopoiisi", tipo: "si-no", etiqueta: "Η απόλυση έγινε με έγγραφη προειδοποίηση", porDefecto: false },
    {
      id: "eti2012",
      tipo: "entero",
      etiqueta: "Έτη στον ίδιο εργοδότη στις 12 Νοεμβρίου 2012",
      ayuda: "Μόνο αν τότε είχατε ήδη 17 έτη ή περισσότερα. Διαφορετικά αφήστε 0.",
      min: 0,
      max: 60,
      porDefecto: 0,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.miktos <= 0) throw new ErrorEntrada("Εισάγετε μικτό μισθό μεγαλύτερο από το μηδέν.", "miktos");
    elegxosEton(e.eti, "eti");
    elegxosEton(e.eti2012, "eti2012");
    if (e.eti2012 > e.eti) throw new ErrorEntrada("Τα έτη στις 12.11.2012 δεν μπορεί να είναι περισσότερα από τα συνολικά έτη στον εργοδότη.", "eti2012");
    // Art. 5 ν. 3198/1955: el sueldo computable tiene tope; la base suma 1/6 por los δώρα y el
    // επίδομα αδείας, que es lo que suman esos datos sobre 12 meses.
    const prosafxisi = (enMapa(v["gr.doro-christougennon"], "mines") + enMapa(v["gr.doro-pascha"], "mines") + enMapa(v["gr.epidoma-adeias"], "mines")) / 12;
    const orio = redondear(v["gr.katotato-imeromisthio"] * v["gr.apozimiosi-orio-imeromisthia"]);
    const vasiAkrivis = Math.min(e.miktos, orio) * (1 + prosafxisi);
    const vasi = redondear(vasiAkrivis);
    const mines = anaEti(v["gr.apozimiosi-mines"], e.eti);
    const kanoniki = redondear(vasiAkrivis * mines);
    const m = v["gr.apozimiosi-metavatiki"];
    const minesMetavatikis = e.eti2012 >= enMapa(m, "eti-apo") ? Math.min(e.eti2012 - enMapa(m, "eti-apo") + 1, enMapa(m, "megistoi-misthoi")) : 0;
    const metavatiki = redondear(Math.min(e.miktos, enMapa(m, "orio-misthou")) * (1 + prosafxisi) * minesMetavatikis);
    const plires = redondear(kanoniki + metavatiki);
    const apozimiosi = e.proeidopoiisi ? redondear(plires / 2) : plires;
    const observaciones: string[] = [];
    if (mines === 0) observaciones.push("Τους πρώτους 12 μήνες η σύμβαση θεωρείται δοκιμαστική και η απόλυση γίνεται χωρίς αποζημίωση και χωρίς προειδοποίηση, εκτός αν συμφωνήθηκε κάτι άλλο.");
    if (e.miktos > orio) observaciones.push("Ο μισθός ξεπερνά το ανώτατο όριο για την αποζημίωση. Ο υπολογισμός γίνεται με το όριο.");
    if (apozimiosi > vasi * 2) observaciones.push("Όταν η αποζημίωση ξεπερνά τις αποδοχές δύο μηνών, ο εργοδότης πληρώνει δύο μήνες με την απόλυση και το υπόλοιπο σε διμηνιαίες δόσεις.");
    return {
      apozimiosi,
      mines,
      vasi,
      kanoniki,
      minesMetavatikis,
      metavatiki,
      proeidopoiisiMines: anaEti(v["gr.proeidopoiisi-mines"], e.eti),
      observaciones,
    };
  },
  resultado: [
    { clave: "apozimiosi", etiqueta: "Αποζημίωση απόλυσης", formato: "moneda", destacada: true },
    { clave: "mines", etiqueta: "Μισθοί αποζημίωσης (χωρίς προειδοποίηση)", formato: "meses" },
    { clave: "vasi", etiqueta: "Μηνιαίες αποδοχές υπολογισμού (με 1/6 για δώρα και επίδομα)", formato: "moneda" },
    { clave: "kanoniki", etiqueta: "Αποζημίωση με την κλίμακα", formato: "moneda" },
    { clave: "minesMetavatikis", etiqueta: "Επιπλέον μισθοί για την υπηρεσία έως 12.11.2012", formato: "meses", ocultarSiCero: true },
    { clave: "metavatiki", etiqueta: "Επιπλέον αποζημίωση για την υπηρεσία έως 12.11.2012", formato: "moneda", ocultarSiCero: true },
    { clave: "proeidopoiisiMines", etiqueta: "Χρόνος προειδοποίησης για να μειωθεί στο μισό", formato: "meses", ocultarSiCero: true },
  ],
});
