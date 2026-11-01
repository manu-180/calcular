import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoMn: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "миль" : "километр";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const za = GRAMATICA.mn.para(ctx.nombrePais);
  return {
    h1: "Гүйлтийн хэмнэлийн тооцоолуур",
    title: tituloQueEntre(`${za} гүйлтийн хэмнэлийн тооцоолуур`, "Гүйлтийн хэмнэлийн тооцоолуур"),
    description: `Нэг ${u} тутмын гүйлтийн хэмнэл, эцсийн хугацаа эсвэл зайг 5 км, 10 км, хагас марафон, марафоны хувьд тооцоолно уу.`,
    intro: [
      "Зай, хугацаа, хэмнэл гурвын хоёрыг мэдвэл гурав дахийг нь олно. Уралдаанаа төлөвлөх эсвэл бэлтгэлээ шалгахад ашиглана уу.",
      "5 км, 10 км, хагас марафон, марафоны зай урьдчилан оруулагдсан.",
    ],
    comoSeCalcula: [
      `Хэмнэл = хугацаа ÷ зай, ${u} тутмын минут, секундээр.`,
      "Хугацаа = хэмнэл × зай.",
      "Зай = хугацаа ÷ хэмнэл. Дундаж хурд нь зайг цагт хуваасантай тэнцүү.",
    ],
    ejemplo: imperial
      ? [
          `27 минутад 3 миль гүйвэл миль тутмын хэмнэл 9:00, дундаж хурд ${formatearNumero(ctx, 20 / 3, 2)} миль/цаг байна.`,
          `Хагас марафоныг (${formatearNumero(ctx, media, 2)} миль) миль тутамд ${ritmoTexto(ritmoMedia)} хэмнэлээр гүйвэл ${reloj(ritmoMedia * media)} хугацаанд барианд орно.`,
        ]
      : [
          "50 минутад 10 км гүйвэл километр тутмын хэмнэл 5:00, дундаж хурд 12 км/цаг байна.",
          `Хагас марафоныг (${formatearNumero(ctx, media, 1)} км) километр тутамд ${ritmoTexto(ritmoMedia)} хэмнэлээр гүйвэл ${reloj(ritmoMedia * media)} хугацаанд барианд орно.`,
        ],
    faq: [
      {
        pregunta: `Нэг ${u} тутмын хэмнэлээ хэрхэн тооцоолох вэ?`,
        respuesta: imperial
          ? `Хугацааг минут болгоод милийн тоонд хуваана уу. 28 минут 30 секундэд 3 миль гүйвэл миль тутамд ${formatearNumero(ctx, 9.5, 1)} минут, өөрөөр хэлбэл 9:30 байна.`
          : `Хугацааг минут болгоод километрийн тоонд хуваана уу. 55 минутад 10 км гүйвэл километр тутамд ${formatearNumero(ctx, 5.5, 1)} минут, өөрөөр хэлбэл 5:30 байна.`,
      },
      {
        pregunta: "Эхлэн суралцагчид ямар хэмнэл тохиромжтой вэ?",
        respuesta: "Гүйж байхдаа ярьж чадах хэмнэл тохиромжтой. Бие бялдар сайжрах тусам энэ хэмнэл хурдсана.",
      },
      {
        pregunta: "Марафон хэдэн километр вэ?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} км (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} миль). Хагас марафон нь үүний тал юм.`,
      },
    ],
    glosario: [
      { termino: "Хэмнэл", definicion: "Нэг километр эсвэл нэг миль гүйхэд шаардагдах хугацаа." },
      { termino: "Дундаж хурд", definicion: "Нэг цагт туулсан зай." },
    ],
  };
};
