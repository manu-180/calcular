import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoMn: ContenidoUniversal = (ctx) => {
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
  const unidad = imperial ? "миль" : "километр";
  const unidadTitulo = imperial ? "Миль" : "Километр";
  return {
    h1: "Машины зардлын тооцоолуур",
    title: tituloQueEntre(
      `${GRAMATICA.mn.para(ctx.nombrePais)} машины зардлын тооцоолуур`,
      `Машины зардал: ${ctx.nombrePais}`,
      "Машины зардлын тооцоолуур",
    ),
    description: `Машин тань сард, жилд, ${unidad} тутамд хэдэн мөнгө зарцуулдгийг тооцоолно уу: шатахуун, даатгал, засвар үйлчилгээ, зогсоол, үнэ цэнийн алдагдал.`,
    intro: [
      "Ихэнх хүн шатахуунд хэдэн мөнгө зарцуулдгаа мэддэг. Харин даатгал, засвар үйлчилгээ, зогсоол, ялангуяа машин жил бүр алддаг үнэ цэнийг цөөхөн хүн нэгтгэж тооцдог.",
      "Зардлаа бөглөвөл машин танд бодитоор хэдэн мөнгө зарцуулуулдгийг харна. Энэ нь машин худалдан авах, солих, эсвэл өөр аргаар зорчих эсэхээ шийдэхэд тусална.",
    ],
    comoSeCalcula: [
      imperial
        ? "Сарын шатахуун = сард явах миль ÷ галлон тутамд миль × нэг галлоны үнэ."
        : "Сарын шатахуун = сард явах километр × 100 km тутамд литр ÷ 100 × нэг литрийн үнэ.",
      "Сарын үнэ цэнийн алдагдал = машины үнэ цэнэ × жилийн алдагдал ÷ 12.",
      "Бодит зардал = шатахуун + даатгал + засвар үйлчилгээ + зогсоол + бусад зардал + үнэ цэнийн алдагдал.",
      `${unidadTitulo} тутмын зардал = сарын бодит зардал ÷ сард явсан зай.`,
    ],
    ejemplo: [
      `${m(g.precio)} үнэтэй, сард ${formatearNumero(ctx, g.distancia)} ${imperial ? "миль" : "km"} явдаг машин үнэ цэнийн алдагдлыг оруулаад сард ${m(mensual)} зардалтай.`,
      `Энэ нь жилд ${m(mensual * 12)}, ${unidad} тутамд ${formatearMonto(ctx, mensual / g.distancia)} болно.`,
    ],
    faq: [
      {
        pregunta: "Машины элэгдэл гэж юу вэ?",
        respuesta: "Машин цаг хугацааны явцад алддаг үнэ цэнэ юм. Сар бүр төлдөггүй ч зарах үедээ мэдэрдэг. Шинэ машины хувьд ихэвчлэн хамгийн том зардал байдаг.",
      },
      {
        pregunta: "Зээлийн төлбөрийг яагаад нэмдэггүй вэ?",
        respuesta:
          "Зээлийн төлбөрийн нэг хэсгээр машинаа төлж байгаа бөгөөд энэ нь үнэ цэнийн алдагдалд аль хэдийн тооцогдсон. Хоёуланг нь нэмбэл машиныг хоёр удаа тоолно. Зээлийн хүү нь нэмэлт зардал юм.",
      },
      {
        pregunta: "Машины зардлаа хэрхэн бууруулах вэ?",
        respuesta:
          "Даатгалын компаниудыг жил бүр харьцуулж, дугуйн даралт болон тогтмол үйлчилгээг хянаж, машинаа ойр ойрхон солихгүй байхыг зөвлөж байна: машин эхний жилүүдэд үнэ цэнээ хамгийн их алддаг.",
      },
    ],
    glosario: [
      { termino: "Элэгдэл", definicion: "Машин цаг хугацаа, ашиглалтын явцад алддаг үнэ цэнэ." },
      { termino: `${unidadTitulo} тутмын зардал`, definicion: `Бүх зардлыг оруулсан, явсан ${unidad} бүрийн дундаж зардал.` },
    ],
  };
};
