import { definirCalculadora, enMapa } from "@/motor/calculo";
import { avelatsnelAmis, avelatsnelOrer, orerMijev } from "../lib/amsativ";

export default definirCalculadora({
  id: "am.tsanutsman-zhamket",
  mercado: "am",
  concepto: "preaviso",
  slug: "tsanutsman-zhamket",
  estado: "publicado",
  requiere: {
    "am.tsanutsman-orer": "mapa",
    "am.tsanutsman-krchatum-amis": "numero",
    "am.tsanutsman-ashkhatogh": "numero",
    "am.tsanutsman-ashkhatogh-hargeli": "numero",
  },
  campos: [
    {
      id: "himq",
      tipo: "opcion",
      etiqueta: "Ո՞վ է լուծում պայմանագիրը և ինչ հիմքով",
      opciones: [
        { valor: "krchatum", etiqueta: "Գործատու՝ լուծարում կամ կրճատում" },
        { valor: "anhamapatasxan", etiqueta: "Գործատու՝ պաշտոնին չհամապատասխանել կամ երկարատև անաշխատունակություն" },
        { valor: "ashkhatogh", etiqueta: "Աշխատող՝ իր նախաձեռնությամբ" },
        { valor: "hargeli", etiqueta: "Աշխատող՝ հիվանդություն կամ գործատուի խախտում" },
      ],
      porDefecto: "krchatum",
    },
    { id: "stazh", tipo: "opcion-dato", etiqueta: "Աշխատած ժամանակը տվյալ գործատուի մոտ", dato: "am.tsanutsman-orer", porDefecto: "1-5", visibleSi: { himq: ["anhamapatasxan"] } },
    { id: "sksum", tipo: "fecha", etiqueta: "Ծանուցման ամսաթիվը", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    let verj: string;
    if (e.himq === "krchatum") verj = avelatsnelAmis(e.sksum, v["am.tsanutsman-krchatum-amis"]);
    else if (e.himq === "anhamapatasxan") verj = avelatsnelOrer(e.sksum, enMapa(v["am.tsanutsman-orer"], e.stazh));
    else if (e.himq === "ashkhatogh") verj = avelatsnelOrer(e.sksum, v["am.tsanutsman-ashkhatogh"]);
    else verj = avelatsnelOrer(e.sksum, v["am.tsanutsman-ashkhatogh-hargeli"]);
    return { verj, orer: orerMijev(e.sksum, verj) };
  },
  resultado: [
    { clave: "verj", etiqueta: "Ծանուցման ժամկետի ավարտը", formato: "fecha", destacada: true },
    { clave: "orer", etiqueta: "Ծանուցման ժամկետը", formato: "dias" },
  ],
});
