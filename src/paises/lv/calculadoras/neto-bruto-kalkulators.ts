import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { noBruto, noNeto } from "../lib/alga";

export default definirCalculadora({
  id: "lv.neto-bruto-kalkulators",
  mercado: "lv",
  concepto: "propio",
  slug: "neto-bruto-kalkulators",
  estado: "publicado",
  requiere: {
    "lv.vsaoi-darba-nemejs": "mapa",
    "lv.iin-alga": "numero",
    "lv.iin-gada": "escala",
    "lv.neapliekamais-minimums": "numero",
    "lv.apgadajamais": "numero",
    "lv.papildu-atvieglojums": "mapa",
  },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Vēlamā neto alga mēnesī", min: 0, porDefecto: 1500 },
    { id: "gramatina", tipo: "si-no", etiqueta: "Algas nodokļa grāmatiņa iesniegta šajā darbavietā", porDefecto: true },
    { id: "apgadajamie", tipo: "entero", etiqueta: "Apgādājamo skaits", min: 0, max: 15, porDefecto: 0, visibleSi: { gramatina: [true] } },
    { id: "kategorija", tipo: "opcion-dato", dato: "lv.vsaoi-darba-nemejs", etiqueta: "VSAOI kategorija", porDefecto: "vispariga" },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Ievadiet neto algu, kas lielāka par nulli.", "neto");
    const p = {
      darbaNemejs: v["lv.vsaoi-darba-nemejs"],
      iinAlga: v["lv.iin-alga"],
      iinGada: v["lv.iin-gada"],
      minimums: v["lv.neapliekamais-minimums"],
      apgadajamais: v["lv.apgadajamais"],
      papildu: v["lv.papildu-atvieglojums"],
    };
    const ievade = { kategorija: e.kategorija, gramatina: e.gramatina, apgadajamie: e.apgadajamie ?? 0, atvieglojums: "nav" };
    const bruto = redondear(noNeto(p, ievade, e.neto));
    const a = noBruto(p, ievade, bruto);
    return { bruto, vsaoi: redondear(a.vsaoi), iin: redondear(a.iin + a.iinGadaPiemaksa) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Nepieciešamā bruto alga", formato: "moneda", destacada: true },
    { clave: "vsaoi", etiqueta: "VSAOI darba ņēmēja daļa", formato: "moneda" },
    { clave: "iin", etiqueta: "Iedzīvotāju ienākuma nodoklis", formato: "moneda" },
  ],
});
