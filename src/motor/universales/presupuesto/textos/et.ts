import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosEt: TextosUi<UiPresupuesto> = {
  slug: "eelarve-50-30-20",
  ui: () => ({
    ingreso: "Netosissetulek kuus",
    ingresoAyuda: "Summa, mis laekub iga kuu sinu kontole pärast makse ja muid kinnipidamisi.",
    pctNecesidades: "Vajalikud kulud (%)",
    pctNecesidadesAyuda: "Eluase, toit, elekter, transport, tervis ja laenude miinimummaksed.",
    pctGustos: "Muud kulud ja vaba aeg (%)",
    pctGustosAyuda: "Restoranid, ostud, milleta saaksid hakkama, tellimused ja reisid.",
    pctAhorro: "Säästmine (%)",
    pctAhorroAyuda: "Hädaabifond, säästueesmärgid, pension ja võlgade lisamaksed.",
    necesidades: "Vajalikeks kuludeks",
    gustos: "Muudeks kuludeks ja vabaks ajaks",
    ahorro: "Säästmiseks",
    ahorroAnual: "Sääst aastas",
    errorIngreso: "Sisesta oma kuusissetulek.",
    errorSuma: (suma) => `Osakaalud on kokku ${suma}%. Nende summa peab olema 100%.`,
    observacionAhorroBajo: "Kui säästad alla 10%, jääb ootamatuteks kuludeks vähe varu. Kärbi võimaluse korral muid kulusid.",
  }),
};
