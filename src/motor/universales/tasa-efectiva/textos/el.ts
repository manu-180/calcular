import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosEl: TextosUi<UiTasaEfectiva> = {
  slug: "pragmatiko-epitokio",
  ui: () => ({
    direccion: "Ποιο επιτόκιο έχετε;",
    nominalAEfectiva: "Ονομαστικό ετήσιο επιτόκιο (μετατροπή σε πραγματικό)",
    efectivaANominal: "Πραγματικό ετήσιο επιτόκιο (μετατροπή σε ονομαστικό)",
    tasa: "Ετήσιο επιτόκιο (%)",
    tasaAyuda: "Εισάγετε το ακριβώς όπως εμφανίζεται στην προσφορά ή στη σύμβαση.",
    capitalizacion: "Κεφαλαιοποίηση τόκων",
    capitalizacionAyuda: "Πόσο συχνά οι τόκοι προστίθενται στο κεφάλαιο. Στα δάνεια και στις κάρτες συνήθως γίνεται κάθε μήνα.",
    mensual: "Μηνιαία (12 φορές τον χρόνο)",
    trimestral: "Τριμηνιαία (4 φορές τον χρόνο)",
    semestral: "Εξαμηνιαία (2 φορές τον χρόνο)",
    diaria: "Ημερήσια (365 φορές τον χρόνο)",
    efectiva: "Πραγματικό ετήσιο επιτόκιο",
    nominal: "Ονομαστικό ετήσιο επιτόκιο",
    periodica: "Επιτόκιο ανά περίοδο",
    errorNegativa: "Το επιτόκιο δεν μπορεί να είναι αρνητικό. Εισάγετε αριθμό από το 0 και πάνω.",
    observacionDiferencia: (puntos) => `Το πραγματικό επιτόκιο είναι ${puntos} μονάδες υψηλότερο από το ονομαστικό, γιατί και οι τόκοι παράγουν τόκους.`,
  }),
};
