import { formaHr } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const litara = (x: number) => formaHr(x, "litra", "litre", "litara");
  const galona = (x: number) => formaHr(x, "galon", "galona", "galona");
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Za put od 150 milja u oba smjera, automobilu koji prijeđe 30 milja po galonu treba ${formatearNumero(ctx, galones)} ${galona(galones)} goriva.`,
          `Uz cijenu od ${m(precio)} po galonu, to iznosi ${m(galones * precio)}. Ako trošak dijele 2 osobe, svaka plaća ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Za put od 300 km u oba smjera, automobilu koji troši 8 litara na 100 km treba ${formatearNumero(ctx, litros)} ${litara(litros)} goriva.`,
          `Uz cijenu od ${m(precio)} po litri, to iznosi ${m(litros * precio)}. Ako trošak dijele 2 osobe, svaka plaća ${m((litros * precio) / 2)}.`,
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
      "Izračunajte koliko goriva trošite na put i koliko će vas to koštati, prema udaljenosti, potrošnji automobila i cijeni goriva.",
    intro: [
      `Unesite udaljenost, potrošnju svog automobila i cijenu po ${imperial ? "galonu" : "litri"}. Vidjet ćete koliko vam goriva treba i koliko košta put.`,
      imperial ? "Potrošnja se izražava u miljama po galonu." : "Potrošnju možete unijeti u litrama na 100 km ili u kilometrima po litri.",
    ],
    comoSeCalcula: imperial
      ? ["Galoni = udaljenost ÷ milje po galonu.", "Trošak = galoni × cijena po galonu. Ako odaberete „U oba smjera”, udaljenost se udvostručuje."]
      : [
          "U litrama na 100 km: litre = udaljenost × potrošnja ÷ 100.",
          "U kilometrima po litri: litre = udaljenost ÷ potrošnja.",
          "Trošak = litre × cijena po litri. Ako odaberete „U oba smjera”, udaljenost se udvostručuje.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Kako pretvoriti milje po galonu u litre na 100 km?",
        respuesta: `Podijelite broj ${formatearNumero(ctx, 235.215, 1)} vrijednošću mpg (američki galon). Automobil koji prijeđe 30 milja po galonu troši oko ${formatearNumero(ctx, prevod, 1)} ${litara(prevod)} na 100 km.`,
      },
      {
        pregunta: "Jesu li uračunati cestarina i parkiranje?",
        respuesta: "Ne. Računa se samo gorivo. Cestarinu, vinjete i parkiranje dodajte zasebno.",
      },
      {
        pregunta: "Zašto automobil u gradu troši više?",
        respuesta:
          "Vožnja s čestim zaustavljanjem i kretanjem traži više energije od vožnje autocestom stalnom brzinom. Zato je potrošnja u gradu obično veća.",
      },
    ],
    glosario: [
      { termino: "Potrošnja goriva", definicion: "Koliko goriva automobil potroši na određenoj udaljenosti ili koliko prijeđe s određenom količinom goriva." },
      { termino: "mpg", definicion: "Milje po galonu. Što je vrijednost veća, automobil je štedljiviji." },
    ],
  };
};
