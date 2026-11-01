import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionSq } from "../../dias-entre-fechas/textos/sq";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Kalkulator moshe",
    title: tituloQueEntre(`Kalkulator moshe: ${ctx.nombrePais}`, "Kalkulator moshe"),
    description: "Gjeni moshën e saktë në vite, muaj dhe ditë, sa ditë keni jetuar dhe sa mungon deri në ditëlindjen e ardhshme.",
    intro: [
      "Vendosni datën e lindjes dhe shikoni moshën e saktë të sotme, edhe në muaj, javë dhe ditë.",
      "Ndryshoni datën e dytë për të gjetur moshën e dikujt në një ditë të caktuar ose sa vjeç do të jetë.",
    ],
    comoSeCalcula: [
      "Numërohen muajt e plotë nga lindja deri në datën e zgjedhur. Çdo 12 muaj përbëjnë një vit.",
      "Ditët që mbeten pas muajit të fundit të plotë janë ditët e moshës.",
      "Vitet e brishta numërohen me 366 ditët e tyre.",
    ],
    ejemplo: [
      `Një person i lindur më ${fechaLarga(ctx.locale, nac)} kishte më ${fechaLarga(ctx.locale, ref)} moshën ${duracionSq(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Kjo do të thotë ${formatearNumero(ctx, total)} ditë.`,
    ],
    faq: [
      {
        pregunta: "Si llogaritet mosha e saktë?",
        respuesta: "Numërohen vitet e mbushura, pastaj muajt e plotë nga ditëlindja e fundit dhe, në fund, ditët që mbeten.",
      },
      {
        pregunta: "Çfarë ndodh me të lindurit më 29 shkurt?",
        respuesta: "Në vitet që nuk janë të brishta, ky kalkulator përdor 28 shkurtin si ditëlindje. Disa ligje përdorin në vend të tij 1 marsin.",
      },
      {
        pregunta: "Sa ditë kam jetuar?",
        respuesta: "Shikoni rreshtin “Në ditë”. Numëron çdo ditë nga lindja deri në datën e zgjedhur, pa ditën e fundit.",
      },
    ],
    glosario: [
      { termino: "Moshë", definicion: "Numri i viteve të mbushura që nga lindja." },
      { termino: "Vit i brishtë", definicion: "Një vit me 366 ditë, me 29 shkurt. Vjen një herë në katër vjet, me përjashtim të disa viteve në fund të shekullit." },
    ],
  };
};
