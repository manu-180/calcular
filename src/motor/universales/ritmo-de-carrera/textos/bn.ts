import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosBn: TextosUi<UiRitmo> = {
  slug: "running-pace",
  ui: () => ({
    calcular: "কী হিসাব করতে চান?",
    calcRitmo: "গতি (দূরত্ব আর সময় থেকে)",
    calcTiempo: "সময় (দূরত্ব আর গতি থেকে)",
    calcDistancia: "দূরত্ব (সময় আর গতি থেকে)",
    distancia: "দূরত্ব",
    distanciaAyuda: "একটি দৌড় বেছে নিন, অথবা নিজে দূরত্ব লিখতে ‘অন্য দূরত্ব’ বেছে নিন।",
    otra: "অন্য দূরত্ব",
    cincoK: "৫ কিলোমিটার",
    diezK: "১০ কিলোমিটার",
    media: "হাফ ম্যারাথন",
    maraton: "ম্যারাথন",
    distanciaOtra: (u) => `অন্য দূরত্ব (${cifrasBn(u)})`,
    horas: "সময়: ঘণ্টা",
    minutos: "সময়: মিনিট",
    segundos: "সময়: সেকেন্ড",
    ritmoMin: (u) => `গতি: প্রতি ${cifrasBn(u)}-এ মিনিট`,
    ritmoSeg: "গতি: সেকেন্ড",
    ritmo: (u) => `গতি (মিনিট/${cifrasBn(u)})`,
    tiempo: "শেষ করার সময়",
    distanciaRes: (u) => `দূরত্ব (${cifrasBn(u)})`,
    velocidad: (u) => `গড় বেগ (${cifrasBn(u)})`,
    errorDistancia: "শূন্যের বেশি একটি দূরত্ব লিখুন।",
    errorTiempo: "সময় লিখুন: ঘণ্টা, মিনিট বা সেকেন্ড।",
    errorRitmo: "গতি লিখুন: প্রতি একক দূরত্বে কত মিনিট আর সেকেন্ড।",
  }),
};
