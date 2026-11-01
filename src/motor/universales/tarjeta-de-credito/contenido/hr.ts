import { GRAMATICA } from "../../../i18n/gramatica";
import { formaHr } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mjeseci = (n: number) => `${formatearNumero(ctx, n)} ${formaHr(n, "mjesec", "mjeseca", "mjeseci")}`;
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kalkulator otplate kreditne kartice",
    title: tituloQueEntre(
      `Otplata kreditne kartice: kalkulator ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      "Otplata kreditne kartice: kalkulator kamate",
      "Kalkulator otplate kreditne kartice",
    ),
    description: "Saznajte za koliko mjeseci otplaćujete dug na kreditnoj kartici i koliko plaćate kamate, uz fiksnu ili minimalnu mjesečnu uplatu.",
    intro: [
      "Kreditna kartica često je najskuplji dug koji imate. Ako plaćate samo minimalnu uplatu, otplata traje godinama, a kamata se gomila.",
      "Unesite dug, godišnju kamatnu stopu i koliko možete uplaćivati mjesečno. Prikazat ćemo kada je dug otplaćen, koliko plaćate kamate i plan po mjesecima.",
    ],
    comoSeCalcula: [
      "Svakog mjeseca dodaje se kamata: preostali dug × godišnja stopa ÷ 12.",
      "Zatim se oduzima uplata. Kod minimalne uplate to je postotak duga, ali najmanje propisani iznos.",
      "Postupak se ponavlja dok dug ne padne na nulu. Ako uplata nije veća od kamate, dug se nikad ne smanjuje.",
    ],
    ejemplo: [
      `Dug od ${m(saldo)} s kamatom od 22 % godišnje i uplatom od ${m(fijo)} mjesečno otplaćujete za ${mjeseci(conFijo.meses)}, a na kamatu odlazi ${m(conFijo.intereses)}.`,
      `Ako plaćate samo minimalnu uplatu od 3 %, otplata traje ${mjeseci(conMinimo.meses)}, a kamata raste na ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Što se događa ako plaćam samo minimalnu uplatu?",
        respuesta:
          "Minimalna uplata smanjuje se zajedno s dugom, pa svakog mjeseca plaćate manje, a otplata se razvlači godinama. Ako možete, uplaćujte veći fiksni iznos, makar i malo veći.",
      },
      {
        pregunta: "Isplati li se prebaciti dug s kartice na gotovinski kredit?",
        respuesta:
          "Ako je kamatna stopa kredita znatno niža od one na kartici, najčešće da. Usporedite ukupni trošak obiju opcija sa svim naknadama, najbolje prema EKS-u.",
      },
      {
        pregunta: "Koju karticu prvo otplatiti?",
        respuesta: "Na svim karticama plaćajte minimum, a ostatak usmjerite na onu s najvišom kamatnom stopom. Tako ukupno plaćate najmanje kamate.",
      },
    ],
    glosario: [
      { termino: "Minimalna uplata", definicion: "Najmanji iznos koji možete platiti mjesečno bez kazne. Njome dug ne otplaćujete." },
      { termino: "Godišnja kamatna stopa", definicion: "Stopa koju kartica godišnje računa na neotplaćeni dug." },
      { termino: "Beskamatno razdoblje", definicion: "Vrijeme tijekom kojeg na kupnje ne plaćate kamatu ako cijeli dug podmirite na vrijeme." },
    ],
  };
};
