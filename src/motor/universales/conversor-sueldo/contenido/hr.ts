import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const tjedan = 52 / 12;
  return {
    h1: "Preračun plaće po satu",
    title: tituloQueEntre(
      `Plaća po satu, mjesečno i godišnje: izračun ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      `Preračun plaće po satu ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      "Preračun plaće po satu",
    ),
    description: "Preračunajte plaću između sata, dana, tjedna, pola mjeseca, mjeseca i godine, prema svojim radnim satima i plaćenim tjednima.",
    intro: [
      "Koliko zarađujete po satu? Koliko godišnje donosi ponuda sa satnicom? Unesite iznos, odaberite razdoblje i pokazat ćemo vam sva ostala.",
      "Pomaže kada uspoređujete ponude za posao, procjenjujete prekovremeni rad ili želite znati koliko vrijedi vaš sat.",
    ],
    comoSeCalcula: [
      "Najprije se sve preračuna na godišnji iznos.",
      "Po satu = godišnji iznos ÷ (sati tjedno × plaćeni tjedni).",
      "Po danu = godišnji iznos ÷ (radni dani tjedno × plaćeni tjedni). Tjedno = godišnji iznos ÷ plaćeni tjedni.",
      "Mjesečno = godišnji iznos ÷ 12. Za pola mjeseca = godišnji iznos ÷ 24.",
    ],
    ejemplo: [
      `Plaća od ${m(anual)} godišnje uz 40 sati tjedno odgovara iznosu od ${m(anual / 2080)} po satu i ${m(anual / 12)} mjesečno.`,
      `Ponuda od ${m(hora)} po satu uz puno radno vrijeme donosi ${m(hora * 2080)} godišnje.`,
    ],
    faq: [
      {
        pregunta: "Koliko radnih sati ima godina?",
        respuesta: `Uz 40 sati tjedno i 52 plaćena tjedna to je ${formatearNumero(ctx, 2080)} sati. Za brzu procjenu satnica se zato množi s otprilike ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Zašto tjedna plaća puta 4 ne daje mjesečnu?",
        respuesta: `Zato što mjesec u prosjeku nema 4 tjedna, nego 52 ÷ 12, odnosno ${formatearNumero(ctx, tjedan, 2)}. Tjednu plaću pretvarate u mjesečnu tako da je pomnožite s 52 i podijelite s 12.`,
      },
      {
        pregunta: "Računaju li se bonusi ili porezi?",
        respuesta: "Ne. Kalkulator preračunava isti iznos između razdoblja. Ako dobivate bonuse, dodajte ih posebno kada uspoređujete ponude.",
      },
    ],
    glosario: [
      { termino: "Bruto plaća", definicion: "Plaća prije odbitka poreza i doprinosa za socijalno osiguranje." },
      { termino: "Isplata dvaput mjesečno", definicion: "Plaća koja se svakog mjeseca isplaćuje u dva dijela, odnosno 24 puta godišnje." },
    ],
  };
};
