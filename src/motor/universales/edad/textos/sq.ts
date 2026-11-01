import { pluralSq } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionSq } from "../../dias-entre-fechas/textos/sq";
import type { UiEdad } from "../definicion";

export const textosSq: TextosUi<UiEdad> = {
  slug: "kalkulator-moshe",
  ui: () => ({
    nacimiento: "Data e lindjes",
    referencia: "Mosha në datën",
    referenciaAyuda: "Si parazgjedhje është dita e sotme. Ndryshojeni për të parë moshën në një datë tjetër.",
    edad: "Mosha",
    anios: "Vite të mbushura",
    totalMeses: "Në muaj",
    totalSemanas: "Në javë",
    totalDias: "Në ditë",
    proximo: "Ditëlindja e ardhshme",
    faltan: "Ditë të mbetura",
    cumplira: "Do të mbushë",
    duracion: duracionSq,
    errorFutura: "Data e lindjes nuk mund të jetë pas datës për të cilën llogaritni moshën.",
    cumpleHoy: (anios) => `Sot është ditëlindja: ${pluralSq(anios, "vit i mbushur", "vjet të mbushur")}.`,
    nota29: "Për të lindurit më 29 shkurt, në vitet që nuk janë të brishta ditëlindja llogaritet më 28 shkurt.",
  }),
};
