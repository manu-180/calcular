import { GRAMATICA } from "../../../i18n/gramatica";
import { conteoMn } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoMn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  const meses = (n: number) => conteoMn(n, "сар");
  const g = GRAMATICA.mn;
  return {
    h1: "Кредит картын төлбөрийн тооцоолуур",
    title: tituloQueEntre(`${g.en(ctx.nombrePais)} кредит картын төлбөр`, "Кредит картын төлбөрийн тооцоолуур", "Кредит картын төлбөр"),
    description: "Кредит картаа хэдэн сард төлж дуусгах, хэдий хэмжээний хүү төлөхийг тогтмол эсвэл хамгийн бага төлбөрөөр тооцоолно уу.",
    intro: [
      "Кредит карт ихэвчлэн хамгийн өндөр өртөгтэй өр байдаг. Зөвхөн хамгийн бага төлбөр төлбөл төлж дуусах хугацаа хэдэн жилээр сунаж, хүү хуримтлагдана.",
      "Өр, жилийн хүү, сард төлж чадах дүнгээ оруулна уу. Хэзээ төлж дуусах, хэдий хэмжээний хүү төлөх, сарын төлөвлөгөө харагдана.",
    ],
    comoSeCalcula: [
      "Сар бүр хүү тооцно: өр × жилийн хүү ÷ 12.",
      "Дараа нь төлбөрийг хасна. Хамгийн бага төлбөр нь өрийн тодорхой хувь бөгөөд доод хязгаартай.",
      "Өр тэг болтол үүнийг давтана. Төлбөр хүүгээс их биш бол өр хэзээ ч буурахгүй.",
    ],
    ejemplo: [
      `${m(saldo)} өрийг жилийн 22 хувийн хүүтэй, сард ${m(fijo)} төлбөрөөр төлж дуусгахад ${meses(conFijo.meses)} шаардагдах бөгөөд ${m(conFijo.intereses)} хүү төлнө.`,
      `Зөвхөн 3 хувийн хамгийн бага төлбөр төлбөл төлж дуусгахад ${meses(conMinimo.meses)} шаардагдах бөгөөд хүү ${m(conMinimo.intereses)} болно.`,
    ],
    faq: [
      {
        pregunta: "Зөвхөн хамгийн бага төлбөр төлбөл яах вэ?",
        respuesta:
          "Хамгийн бага төлбөр өртэй хамт буурдаг тул сар бүр бага төлж, өр хэдэн жилээр сунадаг. Боломжтой бол бага зэрэг ч гэсэн илүү тогтмол дүн төлнө үү.",
      },
      {
        pregunta: "Өрөө хэрэглээний зээлд шилжүүлэх үү?",
        respuesta: "Зээлийн хүү картын хүүгээс нэлээд бага бол ихэвчлэн ашигтай. Хоёр хувилбарын нийт хүүг шимтгэлийн хамт харьцуулна уу.",
      },
      {
        pregunta: "Аль картыг эхэлж төлөх вэ?",
        respuesta: "Бүх картад хамгийн бага төлбөрөө төлж, үлдсэн дүнг хамгийн өндөр хүүтэй картад чиглүүлнэ үү. Ингэснээр нийт хамгийн бага хүү төлнө.",
      },
    ],
    glosario: [
      { termino: "Хамгийн бага төлбөр", definicion: "Торгуульгүйгээр сард төлж болох хамгийн бага дүн. Энэ нь өрийг бүрэн барагдуулдаггүй." },
      { termino: "Жилийн хүү", definicion: "Карт дээрх төлөгдөөгүй өрд тооцдог жилийн хүү." },
    ],
  };
};
