import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosLv: TextosUi<UiTarifaFreelance> = {
  slug: "pasnodarbinata-likmes-kalkulators",
  ui: () => ({
    ingreso: "Vēlamie neto ienākumi gadā",
    ingresoAyuda: "Pēc nodokļu samaksas un izdevumu atskaitīšanas. Tā ir jūsu alga par pašnodarbinātā darbu.",
    gastos: "Saimnieciskās darbības izdevumi gadā",
    gastosAyuda: "Aprīkojums, programmatūra, internets, kursi, grāmatvedība, apdrošināšana un uzkrājumi pensijai.",
    impuestos: "Paredzamie nodokļi un iemaksas (%)",
    impuestosAyuda:
      "Cik samaksāsiet nodokļos un sociālajās iemaksās no ienākumiem pēc izdevumu atskaitīšanas. Ja šaubāties, pajautājiet grāmatvedim. Sākotnējam novērtējumam derēs 25%.",
    diasLibres: "Brīvās dienas gadā",
    diasLibresAyuda: "Atvaļinājums, svētku un slimības dienas. Neviens par tām nesamaksās, tāpēc tās jāsedz jūsu likmei.",
    diasSemana: "Darba dienas nedēļā",
    horasSemana: "Apmaksātās stundas nedēļā",
    horasSemanaAyuda:
      "Tikai stundas, ko apmaksā klienti. Pasūtījumu meklēšana, administrēšana un mācīšanās netiek apmaksāta. Parasti tās ir 20 līdz 30 stundas no 40.",
    tarifaHora: "Stundas likme",
    tarifaDia: "Dienas likme",
    facturacionMensual: "Vajadzīgie ieņēmumi mēnesī",
    facturacionAnual: "Vajadzīgie ieņēmumi gadā",
    horasAnio: "Apmaksātās stundas gadā",
    errorIngreso: "Ievadiet, cik vēlaties nopelnīt gadā.",
    errorImpuestos: "Nodokļiem jābūt mazākiem par 100%.",
    errorDias: "Ar tik daudz brīvajām dienām gadā nepaliks neviena darba diena.",
    errorHoras: "Ievadiet, cik apmaksātu stundu nedēļā varat strādāt.",
    observacionFacturables: "Ja apmaksāto stundu būs mazāk, nopelnīsiet mazāk, nekā plānojat, vai būs jāstrādā ilgāk.",
  }),
};
