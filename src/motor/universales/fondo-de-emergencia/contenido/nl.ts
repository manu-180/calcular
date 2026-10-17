import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const ondernemer = ctx.locale === "nl-NL" ? "zzp'er" : "zelfstandige";
  return {
    h1: "Financiële buffer berekenen",
    title: tituloQueEntre(`Financiële buffer berekenen in ${ctx.nombrePais}`, "Financiële buffer berekenen", "Buffer berekenen"),
    description: "Bereken hoe groot je financiële buffer moet zijn op basis van je vaste uitgaven, en hoeveel maanden je nodig hebt om hem op te bouwen.",
    intro: [
      "Een buffer is geld dat je opzij zet voor wat je niet kunt plannen: je baan verliezen, ziek worden of een dringende reparatie aan je huis.",
      "Met een buffer hoef je niet rood te staan of te lenen juist als het tegenzit. Vul je noodzakelijke uitgaven in en hoeveel maanden je wilt dekken.",
    ],
    comoSeCalcula: [
      "Aanbevolen buffer = noodzakelijke uitgaven per maand × aantal maanden.",
      "Nog te sparen = aanbevolen buffer − wat je al hebt.",
      "Maanden tot je buffer compleet is = nog te sparen ÷ wat je per maand kunt sparen, naar boven afgerond.",
    ],
    ejemplo: [
      `Met ${m(gastos)} aan noodzakelijke uitgaven per maand is een buffer van 6 maanden ${m(gastos * 6)}.`,
      `Spaar je ${m(aporte)} per maand, dan is je buffer in ${formatearNumero(ctx, Math.ceil((gastos * 6) / aporte))} maanden compleet.`,
    ],
    faq: [
      {
        pregunta: "Hoeveel maanden moet je buffer dekken?",
        respuesta: `De gangbare richtlijn is 3 tot 6 maanden aan noodzakelijke uitgaven. Wisselt je inkomen, ben je ${ondernemer} of is er in je huishouden maar één inkomen, ga dan voor 6 tot 12 maanden.`,
      },
      {
        pregunta: "Waar zet je je buffer neer?",
        respuesta: "Op een veilige plek waar je meteen bij kunt, los van je betaalrekening. Niet om te beleggen: de buffer moet er gewoon zijn als je hem nodig hebt.",
      },
      {
        pregunta: "Eerst een buffer opbouwen of eerst schulden aflossen?",
        respuesta: `Een veelgebruikte aanpak: spaar eerst één maand aan uitgaven, los dan dure schulden af zoals een ${ctx.locale.endsWith("BE") ? "kredietkaart" : "creditcard"} of rood staan, en maak daarna je buffer af.`,
      },
    ],
    glosario: [
      { termino: "Noodzakelijke uitgaven", definicion: "Rekeningen die je moet betalen, ook als je inkomen wegvalt: wonen, eten, energie, zorg." },
      { termino: "Direct opneembaar", definicion: "Geld dat je meteen kunt gebruiken zonder dat het waarde verliest." },
    ],
  };
};
