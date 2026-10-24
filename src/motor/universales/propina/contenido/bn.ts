import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "টিপস ক্যালকুলেটর",
    title: tituloQueEntre(`টিপস ক্যালকুলেটর | ${ctx.nombrePais}`, "টিপস ক্যালকুলেটর"),
    description: "টিপস কত হবে, টিপসসহ মোট বিল কত আর ভাগ করলে জনপ্রতি কত পড়ে, তা হিসাব করুন। চাইলে গোল অঙ্কেও নিতে পারেন।",
    intro: [
      "বিলের পরিমাণ, টিপসের হার আর কতজন মিলে দেবেন তা লিখুন। টিপস, মোট বিল আর জনপ্রতি ভাগ দেখে নিন।",
      "গোল অঙ্কে দিতে চাইলে জনপ্রতি অঙ্কটি বাড়িয়ে নিন, বাড়তি অংশটুকু টিপসে যোগ হবে।",
    ],
    comoSeCalcula: ["টিপস = বিল × টিপসের হার ÷ ১০০", "মোট = বিল + টিপস", "জনপ্রতি = মোট ÷ জনসংখ্যা"],
    ejemplo: [
      `${m(cuenta)} বিলের ওপর ১৫% টিপস দিলে যোগ হয় ${m(propina)}, মোট দাঁড়ায় ${m(cuenta + propina)}।`,
      `তিনজনে ভাগ করলে জনপ্রতি পড়ে ${m((cuenta + propina) / 3)}।`,
    ],
    faq: [
      {
        pregunta: "কত টিপস দেওয়া উচিত?",
        respuesta: `এটি স্থানীয় রীতির ওপর নির্ভর করে। ${GRAMATICA.bn.en(ctx.nombrePais)} সাধারণত কী চলে আর বিলে আগে থেকেই সার্ভিস চার্জ ধরা আছে কি না, দেখে নিন।`,
      },
      {
        pregunta: "টিপস ভ্যাটসহ বিলের ওপর, নাকি ভ্যাট ছাড়া?",
        respuesta: "বেশিরভাগ মানুষ বিলে লেখা মোট অঙ্কের ওপর টিপস দেন। ভ্যাট ছাড়া অঙ্কের ওপর দিতে চাইলে সেই অঙ্কটিই লিখুন।",
      },
      {
        pregunta: "১৫% টিপস মুখে মুখে কীভাবে হিসাব করব?",
        respuesta: "বিলকে ১০ দিয়ে ভাগ করে ১০% বের করুন, তারপর তার অর্ধেক যোগ করুন। ৪০ হলে ৪ আর ২, মোট ৬।",
      },
    ],
    glosario: [
      { termino: "টিপস", definicion: "সেবার জন্য খুশি হয়ে বিলের বাইরে যে অঙ্ক দেওয়া হয়।" },
      { termino: "সার্ভিস চার্জ", definicion: "সেবার জন্য দোকান বা রেস্তোরাঁ আগেই বিলে যে খরচ যোগ করে রাখে।" },
    ],
  };
};
