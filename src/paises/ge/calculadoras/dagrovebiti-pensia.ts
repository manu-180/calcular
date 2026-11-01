import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sakhelmtsipoTslshi } from "../lib/khelpasi";

export default definirCalculadora({
  id: "ge.dagrovebiti-pensia",
  mercado: "ge",
  concepto: "jubilacion",
  slug: "dagrovebiti-pensia",
  estado: "publicado",
  requiere: {
    "ge.pensia-dasaqmebuli": "numero",
    "ge.pensia-damsaqmebeli": "numero",
    "ge.pensia-sakhelmtsipo": "numero",
    "ge.pensia-sakhelmtsipo-2": "numero",
    "ge.pensia-zghvari-1": "numero",
    "ge.pensia-zghvari-2": "numero",
  },
  campos: [
    { id: "khelpasi", tipo: "moneda", etiqueta: "დარიცხული ხელფასი თვეში", min: 0, porDefecto: 2000 },
    { id: "tseli", tipo: "entero", etiqueta: "რამდენი წელი დარჩა პენსიამდე", min: 1, max: 60, porDefecto: 30 },
    { id: "ukugeba", tipo: "porcentaje", etiqueta: "სავარაუდო წლიური უკუგება", min: 0, max: 30, porDefecto: 4, ayuda: "ეს თქვენი დაშვებაა, არა გარანტია. ფონდის უკუგება წლიდან წლამდე იცვლება." },
    { id: "nashti", tipo: "moneda", etiqueta: "უკვე დაგროვებული თანხა", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.khelpasi <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "khelpasi");
    const piradi = (e.khelpasi * v["ge.pensia-dasaqmebuli"]) / 100;
    const damsaqmebeli = (e.khelpasi * v["ge.pensia-damsaqmebeli"]) / 100;
    const sakhelmtsipo = sakhelmtsipoTslshi(e.khelpasi * 12, { pirveli: v["ge.pensia-sakhelmtsipo"], meore: v["ge.pensia-sakhelmtsipo-2"], zghvari1: v["ge.pensia-zghvari-1"], zghvari2: v["ge.pensia-zghvari-2"] }) / 12;
    const tvis = piradi + damsaqmebeli + sakhelmtsipo;
    const n = e.tseli * 12;
    const r = e.ukugeba / 1200;
    const zrda = (1 + r) ** n;
    const dagrovili = e.nashti * zrda + (r === 0 ? tvis * n : (tvis * (zrda - 1)) / r);
    return {
      dagrovili: redondear(dagrovili),
      shenatanebi: redondear(tvis * n + e.nashti),
      tqveni: redondear(piradi * n),
      mogeba: redondear(dagrovili - tvis * n - e.nashti),
      tvis: redondear(tvis),
    };
  },
  resultado: [
    { clave: "dagrovili", etiqueta: "სავარაუდო თანხა პენსიის ასაკში", formato: "moneda", destacada: true },
    { clave: "shenatanebi", etiqueta: "შენატანები და საწყისი თანხა სულ", formato: "moneda" },
    { clave: "tqveni", etiqueta: "აქედან თქვენი ხელფასიდან", formato: "moneda" },
    { clave: "mogeba", etiqueta: "სავარაუდო ინვესტიციური შემოსავალი", formato: "moneda" },
    { clave: "tvis", etiqueta: "შენატანი თვეში სულ", formato: "moneda" },
  ],
});
