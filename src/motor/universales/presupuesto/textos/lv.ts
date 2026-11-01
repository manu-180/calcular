import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosLv: TextosUi<UiPresupuesto> = {
  slug: "budzeta-kalkulators",
  ui: () => ({
    ingreso: "Mēneša neto ienākumi",
    ingresoAyuda: "Cik katru mēnesi saņemat kontā pēc nodokļiem un iemaksām.",
    pctNecesidades: "Nepieciešamie izdevumi (%)",
    pctNecesidadesAyuda: "Mājoklis, pārtika, komunālie maksājumi, transports, veselība un obligātie parādu maksājumi.",
    pctGustos: "Prieki un vēlmes (%)",
    pctGustosAyuda: "Restorāni, ne obligāti pirkumi, abonementi, ceļojumi.",
    pctAhorro: "Uzkrājumi (%)",
    pctAhorroAyuda: "Finanšu rezerve, mērķi, uzkrājumi pensijai un papildu parādu maksājumi.",
    necesidades: "Nepieciešamajiem izdevumiem",
    gustos: "Priekiem un vēlmēm",
    ahorro: "Uzkrājumiem",
    ahorroAnual: "Uzkrāsiet gadā",
    errorIngreso: "Ievadiet savus mēneša ienākumus.",
    errorSuma: (suma) => `Visu trīs procentu summa ir ${suma}%. Tai jābūt 100%.`,
    observacionAhorroBajo: "Ja uzkrājat mazāk par 10%, neparedzētiem izdevumiem paliek maza rezerve. Ja varat, samaziniet prieku un vēlmju daļu.",
  }),
};
