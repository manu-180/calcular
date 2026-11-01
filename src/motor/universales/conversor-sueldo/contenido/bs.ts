import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const sedmica = 52 / 12;
  return {
    h1: "Preračun plate po satu",
    title: tituloQueEntre(
      `Plata po satu, mjesečno i godišnje: izračun ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      `Preračun plate po satu ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      "Preračun plate po satu",
    ),
    description: "Preračunajte platu između sata, dana, sedmice, pola mjeseca, mjeseca i godine, prema svojim radnim satima i plaćenim sedmicama.",
    intro: [
      "Koliko zarađujete po satu? Koliko godišnje donosi ponuda sa satnicom? Unesite iznos, izaberite period i pokazat ćemo vam sva ostala.",
      "Pomaže kada upoređujete ponude za posao, procjenjujete prekovremeni rad ili želite znati koliko vrijedi vaš sat.",
    ],
    comoSeCalcula: [
      "Najprije se sve preračuna na godišnji iznos.",
      "Po satu = godišnji iznos ÷ (sati sedmično × plaćene sedmice).",
      "Po danu = godišnji iznos ÷ (radni dani sedmično × plaćene sedmice). Sedmično = godišnji iznos ÷ plaćene sedmice.",
      "Mjesečno = godišnji iznos ÷ 12. Za pola mjeseca = godišnji iznos ÷ 24.",
    ],
    ejemplo: [
      `Plata od ${m(anual)} godišnje uz 40 sati sedmično odgovara iznosu od ${m(anual / 2080)} po satu i ${m(anual / 12)} mjesečno.`,
      `Ponuda od ${m(hora)} po satu uz puno radno vrijeme donosi ${m(hora * 2080)} godišnje.`,
    ],
    faq: [
      {
        pregunta: "Koliko radnih sati ima godina?",
        respuesta: `Uz 40 sati sedmično i 52 plaćene sedmice to je ${formatearNumero(ctx, 2080)} sati. Za brzu procjenu satnica se zato množi s otprilike ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Zašto sedmična plata puta 4 ne daje mjesečnu?",
        respuesta: `Zato što mjesec u prosjeku nema 4 sedmice, nego 52 ÷ 12, odnosno ${formatearNumero(ctx, sedmica, 2)}. Sedmičnu platu pretvarate u mjesečnu tako da je pomnožite s 52 i podijelite s 12.`,
      },
      {
        pregunta: "Računaju li se bonusi ili porezi?",
        respuesta: "Ne. Kalkulator preračunava isti iznos između perioda. Ako dobijate bonuse, dodajte ih posebno kada upoređujete ponude.",
      },
    ],
    glosario: [
      { termino: "Bruto plata", definicion: "Plata prije odbitka poreza i doprinosa za socijalno osiguranje." },
      { termino: "Isplata dvaput mjesečno", definicion: "Plata koja se svakog mjeseca isplaćuje u dva dijela, odnosno 24 puta godišnje." },
    ],
  };
};
