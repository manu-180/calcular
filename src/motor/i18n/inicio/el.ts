import { GRAMATICA } from "../gramatica";
import { pluralEl } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.el;

// Griego (ADR 0002, D20): πληθυντικός ευγενείας; el país lleva artículo y caso con GRAMATICA.el y los
// números van con pluralEl (one/other).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Βρίσκεστε ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} με τις επίσημες τιμές σε ισχύ.`,
    ultimoDato: "Τελευταία τιμή που καταχωρίσαμε",
    ir: (pais) => `Μετάβαση στους υπολογιστές ${g.para(pais)}`,
    otro: "Επιλογή άλλης χώρας",
    argentina: "Οι υπολογιστές σας είναι στο calcular.ar, με τα επίσημα στοιχεία της Αργεντινής.",
    argentinaIr: "Μετάβαση στο calcular.ar",
    neutroTitulo: (paises) => `${pluralEl(paises, "χώρα", "χώρες")}, η καθεμία με τους δικούς της νόμους και το δικό της νόμισμα`,
    neutroTexto: "Ελέγχουμε τις επίσημες πηγές κάθε μέρα.",
    neutroIr: "Δείτε τις χώρες",
  },
  selector: {
    buscar: "Βρείτε μια χώρα",
    sinResultados: (q) => `Καμία χώρα δεν αντιστοιχεί στην αναζήτηση «${q}»`,
    ubicacion: "Η τρέχουσα τοποθεσία σας",
    mismaCalculadora: "Ο ίδιος υπολογιστής",
    paises: "Χώρες",
  },
  aviso: { mismaCalculadora: (pais) => `Υπολογισμός με τα στοιχεία ${g.de(pais)}` },
  vivo: {
    titulo: "Επίσημα στοιχεία που ενημερώνονται αυτόματα",
    vigilado: "Μια αυτόματη διαδικασία ελέγχει κάθε μέρα τις επίσημες πηγές. Οι αλλαγές στους κανόνες εμφανίζονται αφού τις επιβεβαιώσουμε.",
    sinVigilar: "Κάθε τιμή έχει επίσημη πηγή και την ημερομηνία που την ελέγξαμε.",
    verificado: "Τελευταίος έλεγχος κανόνων",
    automatico: "Τελευταία αυτόματη τιμή",
    fuentes: "Επίσημες πηγές",
    nFuentes: (n) => pluralEl(n, "επίσημο έγγραφο", "επίσημα έγγραφα"),
    verFuentes: "Δείτε τις πηγές",
    verNovedades: "Δείτε τα νέα",
    hoy: "σήμερα",
    ayer: "χθες",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Στοιχεία συγκρίθηκαν με την επίσημη πηγή: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: ενημέρωση ${cuando}, με την τελευταία τιμή που δημοσίευσε ο φορέας ${organismo}.`,
    diario: "Ελέγχουμε αυτόματα τις επίσημες πηγές κάθε μέρα.",
    actualizado: "Ενημέρωση",
  },
  novedades: {
    pildora: "Νέα",
    titulo: (pais) => `Οι αλλαγές στα επίσημα στοιχεία ${g.de(pais)}`,
    acento: "την ημέρα που γίνονται",
    bajada: "Εδώ καταγράφουμε κάθε νέα τιμή που περνά στους υπολογιστές: ποια είναι η αλλαγή, από πότε ισχύει και από πού προέρχεται.",
    ultimoCambio: "Τελευταία αλλαγή",
    revision: "Έλεγχος πηγών",
    diaria: "Κάθε μέρα",
    porNorma: "Με κάθε νέο κανόνα",
    siguiendo: "Πηγές που παρακολουθούμε",
    masOrganismos: (n) => `και ${n} ακόμη`,
    proximos: "Δημοσιεύθηκαν, ισχύουν σύντομα",
    proximosTexto: "Επίσημες τιμές που έχουμε ήδη καταχωρίσει και που αρχίζουν να ισχύουν τις επόμενες ημέρες.",
    registro: "Αρχείο αλλαγών",
    rss: "Παρακολούθηση μέσω RSS",
    vacio: "Δεν έχουμε καταγράψει ακόμη αλλαγές για αυτή τη χώρα.",
    etiqueta: { editorial: "Κανόνας", dato: "Νέα τιμή", proximo: "Σύντομα", serie: "Αυτόματα", revision: "Έλεγχος" },
    rige: (fecha) => `Ισχύει από: ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Ισχύει από ${desde} έως ${hasta}`,
    antes: (valor, fecha) => `Πριν: ${valor} (${fecha})`,
    revisados: (n) => `Συγκρίναμε με την επίσημη πηγή ${pluralEl(n, "τιμή", "τιμές")}`,
    revisadosTexto: (organismos) => `Τιμές σε ισχύ, επιβεβαιωμένες στις πηγές: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Δείτε την τιμή" : `Δείτε τις ${pluralEl(n, "τιμή", "τιμές")}`),
    calculadoras: "Τη χρησιμοποιούν",
    rango: (min, max, zonas) => `από ${min} έως ${max} ανάλογα με την περιοχή (${pluralEl(zonas, "περιοχή", "περιοχές")})`,
    tabla: (filas) => `πίνακας: ${pluralEl(filas, "κλιμάκιο", "κλιμάκια")}`,
    valores: (n) => pluralEl(n, "τιμή", "τιμές"),
    pasosTitulo: "Πώς μένουν ενημερωμένα τα στοιχεία",
    pasos: [
      { titulo: "Ο φορέας δημοσιεύει", texto: "Στην επίσημη πηγή εμφανίζεται ένας κανόνας, ένας δείκτης ή μια συναλλαγματική ισοτιμία." },
      {
        titulo: "Έλεγχος πριν από τη χρήση",
        texto: "Οι δείκτες και οι ισοτιμίες έρχονται αυτόματα και ελέγχουμε τα όριά τους. Τους κανόνες τους καταχωρίζουμε με το χέρι, με το επίσημο έγγραφο μπροστά μας.",
      },
      { titulo: "Οι υπολογιστές ενημερώνονται", texto: "Οι υπολογιστές περνούν στη νέα τιμή και η αλλαγή καταγράφεται εδώ μαζί με την πηγή της." },
    ],
    feedTitulo: (pais) => `Νέα ${g.para(pais)} στο CalcularYa`,
    feedSubtitulo: (pais) => `Αλλαγές στα επίσημα στοιχεία που χρησιμοποιούν οι υπολογιστές ${g.para(pais)}, με ημερομηνίες ισχύος και πηγές.`,
  },
};

export const el: Diccionario<TextosInicio> = { base };
