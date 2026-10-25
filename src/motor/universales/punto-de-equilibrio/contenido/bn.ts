import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "ব্রেক-ইভেন ক্যালকুলেটর",
    title: tituloQueEntre(`ব্রেক-ইভেন ক্যালকুলেটর | ${ctx.nombrePais}`, "ব্রেক-ইভেন ক্যালকুলেটর"),
    description: "খরচ উঠাতে আর লক্ষ্য মুনাফায় পৌঁছাতে প্রতি মাসে কত ইউনিট ও কত টাকার বিক্রি দরকার, তা হিসাব করুন।",
    intro: [
      "ব্রেক-ইভেন পয়েন্ট হলো বিক্রির সেই মাত্রা, যেখানে ব্যবসায় লাভও হয় না, লোকসানও হয় না। এর নিচে লোকসান, এর ওপরে লাভ শুরু।",
      "স্থায়ী খরচ, দাম আর প্রতিটি ইউনিটের খরচ লিখুন। খরচ উঠাতে আর লক্ষ্যে পৌঁছাতে কত বিক্রি করতে হবে, আমরা জানাব।",
    ],
    comoSeCalcula: [
      "অবদান মার্জিন = দাম − প্রতি ইউনিটের পরিবর্তনশীল খরচ।",
      "ব্রেক-ইভেন ইউনিট = স্থায়ী খরচ ÷ অবদান মার্জিন, ওপরের দিকে গোল করে।",
      "ব্রেক-ইভেন বিক্রি = স্থায়ী খরচ ÷ (অবদান মার্জিন ÷ দাম)।",
      "লক্ষ্য মুনাফার জন্য সেটি স্থায়ী খরচের সঙ্গে যোগ করে একই হিসাব করুন।",
    ],
    ejemplo: [
      `স্থায়ী খরচ ${m(fijos)}, দাম ${m(precio)} আর পরিবর্তনশীল খরচ ${m(variable)} হলে প্রতিটি বিক্রি রেখে যায় ${m(precio - variable)}।`,
      `খরচ উঠাতে বিক্রি করতে হবে ${formatearNumero(ctx, base.unidades)} ইউনিট (${m(base.facturacion)}), আর মাসে ${m(objetivo)} মুনাফার জন্য ${formatearNumero(ctx, meta.unidades)} ইউনিট।`,
    ],
    faq: [
      {
        pregunta: "স্থায়ী খরচ আর পরিবর্তনশীল খরচ কী?",
        respuesta: "স্থায়ী খরচ কিছু বিক্রি না হলেও একই থাকে: ভাড়া, স্থায়ী বেতন, বিল। পরিবর্তনশীল খরচ প্রতিটি বিক্রির সঙ্গে বাড়ে: মাল কেনা, কাঁচামাল, কমিশন, ডেলিভারি।",
      },
      {
        pregunta: "ব্রেক-ইভেন পয়েন্ট কীভাবে কমাব?",
        respuesta: "তিনটি উপায় আছে: দাম বাড়ানো, প্রতি ইউনিটের পরিবর্তনশীল খরচ কমানো, অথবা স্থায়ী খরচ ছাঁটা। সাধারণত দামেই সবচেয়ে বেশি পার্থক্য হয়।",
      },
      {
        pregunta: "সেবাভিত্তিক ব্যবসায় কি এটি কাজে লাগে?",
        respuesta: "হ্যাঁ। এক ঘণ্টা, একটি সেশন বা মাসে একজন ক্লায়েন্টকে একটি ইউনিট ধরা যায়। প্রতিটি সেবা দিতে যা খরচ হয়, সেটিকে পরিবর্তনশীল খরচ হিসেবে লিখুন।",
      },
    ],
    glosario: [
      { termino: "ব্রেক-ইভেন পয়েন্ট", definicion: "বিক্রির যে মাত্রায় আয় আর খরচ সমান হয়।" },
      { termino: "অবদান মার্জিন", definicion: "প্রতিটি বিক্রি স্থায়ী খরচ মেটাতে যা রেখে যায়।" },
    ],
  };
};
