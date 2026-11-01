import { formaLv } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const litri = (x: number) => formaLv(x, "litrs", "litri", "litru");
  const galoni = (x: number) => formaLv(x, "galons", "galoni", "galonu");
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Braucot 150 jūdzes turp un atpakaļ, ja auto ar vienu galonu nobrauc 30 jūdzes, degvielas vajag: ${formatearNumero(ctx, galones)} ${galoni(galones)}.`,
          `Ja galona cena ir ${m(precio)}, brauciens maksā ${m(galones * precio)}. Ja izmaksas dala 2 cilvēki, katrs maksā ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Braucot 300 km turp un atpakaļ, ja auto patēriņš ir 8 litri uz 100 km, degvielas vajag: ${formatearNumero(ctx, litros)} ${litri(litros)}.`,
          `Ja litra cena ir ${m(precio)}, brauciens maksā ${m(litros * precio)}. Ja izmaksas dala 2 cilvēki, katrs maksā ${m((litros * precio) / 2)}.`,
        ];
      })();
  const parrekins = Math.round((235.215 / 30) * 10) / 10;
  return {
    h1: "Degvielas patēriņa kalkulators",
    title: tituloQueEntre(
      `Degvielas patēriņa kalkulators (${ctx.nombrePais})`,
      "Degvielas patēriņa un brauciena izmaksu kalkulators",
      "Degvielas kalkulators",
    ),
    description: "Aprēķiniet, cik degvielas patērēsiet braucienā un cik tas maksās, pēc attāluma, auto patēriņa un degvielas cenas.",
    intro: [
      `Ievadiet attālumu, auto patēriņu un ${imperial ? "galona" : "litra"} cenu. Redzēsiet, cik degvielas vajag un cik maksās brauciens.`,
      imperial ? "Patēriņu norāda jūdzēs ar vienu galonu." : "Patēriņu varat ievadīt litros uz 100 km vai kilometros ar vienu litru.",
    ],
    comoSeCalcula: imperial
      ? ["Galoni = attālums ÷ jūdzes ar galonu.", "Izmaksas = galoni × galona cena. Izvēloties „Turp un atpakaļ“, attālumu divkāršo."]
      : [
          "Ja patēriņš norādīts litros uz 100 km: litri = attālums × patēriņš ÷ 100.",
          "Ja patēriņš norādīts kilometros ar vienu litru: litri = attālums ÷ patēriņš.",
          "Izmaksas = litri × litra cena. Izvēloties „Turp un atpakaļ“, attālumu divkāršo.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Kā jūdzes ar galonu pārrēķināt litros uz 100 km?",
        respuesta: `Daliet skaitli ${formatearNumero(ctx, 235.215, 1)} ar mpg vērtību (ASV galons). Ja auto ar vienu galonu nobrauc 30 jūdzes, tā patēriņš ir aptuveni ${formatearNumero(ctx, parrekins, 1)} ${litri(parrekins)} uz 100 km.`,
      },
      {
        pregunta: "Vai iekļauta ceļu nodeva un vinjete?",
        respuesta: "Nē. Tiek rēķināta tikai degviela. Ceļu nodevu, vinjeti un stāvvietu pieskaitiet atsevišķi.",
      },
      {
        pregunta: "Kāpēc pilsētā auto patērē vairāk?",
        respuesta: "Braucot ar biežām apstāšanām un uzsākšanām, vajag vairāk enerģijas nekā uz šosejas ar vienmērīgu ātrumu. Tāpēc pilsētā patēriņš parasti ir lielāks.",
      },
    ],
    glosario: [
      { termino: "Degvielas patēriņš", definicion: "Cik degvielas auto patērē noteiktam attālumam vai cik tālu nobrauc ar noteiktu degvielas daudzumu." },
      { termino: "mpg", definicion: "Jūdzes ar galonu. Jo lielāka vērtība, jo ekonomiskāks auto." },
    ],
  };
};
