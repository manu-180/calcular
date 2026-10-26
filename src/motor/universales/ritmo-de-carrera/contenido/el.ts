import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoEl: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "μίλι" : "χιλιόμετρο";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Υπολογισμός ρυθμού τρεξίματος",
    title: tituloQueEntre(`Υπολογισμός ρυθμού τρεξίματος ${GRAMATICA.el.en(ctx.nombrePais)}`, "Υπολογισμός ρυθμού τρεξίματος και χρόνου αγώνα", "Υπολογισμός ρυθμού τρεξίματος"),
    description: `Υπολογίστε τον ρυθμό σας ανά ${u}, τον τελικό χρόνο ή την απόσταση για 5 χλμ., 10 χλμ., ημιμαραθώνιο ή μαραθώνιο.`,
    intro: [
      "Με δύο από τα τρία στοιχεία (απόσταση, χρόνος και ρυθμός) βρίσκετε το τρίτο. Χρησιμεύει για να σχεδιάσετε έναν αγώνα ή να ελέγξετε μια προπόνηση.",
      "Οι αποστάσεις 5 χλμ., 10 χλμ., ημιμαραθωνίου και μαραθωνίου είναι ήδη έτοιμες.",
    ],
    comoSeCalcula: [
      `Ρυθμός = χρόνος ÷ απόσταση, σε λεπτά και δευτερόλεπτα ανά ${u}.`,
      "Χρόνος = ρυθμός × απόσταση.",
      "Απόσταση = χρόνος ÷ ρυθμός. Η μέση ταχύτητα είναι η απόσταση διά τις ώρες.",
    ],
    ejemplo: imperial
      ? [
          `3 μίλια σε 27 λεπτά είναι ρυθμός 9:00 ανά μίλι, με ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Ένας ημιμαραθώνιος (${formatearNumero(ctx, media, 2)} mi) με ρυθμό ${ritmoTexto(ritmoMedia)} ανά μίλι τελειώνει σε ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `10 χλμ. σε 50 λεπτά είναι ρυθμός 5:00 ανά χιλιόμετρο, με ${formatearNumero(ctx, 10 / (50 / 60), 0)} km/h.`,
          `Ένας ημιμαραθώνιος (${formatearNumero(ctx, media, 1)} ${corto}) με ρυθμό ${ritmoTexto(ritmoMedia)} ανά χιλιόμετρο τελειώνει σε ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Πώς υπολογίζω τον ρυθμό μου ανά ${u};`,
        respuesta: imperial
          ? `Μετατρέψτε τον χρόνο σε λεπτά και διαιρέστε με τα μίλια. 3 μίλια σε 28 λεπτά και 30 δευτερόλεπτα είναι ${formatearNumero(ctx, 28.5 / 3, 1)} λεπτά ανά μίλι, δηλαδή 9:30.`
          : `Μετατρέψτε τον χρόνο σε λεπτά και διαιρέστε με τα χιλιόμετρα. 10 χλμ. σε 55 λεπτά είναι ${formatearNumero(ctx, 55 / 10, 1)} λεπτά ανά χιλιόμετρο, δηλαδή 5:30.`,
      },
      {
        pregunta: "Ποιος είναι καλός ρυθμός για αρχάριους;",
        respuesta: "Ένας ρυθμός που σας επιτρέπει να μιλάτε ενώ τρέχετε. Όσο βελτιώνεται η φυσική σας κατάσταση, τόσο πέφτει.",
      },
      {
        pregunta: "Πόσο είναι ο μαραθώνιος;",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} χιλιόμετρα (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} μίλια). Ο ημιμαραθώνιος είναι η μισή απόσταση.`,
      },
    ],
    glosario: [
      { termino: "Ρυθμός", definicion: "Πόσο χρόνο χρειάζεστε για να καλύψετε ένα χιλιόμετρο ή ένα μίλι." },
      { termino: "Μέση ταχύτητα", definicion: "Η απόσταση που καλύπτετε σε μία ώρα." },
    ],
  };
};
