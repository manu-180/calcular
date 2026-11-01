import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosLt: TextosUi<UiAumentoDeSueldo> = {
  slug: "atlyginimo-pakelimas",
  ui: () => ({
    sueldo: "Dabartinis mėnesinis atlyginimas",
    sueldoAyuda: "Prieš mokesčius arba į rankas, kaip jums patogiau. Rezultatas bus pateiktas tuo pačiu būdu.",
    aumentoPorcentaje: "Pakėlimas (%)",
    aumentoMonto: "Pakėlimas pinigais (neprivaloma)",
    aumentoMontoAyuda: "Jei pakėlimas yra fiksuota suma, įveskite ją čia. Ji bus naudojama vietoj procento.",
    inflacion: "Laikotarpio infliacija (%, neprivaloma)",
    inflacionAyuda: "Infliacija nuo paskutinio pakėlimo. Taip matysite, ar už atlyginimą nupirksite daugiau, ar mažiau nei anksčiau.",
    sueldosAnio: "Atlyginimų skaičius per metus",
    sueldosAnioAyuda: "12, jei atlyginimas mokamas kas mėnesį. 13 arba 14, jei kasmet gaunate ir tryliktą ar keturioliktą atlyginimą.",
    nuevo: "Naujas mėnesinis atlyginimas",
    diferenciaMensual: "Skirtumas per mėnesį",
    diferenciaAnual: "Skirtumas per metus",
    porcentaje: "Pakėlimas procentais",
    real: "Realusis pakėlimas (įvertinus infliaciją)",
    realAyuda: "Kiek daugiau nupirksite už naują atlyginimą nei už ankstesnį.",
    errorSueldo: "Įveskite dabartinį atlyginimą.",
    errorSinAumento: "Įveskite pakėlimą procentais arba pinigais.",
    observacionGana: (puntos) => `Jūsų pakėlimas lenkia infliaciją: už atlyginimą nupirksite ${puntos} % daugiau nei anksčiau.`,
    observacionPierde: (puntos) => `Jūsų pakėlimas nepadengia infliacijos: už atlyginimą nupirksite ${puntos} % mažiau nei anksčiau.`,
    observacionIgual: "Jūsų pakėlimas atitinka infliaciją: už atlyginimą nupirksite tiek pat, kiek anksčiau.",
  }),
};
