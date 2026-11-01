import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { kutakayinVchar, REQUIERE_ASHKHATAVARDZ } from "../lib/ashkhatavardz";

export default definirCalculadora({
  id: "am.kutakayin-vchar",
  mercado: "am",
  concepto: "aportes-seguridad-social",
  slug: "kutakayin-vchar",
  estado: "publicado",
  requiere: REQUIERE_ASHKHATAVARDZ,
  campos: [{ id: "ashkhatavardz", tipo: "moneda", etiqueta: "Համախառն ամսական աշխատավարձ", min: 0, porDefecto: 400000 }],
  calcular(e, v, { redondear }) {
    if (e.ashkhatavardz <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ աշխատավարձ։", "ashkhatavardz");
    const vchar = redondear(kutakayinVchar(e.ashkhatavardz, v));
    const tope = v["am.kutakayin-bazmapatik"] * v["am.nvazaguyn"];
    const hatkatsum = redondear((Math.min(e.ashkhatavardz, tope) * v["am.kutakayin-bardzr"]) / 100);
    return {
      vchar,
      petutyun: hatkatsum - vchar,
      hatkatsum,
      tarekan: hatkatsum * 12,
      tope,
    };
  },
  resultado: [
    { clave: "vchar", etiqueta: "Ձեր սոցիալական վճարն ամսական", formato: "moneda", destacada: true },
    { clave: "petutyun", etiqueta: "Պետության լրացումն ամսական", formato: "moneda" },
    { clave: "hatkatsum", etiqueta: "Կուտակային հատկացումն ամսական", formato: "moneda" },
    { clave: "tarekan", etiqueta: "Կուտակային հատկացումը տարեկան", formato: "moneda" },
    { clave: "tope", etiqueta: "Հաշվարկի առավելագույն շեմը", formato: "moneda" },
  ],
});
