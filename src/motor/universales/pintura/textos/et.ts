import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "liitrit" : "gallonit");

export const textosEt: TextosUi<UiPintura> = {
  slug: "varvikulu",
  ui: () => ({
    modo: "Milliseid mõõte sa tead?",
    modoMedidas: "Seinte pikkus ja kõrgus",
    modoSuperficie: "Värvitav kogupindala",
    largo: (u) => `Seinte kogupikkus (${u})`,
    largoAyuda: "Kõik värvitavad seinad kokku. Toas on see toa ümbermõõt.",
    alto: (u) => `Lae kõrgus (${u})`,
    superficie: (u) => `Värvitav pindala (${u})`,
    aberturas: (u) => `Mahaarvatavad uksed ja aknad (${u})`,
    aberturasAyuda: "Uks on umbes 2 m² (21 ft²) ja tavaline aken 1-2 m².",
    manos: "Värvikihtide arv",
    rendimiento: (u) => `Värvi katvus (${u})`,
    rendimientoAyuda: "Katvus on märgitud värvipurgile: kui suure pinna katab liiter ühe kihiga. Kui sa seda ei tea, jäta pakutud väärtus.",
    recomendado: (u) => `Ostetav värv (${volumen(u)})`,
    recomendadoAyuda: "Sisaldab 10% lisa paranduste ja rullile jääva värvi jaoks.",
    necesario: (u) => `Täpne kogus (${volumen(u)})`,
    neta: (u) => `Värvitav pindala (${u})`,
    errorMedidas: "Sisesta seinte pikkus ja kõrgus.",
    errorSuperficie: "Sisesta värvitav pindala.",
    errorAberturas: "Uksed ja aknad ei saa võtta enda alla kogu seina.",
    errorRendimiento: "Katvus peab olema suurem kui 0.",
  }),
};
