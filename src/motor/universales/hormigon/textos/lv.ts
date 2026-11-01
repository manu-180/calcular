import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosLv: TextosUi<UiHormigon> = {
  slug: "betona-kalkulators",
  ui: () => ({
    largo: (u) => `Garums (${u})`,
    ancho: (u) => `Platums (${u})`,
    espesor: (u) => `Biezums (${u})`,
    espesorAyuda: "Terasei vai celiņam parasti izvēlas 10 cm (4 in), iebrauktuvei automašīnai 12 līdz 15 cm.",
    margen: "Rezerve (%)",
    margenAyuda: "Nelīdzenai pamatnei un betona zudumiem. Parasti 5 līdz 10%.",
    bolsa: (u) => `Cementa maisa svars (${u})`,
    volumen: (u) => `Precīzs tilpums (${u})`,
    volumenTotal: (u) => `Nepieciešamais betona daudzums (${u})`,
    volumenPies: "Nepieciešamais betona daudzums (ft³)",
    cemento: (u) => `Cements (${u})`,
    bolsas: "Cementa maisi (gab.)",
    arena: (u) => `Smiltis (${u})`,
    piedra: (u) => `Šķembas (${u})`,
    agua: (u) => (u === "L" ? "Ūdens (litros)" : "Ūdens (galonos)"),
    errorMedida: "Šim izmēram jābūt lielākam par nulli.",
    aviso: "Materiālu daudzums ir orientējošs un rēķināts parastam maisījumam 1 : 2 : 3 (ap 350 kg cementa uz 1 m³). Tas atkarīgs no maisījuma proporcijām, darba veida un vietējiem materiāliem: pārbaudiet to pie būvdarbu vadītāja vai konstruktora.",
  }),
};
