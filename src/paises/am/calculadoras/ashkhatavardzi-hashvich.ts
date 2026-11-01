import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQUIERE_ASHKHATAVARDZ, zutAshkhatavardz } from "../lib/ashkhatavardz";

export default definirCalculadora({
  id: "am.ashkhatavardzi-hashvich",
  mercado: "am",
  concepto: "sueldo-neto",
  slug: "ashkhatavardzi-hashvich",
  estado: "publicado",
  requiere: { ...REQUIERE_ASHKHATAVARDZ, "am.mijin-ashkhatavardz": "numero" },
  campos: [
    { id: "ashkhatavardz", tipo: "moneda", etiqueta: "Համախառն ամսական աշխատավարձ", min: 0, porDefecto: 400000 },
    {
      id: "kutakayin",
      tipo: "si-no",
      etiqueta: "Կատարում եմ կուտակային սոցիալական վճար",
      ayuda: "Պարտադիր է 1974 թվականի հունվարի մեկին և դրանից հետո ծնված աշխատողների համար։",
      porDefecto: true,
    },
    {
      id: "pahvum",
      tipo: "si-no",
      etiqueta: "Առողջության ապահովագրավճարը հանվում է աշխատավարձից",
      ayuda: "Անջատեք, եթե այն ամբողջությամբ վճարում է գործատուն կամ եթե ապահովագրավճար վճարող չեք (օրինակ՝ 65 տարեկան և բարձր)։",
      porDefecto: true,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.ashkhatavardz <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ աշխատավարձ։", "ashkhatavardz");
    const h = zutAshkhatavardz(e.ashkhatavardz, { kutakayin: e.kutakayin, aha: e.pahvum }, v, redondear);
    return {
      zut: h.zut,
      yekamtayin: h.yekamtayin,
      kutakayin: h.kutakayin,
      drosh: h.drosh,
      aha: h.aha,
      pahumner: h.pahumner,
      zutTarekan: h.zut * 12,
    };
  },
  resultado: [
    { clave: "zut", etiqueta: "Զուտ աշխատավարձ ամսական", formato: "moneda", decimales: 0, destacada: true },
    { clave: "yekamtayin", etiqueta: "Եկամտային հարկ", formato: "moneda", decimales: 0 },
    { clave: "kutakayin", etiqueta: "Կուտակային սոցիալական վճար", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "drosh", etiqueta: "Դրոշմանիշային վճար", formato: "moneda", decimales: 0 },
    { clave: "aha", etiqueta: "Առողջության ապահովագրավճար", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "pahumner", etiqueta: "Պահումներն ընդամենը", formato: "moneda", decimales: 0 },
    { clave: "zutTarekan", etiqueta: "Զուտ աշխատավարձ տարեկան", formato: "moneda", decimales: 0 },
  ],
  mundo: {
    bruto: "ashkhatavardz",
    periodoBruto: "mes",
    neto: "zut",
    periodoNeto: "mes",
    entrada: { kutakayin: true, pahvum: true },
  },
});
