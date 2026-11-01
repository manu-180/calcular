import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosHu: TextosUi<UiConversorSueldo> = {
  slug: "oraber-kalkulator",
  ui: () => ({
    monto: "Bér",
    periodo: "A bér időszaka",
    hora: "Óra",
    dia: "Nap",
    semana: "Hét",
    quincena: "Félhavi (évente 24 alkalom)",
    mes: "Hónap",
    anio: "Év",
    horasSemana: "Heti munkaórák",
    diasSemana: "Heti munkanapok",
    semanasAnio: "Fizetett hetek évente",
    semanasAnioAyuda: "52, ha a szabadságodat is kifizetik. Ha csak a ledolgozott hetekért kapsz bért, vond le a többit.",
    porHora: "Órabér",
    porDia: "Napibér",
    porSemana: "Heti bér",
    porQuincena: "Félhavi bér",
    porMes: "Havi bér",
    porAnio: "Éves bér",
    errorHoras: "Add meg, hetente hány órát dolgozol.",
    errorSemanas: "A fizetett hetek száma nullánál több kell legyen.",
    observacionBruto: "Ugyanaz az összeg más időszakra átszámolva. A prémiumokat nem adja hozzá, és az adókat, járulékokat nem vonja le.",
  }),
};
