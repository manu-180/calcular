import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
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
      `Koliko košta automobil: kalkulator ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      `Troškovi automobila ${GRAMATICA.bs.en(ctx.nombrePais)}`,
      "Kalkulator troškova automobila",
    ),
    description: "Izračunajte koliko vas automobil zaista košta mjesečno, godišnje i po kilometru: gorivo, osiguranje, registracija, održavanje i gubitak vrijednosti.",
    intro: [
      "Većina vozača zna koliko troši na gorivo. Malo ko dodaje osiguranje, održavanje, parkiranje i, prije svega, vrijednost koju automobil gubi svake godine.",
      "Unesite svoje troškove i pokazat ćemo vam koliko vas automobil zaista košta. Tako ćete lakše odlučiti hoćete li ga kupiti, zamijeniti ili odabrati drugi prevoz.",
    ],
    comoSeCalcula: [
      imperial
        ? "Gorivo mjesečno = milje mjesečno ÷ milje po galonu × cijena po galonu."
        : "Gorivo mjesečno = kilometri mjesečno × litre na 100 km ÷ 100 × cijena po litri.",
      "Gubitak vrijednosti mjesečno = vrijednost automobila × godišnji gubitak ÷ 12.",
      "Stvarni trošak = gorivo + osiguranje + održavanje + parkiranje + ostali troškovi + gubitak vrijednosti.",
      `Trošak ${poJedinici} = stvarni trošak mjesečno ÷ pređeni put mjesečno.`,
    ],
    ejemplo: [
      `Automobil vrijedan ${m(g.precio)} koji pređe ${formatearNumero(ctx, g.distancia)} ${imperial ? "milja" : "km"} mjesečno košta vas ${m(mensual)} mjesečno, s gubitkom vrijednosti.`,
      `To je ${m(mensual * 12)} godišnje i ${formatearMonto(ctx, mensual / g.distancia)} ${poJedinici}.`,
    ],
    faq: [
      {
        pregunta: "Šta je amortizacija automobila?",
        respuesta: "To je vrijednost koju automobil s vremenom gubi. Ne plaćate je svaki mjesec, ali je osjetite pri prodaji. Kod novog automobila to je obično najveća stavka.",
      },
      {
        pregunta: "Zašto se ne računa rata kredita?",
        respuesta:
          "Dio rate plaća sam automobil, a to je već uračunato kao gubitak vrijednosti. Kad bi se sabralo oboje, automobil bi se računao dvaput. Kamata na kredit dodatni je trošak.",
      },
      {
        pregunta: "Kako smanjiti troškove automobila?",
        respuesta:
          "Svake godine uporedite ponude za obavezno osiguranje i kasko, pazite na pritisak u gumama, idite na servis na vrijeme i ne mijenjajte automobil prečesto: najviše vrijednosti gubi u prvim godinama.",
      },
    ],
    glosario: [
      { termino: "Amortizacija", definicion: "Vrijednost koju automobil gubi s vremenom i korištenjem." },
      { termino: `Trošak ${poJedinici}`, definicion: "Prosječan trošak za svaku pređenu jedinicu puta, sa svim uračunatim troškovima." },
    ],
  };
};
