import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { evdomadesApasxolisis } from "../lib/termatismos";

export default definirCalculadora({
  id: "cy.plirome-pleonasmou",
  mercado: "cy",
  concepto: "indemnizacion-despido",
  slug: "plirome-pleonasmou",
  estado: "publicado",
  requiere: {
    "cy.pleonasmos-evdomades": "mapa",
    "cy.pleonasmos-elachisti": "numero",
    "cy.pleonasmos-anotato-pollaplasio": "numero",
    "cy.vasikes-asfalistees-evdomada": "numero",
  },
  campos: [
    { id: "apo", tipo: "fecha", etiqueta: "Ημερομηνία πρόσληψης", porDefecto: "2016-01-04" },
    { id: "eos", tipo: "fecha", etiqueta: "Ημερομηνία τερματισμού", porDefecto: "hoy" },
    { id: "misthos", tipo: "moneda", etiqueta: "Τελευταίος μεικτός μισθός", min: 0, porDefecto: 2000 },
    {
      id: "periodos",
      tipo: "opcion",
      etiqueta: "Ο μισθός είναι",
      opciones: [
        { valor: "mina", etiqueta: "Μηνιαίος" },
        { valor: "evdomada", etiqueta: "Εβδομαδιαίος" },
      ],
      porDefecto: "mina",
    },
    { id: "pano64", tipo: "si-no", etiqueta: "Έχετε συμπληρώσει τα 64 χρόνια", porDefecto: false },
    { id: "mines64", tipo: "entero", etiqueta: "Συμπληρωμένοι μήνες μετά τα 64", min: 0, max: 60, porDefecto: 0, visibleSi: { pano64: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.misthos <= 0) throw new ErrorEntrada("Εισάγετε μισθό μεγαλύτερο από το μηδέν.", "misthos");
    const evdomades = evdomadesApasxolisis(e.apo, e.eos, "eos");
    const evdomadiaios = e.periodos === "mina" ? (e.misthos * 12) / 52 : e.misthos;
    const anotato = redondear(v["cy.vasikes-asfalistees-evdomada"] * v["cy.pleonasmos-anotato-pollaplasio"]);
    const vasi = Math.min(evdomadiaios, anotato);
    const eti = Math.floor(evdomades / 52) + (evdomades % 52 >= 26 ? 1 : 0);
    let evdomadesPliromis = 0;
    for (let i = 1; i <= Math.min(eti, 25); i++) evdomadesPliromis += klimakaEtous(v["cy.pleonasmos-evdomades"], i);
    const observaciones: string[] = [];
    const dikaiouxos = evdomades >= v["cy.pleonasmos-elachisti"];
    if (!dikaiouxos) observaciones.push("Χρειάζονται τουλάχιστον 104 εβδομάδες συνεχούς απασχόλησης στον ίδιο εργοδότη για πληρωμή λόγω πλεονασμού.");
    if (evdomadiaios > anotato) observaciones.push("Ο εβδομαδιαίος μισθός σας ξεπερνά το ανώτατο όριο. Η πληρωμή υπολογίζεται με το όριο.");
    if (eti > 25) observaciones.push("Μετρούν μέχρι 25 έτη υπηρεσίας.");
    const meiosi = e.pano64 ? Math.min(e.mines64 ?? 0, 12) / 12 : 0;
    const pliromi = dikaiouxos ? redondear(evdomadesPliromis * vasi * (1 - meiosi)) : 0;
    return {
      pliromi,
      eti,
      evdomadesPliromis: dikaiouxos ? evdomadesPliromis : 0,
      evdomadiaios: redondear(vasi),
      anotato,
      megistiApozimiosi: redondear(evdomadiaios * 104),
      observaciones,
    };
  },
  resultado: [
    { clave: "pliromi", etiqueta: "Πληρωμή λόγω πλεονασμού", formato: "moneda", destacada: true },
    { clave: "eti", etiqueta: "Έτη υπηρεσίας που μετρούν", formato: "anios" },
    { clave: "evdomadesPliromis", etiqueta: "Εβδομάδες μισθού που πληρώνονται", formato: "semanas", decimales: 1 },
    { clave: "evdomadiaios", etiqueta: "Εβδομαδιαίος μισθός του υπολογισμού", formato: "moneda" },
    { clave: "anotato", etiqueta: "Ανώτατος εβδομαδιαίος μισθός για πλεονασμό", formato: "moneda" },
    { clave: "megistiApozimiosi", etiqueta: "Ανώτατη αποζημίωση για αδικαιολόγητη απόλυση (2 χρόνια μισθού)", formato: "moneda" },
  ],
});

// Τέταρτος Πίνακας: el año i paga las semanas del tramo que lo contiene (hasta el 4.º, del 5.º al
// 10.º...). Las claves del mapa son el último año de cada tramo.
function klimakaEtous(mapa: Readonly<Record<string, number>>, etos: number): number {
  let r = 0;
  let mejor = Infinity;
  for (const [k, v] of Object.entries(mapa)) {
    const n = Number(k);
    if (etos <= n && n < mejor) {
      mejor = n;
      r = v;
    }
  }
  return r;
}
