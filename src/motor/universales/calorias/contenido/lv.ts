import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Vīrietim 35 gadu vecumā, ar svaru 180 lb un augumu 5 ft 10 in, bazālā vielmaiņa ir aptuveni ${n(basal)} kcal.`,
          `Ja viņš maz kustas, svara saglabāšanai vajag ap ${n(basal * FACTORES.sedentaria)} kcal dienā.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Sievietei 30 gadu vecumā, ar svaru 60 kg un augumu 165 cm, bazālā vielmaiņa ir aptuveni ${n(basal)} kcal.`,
          `Ja aktivitāte ir vidēja, svara saglabāšanai vajag ap ${n(basal * FACTORES.moderada)} kcal dienā.`,
        ];
      })();
  return {
    h1: "Kaloriju kalkulators: dienas norma",
    title: tituloQueEntre(`Kaloriju kalkulators: dienas norma (${ctx.nombrePais})`, "Kaloriju kalkulators: dienas norma", "Kaloriju kalkulators"),
    description: "Uzziniet, cik kaloriju sadedzināt dienā un cik jāuzņem, lai saglabātu, samazinātu vai palielinātu svaru.",
    intro: [
      "Ievadiet savus datus un aktivitātes līmeni. Redzēsiet bazālo vielmaiņu un to, cik kaloriju sadedzināt parastā dienā.",
      "Tas ir orientējošs novērtējums. Tas neaizstāj ārsta vai uztura speciālista konsultāciju.",
    ],
    comoSeCalcula: [
      `Bazālā vielmaiņa (Mifflina-Sentžora formula): 10 × svars kg + ${n(6.25, 2)} × augums cm − 5 × vecums; vīriešiem pieskaita 5, sievietēm atņem 161.`,
      `Kalorijas svara saglabāšanai = bazālā vielmaiņa × aktivitātes koeficients. Koeficients ir no ${n(1.2, 1)} (minimāla aktivitāte) līdz ${n(1.9, 1)} (ļoti augsta).`,
      `Samazinot svaru, atņem ${DEFICIT} kcal dienā, palielinot pieskaita ${SUPERAVIT} kcal: tā ir neliela izmaiņa, ko var ilgi ievērot.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kas ir bazālā vielmaiņa?",
        respuesta: "Tā ir enerģija, ko organisms pilnīgā miera stāvoklī patērē elpošanai, ķermeņa temperatūras uzturēšanai un orgānu darbam.",
      },
      {
        pregunta: "Cik kaloriju ēst, lai samazinātu svaru?",
        respuesta: `Ierasts sākumpunkts ir aptuveni par ${DEFICIT} kcal dienā mazāk nekā svara saglabāšanai vajadzīgā norma. Vislabāk to noteikt kopā ar speciālistu.`,
      },
      {
        pregunta: "Cik precīza ir šī formula?",
        respuesta: "Mifflina-Sentžora formula ir viena no visbiežāk izmantotajām, taču tā dod vidējo vērtību. Ģenētika, muskuļu masa un veselības stāvoklis maina to, cik patiesībā sadedzināt.",
      },
    ],
    glosario: [
      { termino: "Kalorija (kcal)", definicion: "Enerģijas mērvienība, kas ir pārtikā un ko patērē organisms." },
      { termino: "Bazālā vielmaiņa", definicion: "Kalorijas, ko organisms sadedzina pilnīgā miera stāvoklī." },
    ],
  };
};
