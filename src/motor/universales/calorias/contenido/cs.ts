import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Muž ve věku 35 let s hmotností 180 lb a výškou 5 ft 10 in má bazální metabolismus zhruba ${n(basal)} kcal.`,
          `Pokud se málo hýbe, na udržení hmotnosti potřebuje kolem ${n(basal * FACTORES.sedentaria)} kcal denně.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Žena ve věku 30 let s hmotností 60 kg a výškou 165 cm má bazální metabolismus zhruba ${n(basal)} kcal.`,
          `Při střední aktivitě potřebuje na udržení hmotnosti kolem ${n(basal * FACTORES.moderada)} kcal denně.`,
        ];
      })();
  return {
    h1: "Kalkulačka kalorií: denní příjem",
    title: tituloQueEntre(`Kalkulačka kalorií: denní příjem (${ctx.nombrePais})`, "Kalkulačka kalorií: denní příjem", "Kalkulačka kalorií"),
    description: "Zjistěte, kolik kalorií denně spálíte a kolik byste měli sníst, abyste udrželi hmotnost, zhubli nebo přibrali.",
    intro: [
      "Zadejte své údaje a míru aktivity. Uvidíte bazální metabolismus a kolik kalorií spálíte v běžném dni.",
      "Jde o orientační odhad. Nenahrazuje konzultaci s lékařem ani nutričním terapeutem.",
    ],
    comoSeCalcula: [
      `Bazální metabolismus (Mifflin-St Jeor): 10 × hmotnost v kg + ${n(6.25, 2)} × výška v cm − 5 × věk; u mužů se přičítá 5, u žen se odečítá 161.`,
      `Kalorie na udržení hmotnosti = bazální metabolismus × koeficient aktivity. Koeficient je od ${n(1.2, 1)} (minimální aktivita) do ${n(1.9, 1)} (velmi vysoká).`,
      `Na hubnutí se od příjmu odečítá ${DEFICIT} kcal denně, na přibírání se přičítá ${SUPERAVIT} kcal: mírná změna, kterou se dá dlouho dodržovat.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Co je bazální metabolismus?",
        respuesta: "Je to energie, kterou tělo spotřebuje v úplném klidu na dýchání, udržení teploty a práci orgánů.",
      },
      {
        pregunta: "Kolik kalorií jíst na hubnutí?",
        respuesta: `Běžný výchozí bod je zhruba o ${DEFICIT} kcal denně méně, než je příjem na udržení hmotnosti. Nejlepší je stanovit ho spolu s odborníkem.`,
      },
      {
        pregunta: "Jak přesný je vzorec?",
        respuesta: "Vzorec Mifflin-St Jeor patří k nejpoužívanějším, ale dává průměrnou hodnotu. Genetika, svalová hmota a zdravotní stav mění to, kolik skutečně spálíte.",
      },
    ],
    glosario: [
      { termino: "Kalorie (kcal)", definicion: "Jednotka energie, kterou obsahuje jídlo a kterou tělo spotřebovává." },
      { termino: "Bazální metabolismus", definicion: "Kalorie, které tělo spálí v úplném klidu." },
    ],
  };
};
