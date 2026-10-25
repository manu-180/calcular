import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Favqulodda jamgʻarma kalkulyatori",
    title: tituloQueEntre(`Favqulodda jamgʻarma kalkulyatori: ${ctx.nombrePais}`, `Favqulodda jamgʻarma: ${ctx.nombrePais}`, "Favqulodda jamgʻarma kalkulyatori"),
    description: "Zarur xarajatlaringizdan kelib chiqib favqulodda jamgʻarma qancha boʻlishi kerakligini va uni necha oyda toʻplashingizni hisoblang.",
    intro: [
      "Favqulodda jamgʻarma oldindan rejalashtirib boʻlmaydigan holatlar uchun ajratilgan pul: ishdan ayrilish, sogʻliq muammosi yoki uyni shoshilinch taʼmirlash.",
      "U eng qiyin paytda kredit kartaga murojaat qilmaslikka yordam beradi. Zarur xarajatlaringizni va necha oyni qoplamoqchi ekaningizni kiriting.",
    ],
    comoSeCalcula: [
      "Tavsiya etiladigan jamgʻarma = oylik zarur xarajatlar × qoplanadigan oylar soni.",
      "Yana jamgʻarish kerak = tavsiya etiladigan jamgʻarma − hozirgi mablagʻ.",
      "Toʻldirish muddati = yana jamgʻarish kerak boʻlgan summa ÷ har oy jamgʻara oladigan summa, yuqoriga yaxlitlanadi.",
    ],
    ejemplo: [
      `Oylik zarur xarajatlar ${m(gastos)} boʻlsa, 6 oylik jamgʻarma ${m(gastos * 6)} boʻladi.`,
      `Har oy ${m(aporte)} jamgʻarsangiz, uni ${Math.ceil((gastos * 6) / aporte)} oyda toʻplaysiz.`,
    ],
    faq: [
      {
        pregunta: "Favqulodda jamgʻarma necha oyni qoplashi kerak?",
        respuesta:
          "Odatdagi tavsiya: 3 oydan 6 oygacha zarur xarajatlar. Daromadingiz oʻzgarib tursa, oʻzingiz uchun ishlasangiz yoki oilada bitta daromad boʻlsa, 6 oydan 12 oygacha moʻljallang.",
      },
      {
        pregunta: "Favqulodda jamgʻarmani qayerda saqlash kerak?",
        respuesta: "Kundalik xarajat hisobingizdan alohida, xavfsiz va oʻsha kuniyoq foydalanish mumkin boʻlgan joyda. Bu xavfli investitsiya uchun emas: uning vazifasi kerak paytda qoʻl ostida boʻlish.",
      },
      {
        pregunta: "Avval jamgʻarma toʻplash kerakmi yoki qarzni yopishmi?",
        respuesta: "Koʻp qoʻllaniladigan yoʻl: avval bir oylik xarajatni jamgʻaring, keyin kredit karta kabi qimmat qarzlarni yoping, soʻng jamgʻarmani oxiriga yetkazing.",
      },
    ],
    glosario: [
      { termino: "Zarur xarajatlar", definicion: "Daromad toʻxtasa ham toʻlash kerak boʻlgan xarajatlar: uy-joy, oziq-ovqat, kommunal xizmatlar, sogʻliq." },
      { termino: "Likvidlik", definicion: "Pulni qiymatini yoʻqotmasdan qanchalik tez ishlatish mumkinligi." },
    ],
  };
};
