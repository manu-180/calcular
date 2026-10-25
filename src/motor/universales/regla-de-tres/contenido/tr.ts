import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Orantı hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için orantı hesaplama`, "Doğru ve ters orantı hesaplama", "Orantı hesaplama"),
    description: "Doğru ya da ters orantıyı bir saniyede çözün. Üç değeri girin, dördüncüsünü hesabıyla birlikte görün.",
    intro: [
      "Orantı hesabı, iki miktar birlikte değiştiğinde ve dört değerden üçü bilindiğinde işe yarar.",
      "Doğru ya da ters orantıyı seçin, A, B ve C değerlerini girin. Araç size X değerini verir.",
    ],
    comoSeCalcula: [
      "Doğru orantı: X = B × C ÷ A. İki miktar birlikte artıyorsa kullanın (daha çok kilo, daha yüksek fiyat).",
      "Ters orantı: X = A × B ÷ C. Biri artarken diğeri azalıyorsa kullanın (daha çok kişi, daha az gün).",
    ],
    ejemplo: [
      `3 kilo ${m(precio3)} ise 5 kilo ${m((precio3 * 5) / 3)} eder.`,
      "4 kişi bir evi 12 günde boyuyorsa 6 kişi aynı evi 8 günde boyar.",
    ],
    faq: [
      {
        pregunta: "Doğru orantı mı ters orantı mı olduğunu nasıl anlarım?",
        respuesta: "Bir miktar artarken diğeri de artıyorsa doğru orantıdır. Biri artarken diğeri azalıyorsa ters orantıdır.",
      },
      {
        pregunta: "Doğru orantı elle nasıl hesaplanır?",
        respuesta: `Çaprazdaki iki bilinen değeri çarpıp kalan değere bölün. 3 karşılığı 600 ise 5 karşılığı şöyle bulunur: 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Yüzde hesabında kullanılabilir mi?",
        respuesta: "Evet. 200 sayısı %100 ise 50 sayısı %25 eder. Bu, A = 200, B = 100 ve C = 50 olan bir doğru orantıdır.",
      },
    ],
    glosario: [
      { termino: "Doğru orantı", definicion: "İki miktar birlikte artar ya da birlikte azalır." },
      { termino: "Ters orantı", definicion: "Bir miktar artarken diğeri azalır." },
    ],
  };
};
