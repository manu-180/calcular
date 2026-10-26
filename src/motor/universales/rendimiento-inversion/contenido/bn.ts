import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearCifra(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "ROI ক্যালকুলেটর",
    title: tituloQueEntre(`ROI ও CAGR ক্যালকুলেটর | ${ctx.nombrePais}`, `ROI ক্যালকুলেটর | ${ctx.nombrePais}`, "ROI ও CAGR ক্যালকুলেটর"),
    description: "কত বিনিয়োগ করেছেন, এখন তার মূল্য কত আর কত বছর গেছে, তা থেকে বিনিয়োগের মোট রিটার্ন (ROI) ও বার্ষিক রিটার্ন (CAGR) বের করুন।",
    intro: [
      "৫০% মুনাফা শুনতে ভালো লাগে, কিন্তু ২ বছরে আর ১০ বছরে সেটি এক কথা নয়। বিভিন্ন বিনিয়োগ তুলনা করতে হলে বছরপ্রতি রিটার্ন জানা দরকার।",
      "কত বিনিয়োগ করেছেন, আজ তার মূল্য কত আর কত বছর পেরিয়েছে, লিখুন। আমরা মোট রিটার্ন আর চক্রবৃদ্ধি বার্ষিক রিটার্ন দেখাব।",
    ],
    comoSeCalcula: [
      "ROI = (শেষ মূল্য + মাঝপথে পাওয়া আয় − বিনিয়োগ) ÷ বিনিয়োগ × ১০০।",
      "CAGR = ((শেষ মূল্য + মাঝপথে পাওয়া আয়) ÷ বিনিয়োগ) এর (১ ÷ বছর) ঘাত, তারপর − ১।",
      "CAGR হলো চক্রবৃদ্ধি বার্ষিক হার: প্রতি বছর একই হার চললে যে হার একই ফল দেয়।",
    ],
    ejemplo: [
      `${m(inicial)} বিনিয়োগ করে শেষে ${m(final)} হলে মুনাফা ${m(final - inicial)}, অর্থাৎ ROI ${p(roi(inicial, final))}।`,
      `এতে ৫ বছর লাগলে বার্ষিক রিটার্ন ${p(cagr(inicial, final, 5))}। ২ বছর লাগলে ${p(cagr(inicial, final, 2))}।`,
    ],
    faq: [
      {
        pregunta: "ROI আর CAGR এর মধ্যে পার্থক্য কী?",
        respuesta: "ROI হলো বিনিয়োগের ওপর মোট মুনাফা, সময় যতই লাগুক। CAGR সেটিকে বছরপ্রতি ভাগ করে দেখায়, তাই ভিন্ন মেয়াদের বিনিয়োগ তুলনা করা যায়।",
      },
      {
        pregunta: "বার্ষিক রিটার্ন কেন মোট রিটার্নকে বছর দিয়ে ভাগ করলেই হয় না?",
        respuesta: `কারণ প্রতি বছরের মুনাফা মূলধনের সঙ্গে যোগ হয় এবং সেটিও আয় করে। ৫ বছরে ৫০% মুনাফা মানে বছরে চক্রবৃদ্ধি হারে ${p(cagr(1, 1.5, 5))}, ১০% নয়।`,
      },
      {
        pregunta: "পাওয়া লভ্যাংশ বা সুদ কীভাবে ধরব?",
        respuesta: "তুলে নিয়ে থাকলে ‘মাঝপথে পাওয়া আয়’ ঘরে যোগ করুন। আবার বিনিয়োগ করে থাকলে সেটি শেষ মূল্যের মধ্যেই আছে।",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "বিনিয়োগে রিটার্ন: বিনিয়োগ করা টাকার শতাংশ হিসেবে মোট মুনাফা।" },
      { termino: "CAGR", definicion: "চক্রবৃদ্ধি বার্ষিক বৃদ্ধির হার: চক্রবৃদ্ধি ধরে বছরপ্রতি গড় রিটার্ন।" },
    ],
  };
};
