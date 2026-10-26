import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `En man på 35 år som väger 180 lb och är 5 fot 10 tum lång har en basalmetabolism på ungefär ${n(basal)} kcal.`,
          `Med lite aktivitet behåller han vikten på ungefär ${n(basal * FACTORES.sedentaria)} kcal per dag.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `En kvinna på 30 år som väger 60 kg och är 165 cm lång har en basalmetabolism på ungefär ${n(basal)} kcal.`,
          `Med måttlig aktivitet behåller hon vikten på ungefär ${n(basal * FACTORES.moderada)} kcal per dag.`,
        ];
      })();
  return {
    h1: "Räkna ut ditt kaloribehov",
    title: tituloQueEntre(
      `Kaloribehov: räkna ut kalorier per dag | ${ctx.nombrePais}`,
      `Kaloribehov | ${ctx.nombrePais}`,
      "Kaloribehov",
    ),
    description: "Räkna ut hur många kalorier du gör av med per dag utifrån ålder, vikt, längd och aktivitet, och hur mycket du ska äta för att nå ditt viktmål.",
    intro: [
      "Fyll i dina uppgifter och hur aktiv du är. Du ser din basalmetabolism och ditt energibehov en vanlig dag.",
      "Det är en ungefärlig uppskattning. Det ersätter inte en bedömning av dietist, läkare eller annan vårdpersonal.",
    ],
    comoSeCalcula: [
      `Basalmetabolism (Mifflin-St Jeor): 10 × vikt i kg + ${n(6.25, 2)} × längd i cm − 5 × ålder, plus 5 för män eller minus 161 för kvinnor.`,
      `Energibehov = basalmetabolism × aktivitetsfaktor, från ${n(1.2, 1)} (lite aktivitet) till ${n(1.9, 1)} (mycket hög).`,
      `För att gå ner dras ${DEFICIT} kcal av per dag, och för att gå upp läggs ${SUPERAVIT} till. Det är en måttlig förändring som går att hålla.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Vad är basalmetabolism?",
        respuesta: "Det är den energi kroppen använder i fullständig vila för att andas, hålla värmen och hålla organen igång.",
      },
      {
        pregunta: "Hur många kalorier ska jag äta för att gå ner i vikt?",
        respuesta: `En vanlig utgångspunkt är ungefär ${DEFICIT} kcal mindre per dag än ditt energibehov. Det är bäst att bestämma det tillsammans med vårdpersonal.`,
      },
      {
        pregunta: "Hur exakt är formeln?",
        respuesta: "Mifflin-St Jeor är en av de mest använda formlerna, men den ger ett genomsnitt. Arv, muskelmassa och hälsa påverkar vad du faktiskt gör av med.",
      },
    ],
    glosario: [
      { termino: "Kalori (kcal)", definicion: "Enheten för energi i maten och för det kroppen förbrukar." },
      { termino: "Basalmetabolism", definicion: "De kalorier kroppen gör av med i fullständig vila." },
    ],
  };
};
