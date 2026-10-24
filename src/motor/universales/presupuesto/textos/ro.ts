import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosRo: TextosUi<UiPresupuesto> = {
  slug: "buget-50-30-20",
  ui: () => ({
    ingreso: "Venit net lunar",
    ingresoAyuda: "Ce intră în cont în fiecare lună, după impozite și contribuții.",
    pctNecesidades: "Nevoi (%)",
    pctNecesidadesAyuda: "Locuință, alimente, utilități, transport, sănătate și ratele minime la datorii.",
    pctGustos: "Dorințe (%)",
    pctGustosAyuda: "Ieșiri în oraș, cumpărături care nu sunt necesare, abonamente, călătorii.",
    pctAhorro: "Economii (%)",
    pctAhorroAyuda: "Fond de urgență, obiective, pensie și plăți în plus la datorii.",
    necesidades: "Pentru nevoi",
    gustos: "Pentru dorințe",
    ahorro: "Pentru economii",
    ahorroAnual: "Economii într-un an",
    errorIngreso: "Introduceți venitul lunar.",
    errorSuma: (suma) => `Cele trei procente adunate dau ${suma}%. Trebuie să dea 100%.`,
    observacionAhorroBajo: "Dacă economisiți sub 10%, rămâne puțin loc pentru neprevăzut. Dacă se poate, tăiați din dorințe.",
  }),
};
