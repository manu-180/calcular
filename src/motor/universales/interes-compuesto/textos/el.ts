import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosEl: TextosUi<UiInteresCompuesto> = {
  slug: "anatokismos",
  ui: () => ({
    capital: "Αρχικό κεφάλαιο",
    aporte: "Μηνιαία κατάθεση (προαιρετικό)",
    aporteAyuda: "Πόσα θα προσθέτετε κάθε μήνα. Η κατάθεση γίνεται στο τέλος κάθε μήνα.",
    tasa: "Ετήσιο επιτόκιο (%)",
    anios: "Αριθμός ετών",
    capitalizacion: "Ανατοκισμός",
    anual: "Ετήσιος",
    semestral: "Εξαμηνιαίος",
    trimestral: "Τριμηνιαίος",
    mensual: "Μηνιαίος",
    diaria: "Ημερήσιος",
    saldo: "Τελικό ποσό",
    aportado: "Σύνολο καταθέσεων",
    intereses: "Τόκοι που κερδίσατε",
    tabla: "Εξέλιξη ανά έτος",
    colAnio: "Έτος",
    colAportado: "Καταθέσεις",
    colIntereses: "Τόκοι",
    colSaldo: "Ποσό στο τέλος του έτους",
    errorSinDinero: "Εισάγετε αρχικό κεφάλαιο ή μηνιαία κατάθεση.",
    observacionIntereses: (porcentaje) => `Το ${porcentaje}% του τελικού ποσού είναι τόκοι.`,
  }),
};
