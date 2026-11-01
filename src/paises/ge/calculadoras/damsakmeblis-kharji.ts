import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { netoKhelpasi } from "../lib/khelpasi";

export default definirCalculadora({
  id: "ge.damsakmeblis-kharji",
  mercado: "ge",
  concepto: "costo-empleador",
  slug: "damsakmeblis-kharji",
  estado: "publicado",
  requiere: { "ge.sashemosavlo": "numero", "ge.pensia-dasaqmebuli": "numero", "ge.pensia-damsaqmebeli": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "დარიცხული ხელფასი თვეში (ბრუტო)", min: 0, porDefecto: 3000 },
    { id: "monatsile", tipo: "si-no", etiqueta: "დასაქმებული საპენსიო სქემის მონაწილეა", porDefecto: true },
    { id: "dasaqmebuli", tipo: "entero", etiqueta: "დასაქმებულთა რაოდენობა", min: 1, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "bruto");
    if (e.dasaqmebuli < 1) throw new ErrorEntrada("დასაქმებულთა რაოდენობა ერთი მაინც უნდა იყოს.", "dasaqmebuli");
    const r = netoKhelpasi(e.bruto, e.monatsile, { sashemosavlo: v["ge.sashemosavlo"], pensia: v["ge.pensia-dasaqmebuli"] }, redondear);
    const shenatani = e.monatsile ? redondear((e.bruto * v["ge.pensia-damsaqmebeli"]) / 100) : 0;
    const tvis = redondear((e.bruto + shenatani) * e.dasaqmebuli);
    return {
      tvis,
      shenatani: redondear(shenatani * e.dasaqmebuli),
      tslis: redondear(tvis * 12),
      neto: r.neto,
      budgeti: redondear((r.gadasakhadi + r.pensia + shenatani) * e.dasaqmebuli),
    };
  },
  resultado: [
    { clave: "tvis", etiqueta: "დამსაქმებლის ხარჯი თვეში", formato: "moneda", destacada: true },
    { clave: "shenatani", etiqueta: "დამსაქმებლის საპენსიო შენატანი თვეში", formato: "moneda", ocultarSiCero: true },
    { clave: "tslis", etiqueta: "დამსაქმებლის ხარჯი წელიწადში", formato: "moneda" },
    { clave: "neto", etiqueta: "ერთი დასაქმებული ხელზე იღებს", formato: "moneda" },
    { clave: "budgeti", etiqueta: "გადასახადი და საპენსიო შენატანები თვეში", formato: "moneda" },
  ],
});
