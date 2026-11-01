import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.sk;
  return {
    h1: `Kalkulačka DPH ${g.para(ctx.nombrePais)}`,
    title: tituloQueEntre(`Kalkulačka DPH (${tasa}) ${g.para(ctx.nombrePais)}`, `Výpočet DPH (${tasa}) ${g.en(ctx.nombrePais)}`, `Kalkulačka DPH (${tasa})`),
    description: `Pripočítajte alebo odpočítajte DPH ${tasa} pri ľubovoľnej cene v jednom kroku: cena bez DPH, samotná daň a cena s DPH, s presnosťou na dve desatinné miesta.`,
    intro: [
      `Základná sadzba, s ktorou kalkulačka ${g.en(ctx.nombrePais)} počíta, je ${tasa}.`,
      "Vyberte, či chcete DPH k cene pripočítať, alebo ju z ceny s DPH odpočítať, a zadajte sumu.",
    ],
    comoSeCalcula: [
      "Pripočítanie DPH: daň = cena bez DPH × sadzba ÷ 100. Cena s DPH = cena bez DPH + daň.",
      "Odpočítanie DPH: cena bez DPH = cena s DPH ÷ (1 + sadzba ÷ 100). Daň je rozdiel oboch cien.",
      "Ak tovar spadá do zníženej sadzby, zadajte ju do poľa „Iná sadzba DPH“.",
    ],
    ejemplo: [
      `Ak chcete pripočítať DPH k cene ${precio}, vynásobte ju sadzbou ${tasa} a výsledok k cene pripočítajte.`,
      `Koľko DPH je v cene ${precio}, zistíte tak, že ju vydelíte jednotkou plus sadzbou a výsledok od ceny odpočítate.`,
    ],
    faq: [
      {
        pregunta: "Ako odpočítať DPH z ceny?",
        respuesta: "Vydeľte cenu číslom 1 plus sadzba ako desatinné číslo. Výsledok je cena bez DPH a rozdiel je samotná daň.",
      },
      {
        pregunta: "Prečo nestačí od ceny s DPH odpočítať percento sadzby?",
        respuesta: "Pretože daň sa počítala z nižšej ceny bez DPH. Ak percento odpočítate z ceny s DPH, odpočítate viac, ako je samotná daň.",
      },
      {
        pregunta: `Platí sa pri všetkom DPH ${tasa}?`,
        respuesta: "Nie vždy. Niektoré potraviny, lieky alebo služby majú zníženú sadzbu alebo sú od dane oslobodené. V tom prípade použite pole „Iná sadzba DPH“.",
      },
    ],
    glosario: [
      { termino: "DPH", definicion: "Daň z pridanej hodnoty. Pripočítava sa k cene tovaru a služieb a odvádza ju platiteľ DPH." },
      { termino: "Cena bez DPH", definicion: "Cena pred pripočítaním dane, v účtovníctve aj základ dane." },
    ],
  };
};
