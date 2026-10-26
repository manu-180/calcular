import { formaEl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosEl: TextosUi<UiTarjetaDeCredito> = {
  slug: "exoflisi-pistotikis-kartas",
  ui: () => ({
    saldo: "Υπόλοιπο κάρτας",
    tasa: "Ονομαστικό ετήσιο επιτόκιο (%)",
    tasaAyuda: "Το επιτόκιο αγορών της κάρτας. Το βρίσκετε στο μηνιαίο αντίγραφο κίνησης.",
    modo: "Πώς θα πληρώνετε;",
    modoFijo: "Σταθερό ποσό κάθε μήνα",
    modoMinimo: "Την ελάχιστη καταβολή",
    pagoFijo: "Σταθερή μηνιαία πληρωμή",
    minimoPorcentaje: "Ελάχιστη καταβολή (% του υπολοίπου)",
    minimoPorcentajeAyuda: "Όσα ζητά η τράπεζα κάθε μήνα. Αν δεν είστε σίγουροι, συνηθίζεται το 5%.",
    minimoPiso: "Ελάχιστη καταβολή όχι κάτω από",
    meses: "Μήνες μέχρι την εξόφληση",
    intereses: "Τόκοι που πληρώνετε",
    total: "Σύνολο πληρωμών",
    primerPago: "Πρώτη ελάχιστη καταβολή",
    tabla: "Πλάνο ανά μήνα",
    colMes: "Μήνας",
    colPago: "Πληρωμή",
    colInteres: "Τόκοι",
    colCapital: "Κεφάλαιο",
    colSaldo: "Υπόλοιπο",
    errorSaldo: "Εισάγετε το υπόλοιπο που χρωστάτε στην κάρτα.",
    errorFaltaPago: "Εισάγετε πόσα θα πληρώνετε κάθε μήνα.",
    errorNoCubre: (interes) => `Με αυτή την πληρωμή το υπόλοιπο δεν μειώνεται ποτέ: μόνο οι τόκοι του πρώτου μήνα είναι ${interes}. Αυξήστε την πληρωμή.`,
    errorMuyLargo: "Με αυτή την πληρωμή η εξόφληση θα κρατούσε πάνω από 50 χρόνια. Αυξήστε την πληρωμή.",
    observacionAnios: (anios, meses) => {
      const a = `${anios} ${formaEl(anios, "έτος", "έτη")}`;
      const m = meses === "0" ? "" : ` και ${meses} ${formaEl(meses, "μήνα", "μήνες")}`;
      return `Δηλαδή ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Αν πληρώνετε πάντα ${pago}, όσο η πρώτη ελάχιστη καταβολή, εξοφλείτε σε ${meses} μήνες και γλιτώνετε ${ahorro} σε τόκους.`,
    observacionNoGastar: "Ο υπολογισμός προϋποθέτει ότι δεν κάνετε νέες αγορές με την κάρτα όσο την εξοφλείτε.",
  }),
};
