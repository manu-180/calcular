import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Kalkulator složene kamate",
    title: tituloQueEntre(`Kalkulator složene kamate ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Kalkulator složene kamate", "Složena kamata"),
    description: "Pogledajte kako vaš novac raste uz složenu kamatu i redovne mesečne uplate: konačan iznos, zarađena kamata i tabela po godinama.",
    intro: [
      "Kod složene kamate pripisana kamata se dodaje ulogu i dalje donosi kamatu. Zato ušteđevina raste sve brže.",
      "Unesite iznos koji danas imate, koliko možete da dodajete mesečno, kamatnu stopu i broj godina. Prikazujemo konačan iznos i koliko od njega čini kamata.",
    ],
    comoSeCalcula: [
      "Konačan iznos = ulog × (1 + i) na stepen n + mesečna uplata × ((1 + i) na stepen n − 1) ÷ i.",
      "Ovde je i mesečna stopa koja odgovara izabranom pripisivanju kamate, a n broj meseci.",
      "Mesečne uplate se dodaju na kraju svakog meseca.",
    ],
    ejemplo: [
      `Ako počnete sa ${m(capital)} i svakog meseca dodate ${m(aporte)} uz kamatu od 7% godišnje, posle 10 godina imate ${m(a10)}.`,
      `Za narednih 10 godina iznos raste na ${m(a20)}. Druga decenija donosi mnogo više od prve.`,
    ],
    faq: [
      {
        pregunta: "Koja je razlika između proste i složene kamate?",
        respuesta: "Prosta kamata se uvek računa samo na prvobitni ulog. Složena kamata se računa na ulog zajedno sa već pripisanom kamatom.",
      },
      {
        pregunta: "Šta je pravilo 72?",
        respuesta: "Brza procena za koliko godina se novac udvostručuje: podelite 72 godišnjom kamatnom stopom. Uz 6% godišnje iznos se udvostručuje za oko 12 godina.",
      },
      {
        pregunta: "Koju stopu da unesem?",
        respuesta:
          "Realnu za ono što ćete sa novcem raditi. Ako želite da rezultat vidite u današnjim cenama, unesite stopu umanjenu za očekivanu inflaciju.",
      },
    ],
    glosario: [
      { termino: "Pripisivanje kamate", definicion: "Dodavanje zarađene kamate ulogu, tako da i ona dalje donosi kamatu." },
      { termino: "Složena kamata", definicion: "Obračun kod kojeg se kamata računa na ulog zajedno sa već pripisanom kamatom." },
    ],
  };
};
