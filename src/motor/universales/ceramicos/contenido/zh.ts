import { contenidoPorEscritura } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const PIEZAS_IMP = Math.ceil((150 * 1.1) / 1 - 1e-9);
const PIEZA = 0.6 * 0.6;
const PIEZAS = Math.ceil((20 * 1.1) / PIEZA - 1e-9);

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "磁磚數量計算機",
      title: tituloQueEntre(`磁磚數量計算機｜${ctx.nombrePais}`, "磁磚數量計算機"),
      description: "算出地板或牆面需要幾片磁磚，連同切割和破損的損耗一起算進去，還能知道要買幾箱。",
      intro: ["輸入鋪貼面積、每片磁磚的尺寸和每箱片數，就能看到要買幾片、幾箱。", "損耗率是預留給邊緣切割和偶爾破損的磁磚。"],
      comoSeCalcula: [
        `一片磁磚的面積 ＝ 長 × 寬，換算成${imperial ? "平方英尺" : "平方公尺"}。`,
        "片數 ＝ 面積 ×（1 ＋ 損耗率 ÷ 100）÷ 一片的面積，無條件進位。",
        "箱數 ＝ 片數 ÷ 每箱片數，無條件進位。",
      ],
      ejemplo: imperial
        ? [`150 平方英尺，用 12 × 12 英寸（每片 1 平方英尺）的磁磚、損耗 10%，需要 ${PIEZAS_IMP} 片。`, `每箱 10 片的話，要 ${Math.ceil(PIEZAS_IMP / 10)} 箱。`]
        : [`20 平方公尺，用 60 × 60 公分（每片 ${n(PIEZA)} 平方公尺）的磁磚、損耗 10%，需要 ${PIEZAS} 片。`, `每箱 4 片的話，要 ${Math.ceil(PIEZAS / 4)} 箱。`],
      faq: [
        { pregunta: "損耗率要抓多少？", respuesta: "直鋪抓 10%。斜鋪、人字鋪，或需要大量切割的空間，抓 15% 到 20%。" },
        { pregunta: "要把磁磚縫算進去嗎？", respuesta: "不用。磁磚縫只有幾公釐寬，損耗率已經涵蓋這個差距。" },
        { pregunta: "要多買一些備用嗎？", respuesta: "要，留幾片同一批號的磁磚。以後如果破了，不同批號的顏色可能對不上。" },
      ],
      glosario: [
        { termino: "損耗率", definicion: "為了切割和破損而多買的百分比。" },
        { termino: "批號", definicion: "同一批生產的產品。不同批號的磁磚，色澤可能略有差異。" },
      ],
    };
  },
  (ctx) => {
    const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "瓷砖数量计算器",
      title: tituloQueEntre(`瓷砖数量计算器｜${ctx.nombrePais}`, "瓷砖数量计算器"),
      description: "算出地面或墙面需要多少片瓷砖，连同切割和破损的损耗一起算进去，还能知道要买几箱。",
      intro: ["输入铺贴面积、每片瓷砖的尺寸和每箱片数，就能看到要买多少片、几箱。", "损耗率是预留给边缘切割和偶尔破损的瓷砖。"],
      comoSeCalcula: [
        `一片瓷砖的面积 ＝ 长 × 宽，换算成${imperial ? "平方英尺" : "平方米"}。`,
        "片数 ＝ 面积 ×（1 ＋ 损耗率 ÷ 100）÷ 一片的面积，向上取整。",
        "箱数 ＝ 片数 ÷ 每箱片数，向上取整。",
      ],
      ejemplo: imperial
        ? [`150 平方英尺，用 12 × 12 英寸（每片 1 平方英尺）的瓷砖、损耗 10%，需要 ${PIEZAS_IMP} 片。`, `每箱 10 片的话，要 ${Math.ceil(PIEZAS_IMP / 10)} 箱。`]
        : [`20 平方米，用 60 × 60 厘米（每片 ${n(PIEZA)} 平方米）的瓷砖、损耗 10%，需要 ${PIEZAS} 片。`, `每箱 4 片的话，要 ${Math.ceil(PIEZAS / 4)} 箱。`],
      faq: [
        { pregunta: "损耗率按多少算？", respuesta: "正铺按 10%。斜铺、人字铺，或者需要大量切割的空间，按 15% 到 20%。" },
        { pregunta: "要把砖缝算进去吗？", respuesta: "不用。砖缝只有几毫米宽，损耗率已经涵盖了这个差距。" },
        { pregunta: "要多买一些备用吗？", respuesta: "要，留几片同一批次的瓷砖。以后如果碎了，不同批次的颜色可能对不上。" },
      ],
      glosario: [
        { termino: "损耗率", definicion: "为了切割和破损而多买的百分比。" },
        { termino: "批次", definicion: "同一批生产的产品。不同批次的瓷砖，色泽可能略有差异。" },
      ],
    };
  },
);
