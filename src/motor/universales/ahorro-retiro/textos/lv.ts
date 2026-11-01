import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosLv: TextosUi<UiAhorroRetiro> = {
  slug: "pensijas-uzkrajumu-kalkulators",
  ui: () => ({
    edadActual: "Jūsu pašreizējais vecums",
    edadRetiro: "Vecums, kurā vēlaties doties pensijā",
    actual: "Jau uzkrātā summa",
    aporte: "Ikmēneša iemaksa",
    rendimiento: "Reālais gada ienesīgums (%)",
    rendimientoAyuda: "Cik ieguldījumi nopelna virs inflācijas. Ilgam periodam piesardzīgs pieņēmums ir no 2 līdz 5%.",
    aniosRenta: "Cik pensijas gadiem jāpietiek uzkrājumiem",
    aniosRentaAyuda: "Cik gadus plānojat izmantot šos uzkrājumus.",
    capital: "Uzkrājumi, sākot pensiju",
    renta: "Ikmēneša ienākumi no šiem uzkrājumiem",
    aportado: "Kopā iemaksāts",
    intereses: "Kopējais ienesīgums",
    tabla: "Uzkrājumu pieaugums pēc vecuma",
    colEdad: "Vecums",
    colAportado: "Iemaksāts līdz tam",
    colSaldo: "Uzkrājumi",
    errorEdades: "Pensijas vecumam jābūt lielākam par pašreizējo vecumu.",
    errorSinAhorro: "Ievadiet jau uzkrāto summu vai ikmēneša iemaksu.",
    observacionDineroDeHoy: "Summas norādītas šodienas cenās, jo no ienesīguma jau atskaitīta inflācija.",
    observacionPublica: "Tiek rēķināti tikai jūsu pašu uzkrājumi. Valsts pensija un citi pabalsti, uz kuriem varat būt tiesīgi saņemt, nav iekļauti.",
  }),
};
