import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosCs: TextosUi<UiPresupuesto> = {
  slug: "rodinny-rozpocet",
  ui: () => ({
    ingreso: "Čistý měsíční příjem",
    ingresoAyuda: "Kolik vám každý měsíc přijde na účet po zaplacení daní a pojištění.",
    pctNecesidades: "Nezbytné výdaje (%)",
    pctNecesidadesAyuda: "Bydlení, potraviny, energie, doprava, zdraví a povinné splátky dluhů.",
    pctGustos: "Radosti a přání (%)",
    pctGustosAyuda: "Restaurace, nákupy, které nejsou nutné, předplatné, cestování.",
    pctAhorro: "Spoření (%)",
    pctAhorroAyuda: "Finanční rezerva, cíle, spoření na důchod a mimořádné splátky dluhů.",
    necesidades: "Na nezbytné výdaje",
    gustos: "Na radosti a přání",
    ahorro: "Na spoření",
    ahorroAnual: "Naspoříte za rok",
    errorIngreso: "Zadejte svůj měsíční příjem.",
    errorSuma: (suma) => `Součet všech tří procent je ${suma} %. Musí dát dohromady 100 %.`,
    observacionAhorroBajo: "Když spoříte méně než 10 %, zbývá málo prostoru na nečekané výdaje. Pokud můžete, uberte z radostí a přání.",
  }),
};
