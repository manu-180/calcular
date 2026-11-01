import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Arbatpinigių skaičiuoklė",
    title: tituloQueEntre(
      `Arbatpinigių skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Kiek palikti arbatpinigių: skaičiuoklė",
      "Arbatpinigių skaičiuoklė",
    ),
    description: "Apskaičiuokite arbatpinigius, bendrą sąskaitos sumą ir kiekvieno dalį, kai mokate kartu. Dalį galima suapvalinti iki sveikos sumos.",
    intro: [
      "Įveskite sąskaitos sumą, arbatpinigių procentą ir mokančių žmonių skaičių. Pamatysite arbatpinigius, bendrą sumą ir kiekvieno dalį.",
      "Jei labiau patinka apvalūs skaičiai, skaičiuoklė kiekvieno dalį suapvalina į didesnę pusę, o skirtumas atitenka arbatpinigiams.",
    ],
    comoSeCalcula: ["Arbatpinigiai = sąskaita × arbatpinigių procentas ÷ 100.", "Iš viso = sąskaita + arbatpinigiai.", "Kiekvieno dalis yra bendra suma, padalyta iš žmonių skaičiaus."],
    ejemplo: [
      `Kai sąskaita yra ${m(cuenta)}, 10 % arbatpinigių sudaro ${m(propina)}, tad iš viso mokėsite ${m(cuenta + propina)}.`,
      `Jei moka trys žmonės, kiekvienas sumoka ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Kiek paprastai paliekama arbatpinigių?",
        respuesta: `Priklauso nuo vietos papročių. Pasidomėkite, kas įprasta ${GRAMATICA.lt.en(ctx.nombrePais)}, ir patikrinkite, ar į sąskaitą jau neįskaičiuotas mokestis už aptarnavimą.`,
      },
      {
        pregunta: "Ar arbatpinigiai skaičiuojami nuo sumos su mokesčiais?",
        respuesta: "Dažniausiai nuo visos sąskaitos sumos. Jei norite skaičiuoti nuo sumos be mokesčių, įveskite ją.",
      },
      {
        pregunta: "Kaip greitai apskaičiuoti 10 % ar 15 % arbatpinigių?",
        respuesta: `Sąskaitą padalykite iš dešimties, taip gausite 10 %. Kad gautumėte 15 %, pridėkite dar pusę šios sumos. Kai sąskaita yra 850, 10 % sudaro ${n(850 * 0.1)}, o 15 % sudaro ${n(850 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Arbatpinigiai", definicion: "Papildoma suma, kurią paliekate už aptarnavimą, be pačios kainos." },
      { termino: "Mokestis už aptarnavimą", definicion: "Suma, kurią įstaiga jau pridėjo prie sąskaitos už aptarnavimą." },
    ],
  };
};
