import { cifrasBn } from "../../../i18n/bengali";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoBn: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "মাইল" : "কিলোমিটার";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "দৌড়ের গতি ক্যালকুলেটর",
    title: tituloQueEntre(`রানিং পেস ক্যালকুলেটর | ${ctx.nombrePais}`, "দৌড়ের গতি ক্যালকুলেটর"),
    description: `প্রতি ${u}ে আপনার গতি, দৌড় শেষ করার সময় বা দূরত্ব বের করুন। ৫ ও ১০ কিলোমিটার, হাফ ম্যারাথন আর ম্যারাথনের জন্য।`,
    intro: [
      "দূরত্ব, সময় আর গতি, এই তিনটির যেকোনো দুটি দিলে তৃতীয়টি পাবেন। দৌড়ের পরিকল্পনা বা অনুশীলনের হিসাব মেলাতে এটি কাজে লাগে।",
      "৫ কিলোমিটার, ১০ কিলোমিটার, হাফ ম্যারাথন আর ম্যারাথনের দূরত্ব আগে থেকেই দেওয়া আছে।",
    ],
    comoSeCalcula: [
      `গতি = সময় ÷ দূরত্ব, প্রতি ${u}ে মিনিট আর সেকেন্ডে।`,
      "সময় = গতি × দূরত্ব।",
      "দূরত্ব = সময় ÷ গতি। গড় বেগ হলো দূরত্বকে ঘণ্টা দিয়ে ভাগ করলে যা আসে।",
    ],
    ejemplo: imperial
      ? [
          `${n(3)} মাইল ${n(27)} মিনিটে দৌড়ালে গতি প্রতি মাইলে ${cifrasBn("9:00")}, বেগ ঘণ্টায় ${n(20 / 3, 2)} মাইল।`,
          `হাফ ম্যারাথন (${n(media, 2)} মাইল) প্রতি মাইলে ${cifrasBn(ritmoTexto(ritmoMedia))} গতিতে দৌড়ালে শেষ হয় ${cifrasBn(reloj(ritmoMedia * media))} সময়ে।`,
        ]
      : [
          `${n(10)} কিলোমিটার ${n(50)} মিনিটে দৌড়ালে গতি প্রতি কিলোমিটারে ${cifrasBn("5:00")}, বেগ ঘণ্টায় ${n(12)} কিলোমিটার।`,
          `হাফ ম্যারাথন (${n(media, 1)} কিলোমিটার) প্রতি কিলোমিটারে ${cifrasBn(ritmoTexto(ritmoMedia))} গতিতে দৌড়ালে শেষ হয় ${cifrasBn(reloj(ritmoMedia * media))} সময়ে।`,
        ],
    faq: [
      {
        pregunta: `প্রতি ${u}ে আমার গতি কীভাবে বের করব?`,
        respuesta: imperial
          ? `সময়কে মিনিটে নিয়ে মাইল দিয়ে ভাগ করুন। ${n(3)} মাইল ${n(28)} মিনিট ${n(30)} সেকেন্ডে দৌড়ালে প্রতি মাইলে ${n(9.5, 1)} মিনিট, অর্থাৎ ${cifrasBn("9:30")}।`
          : `সময়কে মিনিটে নিয়ে কিলোমিটার দিয়ে ভাগ করুন। ${n(10)} কিলোমিটার ${n(55)} মিনিটে দৌড়ালে প্রতি কিলোমিটারে ${n(5.5, 1)} মিনিট, অর্থাৎ ${cifrasBn("5:30")}।`,
      },
      {
        pregunta: "নতুনদের জন্য ভালো গতি কত?",
        respuesta: "যে গতিতে দৌড়ানোর সময়ও কথা বলতে পারেন, সেটিই শুরুতে ভালো। শরীরের সক্ষমতা বাড়লে গতি এমনিতেই বাড়বে।",
      },
      {
        pregunta: "ম্যারাথন কত কিলোমিটার?",
        respuesta: `${n(DISTANCIAS_KM.maraton, 3)} কিলোমিটার (${n(DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} মাইল)। হাফ ম্যারাথন তার অর্ধেক।`,
      },
    ],
    glosario: [
      { termino: "গতি (পেস)", definicion: "এক কিলোমিটার বা এক মাইল পার হতে যত সময় লাগে।" },
      { termino: "গড় বেগ", definicion: "প্রতি ঘণ্টায় যত দূরত্ব পার হওয়া যায়।" },
    ],
  };
};
