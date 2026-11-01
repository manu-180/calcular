import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kredit karta kalkulyatori",
    title: tituloQueEntre(`Kredit karta kalkulyatori: ${ctx.nombrePais}, qarzni yopish`, `Kredit karta kalkulyatori: ${ctx.nombrePais}`, "Kredit karta kalkulyatori"),
    description: "Qatʼiy toʻlov yoki minimal toʻlov bilan kredit karta qarzini necha oyda yopishingiz va qancha foiz toʻlashingizni bilib oling.",
    intro: [
      "Kredit karta odatda eng qimmat qarz boʻladi. Faqat minimal toʻlovni toʻlash qarzni yillarga choʻzadi va foizlarni koʻpaytiradi.",
      "Qarz summasi, yillik foiz stavkasi va har oy qancha toʻlay olishingizni kiriting. Qachon qarzdan qutulishingizni, toʻlaydigan foizlaringizni va oyma-oy rejani koʻrsatamiz.",
    ],
    comoSeCalcula: [
      "Har oy foiz qoʻshiladi: qarz × yillik stavka ÷ 12.",
      "Keyin toʻlov ayiriladi. Minimal toʻlovda toʻlov qarzning maʼlum foizi boʻladi, lekin belgilangan eng kam miqdordan past boʻlmaydi.",
      "Bu qarz nolga tushguncha takrorlanadi. Toʻlov foizdan katta boʻlmasa, qarz hech kamaymaydi.",
    ],
    ejemplo: [
      `Qarz ${m(saldo)}, yillik stavka 22% va har oy ${m(fijo)} toʻlansa, qarz ${conFijo.meses} oyda yopiladi. Jami foizlar: ${m(conFijo.intereses)}.`,
      `Faqat 3% minimal toʻlov qilinsa, qarz ${conMinimo.meses} oyda yopiladi va foizlar ${m(conMinimo.intereses)} miqdorigacha oshadi.`,
    ],
    faq: [
      {
        pregunta: "Faqat minimal toʻlovni toʻlasam nima boʻladi?",
        respuesta:
          "Qarz kamaygan sari minimal toʻlov ham kamayadi, shuning uchun har oy kamroq toʻlaysiz va qarz yillarga choʻziladi. Imkoni boʻlsa, biroz boʻlsa ham kattaroq qatʼiy summa toʻlang.",
      },
      {
        pregunta: "Karta qarzini isteʼmol kreditiga oʻtkazish kerakmi?",
        respuesta: "Kredit stavkasi karta stavkasidan ancha past boʻlsa, odatda foydali. Komissiyalarni ham qoʻshib, ikkala variantning jami foizlarini solishtiring.",
      },
      {
        pregunta: "Qaysi kartani birinchi yopish kerak?",
        respuesta: "Hammasi boʻyicha minimal toʻlovni toʻlang, qolgan pulni esa stavkasi eng yuqori kartaga yoʻnaltiring. Shunda jami foizlarni eng kam toʻlaysiz.",
      },
    ],
    glosario: [
      { termino: "Minimal toʻlov", definicion: "Jarimasiz bir oyda toʻlash mumkin boʻlgan eng kam summa. U qarzni yopmaydi." },
      { termino: "Yillik foiz stavkasi", definicion: "Karta qolgan qarzga hisoblaydigan yillik stavka." },
    ],
  };
};
