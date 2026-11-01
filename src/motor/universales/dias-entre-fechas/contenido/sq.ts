import { pluralSq } from "../../../i18n/plural";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Kalkulator ditësh midis dy datave",
    title: tituloQueEntre(`Kalkulator ditësh midis dy datave: ${ctx.nombrePais}`, "Kalkulator ditësh midis dy datave"),
    description: "Gjeni sa ditë ka midis dy datave: ditë kalendarike, javë, muaj dhe ditë pune nga e hëna në të premte.",
    intro: [
      "Zgjidhni datën e fillimit dhe datën e mbarimit. Shikoni ditët kalendarike, të njëjtën periudhë në javë dhe muaj, si dhe ditët e punës.",
      "Ju ndihmon për afate, skadenca, pushime, shtatzëni ose një numërim mbrapsht.",
    ],
    comoSeCalcula: [
      "Ditët kalendarike janë të gjitha ditët midis dy datave. Dita e parë numërohet, e fundit jo, përveçse nëse shënoni opsionin.",
      "Ditët e punës janë ditët nga e hëna në të premte të së njëjtës periudhë. Festat zyrtare nuk zbriten.",
      "Vitet e brishta numërohen me 29 shkurtin.",
    ],
    ejemplo: [`Nga ${f(desde)} deri më ${f(hasta)} janë ${pluralSq(dias, "ditë kalendarike", "ditë kalendarike")}.`, `Prej tyre, ${pluralSq(habiles, "ditë bie", "ditë bien")} nga e hëna në të premte.`],
    faq: [
      {
        pregunta: "A numërohet dita e parë apo e fundit?",
        respuesta: "Si parazgjedhje numërohet dita e parë dhe jo e fundit, si kur zbritni dy data. Nëse ju duhen të dyja, shënoni “Përfshini edhe ditën e fundit”.",
      },
      {
        pregunta: "A i përjashtojnë ditët e punës festat zyrtare?",
        respuesta: "Jo. Numërohen nga e hëna në të premte. Festat ndryshojnë nga një vend në tjetrin dhe nga një vit në tjetrin, ndaj zbritini veçmas.",
      },
      {
        pregunta: "Sa ditë ka një vit?",
        respuesta: "365 ditë, ose 366 në vitet e brishta. Prandaj, të njëjtat dy data mund të kenë një numër të ndryshëm ditësh midis tyre në vite të ndryshme.",
      },
    ],
    glosario: [
      { termino: "Ditë kalendarike", definicion: "Të gjitha ditët e kalendarit, përfshirë fundjavat dhe festat." },
      { termino: "Ditë pune", definicion: "Në këtë kalkulator, ditët nga e hëna në të premte." },
    ],
  };
};
