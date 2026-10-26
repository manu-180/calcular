import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosRo: TextosUi<UiHorasTrabajadas> = {
  slug: "calculator-ore-lucrate",
  ui: () => ({
    dias: ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"],
    entrada: (dia) => `${dia}: ora de început`,
    salida: (dia) => `${dia}: ora de sfârșit`,
    horarioAyuda: "Lăsați goale zilele în care nu ați lucrat. Dacă terminați după miezul nopții, se socotește aceeași tură.",
    pausa: "Pauză neplătită pe zi (minute)",
    pausaAyuda: "Pauza de masă sau de odihnă care nu se plătește. Se scade din fiecare zi lucrată.",
    pagoHora: "Plata pe oră",
    umbral: "Ore normale pe săptămână (opțional)",
    umbralAyuda: "Orele peste acest număr se plătesc ca ore suplimentare. Lăsați câmpul gol dacă nu există ore suplimentare.",
    recargo: "Spor pentru ore suplimentare (%)",
    recargoAyuda: "Cu cât se plătește mai mult fiecare oră suplimentară. 50% înseamnă o dată și jumătate plata normală.",
    horasTotales: "Ore lucrate",
    horasReloj: "În ore și minute",
    horasNormales: "Ore normale",
    horasExtra: "Ore suplimentare",
    pagoNormal: "Plata pentru orele normale",
    pagoExtra: "Plata pentru orele suplimentare",
    pagoTotal: "Total de plată pe săptămână",
    tabla: "Zi cu zi",
    colDia: "Ziua",
    colEntrada: "Început",
    colSalida: "Sfârșit",
    colHoras: "Ore",
    errorFaltaSalida: (dia) => `Pentru ${dia} lipsește ora de sfârșit.`,
    errorFaltaEntrada: (dia) => `Pentru ${dia} lipsește ora de început.`,
    errorIguales: (dia) => `Pentru ${dia}, ora de început și ora de sfârșit sunt aceleași.`,
    errorPausa: (dia) => `Pauza este la fel de lungă sau mai lungă decât tura din ziua de ${dia}.`,
    errorSinDias: "Completați ora de început și ora de sfârșit pentru cel puțin o zi.",
    observacionNoche: "Unele ture se termină a doua zi: se socotesc în întregime în ziua în care încep.",
    observacionGenerico:
      "Este un calcul general. Numărul maxim de ore, regulile pentru orele suplimentare și plata pentru munca de noapte sau de sărbătoare depind de lege și de contractul de muncă.",
  }),
};
