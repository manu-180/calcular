import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Eelarve kalkulaator 50/30/20 reegliga",
    title: tituloQueEntre(
      `Eelarve 50/30/20: jaga oma netosissetulek | ${ctx.nombrePais}`,
      `Eelarve 50/30/20 | ${ctx.nombrePais}`,
      "Eelarve 50/30/20",
    ),
    description: "Jaga oma netosissetulek 50/30/20 reegli järgi. Näed, kui palju läheb vajalikele kuludele, muudele kuludele ja säästmiseks, ning saad osakaale muuta.",
    intro: [
      "Reegel 50/30/20 on lihtne viis kuu rahaasju planeerida. Pool läheb vajalikule, 30% asjadele, mis sulle meeldivad, ja 20% säästmiseks.",
      "Sisesta oma netosissetulek, siis näed, kui palju igale osale läheb. Kui sinu olukord on teistsugune, näiteks üür on kõrge, muuda protsente.",
    ],
    comoSeCalcula: [
      "Vajalikud kulud = sissetulek × 50%.",
      "Muud kulud ja vaba aeg = sissetulek × 30%.",
      "Säästmine = sissetulek × 20%. Kolme osakaalu summa peab olema 100%.",
    ],
    ejemplo: [
      `Kui sinu netosissetulek on kuus ${m(ingreso)}, läheb vajalikele kuludele ${m(ingreso * 0.5)}, muudele kuludele ${m(ingreso * 0.3)} ja säästmiseks ${m(ingreso * 0.2)}.`,
      `Aastas koguneb 20% osakaalust säästu ${m(ingreso * 0.2 * 12)}.`,
    ],
    faq: [
      {
        pregunta: "Mis loetakse vajalikuks ja mis muudeks kuludeks?",
        respuesta:
          "Vajalikud kulud on arved, mida pead maksma, näiteks eluase, toit, elekter, transport, tervis ja laenude miinimummaksed. Muud kulud on asjad, millest saad vajaduse korral loobuda.",
      },
      {
        pregunta: "Mida teha, kui vajalikud kulud on üle 50%?",
        respuesta: "See on tavaline, eriti kui üür on kõrge. Proovi jaotust 60/20/20 või 70/20/10, aga ära vii säästmist nulli.",
      },
      {
        pregunta: "Kas võla tagasimaksmine loetakse säästmiseks?",
        respuesta: "Miinimummaksed kuuluvad vajalike kulude hulka. Kõik, mida maksad lisaks, et võlgadest kiiremini vabaneda, loetakse säästmiseks, sest see parandab sinu rahaasju samamoodi.",
      },
    ],
    glosario: [
      { termino: "Netosissetulek", definicion: "See, mis sulle jääb pärast makse ja muid kinnipidamisi. Palga puhul netopalk." },
      { termino: "Reegel 50/30/20", definicion: "Viis jagada sissetulek vajalike kulude, muude kulude ja säästmise vahel." },
    ],
  };
};
