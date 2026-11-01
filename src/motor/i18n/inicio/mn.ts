import { GRAMATICA } from "../gramatica";
import { conteoMn } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.mn;

// Mongol (ADR 0002, D28): «та» y pedidos en «-на уу»; el país va con GRAMATICA.mn y el sustantivo
// queda en singular detrás de un número («3 баримт бичиг»).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Та ${g.en(pais)} байна`,
    resumen: (calculadoras) => `${calculadoras}, хүчин төгөлдөр албан ёсны утгатай.`,
    ultimoDato: "Сүүлд оруулсан утга",
    ir: (pais) => `${g.de(pais)} тооцоолуур руу очих`,
    otro: "Өөр улс сонгох",
    argentina: "Таны тооцоолуурууд Аргентины албан ёсны мэдээллийн хамт calcular.ar сайтад байна.",
    argentinaIr: "calcular.ar руу очих",
    neutroTitulo: (paises) => `${conteoMn(paises, "улс")}, тус бүр өөрийн хууль, мөнгөн тэмдэгттэй`,
    neutroTexto: "Бид албан ёсны эх сурвалжийг өдөр бүр шалгадаг.",
    neutroIr: "Улсуудыг үзэх",
  },
  selector: {
    buscar: "Улс хайх",
    sinResultados: (q) => `«${q}» гэсэн улс олдсонгүй`,
    ubicacion: "Одоогийн байршил",
    mismaCalculadora: "Ижил тооцоолуур",
    paises: "Улсууд",
  },
  aviso: { mismaCalculadora: (pais) => `${g.de(pais)} мэдээллээр тооцоолох` },
  vivo: {
    titulo: "Автоматаар шинэчлэгддэг албан ёсны мэдээлэл",
    vigilado: "Автомат процесс албан ёсны эх сурвалжийг өдөр бүр шалгадаг. Дүрмийн өөрчлөлт бидний хянасны дараа гарна.",
    sinVigilar: "Утга бүр албан ёсны эх сурвалж, бидний шалгасан огноотой.",
    verificado: "Дүрмийг сүүлд шалгасан",
    automatico: "Сүүлийн автомат утга",
    fuentes: "Албан ёсны эх сурвалж",
    nFuentes: (n) => conteoMn(n, "албан ёсны баримт бичиг"),
    verFuentes: "Эх сурвалжийг үзэх",
    verNovedades: "Шинэчлэлтийг үзэх",
    hoy: "өнөөдөр",
    ayer: "өчигдөр",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Мэдээллийг албан ёсны эх сурвалжтай тулгасан огноо: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: шинэчилсэн ${cuando}, сүүлийн утгын эх сурвалж: ${organismo}.`,
    diario: "Бид албан ёсны эх сурвалжийг өдөр бүр автоматаар шалгадаг.",
    actualizado: "Шинэчилсэн",
  },
  novedades: {
    pildora: "Шинэчлэлт",
    titulo: (pais) => `${g.de(pais)} албан ёсны мэдээлэлд юу өөрчлөгдсөн бэ`,
    acento: "өөрчлөгдсөн өдрөө",
    bajada: "Тооцоолуурт орж буй шинэ утга бүрийг энд бүртгэдэг: юу өөрчлөгдсөн, хэзээнээс мөрдөх, хаанаас ирсэн.",
    ultimoCambio: "Сүүлийн өөрчлөлт",
    revision: "Эх сурвалжийн шалгалт",
    diaria: "Өдөр бүр",
    porNorma: "Шинэ дүрэм гарах бүрт",
    siguiendo: "Бидний хянадаг эх сурвалж",
    masOrganismos: (n) => `бас ${n}`,
    proximos: "Нийтлэгдсэн, удахгүй мөрдөнө",
    proximosTexto: "Аль хэдийн оруулсан, ойрын өдрүүдэд мөрдөж эхлэх албан ёсны утгууд.",
    registro: "Өөрчлөлтийн бүртгэл",
    rss: "RSS-ээр дагах",
    vacio: "Энэ улсад одоогоор бүртгэгдсэн өөрчлөлт алга.",
    etiqueta: { editorial: "Дүрэм", dato: "Шинэ утга", proximo: "Удахгүй", serie: "Автомат", revision: "Шалгалт" },
    rige: (fecha) => `Мөрдөж эхлэх огноо: ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Мөрдөх хугацаа: ${desde}, ${hasta} хүртэл`,
    antes: (valor, fecha) => `Өмнө нь: ${valor} (${fecha})`,
    revisados: (n) => `Албан ёсны эх сурвалжтай тулгасан: ${conteoMn(n, "утга")}`,
    revisadosTexto: (organismos) => `Хүчин төгөлдөр утгуудыг дараах эх сурвалжаар баталгаажуулсан: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Утгыг үзэх" : `${conteoMn(n, "утга")} үзэх`),
    calculadoras: "Ашигладаг тооцоолуур",
    rango: (min, max, zonas) => `${min} хэмжээнээс ${max} хүртэл, бүс нутгаас хамаарна (${conteoMn(zonas, "бүс нутаг")})`,
    tabla: (filas) => `хүснэгт: ${conteoMn(filas, "шатлал")}`,
    valores: (n) => conteoMn(n, "утга"),
    pasosTitulo: "Мэдээллийг хэрхэн шинэчилж байдаг вэ",
    pasos: [
      { titulo: "Байгууллага нийтэлдэг", texto: "Албан ёсны эх сурвалжид эрх зүйн акт, индекс эсвэл валютын ханш гарна." },
      { titulo: "Ашиглахын өмнө шалгадаг", texto: "Индекс, ханш автоматаар ирж, хязгаарын шалгалтаар дамждаг. Дүрмийг албан ёсны баримт бичгийг харж байж оруулдаг." },
      { titulo: "Тооцоолуур шинэчлэгддэг", texto: "Тооцоолуур шинэ утгад шилжиж, өөрчлөлтийг эх сурвалжийн хамт энд бүртгэдэг." },
    ],
    feedTitulo: (pais) => `CalcularYa: ${g.de(pais)} шинэчлэлт`,
    feedSubtitulo: (pais) => `${g.para(pais)} тооцоолууруудын ашигладаг албан ёсны мэдээллийн өөрчлөлт, мөрдөж эхлэх огноо, эх сурвалжийн хамт.`,
  },
};

export const mn: Diccionario<TextosInicio> = { base };
