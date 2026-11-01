import type { TextosUi } from "../../tipos";
import { duracionHy } from "../../dias-entre-fechas/textos/hy";
import type { UiEdad } from "../definicion";

export const textosHy: TextosUi<UiEdad> = {
  slug: "tariki-hashvich",
  ui: () => ({
    nacimiento: "Ծննդյան ամսաթիվ",
    referencia: "Տարիքը հետևյալ ամսաթվին",
    referenciaAyuda: "Լռելյայն այսօրվա ամսաթիվն է։ Փոխեք այն, որպեսզի տեսնեք տարիքը մեկ այլ ամսաթվին։",
    edad: "Տարիք",
    anios: "Լրացած տարիներ",
    totalMeses: "Ամիսներով",
    totalSemanas: "Շաբաթներով",
    totalDias: "Օրերով",
    proximo: "Հաջորդ ծննդյան օր",
    faltan: "Մնացած օրեր",
    cumplira: "Կլրանա",
    duracion: duracionHy,
    errorFutura: "Ծննդյան ամսաթիվը չի կարող լինել այն ամսաթվից հետո, որի դրությամբ ստուգում եք տարիքը։",
    cumpleHoy: (anios) => `Այսօր ծննդյան օրն է։ Լրացած տարիներ՝ ${anios}։`,
    nota29: "Փետրվարի 29 օրը ծնվածների համար ոչ նահանջ տարիներին ծննդյան օրը հաշվվում է փետրվարի 28 օրը։",
  }),
};
