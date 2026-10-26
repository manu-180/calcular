import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Vazni 180 lb, boʻyi 5 ft 10 in boʻlgan 35 yoshli erkakning bazal metabolizmi taxminan ${n(basal)} kkal.`,
          `Kam harakat qiladigan bu odam vaznini saqlashi uchun kuniga taxminan ${n(basal * FACTORES.sedentaria)} kkal kerak boʻladi.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Vazni 60 kg, boʻyi 165 cm boʻlgan 30 yoshli ayolning bazal metabolizmi taxminan ${n(basal)} kkal.`,
          `Oʻrtacha faol boʻlgan bu ayol vaznini saqlashi uchun kuniga taxminan ${n(basal * FACTORES.moderada)} kkal kerak boʻladi.`,
        ];
      })();
  return {
    h1: "Kunlik kaloriya ehtiyoji kalkulyatori",
    title: tituloQueEntre(`Kaloriya kalkulyatori: ${ctx.nombrePais}`, "Kunlik kaloriya ehtiyoji kalkulyatori", "Kaloriya kalkulyatori"),
    description: "Yoshingiz, vazningiz, boʻyingiz va faolligingiz boʻyicha kunlik kaloriya sarfini hamda vaznni saqlash, yoʻqotish yoki olish uchun meʼyorni bilib oling.",
    intro: [
      "Maʼlumotlaringiz va jismoniy faolligingizni kiriting. Bazal metabolizmingizni va oddiy kunda sarflaydigan kaloriyangizni koʻrasiz.",
      "Bu taxminiy hisob. U shifokor yoki dietolog maslahatining oʻrnini bosmaydi.",
    ],
    comoSeCalcula: [
      `Bazal metabolizm (Mifflin-St Jeor): 10 × kilogrammdagi vazn + ${n(6.25, 2)} × santimetrdagi boʻy − 5 × yosh. Erkaklarda natijaga 5 qoʻshiladi, ayollarda 161 ayiriladi.`,
      `Vaznni saqlash uchun kaloriya = bazal metabolizm × faollik koeffitsiyenti. Koeffitsiyent ${n(1.2, 1)} (kam harakat) va ${n(1.9, 1)} (juda yuqori faollik) oraligʻida boʻladi.`,
      `Vazn yoʻqotish uchun kunlik kaloriyadan ${DEFICIT} kkal ayiriladi, vazn olish uchun ${SUPERAVIT} kkal qoʻshiladi. Bu meʼyoriy va barqaror oʻzgarish.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Bazal metabolizm nima?",
        respuesta: "Bu tanangiz toʻliq tinch holatda nafas olish, haroratni ushlab turish va aʼzolar ishlashi uchun sarflaydigan energiya.",
      },
      {
        pregunta: "Vazn yoʻqotish uchun kuniga necha kaloriya isteʼmol qilish kerak?",
        respuesta: `Odatiy boshlangʻich nuqta: vaznni saqlash kaloriyasidan kuniga taxminan ${DEFICIT} kkal kam. Aniq miqdorni mutaxassis bilan birga belgilagan maʼqul.`,
      },
      {
        pregunta: "Formula qanchalik aniq?",
        respuesta: "Mifflin-St Jeor eng koʻp qoʻllanadigan formulalardan biri, lekin u oʻrtacha qiymat beradi. Irsiyat, mushak massasi va sogʻliq holati haqiqiy sarfni oʻzgartiradi.",
      },
    ],
    glosario: [
      { termino: "Kaloriya (kkal)", definicion: "Ovqatdagi va tanangiz sarflaydigan energiyaning oʻlchov birligi." },
      { termino: "Bazal metabolizm", definicion: "Tanangiz toʻliq tinch holatda sarflaydigan kaloriya." },
    ],
  };
};
