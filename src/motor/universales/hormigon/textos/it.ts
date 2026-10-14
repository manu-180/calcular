import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosIt: TextosUi<UiHormigon> = {
  slug: "calcolo-calcestruzzo",
  ui: () => ({
    largo: (u) => `Lunghezza (${u})`,
    ancho: (u) => `Larghezza (${u})`,
    espesor: (u) => `Spessore (${u})`,
    espesorAyuda: "Un vialetto o un piccolo cortile di solito è di 10 cm. Un passo carrabile, da 12 a 15 cm.",
    margen: "Margine in più (%)",
    margenAyuda: "Per terreno irregolare e perdite durante il getto. Di solito dal 5% al 10%.",
    bolsa: (u) => `Peso del sacco di cemento (${u})`,
    volumen: (u) => `Volume esatto (${u})`,
    volumenTotal: (u) => `Calcestruzzo necessario (${u})`,
    volumenPies: "Calcestruzzo necessario (ft³)",
    cemento: (u) => `Cemento (${u})`,
    bolsas: "Sacchi di cemento",
    arena: (u) => `Sabbia (${u})`,
    piedra: (u) => `Ghiaia (${u})`,
    agua: (u) => (u === "L" ? "Acqua (litri)" : "Acqua (galloni)"),
    errorMedida: "Questa misura deve essere maggiore di 0.",
    aviso: "I materiali sono indicativi per un impasto generico 1:2:3 (circa 350 kg di cemento per m³). Cambiano con il dosaggio, il tipo di lavoro e i materiali della zona: verificali con chi dirige i lavori.",
  }),
};
