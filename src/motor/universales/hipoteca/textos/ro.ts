import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosRo: TextosUi<UiHipoteca> = {
  slug: "calculator-credit-ipotecar",
  ui: () => ({
    precio: "Prețul locuinței",
    entradaPorcentaje: "Avans (% din preț)",
    entradaMonto: "Avans în bani (opțional)",
    entradaMontoAyuda: "Dacă introduceți o sumă, aceasta înlocuiește procentul.",
    tasa: "Dobânda anuală (%)",
    anios: "Perioada creditului (ani)",
    gastos: "Cheltuieli lunare cu locuința (opțional)",
    gastosAyuda: "Asigurarea, impozitul pe clădire sau alte costuri pe care le plătiți odată cu rata.",
    cuota: "Rata lunară a creditului",
    cuotaTotal: "Rata împreună cu cheltuielile",
    entrada: "Avans",
    prestado: "Suma împrumutată",
    intereses: "Total dobânzi",
    total: "Total de rambursat",
    tabla: "An cu an",
    colAnio: "Anul",
    colIntereses: "Dobândă plătită",
    colCapital: "Principal rambursat",
    colSaldo: "Sold la final de an",
    errorPrecio: "Introduceți prețul locuinței.",
    errorEntrada: "Avansul acoperă tot prețul, deci nu aveți nevoie de credit. Micșorați avansul.",
    observacionPrestado: (porcentaje) => `Împrumutați ${porcentaje}% din prețul locuinței. Cu cât această parte este mai mare, cu atât condițiile băncii sunt de obicei mai stricte.`,
    observacionCostos: "Costurile de acordare (evaluarea, asigurarea, notarul, comisioanele) nu sunt incluse. Puneți-le deoparte separat de avans.",
  }),
};
