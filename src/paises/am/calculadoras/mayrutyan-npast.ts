import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nvazaguynNpasti } from "../lib/npast";

export default definirCalculadora({
  id: "am.mayrutyan-npast",
  mercado: "am",
  concepto: "propio",
  slug: "mayrutyan-npast",
  estado: "publicado",
  requiere: {
    "am.mayrutyan-orer": "mapa",
    "am.mayrutyan-bazmapatik": "numero",
    "am.npast-orer": "numero",
    "am.npast-nvazaguyn": "numero",
    "am.nvazaguyn": "numero",
    "am.yekamtayin-hark": "numero",
  },
  campos: [
    { id: "mijin", tipo: "moneda", etiqueta: "Միջին ամսական աշխատավարձ", ayuda: "Նախորդ 12 օրացուցային ամսվա եկամուտը՝ բաժանած 12 թվի վրա։", min: 0, porDefecto: 400000 },
    { id: "tesak", tipo: "opcion-dato", etiqueta: "Արձակուրդի տեսակը", dato: "am.mayrutyan-orer", porDefecto: "sovorakan" },
  ],
  calcular(e, v, { redondear }) {
    if (e.mijin <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ միջին աշխատավարձ։", "mijin");
    const nvazaguyn = nvazaguynNpasti(v["am.nvazaguyn"], v["am.yekamtayin-hark"]);
    const stor = porcentaje(nvazaguyn, v["am.npast-nvazaguyn"]);
    const tope = nvazaguyn * v["am.mayrutyan-bazmapatik"];
    const himan = e.mijin < stor ? stor : Math.min(e.mijin, tope);
    const orer = enMapa(v["am.mayrutyan-orer"], e.tesak);
    const orakan = himan / v["am.npast-orer"];
    const observaciones: string[] = [];
    if (himan !== e.mijin) observaciones.push("Կիրառվել է օրենքով սահմանված սահմանային հիմք։ Պաշտոնական հաշվարկը կատարում է լիազոր մարմինը։");
    return { npast: redondear(orakan * orer), orer, himan: redondear(himan), orakan: redondear(orakan), observaciones };
  },
  resultado: [
    { clave: "npast", etiqueta: "Մայրության նպաստ", formato: "moneda", destacada: true },
    { clave: "orer", etiqueta: "Արձակուրդի օրեր", formato: "dias" },
    { clave: "himan", etiqueta: "Նպաստի ամսական հիմքը", formato: "moneda" },
    { clave: "orakan", etiqueta: "Նպաստը մեկ օրվա համար", formato: "moneda" },
  ],
});
