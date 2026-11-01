import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosHu: TextosUi<UiPresupuesto> = {
  slug: "50-30-20-szabaly",
  ui: () => ({
    ingreso: "Havi nettó jövedelem",
    ingresoAyuda: "Amennyi havonta a számládra érkezik, adók és járulékok után.",
    pctNecesidades: "Szükségletek (%)",
    pctNecesidadesAyuda: "Lakhatás, élelmiszer, rezsi, közlekedés, egészség és a hitelek minimális törlesztése.",
    pctGustos: "Vágyak (%)",
    pctGustosAyuda: "Étterem, nem létfontosságú vásárlás, előfizetések, utazás.",
    pctAhorro: "Megtakarítás (%)",
    pctAhorroAyuda: "Vésztartalék, célok, nyugdíj és a hitelek előtörlesztése.",
    necesidades: "Szükségletekre",
    gustos: "Vágyakra",
    ahorro: "Megtakarításra",
    ahorroAnual: "Megtakarítás egy év alatt",
    errorIngreso: "Add meg a havi jövedelmedet.",
    errorSuma: (suma) => `A három százalék összege most: ${suma}%. Pontosan 100 százaléknak kell kijönnie.`,
    observacionAhorroBajo: "Ha 10 százaléknál kevesebbet teszel félre, kevés marad a váratlan kiadásokra. Ha teheted, faragj le a vágyakból.",
  }),
};
