import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const poJedinici = imperial ? "po milji" : "po kilometru";
  return {
    h1: "Kalkulator troškova automobila",
    title: tituloQueEntre(
      `Koliko košta automobil: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      `Troškovi automobila ${GRAMATICA.sr.en(ctx.nombrePais)}`,
      "Kalkulator troškova automobila",
    ),
    description: "Izračunajte koliko vas automobil zaista košta mesečno, godišnje i po kilometru: gorivo, osiguranje, registracija, održavanje i gubitak vrednosti.",
    intro: [
      "Većina vozača zna koliko troši na gorivo. Malo ko dodaje osiguranje, održavanje, parking i, pre svega, vrednost koju automobil gubi svake godine.",
      "Unesite svoje troškove i pokazaćemo vam koliko vas automobil zaista košta. Pomoći će vam da odlučite da li da ga kupite, zamenite ili se prevozite drugačije.",
    ],
    comoSeCalcula: [
      imperial
        ? "Gorivo mesečno = milje mesečno ÷ milje po galonu × cena po galonu."
        : "Gorivo mesečno = kilometri mesečno × litri na 100 km ÷ 100 × cena po litru.",
      "Gubitak vrednosti mesečno = vrednost automobila × godišnji gubitak ÷ 12.",
      "Stvarni trošak = gorivo + osiguranje + održavanje + parking + ostali troškovi + gubitak vrednosti.",
      `Trošak ${poJedinici} = stvarni trošak mesečno ÷ pređeni put mesečno.`,
    ],
    ejemplo: [
      `Automobil vredan ${m(g.precio)} koji pređe ${formatearNumero(ctx, g.distancia)} ${imperial ? "milja" : "km"} mesečno košta vas ${m(mensual)} mesečno, sa gubitkom vrednosti.`,
      `To je ${m(mensual * 12)} godišnje i ${formatearMonto(ctx, mensual / g.distancia)} ${poJedinici}.`,
    ],
    faq: [
      {
        pregunta: "Šta je amortizacija automobila?",
        respuesta: "To je vrednost koju automobil vremenom gubi. Ne plaćate je svakog meseca, ali je osetite pri prodaji. Kod novog automobila to je obično najveća stavka.",
      },
      {
        pregunta: "Zašto se ne računa rata kredita?",
        respuesta:
          "Deo rate plaća sam automobil, a to je već uračunato kao gubitak vrednosti. Kada bi se sabralo oboje, automobil bi bio računat dva puta. Kamata na kredit je dodatni trošak.",
      },
      {
        pregunta: "Kako smanjiti troškove automobila?",
        respuesta:
          "Svake godine uporedite ponude za obavezno osiguranje i kasko, pazite na pritisak u gumama, idite na servis na vreme i ne menjajte automobil prečesto: najviše vrednosti gubi u prvim godinama.",
      },
    ],
    glosario: [
      { termino: "Amortizacija", definicion: "Vrednost koju automobil gubi vremenom i korišćenjem." },
      { termino: `Trošak ${poJedinici}`, definicion: "Prosečan trošak za svaku pređenu jedinicu puta, sa uračunatim svim troškovima." },
    ],
  };
};
