import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.minimala-alga",
  mercado: "lv",
  concepto: "salario-minimo",
  slug: "minimala-alga",
  estado: "publicado",
  requiere: {
    "lv.minimala-alga": "numero",
    "lv.vsaoi-darba-nemejs": "mapa",
    "lv.vsaoi-darba-devejs": "mapa",
    "lv.iin-alga": "numero",
    "lv.neapliekamais-minimums": "numero",
    "lv.pasnodarbinata-objekts": "numero",
  },
  campos: [
    { id: "slodze", tipo: "porcentaje", etiqueta: "Darba slodze (normāls darba laiks = 100)", min: 1, max: 100, porDefecto: 100 },
    { id: "gramatina", tipo: "si-no", etiqueta: "Algas nodokļa grāmatiņa iesniegta šajā darbavietā", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.slodze <= 0 || e.slodze > 100) throw new ErrorEntrada("Slodzei jābūt no 1 līdz 100.", "slodze");
    const bruto = redondear(porcentaje(v["lv.minimala-alga"], e.slodze));
    const vsaoi = redondear(porcentaje(bruto, v["lv.vsaoi-darba-nemejs"].vispariga));
    const minimums = e.gramatina ? v["lv.neapliekamais-minimums"] : 0;
    const iin = redondear(porcentaje(Math.max(0, bruto - vsaoi - minimums), v["lv.iin-alga"]));
    const devejaVsaoi = redondear(porcentaje(bruto, v["lv.vsaoi-darba-devejs"].vispariga));
    return { bruto, neto: redondear(bruto - vsaoi - iin), vsaoi, iin, izmaksas: redondear(bruto + devejaVsaoi) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Minimālā bruto alga", formato: "moneda" },
    { clave: "neto", etiqueta: "Neto alga (uz rokas)", formato: "moneda", destacada: true },
    { clave: "vsaoi", etiqueta: "VSAOI darba ņēmēja daļa", formato: "moneda" },
    { clave: "iin", etiqueta: "Iedzīvotāju ienākuma nodoklis", formato: "moneda" },
    { clave: "izmaksas", etiqueta: "Darba devēja izmaksas", formato: "moneda" },
  ],
});
