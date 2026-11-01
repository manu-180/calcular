import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearCifra(ctx, x, 0);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "ক্রেডিট কার্ডের বকেয়া শোধের ক্যালকুলেটর",
    title: tituloQueEntre(`ক্রেডিট কার্ড বকেয়া ক্যালকুলেটর | ${ctx.nombrePais}`, "ক্রেডিট কার্ড বকেয়া ক্যালকুলেটর"),
    description: "ক্রেডিট কার্ডের বকেয়া শোধ হতে কত মাস লাগবে আর কত সুদ দেবেন, হিসাব করুন। নির্দিষ্ট মাসিক অঙ্ক আর ন্যূনতম পরিশোধ তুলনা করুন।",
    intro: [
      "সাধারণত হাতের ঋণগুলোর মধ্যে ক্রেডিট কার্ডের সুদই সবচেয়ে বেশি। শুধু ন্যূনতম পরিশোধ করলে শোধ চলে বছরের পর বছর, আর সুদ বাড়তেই থাকে।",
      "বকেয়া, বার্ষিক হার আর প্রতি মাসে কত দিতে পারবেন, লিখুন। কবে শোধ হবে, কত সুদ যাবে আর মাসভিত্তিক তালিকা এখানে দেখাবে।",
    ],
    comoSeCalcula: [
      "প্রতি মাসে সুদ যোগ হয়: বকেয়া × বার্ষিক হার ÷ ১২",
      "তারপর পরিশোধের অঙ্ক বাদ যায়। ন্যূনতম পরিশোধে অঙ্কটি বকেয়ার একটি শতাংশ, সঙ্গে একটি সর্বনিম্ন সীমা থাকে।",
      "বকেয়া শূন্য না হওয়া পর্যন্ত এভাবে চলে। পরিশোধ সুদের সমান বা কম হলে ঋণ কমে না।",
    ],
    ejemplo: [
      `${m(saldo)} বকেয়া ২২% বার্ষিক হারে প্রতি মাসে ${m(fijo)} করে দিলে ${n(conFijo.meses)} মাসে শোধ হবে, সুদ যাবে ${m(conFijo.intereses)}।`,
      `শুধু ৩% ন্যূনতম পরিশোধ করলে লাগবে ${n(conMinimo.meses)} মাস, আর সুদ বেড়ে হবে ${m(conMinimo.intereses)}।`,
    ],
    faq: [
      {
        pregunta: "শুধু ন্যূনতম পরিশোধ করলে কী হয়?",
        respuesta: "বকেয়া কমার সঙ্গে ন্যূনতম অঙ্কও কমে, তাই মাসিক চাপ কম মনে হয়, কিন্তু শোধ চলে বছরের পর বছর। সম্ভব হলে একটু বেশি একটি নির্দিষ্ট অঙ্ক দিন।",
      },
      {
        pregunta: "কম সুদের লোন নিয়ে কার্ডের বকেয়া শোধ করা কি ঠিক?",
        respuesta: "লোনের সুদ কার্ডের হারের চেয়ে অনেক কম হলে সাধারণত লাভজনক। ফিসহ মোট সুদ দিয়ে দুটি তুলনা করুন।",
      },
      {
        pregunta: "কয়েকটি কার্ড থাকলে কোনটি আগে শোধ করব?",
        respuesta: "সব কার্ডে ন্যূনতম পরিশোধ করুন, বাকি টাকা দিন সবচেয়ে বেশি সুদের কার্ডে। এতে মোট সুদ সবচেয়ে কম হয়।",
      },
    ],
    glosario: [
      { termino: "ন্যূনতম পরিশোধ", definicion: "খেলাপি না হতে মাসে যত কম দিলেই চলে। শুধু এটি দিলে ঋণ খুব ধীরে কমে।" },
      { termino: "বার্ষিক সুদের হার", definicion: "কার্ড বকেয়ার ওপর বছরে যে হারে সুদ ধরে।" },
    ],
  };
};
