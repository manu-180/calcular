import { formaSr } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const litara = (x: number) => formaSr(x, "litar", "litra", "litara");
  const galona = (x: number) => formaSr(x, "galon", "galona", "galona");
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Za put od 150 milja u oba pravca, automobilu koji pređe 30 milja po galonu treba ${formatearNumero(ctx, galones)} ${galona(galones)} goriva.`,
          `Uz cenu od ${m(precio)} po galonu, to iznosi ${m(galones * precio)}. Ako trošak dele 2 osobe, svaka plaća ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Za put od 300 km u oba pravca, automobilu koji troši 8 litara na 100 km treba ${formatearNumero(ctx, litros)} ${litara(litros)} goriva.`,
          `Uz cenu od ${m(precio)} po litru, to iznosi ${m(litros * precio)}. Ako trošak dele 2 osobe, svaka plaća ${m((litros * precio) / 2)}.`,
        ];
      })();
  const prevod = Math.round((235.215 / 30) * 10) / 10;
  return {
    h1: "Kalkulator potrošnje goriva",
    title: tituloQueEntre(
      `Kalkulator potrošnje goriva (${ctx.nombrePais})`,
      "Kalkulator potrošnje goriva i troškova puta",
      "Kalkulator potrošnje goriva",
    ),
    description:
      "Izračunajte koliko goriva trošite na put i koliko će vas koštati, prema razdaljini, potrošnji automobila i ceni goriva.",
    intro: [
      `Unesite razdaljinu, potrošnju svog automobila i cenu po ${imperial ? "galonu" : "litru"}. Videćete koliko goriva vam treba i koliko košta put.`,
      imperial ? "Potrošnja se izražava u miljama po galonu." : "Potrošnju možete da unesete u litrima na 100 km ili u kilometrima po litru.",
    ],
    comoSeCalcula: imperial
      ? ["Galoni = razdaljina ÷ milje po galonu.", "Trošak = galoni × cena po galonu. Ako izaberete „U oba pravca“, razdaljina se udvostručuje."]
      : [
          "U litrima na 100 km: litri = razdaljina × potrošnja ÷ 100.",
          "U kilometrima po litru: litri = razdaljina ÷ potrošnja.",
          "Trošak = litri × cena po litru. Ako izaberete „U oba pravca“, razdaljina se udvostručuje.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Kako pretvoriti milje po galonu u litre na 100 km?",
        respuesta: `Podelite broj ${formatearNumero(ctx, 235.215, 1)} vrednošću mpg (američki galon). Automobil koji pređe 30 milja po galonu troši oko ${formatearNumero(ctx, prevod, 1)} ${litara(prevod)} na 100 km.`,
      },
      {
        pregunta: "Da li su uračunate putarina i parking?",
        respuesta: "Ne. Računa se samo gorivo. Putarinu, vinjete i parking dodajte posebno.",
      },
      {
        pregunta: "Zašto automobil u gradu troši više?",
        respuesta:
          "Vožnja sa čestim zaustavljanjem i kretanjem traži više energije od vožnje autoputem stalnom brzinom. Zato je potrošnja u gradu obično veća.",
      },
    ],
    glosario: [
      { termino: "Potrošnja goriva", definicion: "Koliko goriva automobil potroši na određenu razdaljinu ili koliko pređe sa određenom količinom goriva." },
      { termino: "mpg", definicion: "Milje po galonu. Što je vrednost veća, automobil je štedljiviji." },
    ],
  };
};
