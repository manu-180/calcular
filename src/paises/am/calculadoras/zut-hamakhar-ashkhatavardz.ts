import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { hamakharnZutits, REQUIERE_ASHKHATAVARDZ, zutAshkhatavardz } from "../lib/ashkhatavardz";

export default definirCalculadora({
  id: "am.zut-hamakhar-ashkhatavardz",
  mercado: "am",
  concepto: "propio",
  slug: "zut-hamakhar-ashkhatavardz",
  estado: "publicado",
  requiere: REQUIERE_ASHKHATAVARDZ,
  campos: [
    { id: "zut", tipo: "moneda", etiqueta: "Ցանկալի զուտ աշխատավարձ ամսական", min: 0, porDefecto: 300000 },
    {
      id: "kutakayin",
      tipo: "si-no",
      etiqueta: "Կատարվում է կուտակային սոցիալական վճար",
      ayuda: "Պարտադիր է 1974 թվականի հունվարի մեկին և դրանից հետո ծնված աշխատողների համար։",
      porDefecto: true,
    },
    {
      id: "pahvum",
      tipo: "si-no",
      etiqueta: "Առողջության ապահովագրավճարը հանվում է աշխատավարձից",
      ayuda: "Անջատեք, եթե այն ամբողջությամբ վճարում է գործատուն։",
      porDefecto: true,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.zut <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ զուտ աշխատավարձ։", "zut");
    const p = { kutakayin: e.kutakayin, aha: e.pahvum };
    const hamakharn = hamakharnZutits(e.zut, p, v, redondear);
    const h = zutAshkhatavardz(hamakharn, p, v, redondear);
    return {
      hamakharn,
      stacvogh: h.zut,
      yekamtayin: h.yekamtayin,
      kutakayin: h.kutakayin,
      drosh: h.drosh,
      aha: h.aha,
    };
  },
  resultado: [
    { clave: "hamakharn", etiqueta: "Անհրաժեշտ համախառն աշխատավարձ", formato: "moneda", decimales: 0, destacada: true },
    { clave: "stacvogh", etiqueta: "Ձեռքին մնացող զուտ գումար", formato: "moneda", decimales: 0 },
    { clave: "yekamtayin", etiqueta: "Եկամտային հարկ", formato: "moneda", decimales: 0 },
    { clave: "kutakayin", etiqueta: "Կուտակային սոցիալական վճար", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "drosh", etiqueta: "Դրոշմանիշային վճար", formato: "moneda", decimales: 0 },
    { clave: "aha", etiqueta: "Առողջության ապահովագրավճար", formato: "moneda", decimales: 0, ocultarSiCero: true },
  ],
});
