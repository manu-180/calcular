import { contenidoPorEscritura } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const imperial = ctx.unidades === "imperial";
    const u = imperial ? "英里" : "公里";
    const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
    const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
    return {
      h1: "跑步配速計算機",
      title: tituloQueEntre(`跑步配速計算機｜${ctx.nombrePais}`, "跑步配速計算機"),
      description: `算出每${u}配速、完賽時間或距離，內建 5 公里、10 公里、半程馬拉松和全程馬拉松的距離。`,
      intro: ["距離、時間和配速三者知道兩個，就能算出第三個。可用來規劃比賽或檢查訓練。", "5 公里、10 公里、半馬和全馬的距離都已內建。"],
      comoSeCalcula: [`配速 ＝ 時間 ÷ 距離，以每${u}幾分幾秒表示。`, "時間 ＝ 配速 × 距離。", "距離 ＝ 時間 ÷ 配速。平均速度是距離除以小時數。"],
      ejemplo: imperial
        ? [
            `3 英里跑 27 分鐘，配速是每英里 9:00，時速 ${formatearNumero(ctx, 20 / 3, 2)} 英里。`,
            `半程馬拉松（${formatearNumero(ctx, media, 2)} 英里）以每英里 ${ritmoTexto(ritmoMedia)} 的配速跑，完賽時間是 ${reloj(ritmoMedia * media)}。`,
          ]
        : [
            "10 公里跑 50 分鐘，配速是每公里 5:00，時速 12 公里。",
            `半程馬拉松（${formatearNumero(ctx, media, 1)} 公里）以每公里 ${ritmoTexto(ritmoMedia)} 的配速跑，完賽時間是 ${reloj(ritmoMedia * media)}。`,
          ],
      faq: [
        {
          pregunta: `每${u}配速怎麼算？`,
          respuesta: imperial
            ? `把時間換成分鐘，再除以英里數。3 英里跑 28 分 30 秒，就是每英里 ${formatearNumero(ctx, 9.5, 1)} 分鐘，也就是 9:30。`
            : `把時間換成分鐘，再除以公里數。10 公里跑 55 分鐘，就是每公里 ${formatearNumero(ctx, 5.5, 1)} 分鐘，也就是 5:30。`,
        },
        { pregunta: "初學者適合什麼配速？", respuesta: "邊跑還能邊說話的配速。體能變好之後，這個配速也會跟著變快。" },
        {
          pregunta: "全程馬拉松有多長？",
          respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} 公里（${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} 英里），半程馬拉松是它的一半。`,
        },
      ],
      glosario: [
        { termino: "配速", definicion: "跑完一公里或一英里所需的時間。" },
        { termino: "平均速度", definicion: "每小時跑的距離。" },
      ],
    };
  },
  (ctx) => {
    const imperial = ctx.unidades === "imperial";
    const u = imperial ? "英里" : "公里";
    const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
    const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
    return {
      h1: "跑步配速计算器",
      title: tituloQueEntre(`跑步配速计算器｜${ctx.nombrePais}`, "跑步配速计算器"),
      description: `算出每${u}配速、完赛时间或距离，内置 5 公里、10 公里、半程马拉松和全程马拉松的距离。`,
      intro: ["距离、时间和配速三者知道两个，就能算出第三个。可用来规划比赛或检查训练。", "5 公里、10 公里、半马和全马的距离都已内置。"],
      comoSeCalcula: [`配速 ＝ 时间 ÷ 距离，以每${u}几分几秒表示。`, "时间 ＝ 配速 × 距离。", "距离 ＝ 时间 ÷ 配速。平均速度是距离除以小时数。"],
      ejemplo: imperial
        ? [
            `3 英里跑 27 分钟，配速是每英里 9:00，时速 ${formatearNumero(ctx, 20 / 3, 2)} 英里。`,
            `半程马拉松（${formatearNumero(ctx, media, 2)} 英里）以每英里 ${ritmoTexto(ritmoMedia)} 的配速跑，完赛时间是 ${reloj(ritmoMedia * media)}。`,
          ]
        : [
            "10 公里跑 50 分钟，配速是每公里 5:00，时速 12 公里。",
            `半程马拉松（${formatearNumero(ctx, media, 1)} 公里）以每公里 ${ritmoTexto(ritmoMedia)} 的配速跑，完赛时间是 ${reloj(ritmoMedia * media)}。`,
          ],
      faq: [
        {
          pregunta: `每${u}配速怎么算？`,
          respuesta: imperial
            ? `把时间换成分钟，再除以英里数。3 英里跑 28 分 30 秒，就是每英里 ${formatearNumero(ctx, 9.5, 1)} 分钟，也就是 9:30。`
            : `把时间换成分钟，再除以公里数。10 公里跑 55 分钟，就是每公里 ${formatearNumero(ctx, 5.5, 1)} 分钟，也就是 5:30。`,
        },
        { pregunta: "初学者适合什么配速？", respuesta: "边跑还能边说话的配速。体能变好之后，这个配速也会随之变快。" },
        {
          pregunta: "全程马拉松有多长？",
          respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} 公里（${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} 英里），半程马拉松是它的一半。`,
        },
      ],
      glosario: [
        { termino: "配速", definicion: "跑完一公里或一英里所需的时间。" },
        { termino: "平均速度", definicion: "每小时跑的距离。" },
      ],
    };
  },
);
