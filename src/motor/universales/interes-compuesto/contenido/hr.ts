import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Kalkulator složene kamate",
    title: tituloQueEntre(`Kalkulator složene kamate ${GRAMATICA.hr.para(ctx.nombrePais)}`, "Kalkulator složene kamate", "Složena kamata"),
    description: "Pogledajte kako vaš novac raste uz složenu kamatu i redovite mjesečne uplate: konačni iznos, zarađena kamata i tablica po godinama.",
    intro: [
      "Kod složene kamate pripisana se kamata dodaje ulogu i dalje donosi kamatu. Zato ušteđevina raste sve brže.",
      "Unesite iznos koji danas imate, koliko možete dodavati mjesečno, kamatnu stopu i broj godina. Prikazujemo konačni iznos i koliko od njega čini kamata.",
    ],
    comoSeCalcula: [
      "Konačni iznos = ulog × (1 + i) na potenciju n + mjesečna uplata × ((1 + i) na potenciju n − 1) ÷ i.",
      "Ovdje je i mjesečna stopa koja odgovara odabranom pripisu kamate, a n broj mjeseci.",
      "Mjesečne uplate dodaju se na kraju svakog mjeseca.",
    ],
    ejemplo: [
      `Ako počnete s ${m(capital)} i svakog mjeseca dodate ${m(aporte)} uz kamatu od 7 % godišnje, nakon 10 godina imate ${m(a10)}.`,
      `U sljedećih 10 godina iznos raste na ${m(a20)}. Drugo desetljeće donosi puno više od prvog.`,
    ],
    faq: [
      {
        pregunta: "Koja je razlika između jednostavne i složene kamate?",
        respuesta: "Jednostavna kamata uvijek se računa samo na prvotni ulog. Složena kamata računa se na ulog zajedno s već pripisanom kamatom.",
      },
      {
        pregunta: "Što je pravilo 72?",
        respuesta: "Brza procjena za koliko se godina novac udvostručuje: podijelite 72 godišnjom kamatnom stopom. Uz 6 % godišnje iznos se udvostručuje za oko 12 godina.",
      },
      {
        pregunta: "Koju stopu unijeti?",
        respuesta:
          "Realnu za ono što ćete s novcem raditi. Ako želite vidjeti rezultat u današnjim cijenama, unesite stopu umanjenu za očekivanu inflaciju.",
      },
    ],
    glosario: [
      { termino: "Pripis kamate", definicion: "Dodavanje zarađene kamate ulogu, tako da i ona dalje donosi kamatu." },
      { termino: "Složena kamata", definicion: "Izračun kod kojeg se kamata računa na ulog zajedno s već pripisanom kamatom." },
    ],
  };
};
