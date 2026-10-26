import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosRo: TextosUi<UiTarifaFreelance> = {
  slug: "tarif-orar-freelancer",
  ui: () => ({
    ingreso: "Cât doriți să vă rămână pe an",
    ingresoAyuda: "După impozite și cheltuieli. Este salariul dumneavoastră ca freelancer.",
    gastos: "Cheltuieli ale activității pe an",
    gastosAyuda: "Echipamente, programe, internet, cursuri, contabil, asigurare de sănătate și economii pentru pensie.",
    impuestos: "Impozite și contribuții estimate (%)",
    impuestosAyuda: "Cât merge la impozite și contribuții din ce facturați minus cheltuielile. Dacă nu sunteți sigur, întrebați un contabil. 25% este un punct de plecare.",
    diasLibres: "Zile libere pe an",
    diasLibresAyuda: "Concediu, sărbători legale și zile de boală. Nu vi le plătește nimeni, așa că tariful trebuie să le acopere.",
    diasSemana: "Zile lucrate pe săptămână",
    horasSemana: "Ore facturabile pe săptămână",
    horasSemanaAyuda: "Doar orele pe care le facturați. Căutarea clienților, partea administrativă și învățatul nu se facturează. De obicei sunt între 20 și 30 din 40.",
    tarifaHora: "Tarif orar",
    tarifaDia: "Tarif pe zi",
    facturacionMensual: "Facturare necesară pe lună",
    facturacionAnual: "Facturare necesară pe an",
    horasAnio: "Ore facturabile pe an",
    errorIngreso: "Introduceți cât doriți să câștigați pe an.",
    errorImpuestos: "Impozitele trebuie să fie sub 100%.",
    errorDias: "Cu atâtea zile libere nu mai rămân zile lucrătoare în an.",
    errorHoras: "Introduceți câte ore pe săptămână puteți factura.",
    observacionFacturables: "Dacă cereți mai puțin de atât, veți câștiga mai puțin decât ați planificat sau veți lucra mai multe ore.",
  }),
};
