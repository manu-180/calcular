import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionBn } from "../../dias-entre-fechas/textos/bn";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "বয়স ক্যালকুলেটর",
    title: tituloQueEntre(`বয়স ক্যালকুলেটর | ${ctx.nombrePais}`, "বয়স ক্যালকুলেটর"),
    description: "জন্মতারিখ থেকে আপনার সঠিক বয়স বছর, মাস ও দিনে বের করুন। জন্মের পর কত দিন হলো আর পরের জন্মদিন কবে, তাও জানুন।",
    intro: [
      "জন্মতারিখ লিখুন, আজকের হিসাবে আপনার সঠিক বয়স মাস, সপ্তাহ আর দিনের হিসাবসহ দেখতে পাবেন।",
      "অন্য কোনো তারিখ দিলে সেই দিনে বয়স কত ছিল বা কত হবে, তাও জেনে নিতে পারেন। চাকরির আবেদনে বয়সসীমা মেলাতে এটি কাজে লাগে।",
    ],
    comoSeCalcula: [
      "জন্মের দিন থেকে হিসাবের তারিখ পর্যন্ত কয়টি মাস পূর্ণ হয়েছে, তা গোনা হয়। ১২ মাসে এক বছর।",
      "শেষ পূর্ণ মাসের পর যে কয়দিন বাকি থাকে, সেটিই বয়সের ‘দিন’।",
      "অধিবর্ষ ৩৬৬ দিনের হিসাবে গোনা হয়।",
    ],
    ejemplo: [
      `${fechaLarga(ctx.locale, nac)} তারিখে জন্ম হলে ${fechaLarga(ctx.locale, ref)} তারিখে বয়স ${duracionBn(Math.floor(meses / 12), meses % 12, dias)}।`,
      `দিনের হিসাবে সেটি ${formatearNumero(ctx, total)} দিন।`,
    ],
    faq: [
      {
        pregunta: "সঠিক বয়স কীভাবে হিসাব করব?",
        respuesta: "প্রথমে কয়টি পূর্ণ বছর হয়েছে তা গুনুন, তারপর শেষ জন্মদিনের পর কয়টি পূর্ণ মাস, আর শেষে বাকি দিনগুলো।",
      },
      {
        pregunta: "২৯ ফেব্রুয়ারি জন্ম হলে কী হয়?",
        respuesta: "অধিবর্ষ না হলে ২৮ ফেব্রুয়ারিকে জন্মদিন ধরে হিসাব করা হয়। কোনো কোনো আইনে ১ মার্চ ধরা হয়।",
      },
      {
        pregunta: "জন্মের পর কত দিন হলো, তা কীভাবে জানব?",
        respuesta: "‘দিনের হিসাবে’ সারিটি দেখুন। এটি জন্মের দিন থেকে হিসাবের তারিখ পর্যন্ত দিনের সংখ্যা, হিসাবের দিনটি বাদে।",
      },
    ],
    glosario: [
      { termino: "পূর্ণ বয়স", definicion: "জন্মের পর যত বছর পুরোপুরি পার হয়েছে, সেই হিসাবের বয়স।" },
      { termino: "অধিবর্ষ", definicion: "যে বছরে ২৯ ফেব্রুয়ারি থাকে, অর্থাৎ ৩৬৬ দিনের বছর। সাধারণত চার বছরে একবার আসে, তবে ১০০ দিয়ে বিভাজ্য কিছু বছর বাদে।" },
    ],
  };
};
