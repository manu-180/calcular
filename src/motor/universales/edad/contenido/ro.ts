import { deRo } from "../../../i18n/plural";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionRo } from "../../dias-entre-fechas/textos/ro";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Calculator de vârstă",
    title: tituloQueEntre(`Calculator de vârstă: ${ctx.nombrePais}`, "Calculator de vârstă"),
    description: "Aflați vârsta exactă în ani, luni și zile, câte zile ați trăit și cât mai este până la următoarea zi de naștere.",
    intro: [
      "Introduceți data nașterii și vedeți vârsta exactă de azi, inclusiv în luni, săptămâni și zile.",
      "Schimbați a doua dată ca să aflați vârsta cuiva într-o anumită zi sau câți ani va avea.",
    ],
    comoSeCalcula: [
      "Se numără lunile întregi de la naștere până la data aleasă. Fiecare 12 luni formează un an.",
      "Zilele rămase după ultima lună întreagă sunt zilele din vârstă.",
      "Anii bisecți se numără cu cele 366 de zile ale lor.",
    ],
    ejemplo: [
      `O persoană născută pe ${fechaLarga(ctx.locale, nac)} avea pe ${fechaLarga(ctx.locale, ref)} vârsta de ${duracionRo(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Asta înseamnă ${formatearNumero(ctx, total)} ${deRo(total)}zile.`,
    ],
    faq: [
      {
        pregunta: "Cum se calculează vârsta exactă?",
        respuesta: "Se numără anii împliniți, apoi lunile întregi de la ultima zi de naștere și, la final, zilele care rămân.",
      },
      {
        pregunta: "Ce se întâmplă cu cei născuți pe 29 februarie?",
        respuesta: "În anii care nu sunt bisecți, acest calculator folosește 28 februarie ca zi de naștere. Unele legi folosesc în schimb 1 martie.",
      },
      {
        pregunta: "Câte zile am trăit?",
        respuesta: "Uitați-vă la rândul „În zile”. Numără fiecare zi de la naștere până la data aleasă, fără ultima zi.",
      },
    ],
    glosario: [
      { termino: "Vârstă", definicion: "Numărul de ani împliniți de la naștere." },
      { termino: "An bisect", definicion: "Un an de 366 de zile, cu 29 februarie. Vine o dată la patru ani, cu excepția unor ani de sfârșit de secol." },
    ],
  };
};
