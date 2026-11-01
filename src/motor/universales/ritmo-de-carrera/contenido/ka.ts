import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoKa: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const unidad = imperial ? "ერთ მილზე" : "ერთ კილომეტრზე";
  const corto = imperial ? "მილი" : "კმ";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const millasMaraton = DISTANCIAS_KM.maraton / KM_POR_MILLA;
  return {
    h1: "სირბილის ტემპის კალკულატორი",
    title: tituloQueEntre(`სირბილის ტემპის კალკულატორი: ${ctx.nombrePais}`, `სირბილის ტემპის კალკულატორი: წთ/${corto}`, "სირბილის ტემპის კალკულატორი"),
    description: `გამოთვალეთ ტემპი (წთ/${corto}), სასურველი დრო ან მანძილი 5 და 10 კმ რბოლისთვის, ნახევარმარათონისა და მარათონისთვის.`,
    intro: [
      "სამი მონაცემიდან (მანძილი, დრო და ტემპი) ორის მიხედვით მიიღებთ მესამეს. გამოგადგებათ რბოლის დასაგეგმად ან ვარჯიშის შესამოწმებლად.",
      "5 და 10 კილომეტრის მანძილი, ნახევარმარათონი და მარათონი უკვე სიაშია.",
    ],
    comoSeCalcula: [
      `ტემპი = დრო ÷ მანძილი, წუთებში და წამებში, ${unidad}.`,
      "დრო = ტემპი × მანძილი.",
      "მანძილი = დრო ÷ ტემპი. საშუალო სიჩქარე არის მანძილი გაყოფილი საათების რაოდენობაზე.",
    ],
    ejemplo: imperial
      ? [
          `3 მილი 27 წუთში: ტემპია 9:00 წთ/მილი, სიჩქარე კი ${formatearNumero(ctx, 20 / 3, 2)} მილი/სთ.`,
          `ნახევარმარათონს (${formatearNumero(ctx, media, 2)} მილი) ${ritmoTexto(ritmoMedia)} წთ/მილი ტემპით ამ დროში გაირბენთ: ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 კმ 50 წუთში: ტემპია 5:00 წთ/კმ, სიჩქარე კი 12 კმ/სთ.",
          `ნახევარმარათონს (${formatearNumero(ctx, media, 1)} ${corto}) ${ritmoTexto(ritmoMedia)} წთ/კმ ტემპით ამ დროში გაირბენთ: ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `როგორ გამოვთვალო ტემპი ${unidad}?`,
        respuesta: imperial
          ? `გადაიყვანეთ დრო წუთებში და გაყავით მილების რაოდენობაზე. 3 მილი 28 წუთსა და 30 წამში: ${formatearNumero(ctx, 9.5, 1)} წუთი ერთ მილზე, ანუ 9:30.`
          : `გადაიყვანეთ დრო წუთებში და გაყავით კილომეტრების რაოდენობაზე. 10 კმ 55 წუთში: ${formatearNumero(ctx, 5.5, 1)} წუთი ერთ კილომეტრზე, ანუ 5:30.`,
      },
      {
        pregunta: "რა ტემპია კარგი დამწყებისთვის?",
        respuesta: "ისეთი, რომლის დროსაც სირბილისას საუბარი ჯერ კიდევ შეგიძლიათ. გამძლეობის ზრდასთან ერთად ტემპიც თანდათან უმჯობესდება.",
      },
      {
        pregunta: "რამდენია მარათონის მანძილი?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} კმ (${formatearNumero(ctx, millasMaraton, 1)} მილი). ნახევარმარათონი ამის ნახევარია.`,
      },
    ],
    glosario: [
      { termino: "ტემპი", definicion: "დრო, რომელშიც ერთ კილომეტრს ან ერთ მილს გარბიხართ." },
      { termino: "საშუალო სიჩქარე", definicion: "ერთ საათში გავლილი მანძილი." },
    ],
  };
};
