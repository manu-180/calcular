import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosLt: TextosUi<UiIva> = {
  slug: "pvm-skaiciuokle",
  ui: () => ({
    operacion: "Ką norite apskaičiuoti?",
    agregar: "Pridėti PVM prie kainos be PVM",
    quitar: "Išskaičiuoti PVM iš kainos su PVM",
    monto: "Kaina",
    montoAyuda: "Be PVM, jei mokestį pridedate. Su PVM, jei jį išskaičiuojate.",
    otraTasa: "Kitas PVM tarifas (%)",
    otraTasaAyuda: "Neprivaloma. Jei prekei ar paslaugai taikomas lengvatinis tarifas, įveskite jį čia. Kitu atveju taikomas standartinis tarifas.",
    neto: "Kaina be PVM",
    impuesto: "PVM",
    total: "Kaina su PVM",
    tasaUsada: "Taikytas tarifas",
    errorTasa: "PVM tarifas neteisingas.",
  }),
};
