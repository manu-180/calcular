import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosEn: TextosUi<UiOvulacion> = {
  slug: "ovulation",
  ui: () => ({
    fum: "First day of your last period",
    fumAyuda: "The first day of bleeding, not the last.",
    ciclo: "Cycle length (days)",
    cicloAyuda: "From the first day of one period to the day before the next. If it varies, use an average.",
    ovulacion: "Estimated ovulation",
    fertilDesde: "Fertile window from",
    fertilHasta: "Fertile window to",
    proxima: "Next period",
    tabla: "Next cycles",
    colRegla: "Period",
    colDesde: "Fertile from",
    colHasta: "Fertile to",
    colOvulacion: "Ovulation",
    errorCiclo: "Cycle length has to be between 21 and 45 days.",
    aviso: "This is an estimate for regular cycles. It is not a method of contraception and not a substitute for advice from a health professional.",
  }),
};
