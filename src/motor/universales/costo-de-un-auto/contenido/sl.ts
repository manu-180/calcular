import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
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
  const naEnoto = imperial ? "na miljo" : "na kilometer";
  return {
    h1: "Kalkulator stroškov avtomobila",
    title: tituloQueEntre(
      `Koliko stane avtomobil: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      `Stroški avtomobila ${GRAMATICA.sl.en(ctx.nombrePais)}`,
      "Kalkulator stroškov avtomobila",
    ),
    description: "Izračunajte, koliko vas avtomobil res stane na mesec, na leto in na kilometer: gorivo, zavarovanje, registracija, vzdrževanje in izguba vrednosti.",
    intro: [
      "Večina voznikov ve, koliko porabi za gorivo. Le redki prištejejo zavarovanje, vzdrževanje, parkiranje in predvsem vrednost, ki jo avtomobil izgubi vsako leto.",
      "Vnesite svoje stroške in pokazali vam bomo, koliko vas avtomobil res stane. Tako se boste lažje odločili, ali ga kupiti, zamenjati ali izbrati drug prevoz.",
    ],
    comoSeCalcula: [
      imperial
        ? "Gorivo na mesec = milje na mesec ÷ milje na galono × cena na galono."
        : "Gorivo na mesec = kilometri na mesec × litri na 100 km ÷ 100 × cena na liter.",
      "Izguba vrednosti na mesec = vrednost avtomobila × letna izguba ÷ 12.",
      "Dejanski strošek = gorivo + zavarovanje + vzdrževanje + parkiranje + drugi stroški + izguba vrednosti.",
      `Strošek ${naEnoto} = dejanski strošek na mesec ÷ prevožena pot na mesec.`,
    ],
    ejemplo: [
      `Avtomobil v vrednosti ${m(g.precio)}, ki prevozi ${formatearNumero(ctx, g.distancia)} ${imperial ? "milj" : "km"} na mesec, vas stane ${m(mensual)} na mesec, skupaj z izgubo vrednosti.`,
      `To je ${m(mensual * 12)} na leto in ${formatearMonto(ctx, mensual / g.distancia)} ${naEnoto}.`,
    ],
    faq: [
      {
        pregunta: "Kaj je amortizacija avtomobila?",
        respuesta: "To je vrednost, ki jo avtomobil sčasoma izgubi. Ne plačujete je vsak mesec, občutite pa jo ob prodaji. Pri novem avtomobilu je to običajno največja postavka.",
      },
      {
        pregunta: "Zakaj obrok kredita ni upoštevan?",
        respuesta:
          "Del obroka plača sam avtomobil, to pa je že upoštevano kot izguba vrednosti. Če bi sešteli oboje, bi avtomobil šteli dvakrat. Obresti na kredit so dodaten strošek.",
      },
      {
        pregunta: "Kako zmanjšati stroške avtomobila?",
        respuesta:
          "Vsako leto primerjajte ponudbe za obvezno zavarovanje in kasko, pazite na tlak v pnevmatikah, pravočasno hodite na servis in avtomobila ne menjajte prepogosto: največ vrednosti izgubi v prvih letih.",
      },
    ],
    glosario: [
      { termino: "Amortizacija", definicion: "Vrednost, ki jo avtomobil izgubi s časom in uporabo." },
      { termino: `Strošek ${naEnoto}`, definicion: "Povprečni strošek za vsako prevoženo enoto poti, z vsemi upoštevanimi stroški." },
    ],
  };
};
