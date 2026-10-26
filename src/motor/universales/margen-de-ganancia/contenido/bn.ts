import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearCifra(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "লাভের মার্জিন ক্যালকুলেটর",
    title: tituloQueEntre(`লাভ ক্যালকুলেটর | ${ctx.nombrePais}`, "লাভের মার্জিন ক্যালকুলেটর", "লাভ ক্যালকুলেটর"),
    description: "খরচ ও বিক্রয়মূল্য থেকে মার্জিন ও মার্কআপ বের করুন, অথবা যত মার্জিন চান তার জন্য কত দামে বিক্রি করতে হবে দেখুন।",
    intro: [
      "মার্জিন আর মার্কআপ প্রায়ই গুলিয়ে ফেলা হয়, আর এই ভুলে টাকা হারানো যায়। দুটোই একই লাভ মাপে, কিন্তু ভিন্ন ভিত্তির ওপর।",
      "খরচ আর দাম লিখুন, আমরা দুটোই দেখাব। অথবা একটি মার্জিন বেছে নিন, আমরা জানাব কত দাম রাখতে হবে।",
    ],
    comoSeCalcula: [
      "লাভ = বিক্রয়মূল্য − খরচ।",
      "মার্জিন = লাভ ÷ বিক্রয়মূল্য × ১০০।",
      "মার্কআপ = লাভ ÷ খরচ × ১০০।",
      "নির্দিষ্ট মার্জিনের জন্য দাম = খরচ ÷ (১ − মার্জিন ÷ ১০০)।",
    ],
    ejemplo: [
      `${m(costo)} খরচের একটি পণ্য ${m(precio)} দামে বিক্রি করলে লাভ ${m(precio - costo)}: মার্জিন ${p(((precio - costo) / precio) * 100)} আর মার্কআপ ${p(((precio - costo) / costo) * 100)}।`,
      `ওই খরচে ৫০% মার্জিন পেতে হলে বিক্রি করতে হবে ${m(precioConMargen(costo, 50))} দামে। খরচের সঙ্গে ৫০% যোগ করলে মার্জিন হয় মাত্র ${p(100 / 3)}।`,
    ],
    faq: [
      {
        pregunta: "মার্জিন আর মার্কআপের মধ্যে পার্থক্য কী?",
        respuesta: "মার্জিন হলো বিক্রয়মূল্যের ওপর লাভ। মার্কআপ হলো খরচের ওপর লাভ। একই লাভের ক্ষেত্রে মার্কআপের সংখ্যা সবসময় বড় হয়।",
      },
      {
        pregunta: "নির্দিষ্ট মার্জিনের জন্য দাম কীভাবে ঠিক করব?",
        respuesta: `খরচকে (১ − মার্জিন) দিয়ে ভাগ করুন। ৩০% মার্জিনের জন্য খরচকে ${formatearNumero(ctx, 0.7, 2)} দিয়ে ভাগ করুন। খরচের সঙ্গে ৩০% যোগ করবেন না: তাতে যা ভাবছেন তার চেয়ে কম লাভ হবে।`,
      },
      {
        pregunta: "খরচে কি ভ্যাট ধরতে হবে?",
        respuesta: "ক্রেতার কাছ থেকে নেওয়া ভ্যাট বা বিক্রয় কর বাদ দিয়ে খরচ ও দাম লিখুন। নইলে মার্জিন আসলের চেয়ে বড় দেখাবে।",
      },
    ],
    glosario: [
      { termino: "মার্জিন", definicion: "বিক্রয়মূল্যের শতাংশ হিসেবে লাভ।" },
      { termino: "মার্কআপ", definicion: "খরচের শতাংশ হিসেবে লাভ।" },
    ],
  };
};
