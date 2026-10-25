import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSr } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const komadi = (n: number) => `${formatearNumero(ctx, n)} ${formaSr(n, "komad", "komada", "komada")}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Kalkulator praga rentabilnosti",
    title: tituloQueEntre(`Prag rentabilnosti: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Prag rentabilnosti: obračun onlajn", "Kalkulator praga rentabilnosti"),
    description: "Saznajte koliko komada treba da prodate i koliki prihod vam treba svakog meseca da pokrijete troškove i ostvarite ciljnu dobit.",
    intro: [
      "Prag rentabilnosti (tačka pokrića) je obim prodaje pri kojem firma niti zarađuje niti gubi. Ispod njega ste u gubitku, iznad njega počinjete da zarađujete.",
      "Unesite fiksne troškove, cenu i trošak jednog komada. Pokazaćemo vam koliko treba prodati da pokrijete troškove i ispunite svoj cilj.",
    ],
    comoSeCalcula: [
      "Marža pokrića = cena − varijabilni trošak po komadu.",
      "Prag rentabilnosti u komadima = fiksni troškovi ÷ marža pokrića, zaokruženo naviše.",
      "Prag rentabilnosti u prihodu = fiksni troškovi ÷ (marža pokrića ÷ cena).",
      "Za ciljnu dobit dodajte je fiksnim troškovima i računajte na isti način.",
    ],
    ejemplo: [
      `Uz fiksne troškove od ${m(fijos)}, cenu od ${m(precio)} i varijabilni trošak od ${m(variable)}, svaka prodaja vam ostavlja ${m(precio - variable)}.`,
      `Da pokrijete troškove, treba da prodate ${komadi(base.unidades)} (prihod ${m(base.facturacion)}), a za dobit od ${m(objetivo)} mesečno ${komadi(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Šta su fiksni, a šta varijabilni troškovi?",
        respuesta:
          "Fiksni troškovi ostaju isti i kada ništa ne prodate: zakup, fiksne plate, režije. Varijabilni troškovi rastu sa svakom prodajom: roba, materijal, provizije, dostava.",
      },
      {
        pregunta: "Kako da spustite prag rentabilnosti?",
        respuesta: "Imate tri poluge: veću cenu, manji varijabilni trošak po komadu ili niže fiksne troškove. Najviše obično donosi cena.",
      },
      {
        pregunta: "Da li ovo važi i za usluge?",
        respuesta: "Da. Komad može biti sat rada, konsultacija ili klijent mesečno. Kao varijabilni trošak unesite koliko vas košta svaki od njih.",
      },
    ],
    glosario: [
      { termino: "Prag rentabilnosti", definicion: "Obim prodaje pri kojem je prihod jednak troškovima." },
      { termino: "Marža pokrića", definicion: "Koliko svaka prodaja ostavlja za pokriće fiksnih troškova." },
    ],
  };
};
