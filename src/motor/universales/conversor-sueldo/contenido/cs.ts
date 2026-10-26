import { GRAMATICA } from "../../../i18n/gramatica";
import { formaCs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const tydnu = 52 / 12;
  return {
    h1: "Přepočet hodinové mzdy",
    title: tituloQueEntre(
      `Hodinová, měsíční a roční mzda: přepočet ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      `Přepočet hodinové mzdy ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Přepočet hodinové mzdy",
    ),
    description: "Přepočítejte mzdu mezi hodinou, dnem, týdnem, půlměsícem, měsícem a rokem podle vašich hodin a placených týdnů.",
    intro: [
      "Kolik vyděláváte za hodinu? Kolik za rok dá nabídka s hodinovou mzdou? Zadejte částku, vyberte období a ukážeme vám všechna ostatní.",
      "Pomůže vám to porovnat pracovní nabídky, odhadnout přesčasy nebo zjistit, kolik má váš čas hodnotu.",
    ],
    comoSeCalcula: [
      "Nejdřív se všechno přepočítá na roční částku.",
      "Za hodinu = roční částka ÷ (hodiny týdně × placené týdny).",
      "Za den = roční částka ÷ (dny v týdnu × placené týdny). Za týden = roční částka ÷ placené týdny.",
      "Za měsíc = roční částka ÷ 12. Za půl měsíce = roční částka ÷ 24.",
    ],
    ejemplo: [
      `Mzda ${m(anual)} ročně při 40 hodinách týdně odpovídá ${m(anual / 2080)} za hodinu a ${m(anual / 12)} měsíčně.`,
      `Nabídka ${m(hora)} za hodinu na plný úvazek dá ${m(hora * 2080)} za rok.`,
    ],
    faq: [
      {
        pregunta: "Kolik pracovních hodin má rok?",
        respuesta: `Při 40 hodinách týdně a 52 placených týdnech vychází ${formatearNumero(ctx, 2080)} hodin. Pro rychlý odhad se proto hodinová sazba násobí zhruba číslem ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Proč týdenní mzda krát 4 nedává měsíční?",
        respuesta: `Protože měsíc má v průměru ${formatearNumero(ctx, tydnu, 2)} ${formaCs(tydnu, "týden", "týdny", "týdnů", "týdne")}, ne 4. Z týdenní mzdy na měsíční se dostanete, když ji vynásobíte 52 a vydělíte 12.`,
      },
      {
        pregunta: "Počítá se s prémiemi nebo daněmi?",
        respuesta: "Ne. Kalkulačka přepočítává stejnou částku mezi obdobími. Pokud dostáváte prémie, připočtěte je zvlášť, když porovnáváte nabídky.",
      },
    ],
    glosario: [
      { termino: "Hrubá mzda", definicion: "Mzda před odečtením daně z příjmů a sociálního a zdravotního pojištění." },
      { termino: "Výplata dvakrát měsíčně", definicion: "Mzda vyplácená ve dvou částech každý měsíc, tedy 24krát ročně." },
    ],
  };
};
