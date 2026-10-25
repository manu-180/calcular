import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `150 ft² alan için 12 × 12 in fayansla (her biri 1 ft²) ve %10 fire payıyla gereken fayans: ${piezas} adet.`,
          `Bir kutuda 10 fayans varsa alınacak kutu sayısı: ${Math.ceil(piezas / 10)}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `20 m² alan için 60 × 60 cm fayansla (her biri ${n(pieza)} m²) ve %10 fire payıyla gereken fayans: ${piezas} adet.`,
          `Bir kutuda 4 fayans varsa alınacak kutu sayısı: ${Math.ceil(piezas / 4)}.`,
        ];
      })();
  return {
    h1: "Fayans ve seramik hesaplama",
    title: tituloQueEntre(`Fayans hesaplama ${ctx.nombrePais}: kaç kutu gerekir`, `Fayans hesaplama ${ctx.nombrePais}`, "Fayans ve seramik hesaplama", "Fayans hesaplama"),
    description: "Zemin ya da duvar için kaç adet fayans gerektiğini fire payıyla birlikte hesaplayın ve kaç kutu almanız gerektiğini görün.",
    intro: [
      "Alanı, bir fayansın ölçüsünü ve kutuda kaç adet olduğunu girin. Kaç fayans ve kaç kutu almanız gerektiğini görürsünüz.",
      "Fire payı, kenarlardaki kesimleri ve arada kırılan fayansları karşılar.",
    ],
    comoSeCalcula: [
      `Bir fayansın alanı = uzunluk × genişlik; ${imperial ? "fit kareye" : "metrekareye"} çevrilir.`,
      "Fayans adedi = alan × (1 + fire payı ÷ 100) ÷ bir fayansın alanı; yukarı yuvarlanır.",
      "Kutu = fayans adedi ÷ kutudaki adet; yukarı yuvarlanır.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Ne kadar fire payı bırakmalıyım?",
        respuesta: "Düz döşemede %10. Çapraz ya da balık sırtı döşemede veya çok kesim gereken odalarda %15 ile %20 arası.",
      },
      {
        pregunta: "Derz aralıklarını hesaba katmam gerekir mi?",
        respuesta: "Hayır. Derzler birkaç milimetre genişliğindedir ve fire payı aradaki farkı zaten karşılar.",
      },
      {
        pregunta: "Fazladan almalı mıyım?",
        respuesta: "Evet, aynı partiden birkaç yedek fayans alın. Sonradan biri kırılırsa aynı tonu bulmak zor olabilir.",
      },
    ],
    glosario: [
      { termino: "Fire payı", definicion: "Kesim ve kırılmalar için fazladan alınan yüzde." },
      { termino: "Parti", definicion: "Üretim serisi. Farklı partilerdeki fayansların tonu biraz değişebilir." },
    ],
  };
};
