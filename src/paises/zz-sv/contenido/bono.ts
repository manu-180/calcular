import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-sv.bono",
  h1: "Kalkylator för halvårsbonus i Zetaland",
  title: "Halvårsbonus i Zetaland: räkna ut vad du får",
  description: "Räkna ut din halvårsbonus med gällande minimilön i din zon och tillägget på {{zz.bonificacion}}. Officiella siffror med datum och källa.",
  intro: [
    "Halvårsbonusen är en extra månadslön som betalas ut två gånger om året.",
    "Har du arbetat hela halvåret får du en hel månadslön plus ett tillägg på {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Utgångspunkten är din månadslön före skatt. Är den lägre än minimilönen i din zon används minimilönen.",
    "Lönen multipliceras med antalet arbetade månader och delas med 6.",
    "I ett litet företag blir bonusen hälften.",
    "Tillägget på {{zz.bonificacion}} läggs ovanpå bonusen.",
  ],
  faq: [
    { pregunta: "Vad är minimilönen i norra zonen?", respuesta: "Den är {{zz.minimo@norte}} och gäller sedan {{zz.minimo@norte#desde}}." },
    { pregunta: "Vad händer om jag inte har arbetat hela halvåret?", respuesta: "Du får den del som motsvarar de månader du har arbetat." },
    { pregunta: "Betalas tillägget alltid ut?", respuesta: "Ja. Det är {{zz.bonificacion}} av bonusen och företaget betalar det tillsammans med bonusen." },
  ],
  glosario: [
    { termino: "Halvårsbonus", definicion: "Extra lön som lagen kräver i juli och december." },
    { termino: "Minimilön", definicion: "Den lägsta lön som får betalas för en hel arbetsdag i varje zon." },
  ],
});
