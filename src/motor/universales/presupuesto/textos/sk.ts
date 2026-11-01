import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosSk: TextosUi<UiPresupuesto> = {
  slug: "rodinny-rozpocet",
  ui: () => ({
    ingreso: "Čistý mesačný príjem",
    ingresoAyuda: "Koľko vám každý mesiac príde na účet po zaplatení daní a odvodov.",
    pctNecesidades: "Nevyhnutné výdavky (%)",
    pctNecesidadesAyuda: "Bývanie, potraviny, energie, doprava, zdravie a povinné splátky dlhov.",
    pctGustos: "Radosti a želania (%)",
    pctGustosAyuda: "Reštaurácie, nákupy, ktoré nie sú nutné, predplatné služby, cestovanie.",
    pctAhorro: "Sporenie (%)",
    pctAhorroAyuda: "Finančná rezerva, ciele, sporenie na dôchodok a mimoriadne splátky dlhov.",
    necesidades: "Na nevyhnutné výdavky",
    gustos: "Na radosti a želania",
    ahorro: "Na sporenie",
    ahorroAnual: "Nasporíte za rok",
    errorIngreso: "Zadajte svoj mesačný príjem.",
    errorSuma: (suma) => `Súčet všetkých troch percent je ${suma} %. Spolu musia dať 100 %.`,
    observacionAhorroBajo: "Keď sporíte menej ako 10 %, zostáva málo priestoru na nečakané výdavky. Ak môžete, uberte z radostí a želaní.",
  }),
};
