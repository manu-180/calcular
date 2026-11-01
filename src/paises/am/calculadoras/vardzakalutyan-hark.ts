import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.vardzakalutyan-hark",
  mercado: "am",
  concepto: "propio",
  slug: "vardzakalutyan-hark",
  estado: "publicado",
  requiere: { "am.vardz-dedq": "numero", "am.vardz-lrats": "numero", "am.vardz-shem": "numero", "am.aha-tarekan-shem": "numero" },
  campos: [{ id: "amsakan", tipo: "moneda", etiqueta: "Ամսական վարձակալական վճար", min: 0, porDefecto: 300000 }],
  calcular(e, v, { redondear }) {
    if (e.amsakan <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ վարձավճար։", "amsakan");
    const tarekan = e.amsakan * 12;
    const himan = redondear(porcentaje(tarekan, v["am.vardz-dedq"]));
    const lrats = redondear(porcentaje(Math.max(tarekan - v["am.vardz-shem"], 0), v["am.vardz-lrats"]));
    const hark = himan + lrats;
    return { amsakanHark: redondear(hark / 12), tarekanHark: hark, himan, lrats, tarekan, zut: tarekan - hark };
  },
  resultado: [
    { clave: "amsakanHark", etiqueta: "Եկամտային հարկն ամսական", formato: "moneda", destacada: true },
    { clave: "tarekanHark", etiqueta: "Եկամտային հարկը տարեկան", formato: "moneda" },
    { clave: "himan", etiqueta: "Հիմնական հարկը", formato: "moneda" },
    { clave: "lrats", etiqueta: "Լրացուցիչ հարկը շեմից բարձր մասի համար", formato: "moneda", ocultarSiCero: true },
    { clave: "tarekan", etiqueta: "Տարեկան վարձակալական վճար", formato: "moneda" },
    { clave: "zut", etiqueta: "Տարեկան գումարը հարկումից հետո", formato: "moneda" },
  ],
});
