import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const teden = 52 / 12;
  return {
    h1: "Pretvornik plače na uro",
    title: tituloQueEntre(
      `Plača na uro, mesec in leto: izračun ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      `Pretvornik plače na uro ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Pretvornik plače na uro",
    ),
    description: "Pretvorite plačo med uro, dnevom, tednom, polovico meseca, mesecem in letom glede na svoje delovne ure in plačane tedne.",
    intro: [
      "Koliko zaslužite na uro? Koliko na leto prinese ponudba z urno postavko? Vnesite znesek, izberite obdobje in pokazali vam bomo vsa druga.",
      "Pomaga, ko primerjate ponudbe za delo, ocenjujete nadure ali želite vedeti, koliko je vredna vaša ura.",
    ],
    comoSeCalcula: [
      "Najprej se vse preračuna na letni znesek.",
      "Na uro = letni znesek ÷ (ure na teden × plačani tedni).",
      "Na dan = letni znesek ÷ (delovni dnevi na teden × plačani tedni). Na teden = letni znesek ÷ plačani tedni.",
      "Na mesec = letni znesek ÷ 12. Za pol meseca = letni znesek ÷ 24.",
    ],
    ejemplo: [
      `Plača ${m(anual)} na leto pri 40 urah na teden ustreza ${m(anual / 2080)} na uro in ${m(anual / 12)} na mesec.`,
      `Ponudba ${m(hora)} na uro pri polnem delovnem času prinese ${m(hora * 2080)} na leto.`,
    ],
    faq: [
      {
        pregunta: "Koliko delovnih ur ima leto?",
        respuesta: `Pri 40 urah na teden in 52 plačanih tednih je število ur: ${formatearNumero(ctx, 2080)}. Za hitro oceno zato urno postavko pomnožite s približno ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Zakaj tedenska plača krat 4 ne da mesečne?",
        respuesta: `Ker mesec v povprečju nima 4 tednov, ampak 52 ÷ 12, torej ${formatearNumero(ctx, teden, 2)}. Tedensko plačo v mesečno pretvorite tako, da jo pomnožite s 52 in delite z 12.`,
      },
      {
        pregunta: "Ali so upoštevani bonusi ali davki?",
        respuesta: "Ne. Kalkulator preračuna isti znesek med obdobji. Če dobivate bonuse, jih prištejte posebej, ko primerjate ponudbe.",
      },
    ],
    glosario: [
      { termino: "Bruto plača", definicion: "Plača pred odbitkom dohodnine in prispevkov za socialno varnost." },
      { termino: "Izplačilo dvakrat na mesec", definicion: "Plača, ki je vsak mesec izplačana v dveh delih, torej 24-krat na leto." },
    ],
  };
};
