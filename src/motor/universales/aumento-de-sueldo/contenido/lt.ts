import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Atlyginimo pakėlimo skaičiuoklė",
    title: tituloQueEntre(
      `Atlyginimo pakėlimo skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      `Atlyginimo pakėlimas ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Atlyginimo pakėlimo skaičiuoklė",
    ),
    description: "Apskaičiuokite naują atlyginimą po pakėlimo, skirtumą per mėnesį ir per metus ir sužinokite, ar realusis pakėlimas lenkia infliaciją.",
    intro: [
      "Jums pasiūlė didesnį atlyginimą arba ketinate jo prašyti. Įveskite atlyginimą ir pakėlimą procentais arba pinigais, ir pamatysite, kiek pasikeis kiekvieną mėnesį ir per visus metus.",
      "Pridėkite laikotarpio infliaciją, ir parodysime, ar jūsų perkamoji galia tikrai auga, ar atlyginimas tik vejasi kainas.",
    ],
    comoSeCalcula: [
      "Naujas atlyginimas = dabartinis atlyginimas × (1 + pakėlimas ÷ 100).",
      "Skirtumas per metus = skirtumas per mėnesį × atlyginimų skaičius per metus.",
      "Realusis pakėlimas = (1 + pakėlimas) ÷ (1 + infliacija) − 1.",
    ],
    ejemplo: [
      `Kai ${m(sueldo)} mėnesinis atlyginimas pakeliamas 5 %, naujas atlyginimas yra ${m(sueldo * 1.05)}: ${m(sueldo * 0.05)} daugiau kas mėnesį ir ${m(sueldo * 0.05 * 12)} daugiau per metus.`,
      `Jei laikotarpio infliacija buvo 3 %, realusis pakėlimas yra ${p(aumentoReal(5, 3))}. Kai infliacija 6 %, jis yra ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Kas yra realusis atlyginimo pakėlimas?",
        respuesta: "Tai pakėlimas įvertinus infliaciją. Jis parodo, ar už naują atlyginimą nupirksite daugiau, ar mažiau nei anksčiau.",
      },
      {
        pregunta: "Kodėl nepakanka iš pakėlimo atimti infliaciją?",
        respuesta: `Nes procentai dauginami, o ne atimami. Kai pakėlimas 5 %, o infliacija 3 %, realusis pakėlimas yra ${p(aumentoReal(5, 3))}, o ne 2 %. Kai infliacija didelė, skirtumas daug didesnis.`,
      },
      {
        pregunta: "Kiek prašyti?",
        respuesta: "Bent tiek, kiek siekia infliacija nuo paskutinio pakėlimo, kad neprarastumėte perkamosios galios. Be to, atsižvelkite į tai, kiek už tokias pareigas moka kiti darbdaviai ir kiek padidėjo jūsų atsakomybė.",
      },
    ],
    glosario: [
      { termino: "Nominalus pakėlimas", definicion: "Pakėlimas, nurodytas atlyginimo lapelyje, neįvertinus infliacijos." },
      { termino: "Perkamoji galia", definicion: "Tai, ką galite nusipirkti už savo atlyginimą." },
    ],
  };
};
