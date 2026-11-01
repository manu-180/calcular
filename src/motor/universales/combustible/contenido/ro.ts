import { deRo } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Un drum de 150 de mile dus-întors, cu o mașină care face 30 de mile pe galon, consumă ${formatearNumero(ctx, galones)} ${deRo(galones)}galoane.`,
          `La ${m(precio)} galonul, înseamnă ${m(galones * precio)}. Împărțit la 2 persoane, ${m((galones * precio) / 2)} de persoană.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Un drum de 300 km dus-întors, cu o mașină care consumă 8 litri la 100 km, are nevoie de ${formatearNumero(ctx, litros)} ${deRo(litros)}litri.`,
          `La ${m(precio)} litrul, înseamnă ${m(litros * precio)}. Împărțit la 2 persoane, ${m((litros * precio) / 2)} de persoană.`,
        ];
      })();
  return {
    h1: "Calculator consum combustibil",
    title: tituloQueEntre(`Calculator consum combustibil: ${ctx.nombrePais}`, "Calculator consum combustibil", "Consum combustibil"),
    description: "Calculați cât costă combustibilul pentru un drum după distanță, consumul mașinii și prețul carburantului și cât plătește fiecare persoană.",
    intro: [
      `Introduceți distanța, consumul mașinii și prețul pe ${imperial ? "galon" : "litru"}. Vedeți cât combustibil vă trebuie și cât costă drumul.`,
      imperial ? "Consumul se introduce în mile pe galon, ca în fișa mașinii." : "Consumul se poate introduce în litri la 100 km sau în kilometri pe litru.",
    ],
    comoSeCalcula: imperial
      ? ["Galoane = distanța ÷ mile pe galon.", "Cost = galoane × prețul pe galon. Un drum dus-întors dublează distanța."]
      : [
          "Cu litri la 100 km: litri = distanța × consumul ÷ 100.",
          "Cu kilometri pe litru: litri = distanța ÷ consumul.",
          "Cost = litri × prețul pe litru. Un drum dus-întors dublează distanța.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Cum transform kilometrii pe litru în litri la 100 km?",
        respuesta: `Împărțiți 100 la numărul de kilometri pe litru. O mașină care face 12,5 km cu un litru consumă ${formatearNumero(ctx, 100 / 12.5, 1)} litri la 100 km.`,
      },
      {
        pregunta: "Sunt incluse taxele de drum?",
        respuesta: "Nu. Calculatorul acoperă doar combustibilul. Adăugați separat vinieta, taxele de pod și parcarea.",
      },
      {
        pregunta: "De ce consumă mașina mai mult în oraș?",
        respuesta: "Opririle și pornirile repetate cer mai multă energie decât mersul constant pe autostradă, așa că în oraș consumul este de obicei mai mare.",
      },
    ],
    glosario: [
      { termino: "Consum", definicion: "Cât combustibil folosește o mașină pentru o anumită distanță." },
      { termino: "Litri la 100 km", definicion: "Câți litri consumă mașina pentru 100 km. Cu cât este mai mic, cu atât mai bine." },
    ],
  };
};
