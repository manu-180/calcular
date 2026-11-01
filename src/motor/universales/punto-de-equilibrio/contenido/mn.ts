import { GRAMATICA } from "../../../i18n/gramatica";
import { conteoMn } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoMn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  const g = GRAMATICA.mn;
  const nejgiin = (n: number) => conteoMn(formatearNumero(ctx, n), "нэгж");
  return {
    h1: "Алдагдалгүй ажиллах цэгийн тооцоолуур",
    title: tituloQueEntre(`${g.para(ctx.nombrePais)} алдагдалгүй ажиллах цэг`, "Алдагдалгүй ажиллах цэгийн тооцоолуур", "Алдагдалгүй ажиллах цэг"),
    description: "Зардлаа нөхөж, хүссэн ашигтаа хүрэхийн тулд сард хэдэн нэгж зарж, хэдий хэмжээний орлого олох ёстойг тооцоолно уу.",
    intro: [
      "Алдагдалгүй ажиллах цэг гэдэг нь бизнес ашиг ч, алдагдал ч гаргахгүй байх борлуулалтын хэмжээ юм. Түүнээс доош алдагдалтай, дээш ашигтай ажиллана.",
      "Тогтмол зардал, үнэ, нэгжийн зардлаа оруулна уу. Зардлаа нөхөж, зорилгодоо хүрэхэд хэр их зарах ёстой нь харагдана.",
    ],
    comoSeCalcula: [
      "Нэгжийн хувь нэмэр = үнэ − нэгжийн хувьсах зардал.",
      "Алдагдалгүй ажиллах нэгжийн тоо = тогтмол зардал ÷ нэгжийн хувь нэмэр (дээш бүхэлчилнэ).",
      "Алдагдалгүй ажиллах орлого = тогтмол зардал ÷ (нэгжийн хувь нэмэр ÷ үнэ).",
      "Хүссэн ашгаа тогтмол зардал дээр нэмбэл тооцоо хэвээрээ байна.",
    ],
    ejemplo: [
      `Тогтмол зардал ${m(fijos)}, үнэ ${m(precio)}, хувьсах зардал ${m(variable)} бол борлуулалт бүрээс ${m(precio - variable)} үлдэнэ.`,
      `Зардлаа нөхөхийн тулд ${nejgiin(base.unidades)} (${m(base.facturacion)}), сард ${m(objetivo)} ашиг олохын тулд ${nejgiin(meta.unidades)} зарах хэрэгтэй.`,
    ],
    faq: [
      {
        pregunta: "Тогтмол болон хувьсах зардал гэж юу вэ?",
        respuesta: "Тогтмол зардал юу ч зараагүй байсан ч өөрчлөгдөхгүй: түрээс, тогтмол цалин, ашиглалтын төлбөр. Хувьсах зардал борлуулалт бүрээр өснө: бараа, материал, шимтгэл, хүргэлт.",
      },
      {
        pregunta: "Алдагдалгүй ажиллах цэгийг хэрхэн бууруулах вэ?",
        respuesta: "Гурван арга бий: үнээ өсгөх, нэгжийн хувьсах зардлаа бууруулах, эсвэл тогтмол зардлаа багасгах. Ихэвчлэн үнэ хамгийн их нөлөөтэй.",
      },
      {
        pregunta: "Үйлчилгээний бизнест тохирох уу?",
        respuesta: "Тийм. Нэг нэгж нь цаг, үйлчилгээний нэг удаа эсвэл сарын нэг үйлчлүүлэгч байж болно. Хувьсах зардалд тус бүрийг үзүүлэхэд гарах зардлаа оруулна уу.",
      },
    ],
    glosario: [
      { termino: "Алдагдалгүй ажиллах цэг", definicion: "Орлого зардалтайгаа тэнцэх борлуулалтын хэмжээ." },
      { termino: "Хувь нэмэр", definicion: "Борлуулалт бүрээс тогтмол зардлыг нөхөхөд үлдэх дүн." },
    ],
  };
};
