import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  return {
    h1: "Százalékszámítás",
    title: tituloQueEntre(
      `Százalékszámítás: online kalkulátor (${ctx.nombrePais})`,
      "Százalékszámítás: online kalkulátor",
      "Százalékszámítás",
    ),
    description:
      "Számold ki egy szám százalékát, hogy egy szám hány százaléka a másiknak, és mennyi lesz az összeg százalékos emelés vagy csökkentés után.",
    intro: [
      "Válaszd ki, mit szeretnél tudni, írd be a két számot, és rögtön látod az eredményt.",
      "A kalkulátor a négy leggyakoribb százalékszámítást végzi el: rész, arány, növelés és csökkentés.",
    ],
    comoSeCalcula: [
      "Százalékérték = alap × százalékláb ÷ 100.",
      "Százalékláb = százalékérték ÷ alap × 100.",
      "Y plusz X százalék = Y × (1 + X ÷ 100). Y mínusz X százalék = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `Ha az alap ${n(200)}, annak ${n(15)} százaléka ${n((200 * 15) / 100)}.`,
      `Ha az alap ${n(120)}, akkor ${n(30)} ennek ${n((30 / 120) * 100)} százaléka.`,
      `Egy ${m(precio)} értékű ár ${n(10)} százalékos emelés után ennyi lesz: ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolom ki egy szám százalékát?",
        respuesta: `Szorozd meg a számot a százaléklábbal, és oszd el százzal. Például 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Hogyan számolom ki, hogy egy szám hány százaléka a másiknak?",
        respuesta: `Oszd el a részt az egésszel, és szorozd meg százzal. Ha egy tesztben a 60 kérdésből 45 jó választ adtál, ez 45 ÷ 60 × 100 = ${n((45 / 60) * 100)} százalék.`,
      },
      {
        pregunta: "Hogyan adok hozzá százalékot egy árhoz?",
        respuesta: `Szorozd meg az árat eggyel plusz a százalékláb tizedes alakjával. Tíz százalékos emelésnél a szorzó: ${n(1.1, 2)}.`,
      },
      {
        pregunta: "Ha valamit tíz százalékkal emelek, majd tíz százalékkal csökkentek, visszajutok a kiinduló értékhez?",
        respuesta: `Nem. Száz plusz tíz százalék ${n(110)}, de ${n(110)} mínusz tíz százalék már csak ${n(99)}. A csökkentés ugyanis a nagyobb számból számol.`,
      },
    ],
    glosario: [
      { termino: "Százalékláb", definicion: "Hány századrészt veszünk az alapból: a százalékjel előtti szám." },
      { termino: "Alap", definicion: "A szám, amelynek a százalékát számoljuk (ebben a kalkulátorban Y)." },
      { termino: "Százalékérték", definicion: "Az alapból és a százaléklábból kapott összeg." },
    ],
  };
};
