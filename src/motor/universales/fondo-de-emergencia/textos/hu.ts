import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosHu: TextosUi<UiFondoDeEmergencia> = {
  slug: "vesztartalek-kalkulator",
  ui: () => ({
    gastos: "Elengedhetetlen havi kiadások",
    gastosAyuda: "Amit nem hagyhatsz abba: lakhatás, étel, rezsi, közlekedés, egészség és hiteltörlesztés.",
    meses: "Hány havi kiadásra",
    mesesAyuda: "Stabil jövedelemnél legalább 3, legfeljebb 6 hónapra. Többre, ha a jövedelmed ingadozik, vagy a háztartásban csak egy kereső van.",
    actual: "Eddigi megtakarításod (nem kötelező)",
    aporte: "Havonta ennyit tudsz félretenni (nem kötelező)",
    meta: "Javasolt vésztartalék",
    falta: "Még ennyit kell összegyűjteni",
    mesesParaLlegar: "Hónapok a cél eléréséig",
    cobertura: "Ennyi hónapra elég ma a megtakarításod",
    errorGastos: "Add meg az elengedhetetlen havi kiadásaidat.",
    yaCubierto: "A vésztartalékod már megvan. Amit ezután félreteszel, más célokra fordíthatod.",
    sinAporte: "Add meg, havonta mennyit tudsz félretenni, és megmutatjuk, mennyi időbe telik.",
    observacionDonde: "Ezt a pénzt tartsd külön számlán, ahonnan még aznap hozzáférsz, és ahol nem veszít az értékéből, például megtakarítási számlán.",
  }),
};
