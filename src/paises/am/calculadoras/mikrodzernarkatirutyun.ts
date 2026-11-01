import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.mikrodzernarkatirutyun",
  mercado: "am",
  concepto: "propio",
  slug: "mikrodzernarkatirutyun",
  estado: "publicado",
  requiere: {
    "am.mikro-shem": "numero",
    "am.yekamtayin-hark": "numero",
    "am.shrjanarutyan-dedq": "mapa",
    "am.drosh-dz-tsatsr": "numero",
    "am.drosh-dz-bardzr": "numero",
    "am.drosh-dz-shem": "numero",
  },
  campos: [
    { id: "shrjanarutyun", tipo: "moneda", etiqueta: "Տարեկան իրացման շրջանառություն", min: 0, porDefecto: 12000000 },
    { id: "ashkhatavardz", tipo: "moneda", etiqueta: "Աշխատողների համախառն աշխատավարձն ամսական", min: 0, porDefecto: 0 },
    { id: "dzernarkater", tipo: "si-no", etiqueta: "Անհատ ձեռնարկատեր եմ", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.shrjanarutyun <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ շրջանառություն։", "shrjanarutyun");
    const shem = v["am.mikro-shem"];
    const irav = e.shrjanarutyun <= shem;
    const yekamtayin = redondear(porcentaje(e.ashkhatavardz * 12, v["am.yekamtayin-hark"]));
    const drosh = !e.dzernarkater ? 0 : e.shrjanarutyun > v["am.drosh-dz-shem"] ? v["am.drosh-dz-bardzr"] : v["am.drosh-dz-tsatsr"];
    const shrjanarutyanHark = redondear(porcentaje(e.shrjanarutyun, enMapa(v["am.shrjanarutyan-dedq"], "ayl")));
    return {
      kargavichak: irav ? "Համապատասխանում է շեմին" : "Չի համապատասխանում շեմին",
      mnatsord: Math.max(shem - e.shrjanarutyun, 0),
      yekamtayin,
      drosh,
      shrjanarutyanHark,
      observaciones: irav ? [] : ["Նախորդ տարվա շրջանառությունը չպետք է գերազանցի շեմը։ Դիտարկեք շրջանառության հարկի համակարգը։"],
    };
  },
  resultado: [
    { clave: "kargavichak", etiqueta: "Շրջանառության շեմը", formato: "texto", destacada: true },
    { clave: "mnatsord", etiqueta: "Մնացորդը մինչև շեմը", formato: "moneda" },
    { clave: "yekamtayin", etiqueta: "Աշխատողների եկամտային հարկը տարեկան", formato: "moneda", ocultarSiCero: true },
    { clave: "drosh", etiqueta: "Ձեռնարկատիրոջ տարեկան դրոշմանիշային վճար", formato: "moneda", ocultarSiCero: true },
    { clave: "shrjanarutyanHark", etiqueta: "Համեմատության համար՝ շրջանառության հարկ ծառայությունների դրույքով", formato: "moneda" },
  ],
});
