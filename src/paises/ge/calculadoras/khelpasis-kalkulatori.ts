import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { netoKhelpasi, sakhelmtsipoTslshi } from "../lib/khelpasi";

export default definirCalculadora({
  id: "ge.khelpasis-kalkulatori",
  mercado: "ge",
  concepto: "sueldo-neto",
  slug: "khelpasis-kalkulatori",
  estado: "publicado",
  requiere: {
    "ge.sashemosavlo": "numero",
    "ge.pensia-dasaqmebuli": "numero",
    "ge.pensia-damsaqmebeli": "numero",
    "ge.pensia-sakhelmtsipo": "numero",
    "ge.pensia-sakhelmtsipo-2": "numero",
    "ge.pensia-zghvari-1": "numero",
    "ge.pensia-zghvari-2": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "დარიცხული ხელფასი თვეში (ბრუტო)", min: 0, porDefecto: 2000 },
    { id: "monatsile", tipo: "si-no", etiqueta: "მონაწილეობთ საპენსიო სქემაში", porDefecto: true },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { monatsile: true } },
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "bruto");
    const r = netoKhelpasi(e.bruto, e.monatsile, { sashemosavlo: v["ge.sashemosavlo"], pensia: v["ge.pensia-dasaqmebuli"] }, redondear);
    const damsaqmebeli = e.monatsile ? redondear((e.bruto * v["ge.pensia-damsaqmebeli"]) / 100) : 0;
    const sakhelmtsipo = e.monatsile
      ? redondear(sakhelmtsipoTslshi(e.bruto * 12, { pirveli: v["ge.pensia-sakhelmtsipo"], meore: v["ge.pensia-sakhelmtsipo-2"], zghvari1: v["ge.pensia-zghvari-1"], zghvari2: v["ge.pensia-zghvari-2"] }) / 12)
      : 0;
    return {
      neto: r.neto,
      pensia: r.pensia,
      gadasakhadi: r.gadasakhadi,
      damsaqmebeli,
      sakhelmtsipo,
      angarishze: redondear(r.pensia + damsaqmebeli + sakhelmtsipo),
      tslshi: redondear(r.neto * 12),
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "ხელზე ასაღები თანხა თვეში", formato: "moneda", destacada: true },
    { clave: "gadasakhadi", etiqueta: "საშემოსავლო გადასახადი", formato: "moneda" },
    { clave: "pensia", etiqueta: "თქვენი საპენსიო შენატანი", formato: "moneda", ocultarSiCero: true },
    { clave: "damsaqmebeli", etiqueta: "დამსაქმებლის შენატანი (ხელფასიდან არ იკლება)", formato: "moneda", ocultarSiCero: true },
    { clave: "sakhelmtsipo", etiqueta: "სახელმწიფოს შენატანი, თვის საშუალო", formato: "moneda", ocultarSiCero: true },
    { clave: "angarishze", etiqueta: "საპენსიო ანგარიშზე თვეში სულ", formato: "moneda", ocultarSiCero: true },
    { clave: "tslshi", etiqueta: "ხელზე ასაღები თანხა წელიწადში", formato: "moneda" },
  ],
});
