import { cifrasBn } from "../../../i18n/bengali";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "মাইল" : "কিলোমিটার";
  return {
    h1: "গাড়ির খরচ ক্যালকুলেটর",
    title: tituloQueEntre(`গাড়ির খরচ ক্যালকুলেটর | ${ctx.nombrePais}`, "গাড়ির খরচ ক্যালকুলেটর"),
    description: `জ্বালানি, বিমা, রক্ষণাবেক্ষণ, পার্কিং আর কমে যাওয়া দাম মিলিয়ে দেখুন আপনার গাড়ির আসল খরচ মাসে, বছরে ও প্রতি ${unidad}ে কত।`,
    intro: [
      "জ্বালানিতে কত যায়, তা প্রায় সবাই জানেন। কিন্তু বিমা, রক্ষণাবেক্ষণ, পার্কিং আর সবচেয়ে বড় খরচ, প্রতি বছর গাড়ির দাম কমে যাওয়া, খুব কম মানুষই যোগ করেন।",
      "আপনার খরচগুলো লিখুন, আমরা দেখাব গাড়িটি আসলে আপনার কত খরচ করায়। গাড়ি কেনা, বদলানো বা অন্যভাবে চলাফেরার সিদ্ধান্ত নিতে এটি কাজে লাগে।",
    ],
    comoSeCalcula: [
      imperial
        ? "মাসে জ্বালানি = মাসে চালানো মাইল ÷ প্রতি গ্যালনে মাইল × প্রতি গ্যালনের দাম।"
        : "মাসে জ্বালানি = মাসে চালানো কিলোমিটার × প্রতি ১০০ কিমিতে লিটার ÷ ১০০ × প্রতি লিটারের দাম।",
      "মাসে দাম কমে = গাড়ির দাম × বছরে দাম কমার হার ÷ ১২।",
      "আসল খরচ = জ্বালানি + বিমা + রক্ষণাবেক্ষণ + পার্কিং + অন্যান্য খরচ + কমে যাওয়া দাম।",
      `প্রতি ${unidad}ে খরচ = মাসের আসল খরচ ÷ মাসে চালানো দূরত্ব।`,
    ],
    ejemplo: [
      `${m(g.precio)} দামের একটি গাড়ি মাসে ${formatearNumero(ctx, g.distancia)} ${imperial ? "মাইল" : "কিমি"} চালালে, কমে যাওয়া দাম ধরে মাসে খরচ হয় ${m(mensual)}।`,
      `অর্থাৎ বছরে ${m(mensual * 12)} এবং প্রতি ${unidad}ে ${formatearMonto(ctx, mensual / g.distancia)}। বছরে দাম কমার হার ধরা হয়েছে ${cifrasBn(g.depreciacion)}%।`,
    ],
    faq: [
      {
        pregunta: "গাড়ির অবচয় বা দাম কমে যাওয়া বলতে কী বোঝায়?",
        respuesta: "সময় আর ব্যবহারের সঙ্গে গাড়ির দাম যতটা কমে, সেটাই অবচয়। এটি প্রতি মাসে হাতে দিতে হয় না, কিন্তু বিক্রির সময় টের পাওয়া যায়। নতুন গাড়ির ক্ষেত্রে এটিই প্রায়ই সবচেয়ে বড় খরচ।",
      },
      {
        pregunta: "ঋণের কিস্তি কেন যোগ করা হয় না?",
        respuesta: "কিস্তির একটি অংশ গাড়ির দামই শোধ করে, যা কমে যাওয়া মূল্য হিসেবে আগেই ধরা আছে। দুটোই যোগ করলে গাড়ির দাম দুবার গোনা হতো। ঋণের সুদ এর বাইরে আলাদা খরচ।",
      },
      {
        pregunta: "গাড়ির খরচ কীভাবে কমাব?",
        respuesta: "প্রতি বছর বিমার দর তুলনা করুন, টায়ারের চাপ আর সার্ভিসিং ঠিক রাখুন, এবং ঘন ঘন গাড়ি বদলাবেন না: প্রথম কয়েক বছরেই গাড়ির দাম সবচেয়ে বেশি কমে।",
      },
    ],
    glosario: [
      { termino: "অবচয়", definicion: "সময় আর ব্যবহারের সঙ্গে গাড়ির যে দাম কমে।" },
      { termino: `প্রতি ${unidad}ে খরচ`, definicion: `সব খরচ মিলিয়ে প্রতি ${unidad} চালাতে গড়ে যত খরচ হয়।` },
    ],
  };
};
