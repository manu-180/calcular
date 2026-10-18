import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const precio3 = montoEjemplo(ctx, 6);
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "比例計算機",
      title: tituloQueEntre(`比例計算機（正比與反比）｜${ctx.nombrePais}`, `比例計算機｜${ctx.nombrePais}`, "比例計算機"),
      description: "一秒解出正比或反比問題。輸入三個已知數值，就能算出第四個未知數，並附上完整算式。",
      intro: ["當兩個量一起變化，而四個數值中已知三個時，就可以用比例來算。", "選擇正比或反比，填入 A、B、C，計算機就會算出 X。"],
      comoSeCalcula: [
        "正比：X ＝ B × C ÷ A。兩個量一起變大時使用（重量越多，價格越高）。",
        "反比：X ＝ A × B ÷ C。一個變大、另一個變小時使用（人越多，天數越少）。",
      ],
      ejemplo: [`3 公斤 ${m(precio3)}，5 公斤就是 ${m((precio3 * 5) / 3)}。`, "4 個人 12 天能粉刷完一間房子，6 個人只要 8 天。"],
      faq: [
        { pregunta: "怎麼判斷是正比還是反比？", respuesta: "一個量變大時另一個也變大，就是正比；一個變大時另一個變小，就是反比。" },
        { pregunta: "正比要怎麼手算？", respuesta: `把對角的兩個已知數相乘，再除以剩下的那一個。3 對應 600，5 就對應 600 × 5 ÷ 3 ＝ ${formatearNumero(ctx, 1000)}。` },
        { pregunta: "可以用來算百分比嗎？", respuesta: "可以。200 是 100%，50 就是 25%：這是 A ＝ 200、B ＝ 100、C ＝ 50 的正比。" },
      ],
      glosario: [
        { termino: "正比", definicion: "兩個量一起變大或一起變小。" },
        { termino: "反比", definicion: "一個量變大時，另一個量變小。" },
      ],
    };
  },
  (ctx) => {
    const precio3 = montoEjemplo(ctx, 6);
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "比例计算器",
      title: tituloQueEntre(`比例计算器（正比与反比）｜${ctx.nombrePais}`, `比例计算器｜${ctx.nombrePais}`, "比例计算器"),
      description: "一秒解出正比或反比问题。输入三个已知数值，就能算出第四个未知数，并附上完整算式。",
      intro: ["当两个量一起变化，而四个数值中已知三个时，就可以用比例来算。", "选择正比或反比，填入 A、B、C，计算器就会算出 X。"],
      comoSeCalcula: [
        "正比：X ＝ B × C ÷ A。两个量一起变大时使用（重量越多，价格越高）。",
        "反比：X ＝ A × B ÷ C。一个变大、另一个变小时使用（人越多，天数越少）。",
      ],
      ejemplo: [`3 公斤 ${m(precio3)}，5 公斤就是 ${m((precio3 * 5) / 3)}。`, "4 个人 12 天能粉刷完一套房子，6 个人只要 8 天。"],
      faq: [
        { pregunta: "怎么判断是正比还是反比？", respuesta: "一个量变大时另一个也变大，就是正比；一个变大时另一个变小，就是反比。" },
        { pregunta: "正比要怎么手算？", respuesta: `把对角的两个已知数相乘，再除以剩下的那一个。3 对应 600，5 就对应 600 × 5 ÷ 3 ＝ ${formatearNumero(ctx, 1000)}。` },
        { pregunta: "可以用来算百分比吗？", respuesta: "可以。200 是 100%，50 就是 25%：这是 A ＝ 200、B ＝ 100、C ＝ 50 的正比。" },
      ],
      glosario: [
        { termino: "正比", definicion: "两个量一起变大或一起变小。" },
        { termino: "反比", definicion: "一个量变大时，另一个量变小。" },
      ],
    };
  },
);
