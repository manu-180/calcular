import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosAr: TextosUi<UiInteresCompuesto> = {
  slug: "compound-interest",
  ui: () => ({
    capital: "المبلغ الأولي",
    aporte: "الإيداع الشهري (اختياري)",
    aporteAyuda: "ما تضيفه كل شهر. يُضاف في نهاية كل شهر.",
    tasa: "معدل الفائدة السنوي (%)",
    anios: "عدد السنوات",
    capitalizacion: "دورية احتساب الفائدة",
    anual: "سنوية",
    semestral: "نصف سنوية",
    trimestral: "ربع سنوية",
    mensual: "شهرية",
    diaria: "يومية",
    saldo: "الرصيد النهائي",
    aportado: "إجمالي الإيداعات",
    intereses: "الفوائد المكتسبة",
    tabla: "نمو الرصيد سنة بعد سنة",
    colAnio: "السنة",
    colAportado: "الإيداعات",
    colIntereses: "الفوائد",
    colSaldo: "الرصيد في نهاية السنة",
    errorSinDinero: "أدخل مبلغًا أوليًا أو إيداعًا شهريًا.",
    observacionIntereses: (porcentaje) => `${porcentaje}% من الرصيد النهائي فوائد.`,
  }),
};
