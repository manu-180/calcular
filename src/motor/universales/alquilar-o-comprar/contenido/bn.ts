import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "কেনা" : "ভাড়া থাকা");
  return {
    h1: "বাসা ভাড়া নেবেন, না কিনবেন?",
    title: tituloQueEntre(`ভাড়া না কেনা: তুলনা ক্যালকুলেটর | ${ctx.nombrePais}`, `ভাড়া না কেনা | ${ctx.nombrePais}`, "ভাড়া না কেনা"),
    description: "বাসা ভাড়া নিয়ে থাকা আর কিনে নেওয়াকে আপনার বেছে নেওয়া বছর ধরে তুলনা করুন। কোনটিতে বেশি সম্পদ থাকে, কোন বছর থেকে ও কত পার্থক্যে, তা দেখুন।",
    intro: [
      "শুধু কিস্তি আর ভাড়া পাশাপাশি রাখলে হিসাব পুরো হয় না। যিনি কেনেন তিনি সুদ, মেরামত ও কর দেন, কিন্তু শেষে বাড়িটা তাঁর থাকে। যিনি ভাড়া থাকেন তিনি ডাউন পেমেন্টের টাকা বিনিয়োগে রাখতে পারেন।",
      "এই ক্যালকুলেটর বছর ধরে ধরে সব যোগ করে দেখায় কোন পথে নিট সম্পদ বেশি থাকে।",
    ],
    comoSeCalcula: [
      "কেনা: প্রতি মাসে কিস্তি ও মালিকানার খরচ দিতে হয়। নিট সম্পদ হলো বাড়ির দাম থেকে বাকি ঋণ বাদ দিয়ে যা থাকে।",
      "ভাড়া: ডাউন পেমেন্ট ও আনুষঙ্গিক খরচের টাকা অন্য বিনিয়োগে থাকে, আর ভাড়া প্রতি বছর বাড়ে।",
      "প্রতি মাসে যে পথে খরচ কম, সেখানে বেঁচে যাওয়া টাকা বিনিয়োগ হয়, তাই দুটি পথ একই বাজেটে তুলনা হয়।",
      "শেষে যে পথে নিট সম্পদ বেশি, সেটিই লাভজনক।",
    ],
    ejemplo: [
      `${m(precio)} দামের ফ্ল্যাট ২০% ডাউন পেমেন্ট, ৭% সুদ ও ২৫ বছরের হোম লোনে কেনা আর মাসে ${m(alquiler)} ভাড়ায় থাকা তুলনা করা হলো।`,
      `১০ বছরে ${quien(a10)} ${m(Math.abs(a10.comprar - a10.alquilar))} বেশি লাভজনক। ৩ বছরে ${quien(a3)} ${m(Math.abs(a3.comprar - a3.alquilar))} বেশি লাভজনক।`,
    ],
    faq: [
      {
        pregunta: "ভাড়া দেওয়া কি টাকা নষ্ট করা?",
        respuesta: "সব সময় নয়। যিনি কেনেন তিনিও সুদ, কর ও মেরামতের মতো খরচ দেন, যা আর ফেরত আসে না। আসল প্রশ্ন হলো শেষে কোন পথে কত সম্পদ থাকে।",
      },
      {
        pregunta: "বছরের সংখ্যা বদলালে ফল বদলায় কেন?",
        respuesta: "কেনার শুরুতে বড় খরচ থাকে: আনুষঙ্গিক খরচ আর প্রথম দিকের বেশি সুদ। এগুলো উঠে আসতে সময় লাগে। কয়েক বছরের মধ্যে বাসা বদলানোর পরিকল্পনা থাকলে সাধারণত ভাড়া থাকাই লাভজনক।",
      },
      {
        pregunta: "কোন তথ্য ফলকে সবচেয়ে বেশি বদলায়?",
        respuesta: "দাম ও ভাড়ার অনুপাত, হোম লোনের সুদ এবং দাম বৃদ্ধির হার। দাম বৃদ্ধি আর বিনিয়োগের মুনাফা বদলে দেখুন ফল কতটা নড়ে।",
      },
    ],
    glosario: [
      { termino: "নিট সম্পদ", definicion: "যা কিছু আছে তা থেকে ঋণ বাদ দিলে যা থাকে।" },
      { termino: "দাম বৃদ্ধি", definicion: "বছরে বাড়ির দাম কতটা বাড়ে।" },
      { termino: "সুযোগ ব্যয়", definicion: "ডাউন পেমেন্টের টাকা বিনিয়োগ করলে যে মুনাফা পাওয়া যেত।" },
    ],
  };
};
