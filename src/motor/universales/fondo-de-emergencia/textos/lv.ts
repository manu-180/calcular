import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosLv: TextosUi<UiFondoDeEmergencia> = {
  slug: "drosibas-spilvena-kalkulators",
  ui: () => ({
    gastos: "Nepieciešamie mēneša izdevumi",
    gastosAyuda: "Tas, ko nevarat pārstāt maksāt: mājoklis, pārtika, komunālie maksājumi, transports, veselība un kredītu maksājumi.",
    meses: "Cik mēnešu izdevumiem",
    mesesAyuda: "Ja ienākumi ir stabili, 3 līdz 6 mēnešiem. Vairāk, ja ienākumi svārstās vai mājsaimniecībai ir tikai viens ienākumu avots.",
    actual: "Cik jau ir uzkrāts (nav obligāti)",
    aporte: "Cik varat atlikt mēnesī (nav obligāti)",
    meta: "Ieteicamais drošības spilvens",
    falta: "Vēl jāuzkrāj",
    mesesParaLlegar: "Mēneši līdz mērķim",
    cobertura: "Cik mēnešu izdevumiem šodien pietiktu uzkrājumu",
    errorGastos: "Ievadiet nepieciešamos mēneša izdevumus.",
    yaCubierto: "Drošības spilvens jums jau ir. To, ko atliksiet turpmāk, varat novirzīt citiem mērķiem.",
    sinAporte: "Ievadiet, cik varat atlikt mēnesī, un parādīsim, cik ilgi tas prasīs.",
    observacionDonde: "Glabājiet šo naudu atsevišķā kontā, no kura to var izņemt tajā pašā dienā un kurā tā nezaudē vērtību, piemēram, krājkontā.",
  }),
};
