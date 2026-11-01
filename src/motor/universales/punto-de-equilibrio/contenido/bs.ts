import { GRAMATICA } from "../../../i18n/gramatica";
import { formaBs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const komadi = (n: number) => `${formatearNumero(ctx, n)} ${formaBs(n, "komad", "komada", "komada")}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Kalkulator tačke pokrića",
    title: tituloQueEntre(`Tačka pokrića: kalkulator ${GRAMATICA.bs.para(ctx.nombrePais)}`, "Tačka pokrića: izračun online", "Kalkulator tačke pokrića"),
    description: "Saznajte koliko komada trebate prodati i koliki vam prihod treba svakog mjeseca da pokrijete troškove i ostvarite ciljanu dobit.",
    intro: [
      "Tačka pokrića (prag rentabilnosti) obim je prodaje pri kojem firma niti zarađuje niti gubi. Ispod nje ste u gubitku, iznad nje počinjete zarađivati.",
      "Unesite fiksne troškove, cijenu i trošak jednog komada. Pokazat ćemo vam koliko trebate prodati da pokrijete troškove i ispunite svoj cilj.",
    ],
    comoSeCalcula: [
      "Marža pokrića = cijena − varijabilni trošak po komadu.",
      "Tačka pokrića u komadima = fiksni troškovi ÷ marža pokrića, zaokruženo naviše.",
      "Tačka pokrića u prihodu = fiksni troškovi ÷ (marža pokrića ÷ cijena).",
      "Za ciljanu dobit dodajte je fiksnim troškovima i računajte na isti način.",
    ],
    ejemplo: [
      `Uz fiksne troškove od ${m(fijos)}, cijenu od ${m(precio)} i varijabilni trošak od ${m(variable)}, svaka vam prodaja ostavlja ${m(precio - variable)}.`,
      `Da pokrijete troškove, trebate prodati ${komadi(base.unidades)} (prihod ${m(base.facturacion)}), a za dobit od ${m(objetivo)} mjesečno ${komadi(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Šta su fiksni, a šta varijabilni troškovi?",
        respuesta:
          "Fiksni troškovi ostaju isti i kada ništa ne prodate: najam, fiksne plate, režije. Varijabilni troškovi rastu sa svakom prodajom: roba, materijal, provizije, dostava.",
      },
      {
        pregunta: "Kako spustiti tačku pokrića?",
        respuesta: "Imate tri poluge: višu cijenu, manji varijabilni trošak po komadu ili niže fiksne troškove. Najviše obično donosi cijena.",
      },
      {
        pregunta: "Vrijedi li ovo i za usluge?",
        respuesta: "Da. Komad može biti sat rada, konzultacija ili klijent mjesečno. Kao varijabilni trošak unesite koliko vas košta svaki od njih.",
      },
    ],
    glosario: [
      { termino: "Tačka pokrića", definicion: "Obim prodaje pri kojem je prihod jednak troškovima." },
      { termino: "Marža pokrića", definicion: "Koliko svaka prodaja ostavlja za pokriće fiksnih troškova." },
    ],
  };
};
