import { GRAMATICA } from "./gramatica";
import { pluralEl } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.el;
const MUNDO = "Διεθνής έκδοση";

// Griego: un solo registro para la web, el de los servicios digitales y los bancos (gov.gr, myAADE,
// Εθνική Τράπεζα). Πληθυντικός ευγενείας con imperativo cortés («εισάγετε», «επιλέξτε»), nunca la
// segunda del singular. Los botones van como sustantivo («Υπολογισμός») o en imperativo cortés breve
// («Επιλέξτε χώρα»). La herramienta es «υπολογιστής», como en las secciones «Υπολογιστές» de los
// bancos. Las preguntas cierran con «;» y las comillas son «». Los mercados van con trato "usted" y el
// diccionario se escribe en base (ADR 0002, D20). El país lleva artículo y caso con GRAMATICA.el y los
// números con pluralEl (one/other).
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Υπολογιστές με επίσημα στοιχεία" },
  saltar: "Μετάβαση στο περιεχόμενο",
  header: {
    inicio: "Αρχική",
    elegirPais: "Επιλέξτε χώρα",
    paisActual: (pais) => `Χώρα: ${pais}`,
    cerrar: "Κλείσιμο",
    todos: "Όλες οι χώρες",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Χώρες",
    sitio: "CalcularYa",
    fuentes: "Επίσημες πηγές",
    novedades: "Νέα",
    privacidad: "Προστασία προσωπικών δεδομένων",
    terminos: "Όροι χρήσης",
    contacto: "Επικοινωνία",
    sobre: "Σχετικά με εμάς",
    argentina: "Βρίσκεστε στην Αργεντινή; Οι υπολογιστές σας είναι στο calcular.ar",
    descargo: "Τα αποτελέσματα είναι ενδεικτικά. Πριν από μια σημαντική απόφαση, επιβεβαιώστε τα με την αρμόδια υπηρεσία ή με έναν επαγγελματία.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Επίσημα στοιχεία σε ισχύ",
    verificado: (organismos, fecha) => `Στοιχεία ελεγμένα στις πηγές: ${organismos}. Ενημέρωση: ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre}: ενημερώνεται αυτόματα με στοιχεία από ${organismo}. Τελευταία τιμή: ${fecha}.`,
    verTodas: "Δείτε όλες τις πηγές",
  },
  calculadora: {
    comoSeCalcula: "Πώς υπολογίζεται",
    ejemplo: "Παράδειγμα",
    faq: "Συχνές ερωτήσεις",
    glosario: "Όροι",
    relacionadas: "Άλλοι υπολογιστές",
    otrosPaises: "Ο ίδιος υπολογισμός σε άλλες χώρες",
  },
  global: {
    eyebrow: "Επίσημα στοιχεία για κάθε χώρα",
    titulo: "Υπολογιστές για την εργασία, τα χρήματα και την καθημερινότητα, με τα στοιχεία της χώρας σας",
    bajada:
      "Μισθός, δάνεια, φόροι, ημερομηνίες και άλλα. Όταν το αποτέλεσμα εξαρτάται από έναν κανόνα, ο αριθμός προέρχεται από επίσημη πηγή, με ημερομηνία και σύνδεσμο, ώστε να μπορείτε να τον ελέγξετε.",
    elegir: "Επιλέξτε τη χώρα σας",
    calculadoras: (n) => pluralEl(n, "υπολογιστής", "υπολογιστές"),
    vacio: "Προσθέτουμε νέες χώρες. Επισκεφθείτε μας ξανά σύντομα.",
    promesaTitulo: "Πώς δουλεύουμε",
    promesas: [
      { titulo: "Επίσημοι αριθμοί με πηγή", texto: "Για κάθε τιμή αναφέρουμε τον φορέα που τη δημοσιεύει, τον σύνδεσμο και την ημερομηνία που την ελέγξαμε." },
      { titulo: "Πάντα ενημερωμένοι", texto: "Όταν αλλάζει μια τιμή, αλλάζει και ο υπολογιστής. Κάθε αλλαγή καταγράφεται στα νέα." },
      { titulo: "Δωρεάν και χωρίς εγγραφή", texto: "Ο υπολογισμός γίνεται στο πρόγραμμα περιήγησής σας. Δεν σας ζητάμε προσωπικά στοιχεία." },
    ],
  },
  pais: {
    eyebrow: "Επίσημα στοιχεία σε ισχύ",
    titulo: (pais) => `Υπολογιστές ${g.para(pais)}`,
    bajada: (pais) => `Με τις τιμές που ισχύουν ${g.en(pais)}, την πηγή κάθε τιμής και την ημερομηνία που την ελέγξαμε.`,
    novedades: "Τελευταία νέα",
    verNovedades: "Δείτε όλα τα νέα",
    sinCalculadoras: "Δεν έχουμε ακόμη υπολογιστές για αυτή τη χώρα.",
    descripcion: (pais) =>
      `Υπολογιστές μισθού, φόρων, δανείων, αποταμίευσης, υγείας, ημερομηνιών και νοικοκυριού ${g.para(pais)}, με την επίσημη τιμή σε ισχύ και την πηγή της.`,
    irASeccion: "Μετάβαση στην ενότητα",
  },
  fuentes: {
    titulo: (pais) => `Πηγές και στοιχεία ${g.para(pais)}`,
    bajada: "Κάθε τιμή που χρησιμοποιούν οι υπολογιστές, με την περίοδο ισχύος και τον σύνδεσμο προς την επίσημη πηγή.",
    vigente: "Τιμή σε ισχύ",
    desde: "Από",
    hasta: "Έως",
    fuente: "Πηγή",
    verificado: "Έλεγχος",
    region: "Περιοχή",
    series: "Τιμές που ενημερώνονται αυτόματα",
    ultimoDato: "Τελευταία τιμή",
    proximo: (valor, fecha) => `Έχει ήδη δημοσιευθεί η τιμή που ισχύει από ${fecha}: ${valor}.`,
    sinVerificar: "Δεν υπάρχει ελεγμένη τιμή για σήμερα",
    tramos: (n) => `Πίνακας: ${pluralEl(n, "κλιμάκιο", "κλιμάκια")}`,
    description: (pais) =>
      `Τα επίσημα στοιχεία ${g.para(pais)} που χρησιμοποιούν οι υπολογιστές: τιμή σε ισχύ, ημερομηνία έναρξης, πηγή και ημερομηνία ελέγχου.`,
  },
  novedades: {
    titulo: (pais) => `Νέα ${g.para(pais)}`,
    bajada: "Αλλαγές στους κανόνες που χρησιμοποιούν οι υπολογιστές, με την ημερομηνία έναρξης ισχύος.",
    vigenteDesde: (fecha) => `Ισχύει από: ${fecha}`,
    vacio: "Δεν υπάρχουν ακόμη νέα για αυτή τη χώρα.",
    description: (pais) => `Αλλαγές στον κατώτατο μισθό, στις εισφορές και σε άλλους κανόνες ${g.en(pais)}, με την ημερομηνία ισχύος και την επίσημη πηγή.`,
  },
  avisoPais: {
    texto: (pais) => `Φαίνεται ότι βρίσκεστε ${g.en(pais)}.`,
    ir: (pais) => `Δείτε τους υπολογιστές ${g.para(pais)}`,
    cerrar: "Κλείσιμο ειδοποίησης",
  },
  noEncontrada: {
    titulo: "Δεν βρήκαμε αυτή τη σελίδα",
    texto: "Ίσως υπάρχει λάθος στη διεύθυνση ή η σελίδα δεν υπάρχει πια.",
    volver: "Επιστροφή στην αρχική",
    paises: "Ή επιλέξτε χώρα",
  },
  categorias: {
    sueldo: "Μισθός και αποδοχές",
    fin: "Λήξη της σύμβασης εργασίας",
    impuestos: "Εισφορές και φόροι",
    dinero: "Χρήματα και δείκτες",
    finanzas: "Δάνεια, αποταμίευση και επενδύσεις",
    negocio: "Επιχείρηση και ελεύθεροι επαγγελματίες",
    calculos: "Γρήγοροι υπολογισμοί",
    fechas: "Ημερομηνίες και ηλικία",
    salud: "Υγεία και φυσική κατάσταση",
    hogar: "Σπίτι, αυτοκίνητο και ανακαίνιση",
    familia: "Οικογένεια και νοικοκυριό",
    otras: "Άλλοι υπολογιστές",
  },
  migas: { inicio: "Αρχική", etiqueta: "Βρίσκεστε εδώ" },
  seo: {
    tituloGlobal: "CalcularYa: δωρεάν υπολογιστές με επίσημα στοιχεία",
    descripcionGlobal: "Δωρεάν υπολογιστές για μισθό, δάνεια, φόρους και άλλους υπολογισμούς σε κάθε χώρα, με την επίσημη τιμή σε ισχύ και την πηγή της.",
    tituloPais: (pais, anio) => [`Υπολογισμός μισθού και φόρων ${g.en(pais)} ${anio}`, `Υπολογιστές ${g.para(pais)} ${anio}`, `Υπολογιστές ${g.para(pais)}`],
    tituloFuentes: (pais) => [`Επίσημα στοιχεία σε ισχύ ${g.para(pais)}: πηγές και ημερομηνίες`, `Πηγές και στοιχεία ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [`Αλλαγές σε μισθούς και φόρους ${g.en(pais)} ${anio}`, `Νέα ${g.para(pais)} ${anio}`, `Νέα ${g.para(pais)}`],
  },
  og: {
    datosOficiales: "Επίσημα στοιχεία με πηγές",
    actualizado: (fecha) => `Ενημέρωση: ${fecha}`,
    gratis: "Δωρεάν και χωρίς εγγραφή",
    paises: (n) => pluralEl(n, "χώρα", "χώρες"),
  },
  shell: {
    irAlInicio: "στην αρχική",
    menu: { trabajo: "Μισθός και εργασία", impuestos: "Φόροι", dinero: "Χρήματα και δείκτες", vida: "Καθημερινότητα", novedades: "Νέα", planillas: "Υπολογιστικά φύλλα Excel" },
    encabezado: {
      principal: "Κύριο μενού",
      buscar: "Αναζήτηση",
      buscarCalculadora: "Βρείτε έναν υπολογιστή",
      abrirMenu: "Άνοιγμα μενού",
      cerrarMenu: "Κλείσιμο μενού",
      menu: "Μενού",
      todas: "Όλοι οι υπολογιστές",
      pieCajon: "Στοιχεία από επίσημες πηγές · Φτιαγμένο στην Αργεντινή",
    },
    buscador: {
      dialogo: "Αναζήτηση στο CalcularYa",
      pregunta: "Τι θέλετε να υπολογίσετε;",
      recientes: "Συνεχίστε από εκεί που σταματήσατε",
      masUsado: "Οι πιο δημοφιλείς",
      sinResultados: "Δεν βρέθηκε τίποτα για «{q}»",
      sugerencia: "Δοκιμάστε άλλη λέξη, για παράδειγμα «μισθός», «δάνειο» ή «φόρος».",
      verTodas: "Δείτε όλους τους υπολογιστές",
      borrar: "Διαγραφή αναζήτησης",
      cerrar: "Κλείσιμο",
      cerrarBuscador: "Κλείσιμο αναζήτησης",
      moverte: "για μετακίνηση",
      abrir: "για άνοιγμα",
      desdeCualquier: "από οποιαδήποτε σελίδα",
      resultados: "Αποτελέσματα",
      resultado: "αποτέλεσμα",
      resultadosPlural: "αποτελέσματα",
    },
    paises: { titulo: "Χώρες", cambiar: "Αλλαγή χώρας" },
    pie: {
      bajada: (lugar) =>
        `Κατανοητοί υπολογιστές ${lugar === MUNDO ? "για κάθε χώρα" : g.para(lugar)}. Κάθε αριθμός προέρχεται από το επίσημο έγγραφο που τον ορίζει, με την ημερομηνία που τον ελέγξαμε.`,
      todas: "Όλοι οι υπολογιστές",
      cuenta: "Ο λογαριασμός σας",
      cuentaNota: "Δεν είναι υποχρεωτικός. Χρησιμεύει για να αποθηκεύετε τους υπολογισμούς σας και να τους έχετε πάντα διαθέσιμους.",
      hecho: "Φτιαγμένο στην Αργεντινή",
      escrito: "Συντάχθηκε και ελέγχθηκε από",
    },
  },
};

export const el: Diccionario<TextosSitio> = { base };
