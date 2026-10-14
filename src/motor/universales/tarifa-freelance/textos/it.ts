import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosIt: TextosUi<UiTarifaFreelance> = {
  slug: "calcolo-tariffa-oraria-freelance",
  ui: () => ({
    ingreso: "Quanto vuoi guadagnare netto all'anno",
    ingresoAyuda: "Al netto di tasse e spese. È il tuo stipendio da freelance.",
    gastos: "Spese dell'attività all'anno",
    gastosAyuda: "Attrezzatura, software, internet, corsi, commercialista, assicurazioni e risparmio per la pensione.",
    impuestos: "Tasse e contributi stimati (%)",
    impuestosAyuda: "Quanto va in tasse e contributi su quello che fatturi meno le spese. Se non sei sicuro, chiedi al commercialista. Il 25% è un punto di partenza.",
    diasLibres: "Giorni non lavorati all'anno",
    diasLibresAyuda: "Ferie, festività e giorni di malattia. Nessuno te li paga, quindi la tariffa deve coprirli.",
    diasSemana: "Giorni lavorativi a settimana",
    horasSemana: "Ore fatturabili a settimana",
    horasSemanaAyuda: "Solo le ore che fai pagare. Cercare clienti, amministrazione e formazione non si fatturano. Di solito da 20 a 30 su 40.",
    tarifaHora: "Tariffa oraria",
    tarifaDia: "Tariffa giornaliera",
    facturacionMensual: "Fatturato necessario al mese",
    facturacionAnual: "Fatturato necessario all'anno",
    horasAnio: "Ore fatturabili all'anno",
    errorIngreso: "Inserisci quanto vuoi guadagnare all'anno.",
    errorImpuestos: "Tasse e contributi devono essere sotto il 100%.",
    errorDias: "Con così tanti giorni liberi non restano giorni lavorativi nell'anno.",
    errorHoras: "Inserisci quante ore a settimana riesci a fatturare.",
    observacionFacturables: "Se chiedi meno di così, guadagnerai meno del previsto o lavorerai più ore.",
  }),
};
