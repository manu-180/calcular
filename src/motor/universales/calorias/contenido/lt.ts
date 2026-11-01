import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `35 metų vyro, kurio svoris 180 lb, o ūgis 5 ft 10 in, bazinė medžiagų apykaita yra maždaug ${n(basal)} kcal.`,
          `Jei jis mažai juda, svoriui išlaikyti jam reikia apie ${n(basal * FACTORES.sedentaria)} kcal per dieną.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `30 metų moters, kurios svoris 60 kg, o ūgis 165 cm, bazinė medžiagų apykaita yra maždaug ${n(basal)} kcal.`,
          `Kai aktyvumas vidutinis, svoriui išlaikyti jai reikia apie ${n(basal * FACTORES.moderada)} kcal per dieną.`,
        ];
      })();
  return {
    h1: "Kalorijų skaičiuoklė: dienos norma",
    title: tituloQueEntre(`Kalorijų skaičiuoklė: dienos norma (${ctx.nombrePais})`, "Kalorijų skaičiuoklė: dienos norma", "Kalorijų skaičiuoklė"),
    description: "Sužinokite, kiek kalorijų sudeginate per dieną ir kiek jų reikia suvartoti, kad išlaikytumėte svorį, jo numestumėte ar priaugtumėte.",
    intro: [
      "Įveskite savo duomenis ir aktyvumo lygį. Pamatysite bazinę medžiagų apykaitą ir kiek kalorijų sudeginate per įprastą dieną.",
      "Tai orientacinis įvertis. Jis nepakeičia gydytojo ar dietologo konsultacijos.",
    ],
    comoSeCalcula: [
      `Bazinė medžiagų apykaita (Mifflin-St Jeor): 10 × svoris kg + ${n(6.25, 2)} × ūgis cm − 5 × amžius; vyrams pridedama 5, moterims atimama 161.`,
      `Kalorijos svoriui išlaikyti = bazinė medžiagų apykaita × aktyvumo koeficientas. Koeficientas yra nuo ${n(1.2, 1)} (minimalus aktyvumas) iki ${n(1.9, 1)} (labai didelis).`,
      `Metant svorį atimama ${DEFICIT} kcal per dieną, priaugant pridedama ${SUPERAVIT} kcal: tai nedidelis pokytis, kurio galima ilgai laikytis.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kas yra bazinė medžiagų apykaita?",
        respuesta: "Tai energija, kurią organizmas sunaudoja visiškos ramybės būsenoje kvėpavimui, kūno temperatūrai palaikyti ir organų darbui.",
      },
      {
        pregunta: "Kiek kalorijų valgyti norint numesti svorio?",
        respuesta: `Įprastas atspirties taškas yra maždaug ${DEFICIT} kcal per dieną mažiau nei svoriui išlaikyti reikalinga norma. Geriausia ją nustatyti kartu su specialistu.`,
      },
      {
        pregunta: "Kiek tiksli ši formulė?",
        respuesta: "Mifflin-St Jeor formulė yra viena dažniausiai naudojamų, bet ji duoda vidutinę reikšmę. Genetika, raumenų masė ir sveikatos būklė keičia tai, kiek iš tikrųjų sudeginate.",
      },
    ],
    glosario: [
      { termino: "Kalorija (kcal)", definicion: "Energijos vienetas, kurį turi maistas ir kurį sunaudoja organizmas." },
      { termino: "Bazinė medžiagų apykaita", definicion: "Kalorijos, kurias organizmas sudegina visiškos ramybės būsenoje." },
    ],
  };
};
