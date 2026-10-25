import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSr } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meseci = (n: number) => `${formatearNumero(ctx, n)} ${formaSr(n, "mesec", "meseca", "meseci")}`;
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kalkulator otplate kreditne kartice",
    title: tituloQueEntre(
      `Otplata kreditne kartice: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Otplata kreditne kartice: kalkulator kamate",
      "Kalkulator otplate kreditne kartice",
    ),
    description: "Saznajte za koliko meseci otplaćujete dug na kreditnoj kartici i koliko plaćate kamate, uz fiksnu ili minimalnu mesečnu uplatu.",
    intro: [
      "Kreditna kartica je često najskuplji dug koji imate. Ako plaćate samo minimalnu uplatu, otplata traje godinama, a kamata se gomila.",
      "Unesite dug, godišnju kamatnu stopu i koliko možete da uplaćujete mesečno. Prikazaćemo kada je dug otplaćen, koliko plaćate kamate i plan po mesecima.",
    ],
    comoSeCalcula: [
      "Svakog meseca dodaje se kamata: preostali dug × godišnja stopa ÷ 12.",
      "Zatim se oduzima uplata. Kod minimalne uplate to je procenat duga, ali najmanje propisani iznos.",
      "Postupak se ponavlja dok dug ne padne na nulu. Ako uplata nije veća od kamate, dug nikad ne opada.",
    ],
    ejemplo: [
      `Dug od ${m(saldo)} sa kamatom od 22% godišnje i uplatom od ${m(fijo)} mesečno otplaćujete za ${meseci(conFijo.meses)}, a na kamatu odlazi ${m(conFijo.intereses)}.`,
      `Ako plaćate samo minimalnu uplatu od 3%, otplata traje ${meseci(conMinimo.meses)}, a kamata raste na ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Šta se dešava ako plaćam samo minimalnu uplatu?",
        respuesta:
          "Minimalna uplata se smanjuje zajedno sa dugom, pa svakog meseca plaćate manje, a otplata se razvlači godinama. Ako možete, uplaćujte veći fiksni iznos, makar i malo veći.",
      },
      {
        pregunta: "Da li se isplati prebaciti dug sa kartice na gotovinski kredit?",
        respuesta:
          "Ako je kamatna stopa kredita znatno niža od one na kartici, najčešće da. Uporedite ukupan trošak obe opcije sa svim naknadama, najbolje po EKS.",
      },
      {
        pregunta: "Koju karticu prvo otplatiti?",
        respuesta: "Na svim karticama plaćajte minimum, a ostatak usmerite na onu sa najvišom kamatnom stopom. Tako ukupno plaćate najmanje kamate.",
      },
    ],
    glosario: [
      { termino: "Minimalna uplata", definicion: "Najmanji iznos koji možete da platite mesečno bez kazne. Njime dug ne otplaćujete." },
      { termino: "Godišnja kamatna stopa", definicion: "Stopa koju kartica godišnje obračunava na neotplaćeni dug." },
      { termino: "Beskamatni period", definicion: "Vreme tokom kojeg na kupovinu ne plaćate kamatu ako ceo dug izmirite na vreme." },
    ],
  };
};
