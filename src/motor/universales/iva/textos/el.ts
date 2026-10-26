import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosEl: TextosUi<UiIva> = {
  slug: "ypologismos-fpa",
  ui: () => ({
    operacion: "Τι θέλετε να κάνετε;",
    agregar: "Προσθήκη ΦΠΑ σε τιμή χωρίς ΦΠΑ",
    quitar: "Αφαίρεση ΦΠΑ από τιμή που τον περιλαμβάνει",
    monto: "Τιμή",
    montoAyuda: "Χωρίς ΦΠΑ αν τον προσθέτετε. Με ΦΠΑ αν τον αφαιρείτε.",
    otraTasa: "Άλλος συντελεστής ΦΠΑ (%)",
    otraTasaAyuda: "Προαιρετικό. Αν το είδος έχει μειωμένο συντελεστή, εισάγετέ τον εδώ. Διαφορετικά εφαρμόζεται ο κανονικός.",
    neto: "Τιμή χωρίς ΦΠΑ",
    impuesto: "ΦΠΑ",
    total: "Τιμή με ΦΠΑ",
    tasaUsada: "Συντελεστής που εφαρμόστηκε",
    errorTasa: "Ο συντελεστής ΦΠΑ δεν είναι έγκυρος.",
  }),
};
