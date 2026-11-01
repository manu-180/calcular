import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { ahaVchar, REQUIERE_ASHKHATAVARDZ, zutAshkhatavardz } from "../lib/ashkhatavardz";

export default definirCalculadora({
  id: "am.gortatui-tsakhs",
  mercado: "am",
  concepto: "costo-empleador",
  slug: "gortatui-tsakhs",
  estado: "publicado",
  requiere: REQUIERE_ASHKHATAVARDZ,
  campos: [
    { id: "ashkhatavardz", tipo: "moneda", etiqueta: "Համախառն ամսական աշխատավարձ", min: 0, porDefecto: 400000 },
    { id: "ashkhatoghner", tipo: "entero", etiqueta: "Աշխատողների թիվը", min: 1, max: 10000, porDefecto: 1 },
    {
      id: "kutakayin",
      tipo: "si-no",
      etiqueta: "Աշխատողը կատարում է կուտակային սոցիալական վճար",
      ayuda: "Պարտադիր է 1974 թվականի հունվարի մեկին և դրանից հետո ծնված աշխատողների համար։",
      porDefecto: true,
    },
    {
      id: "ahaGortatu",
      tipo: "si-no",
      etiqueta: "Գործատուն իր հաշվին վճարում է առողջության ապահովագրավճարը",
      ayuda: "Օրենքը թույլ է տալիս, որ գործատուն վճարի այն ամբողջությամբ կամ մասնակի։ Այս նշումը հաշվարկում է ամբողջական վճարումը։",
      porDefecto: false,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.ashkhatavardz <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ աշխատավարձ։", "ashkhatavardz");
    const h = zutAshkhatavardz(e.ashkhatavardz, { kutakayin: e.kutakayin, aha: !e.ahaGortatu }, v, redondear);
    const ahaIrHashvin = e.ahaGortatu ? ahaVchar(e.ashkhatavardz, v) : 0;
    const mekAshkhatogh = e.ashkhatavardz + ahaIrHashvin;
    const amsakan = mekAshkhatogh * e.ashkhatoghner;
    return {
      amsakan,
      tarekan: amsakan * 12,
      mekAshkhatogh,
      zut: h.zut,
      yekamtayin: h.yekamtayin,
      kutakayin: h.kutakayin,
      drosh: h.drosh,
      aha: h.aha + ahaIrHashvin,
    };
  },
  resultado: [
    { clave: "amsakan", etiqueta: "Գործատուի ծախսն ամսական", formato: "moneda", destacada: true },
    { clave: "tarekan", etiqueta: "Գործատուի ծախսը տարեկան", formato: "moneda" },
    { clave: "mekAshkhatogh", etiqueta: "Մեկ աշխատողի ծախսն ամսական", formato: "moneda" },
    { clave: "zut", etiqueta: "Աշխատողի զուտ աշխատավարձ", formato: "moneda" },
    { clave: "yekamtayin", etiqueta: "Եկամտային հարկ", formato: "moneda" },
    { clave: "kutakayin", etiqueta: "Կուտակային սոցիալական վճար", formato: "moneda", ocultarSiCero: true },
    { clave: "drosh", etiqueta: "Դրոշմանիշային վճար", formato: "moneda" },
    { clave: "aha", etiqueta: "Առողջության ապահովագրավճար", formato: "moneda", ocultarSiCero: true },
  ],
});
