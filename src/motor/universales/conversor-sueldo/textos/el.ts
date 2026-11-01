import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosEl: TextosUi<UiConversorSueldo> = {
  slug: "metatropi-misthou",
  ui: () => ({
    monto: "Αμοιβή",
    periodo: "Η αμοιβή είναι ανά",
    hora: "Ώρα",
    dia: "Ημέρα",
    semana: "Εβδομάδα",
    quincena: "Δεκαπενθήμερο (24 φορές τον χρόνο)",
    mes: "Μήνα",
    anio: "Έτος",
    horasSemana: "Ώρες εργασίας την εβδομάδα",
    diasSemana: "Ημέρες εργασίας την εβδομάδα",
    semanasAnio: "Αμειβόμενες εβδομάδες τον χρόνο",
    semanasAnioAyuda: "52 αν έχετε άδεια μετ' αποδοχών. Αν πληρώνεστε μόνο για τις εβδομάδες που δουλεύετε, αφαιρέστε τις υπόλοιπες.",
    porHora: "Ανά ώρα",
    porDia: "Ανά ημέρα",
    porSemana: "Ανά εβδομάδα",
    porQuincena: "Ανά δεκαπενθήμερο",
    porMes: "Ανά μήνα",
    porAnio: "Ανά έτος",
    errorHoras: "Εισάγετε πόσες ώρες την εβδομάδα εργάζεστε.",
    errorSemanas: "Οι αμειβόμενες εβδομάδες του χρόνου πρέπει να είναι περισσότερες από μηδέν.",
    observacionBruto: "Είναι το ίδιο ποσό μετατρεπόμενο σε άλλες περιόδους. Δεν προστίθενται επιπλέον μισθοί ή δώρα και δεν αφαιρούνται φόροι ή εισφορές.",
  }),
};
