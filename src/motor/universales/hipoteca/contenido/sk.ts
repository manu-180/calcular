import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Hypotekárna kalkulačka",
    title: tituloQueEntre(`Hypotekárna kalkulačka: ${ctx.nombrePais}`, "Hypotekárna kalkulačka: splátka a úroky", "Hypotekárna kalkulačka"),
    description: "Vypočítajte mesačnú splátku hypotéky podľa ceny nehnuteľnosti, vlastných zdrojov, úrokovej sadzby a doby splatnosti. Uvidíte aj úroky a zostatok po rokoch.",
    intro: [
      "Hypotéka je pre väčšinu domácností najväčší dlh, aký si kedy vezmú. Oplatí sa vidieť všetky čísla ešte pred rokovaním s bankou.",
      "Zadajte cenu nehnuteľnosti, vlastné zdroje, sadzbu a dobu splatnosti. Ak spolu s hypotékou platíte poistenie alebo daň z nehnuteľností, pridajte ich a uvidíte skutočnú mesačnú sumu.",
    ],
    comoSeCalcula: [
      "Výška úveru = cena nehnuteľnosti − vlastné zdroje.",
      "Mesačná splátka je anuitná (stále rovnaká), s ročnou sadzbou vydelenou 12 a dobou splatnosti v mesiacoch.",
      "Za každý rok sa spočítajú zaplatené úroky a splatená istina a ukáže sa zostatok úveru.",
    ],
    ejemplo: [
      `Nehnuteľnosť za ${m(precio)} s vlastnými zdrojmi 20 % znamená úver ${m(prestado)}. Pri sadzbe 7 % ročne na 30 rokov vychádza mesačná splátka ${m(cuota30)}.`,
      `Za 30 rokov zaplatíte na úrokoch ${m(interesesTotales(prestado, 7, 360))}. Na 15 rokov splátka vzrastie na ${m(cuota15)}, ale úroky klesnú na ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Koľko vlastných zdrojov potrebujem?",
        respuesta:
          "Závisí to od banky a od pravidiel, ktoré v krajine platia; banky zvyčajne požičajú len časť hodnoty nehnuteľnosti. Čím viac vlastných zdrojov máte, tým menej si požičiate, tým nižšia je splátka a tým menej zaplatíte na úrokoch. Odložte si aj peniaze na náklady spojené s vybavením úveru.",
      },
      {
        pregunta: "Prečo dlh v prvých rokoch takmer neklesá?",
        respuesta:
          "Úroky sa počítajú zo zostatku úveru. Na začiatku je veľký, takže väčšina splátky ide na úroky. Postupne sa pomer obracia.",
      },
      {
        pregunta: "Je lepšia kratšia doba splatnosti?",
        respuesta:
          "Ak vyššiu splátku zvládnete, áno: na úrokoch zaplatíte výrazne menej. Ak nie, môže sa hodiť dlhšia splatnosť a mimoriadne splátky, keď to pôjde.",
      },
      {
        pregunta: "Môže sa moja splátka zmeniť?",
        respuesta:
          "Počas fixácie úrokovej sadzby zostáva splátka rovnaká. Po jej skončení vám banka ponúkne novú sadzbu a splátka môže vzrásť alebo klesnúť. Táto kalkulačka počíta s rovnakou sadzbou počas celej doby splatnosti.",
      },
    ],
    glosario: [
      { termino: "Vlastné zdroje", definicion: "Časť ceny nehnuteľnosti, ktorú zaplatíte z vlastných peňazí." },
      { termino: "Istina", definicion: "Suma, ktorú ste si požičali a ešte musíte splatiť." },
      { termino: "Fixácia", definicion: "Obdobie, počas ktorého banka nemení úrokovú sadzbu hypotéky." },
    ],
  };
};
