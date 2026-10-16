import { contenidoPorEscritura } from "../../comun/chino";
import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

const FUM = "2026-03-05";
const V = ventana(aDia(FUM), 28);

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const f = (iso: string) => fechaLarga(ctx.locale, iso);
    return {
      h1: "排卵日計算機",
      title: tituloQueEntre(`排卵日計算機｜${ctx.nombrePais}`, "排卵日計算機"),
      description: "算出排卵日、易孕期和下次月經的日期，還會一併列出接下來三個週期，方便提前規劃。",
      intro: ["填入最後一次月經的第一天和週期長度，就能看到推估排卵日、易孕期和下次月經。", "這是給週期規律者的估計值。它不是避孕方法，也不能取代醫師等專業人員的建議。"],
      comoSeCalcula: [
        `排卵通常發生在下次月經前 ${FASE_LUTEA} 天：最後一次月經第一天 ＋ 週期天數 − ${FASE_LUTEA}。`,
        "精子最多可存活約 5 天，所以易孕期從排卵前 5 天到排卵後 1 天。",
        "下次月經預計在上次月經的一個週期之後。",
      ],
      ejemplo: [
        `最後一次月經在${f(FUM)}、週期 28 天，推估排卵日是${f(aFecha(V.ovulacion))}。`,
        `易孕期從${f(aFecha(V.desde))}到${f(aFecha(V.hasta))}，下次月經預計在${f(aFecha(V.proxima))}。`,
      ],
      faq: [
        { pregunta: "哪幾天最容易懷孕？", respuesta: "排卵前兩三天和排卵當天。整個易孕期大約 6 天。" },
        { pregunta: "週期不規律也能用嗎？", respuesta: "可以參考，但準確度較低。週期不規律時，排卵日每個月可能前後差好幾天。" },
        { pregunta: "可以用來避孕嗎？", respuesta: "不行。這只是大概的估計，排卵也可能提早或延後。想避免懷孕，請使用避孕方法。" },
      ],
      glosario: [
        { termino: "排卵", definicion: "卵巢釋出卵子的過程。" },
        { termino: "易孕期", definicion: "週期中有可能懷孕的日子。" },
      ],
    };
  },
  (ctx) => {
    const f = (iso: string) => fechaLarga(ctx.locale, iso);
    return {
      h1: "排卵日计算器",
      title: tituloQueEntre(`排卵日计算器｜${ctx.nombrePais}`, "排卵日计算器"),
      description: "算出排卵日、易孕期和下次月经的日期，还会一并列出接下来三个周期，方便提前规划。",
      intro: ["填入末次月经的第一天和周期长度，就能看到推算排卵日、易孕期和下次月经。", "这是给周期规律者的估计值。它不是避孕方法，也不能代替医生等专业人员的建议。"],
      comoSeCalcula: [
        `排卵通常发生在下次月经前 ${FASE_LUTEA} 天：末次月经第一天 ＋ 周期天数 − ${FASE_LUTEA}。`,
        "精子最多可存活约 5 天，所以易孕期从排卵前 5 天到排卵后 1 天。",
        "下次月经预计在上次月经的一个周期之后。",
      ],
      ejemplo: [
        `末次月经在${f(FUM)}、周期 28 天，推算排卵日是${f(aFecha(V.ovulacion))}。`,
        `易孕期从${f(aFecha(V.desde))}到${f(aFecha(V.hasta))}，下次月经预计在${f(aFecha(V.proxima))}。`,
      ],
      faq: [
        { pregunta: "哪几天最容易怀孕？", respuesta: "排卵前两三天和排卵当天。整个易孕期大约 6 天。" },
        { pregunta: "周期不规律也能用吗？", respuesta: "可以参考，但准确度较低。周期不规律时，排卵日每个月可能前后差好几天。" },
        { pregunta: "可以用来避孕吗？", respuesta: "不行。这只是大概的估计，排卵也可能提前或推迟。想避免怀孕，请使用避孕措施。" },
      ],
      glosario: [
        { termino: "排卵", definicion: "卵巢释放卵子的过程。" },
        { termino: "易孕期", definicion: "周期中有可能怀孕的日子。" },
      ],
    };
  },
);
