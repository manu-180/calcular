import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nvazaguynNpasti } from "../lib/npast";

export default definirCalculadora({
  id: "am.hivandutyan-npast",
  mercado: "am",
  concepto: "propio",
  slug: "hivandutyan-npast",
  estado: "publicado",
  requiere: {
    "am.hivandutyan-tokos": "numero",
    "am.npast-orer": "numero",
    "am.hivandutyan-gortatu-orer": "numero",
    "am.hivandutyan-bazmapatik": "numero",
    "am.npast-nvazaguyn": "numero",
    "am.nvazaguyn": "numero",
    "am.yekamtayin-hark": "numero",
  },
  campos: [
    { id: "mijin", tipo: "moneda", etiqueta: "Միջին ամսական աշխատավարձ", ayuda: "Նախորդ 12 օրացուցային ամսվա եկամուտը՝ բաժանած 12 թվի վրա։", min: 0, porDefecto: 400000 },
    { id: "orer", tipo: "entero", etiqueta: "Անաշխատունակության օրացուցային օրերը", min: 1, max: 365, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mijin <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ միջին աշխատավարձ։", "mijin");
    const nvazaguyn = nvazaguynNpasti(v["am.nvazaguyn"], v["am.yekamtayin-hark"]);
    const stor = porcentaje(nvazaguyn, v["am.npast-nvazaguyn"]);
    const tope = nvazaguyn * v["am.hivandutyan-bazmapatik"];
    const tokos = porcentaje(e.mijin, v["am.hivandutyan-tokos"]);
    const himan = e.mijin < stor ? stor : Math.min(tokos, tope);
    const orakan = himan / v["am.npast-orer"];
    const npast = redondear(orakan * e.orer);
    const gortatu = redondear(orakan * Math.min(e.orer, v["am.hivandutyan-gortatu-orer"]));
    const observaciones: string[] = [];
    if (himan !== tokos) observaciones.push("Կիրառվել է օրենքով սահմանված սահմանային հիմք։ Պաշտոնական հաշվարկը կատարում է լիազոր մարմինը։");
    return { npast, gortatu, petutyun: npast - gortatu, himan: redondear(himan), orakan: redondear(orakan), observaciones };
  },
  resultado: [
    { clave: "npast", etiqueta: "Հիվանդության նպաստ", formato: "moneda", decimales: 0, destacada: true },
    { clave: "gortatu", etiqueta: "Վճարում է գործատուն", formato: "moneda", decimales: 0 },
    { clave: "petutyun", etiqueta: "Վճարում է պետական բյուջեն", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "himan", etiqueta: "Նպաստի ամսական հիմքը", formato: "moneda", decimales: 0 },
    { clave: "orakan", etiqueta: "Նպաստը մեկ օրվա համար", formato: "moneda", decimales: 0 },
  ],
});
