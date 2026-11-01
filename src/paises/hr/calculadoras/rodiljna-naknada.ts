import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.rodiljna-naknada",
  mercado: "hr",
  concepto: "propio",
  slug: "rodiljna-naknada",
  estado: "publicado",
  requiere: { "hr.rodiljna-stopa": "numero", "hr.rodiljna-najmanje": "numero", "hr.roditeljska-najvise": "numero", "hr.roditeljska-preostali": "numero" },
  campos: [
    { id: "osnovica", tipo: "moneda", etiqueta: "Osnovica za naknadu plaće", min: 0, porDefecto: 1800 },
    {
      id: "vrsta",
      tipo: "opcion",
      etiqueta: "Dopust",
      opciones: [
        { valor: "rodiljni", etiqueta: "Rodiljni dopust" },
        { valor: "roditeljski", etiqueta: "Roditeljski dopust" },
        { valor: "preostali", etiqueta: "Preostali roditeljski dopust (blizanci, treće dijete i dalje)" },
      ],
      porDefecto: "rodiljni",
    },
    { id: "staz", tipo: "si-no", etiqueta: "Imate propisani prethodni staž osiguranja", porDefecto: true, visibleSi: { vrsta: ["rodiljni"] } },
    { id: "mjeseci", tipo: "entero", etiqueta: "Mjeseci dopusta", min: 1, max: 30, porDefecto: 6 },
  ],
  calcular(e, v, { redondear }) {
    if (e.osnovica <= 0) throw new ErrorEntrada("Unesite osnovicu veću od nule.", "osnovica");
    let mjesecno: number;
    if (e.vrsta === "rodiljni") mjesecno = e.staz === false ? v["hr.rodiljna-najmanje"] : (e.osnovica * v["hr.rodiljna-stopa"]) / 100;
    else if (e.vrsta === "roditeljski") mjesecno = Math.max(v["hr.rodiljna-najmanje"], Math.min(e.osnovica, v["hr.roditeljska-najvise"]));
    else mjesecno = v["hr.roditeljska-preostali"];
    const m = redondear(mjesecno);
    return { mjesecno: m, ukupno: redondear(m * e.mjeseci) };
  },
  resultado: [
    { clave: "mjesecno", etiqueta: "Naknada mjesečno", formato: "moneda", destacada: true },
    { clave: "ukupno", etiqueta: "Naknada za odabrane mjesece", formato: "moneda" },
  ],
});
