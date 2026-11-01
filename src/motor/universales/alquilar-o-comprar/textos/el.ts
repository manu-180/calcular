import { pluralEl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

const etos = (n: string) => pluralEl(n, "έτος", "έτη");

export const textosEl: TextosUi<UiAlquilarOComprar> = {
  slug: "enoikio-i-agora-katoikias",
  ui: () => ({
    precio: "Τιμή της κατοικίας",
    entrada: "Ίδια συμμετοχή (% της τιμής)",
    gastosCompra: "Έξοδα αγοράς (% της τιμής)",
    gastosCompraAyuda: "Φόρος μεταβίβασης, συμβολαιογράφος, δικηγόρος, εγγραφή στο κτηματολόγιο, μεσιτικά και έξοδα του δανείου.",
    tasa: "Επιτόκιο στεγαστικού δανείου (% ετησίως)",
    aniosHipoteca: "Διάρκεια του δανείου (έτη)",
    alquiler: "Μηνιαίο ενοίκιο για παρόμοια κατοικία",
    aumentoAlquiler: "Ετήσια αύξηση του ενοικίου (%)",
    gastosPropietario: "Ετήσια έξοδα ιδιοκτήτη (% της τιμής)",
    gastosPropietarioAyuda: "Επισκευές και συντήρηση, φόρος ακίνητης περιουσίας, ασφάλιση κατοικίας. Συνήθως 1% έως 2%.",
    revalorizacion: "Ετήσια αύξηση της αξίας της κατοικίας (%)",
    rendimiento: "Απόδοση εναλλακτικής επένδυσης (% ετησίως)",
    rendimientoAyuda: "Πόσα θα κερδίζατε αν επενδύατε την ίδια συμμετοχή αντί να αγοράσετε.",
    horizonte: "Σε πόσα έτη να γίνει η σύγκριση",
    veredicto: "Αποτέλεσμα",
    patrimonioComprar: "Η περιουσία σας στο τέλος, αν αγοράσετε",
    patrimonioAlquilar: "Η περιουσία σας στο τέλος, αν νοικιάσετε",
    diferencia: "Διαφορά",
    anioDesde: "Έτος από το οποίο συμφέρει η αγορά",
    pagadoAlquilando: "Σύνολο ενοικίων",
    pagadoComprando: "Σύνολο δόσεων και εξόδων ιδιοκτήτη",
    tabla: "Σύγκριση ανά έτος",
    colAnio: "Έτος",
    colComprar: "Αγορά",
    colAlquilar: "Ενοίκιο",
    colDiferencia: "Διαφορά",
    errorPrecio: "Εισάγετε την τιμή της κατοικίας.",
    errorAlquiler: "Εισάγετε πόσο θα κόστιζε το ενοίκιο μιας παρόμοιας κατοικίας.",
    convieneComprar: (anios, diferencia) => `Συμφέρει η αγορά: σε ${etos(anios)} θα έχετε ${diferencia} περισσότερα.`,
    convieneAlquilar: (anios, diferencia) => `Συμφέρει το ενοίκιο: σε ${etos(anios)} θα έχετε ${diferencia} περισσότερα.`,
    empate: (anios) => `Σε ${etos(anios)} οι δύο επιλογές βγαίνουν ίδιες.`,
    observacionDesde: (anio) => `Η αγορά ξεπερνά το ενοίκιο από το ${anio}ο έτος και μετά παραμένει πιο συμφέρουσα.`,
    observacionMetodo:
      "Συγκρίνεται τι θα έχετε σε κάθε επιλογή. Αν μένετε στο ενοίκιο, η ίδια συμμετοχή και όσα εξοικονομείτε κάθε μήνα παραμένουν επενδεδυμένα. Τα έξοδα μιας μελλοντικής πώλησης δεν αφαιρούνται.",
  }),
};
