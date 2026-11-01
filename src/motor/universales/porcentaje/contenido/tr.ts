import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Yüzde hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için yüzde hesaplama`, "Yüzde hesaplama aracı", "Yüzde hesaplama"),
    description: "Bir sayının yüzdesini, bir sayının diğerinin yüzde kaçı olduğunu ve yüzde artış ya da indirim sonrası tutarı kolayca hesaplayın.",
    intro: [
      "Ne öğrenmek istediğinizi seçin ve iki sayıyı girin. Sonuç hemen görünür.",
      "Günlük hayattaki dört yüzde hesabını kapsar: bir sayının yüzdesi, oran, artış ve azalış.",
    ],
    comoSeCalcula: [
      "Y sayısının yüzde X'i = Y × X ÷ 100.",
      "X sayısının Y içindeki yüzdesi = X ÷ Y × 100.",
      "Y artı yüzde X = Y × (1 + X ÷ 100). Y eksi yüzde X = Y × (1 − X ÷ 100).",
    ],
    ejemplo: ["200'ün %15'i 30'dur.", "30, 120'nin %25'idir.", `${m(precio)} olan bir fiyat %10 artınca yeni fiyat ${m(precio * 1.1)} olur.`],
    faq: [
      {
        pregunta: "Bir sayının yüzdesi nasıl hesaplanır?",
        respuesta: "Sayıyı yüzde değeriyle çarpıp 100'e bölün. 350'nin %20'si: 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Bir sayının diğerinin yüzde kaçı olduğunu nasıl bulurum?",
        respuesta: "Parçayı bütüne bölüp 100 ile çarpın. 60 sorudan 45'ini doğru yaptıysanız: 45 ÷ 60 × 100 = %75.",
      },
      {
        pregunta: "Bir fiyata yüzde nasıl eklenir?",
        respuesta: `Fiyatı, 1 ile yüzdenin ondalık karşılığının toplamıyla çarpın. %10 eklemek için şu sayıyla çarpın: ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "%10 artıp ardından %10 azalan bir değer başa döner mi?",
        respuesta: "Hayır. 100 artı %10 = 110, 110 eksi %10 = 99. Azalış daha büyük bir sayıya uygulanır.",
      },
    ],
    glosario: [
      { termino: "Yüzde", definicion: "100 üzerinden parça olarak yazılan miktar." },
      { termino: "Taban", definicion: "Yüzdenin alındığı sayı (bu araçta Y)." },
    ],
  };
};
