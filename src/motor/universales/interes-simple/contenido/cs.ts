import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulačka jednoduchého úročení",
    title: tituloQueEntre(`Jednoduché úročení: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Kalkulačka jednoduchého úročení", "Jednoduché úročení"),
    description: "Spočítejte jednoduchý úrok z jistiny při roční sazbě za dny, měsíce nebo roky. Zvolte rok o 365, nebo 360 dnech a uvidíte celkovou částku.",
    intro: [
      "Jednoduchý úrok se počítá vždy z původní jistiny: během doby se úroky k jistině nepřipisují.",
      "Používá se u krátkodobých vkladů, půjček mezi známými a v mnoha školních příkladech.",
    ],
    comoSeCalcula: [
      "Úrok = jistina × roční sazba × doba v letech.",
      "U doby v měsících se dělí 12. U doby ve dnech se dělí 365, nebo 360 podle toho, jaký rok banka používá.",
      "Celkem = jistina + úrok.",
    ],
    ejemplo: [
      `${m(capital)} při sazbě 10 % ročně vynese za 6 měsíců úrok ${m(capital * 0.1 * 0.5)}.`,
      `Stejná jistina vynese za 90 dní ${m((capital * 0.1 * 90) / 365)} při roce o 365 dnech a ${m((capital * 0.1 * 90) / 360)} při roce o 360 dnech.`,
    ],
    faq: [
      {
        pregunta: "Jaký je vzorec pro jednoduché úročení?",
        respuesta: `U = J × i × t. J je jistina, i roční sazba jako desetinné číslo (10 % je ${formatearNumero(ctx, 0.1, 2)}) a t doba v letech.`,
      },
      {
        pregunta: "Čím se liší jednoduché a složené úročení?",
        respuesta: "Jednoduchý úrok se počítá stále ze stejné jistiny. U složeného úročení se úroky připisují k jistině a samy dál vynášejí úrok.",
      },
      {
        pregunta: "Proč některé banky počítají rok jako 360 dní?",
        respuesta: "Je to bankovní zvyklost, která zjednodušuje výpočty. Při 360 dnech vychází úrok o něco vyšší. Ověřte si, jaký rok používá vaše banka.",
      },
    ],
    glosario: [
      { termino: "Jistina", definicion: "Peníze, které se půjčují nebo ukládají, bez úroků." },
      { termino: "Bankovní rok", definicion: "Rok počítaný jako 360 dní, s měsíci po 30 dnech." },
    ],
  };
};
