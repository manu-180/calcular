import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-el.bono",
  slug: "examiniaio-epidoma",
  campos: {
    sueldo: { etiqueta: "Μικτός μηνιαίος μισθός" },
    meses: { etiqueta: "Μήνες εργασίας μέσα στο εξάμηνο" },
    region: { etiqueta: "Περιφέρεια όπου εργάζεστε" },
    regimen: { etiqueta: "Μέγεθος επιχείρησης", opciones: { general: "Μεσαία ή μεγάλη επιχείρηση", pequena: "Μικρή επιχείρηση" } },
  },
  filas: {
    base: { etiqueta: "Μισθός υπολογισμού" },
    bono: { etiqueta: "Επίδομα" },
    bonificacion: { etiqueta: "Προσαύξηση" },
    total: { etiqueta: "Σύνολο προς καταβολή" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Οι μήνες είναι από 1 έως 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Ο μισθός σας είναι χαμηλότερος από τον κατώτατο μισθό της περιφέρειάς σας, γι' αυτό το επίδομα υπολογίζεται με τον κατώτατο.",
  },
});
