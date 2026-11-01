import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosBn: TextosUi<UiInteresCompuesto> = {
  slug: "compound-interest",
  ui: () => ({
    capital: "শুরুর টাকা (আসল)",
    aporte: "প্রতি মাসে জমা (ঐচ্ছিক)",
    aporteAyuda: "প্রতি মাসে যত টাকা যোগ করবেন। মাসের শেষে যোগ হয়।",
    tasa: "বার্ষিক মুনাফার হার (%)",
    anios: "মেয়াদ (বছর)",
    capitalizacion: "চক্রবৃদ্ধির সময়কাল",
    anual: "বার্ষিক",
    semestral: "ষাণ্মাসিক",
    trimestral: "ত্রৈমাসিক",
    mensual: "মাসিক",
    diaria: "দৈনিক",
    saldo: "শেষে মোট টাকা",
    aportado: "মোট জমা দেওয়া টাকা",
    intereses: "মোট সুদ বা মুনাফা",
    tabla: "বছরে বছরে বৃদ্ধি",
    colAnio: "বছর",
    colAportado: "জমা",
    colIntereses: "সুদ",
    colSaldo: "বছর শেষে মোট",
    errorSinDinero: "শুরুর টাকা বা মাসিক জমার পরিমাণ লিখুন।",
    observacionIntereses: (porcentaje) => `শেষের মোট টাকার ${cifrasBn(porcentaje)}% এসেছে সুদ থেকে।`,
  }),
};
