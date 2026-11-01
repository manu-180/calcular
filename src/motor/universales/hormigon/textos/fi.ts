import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosFi: TextosUi<UiHormigon> = {
  slug: "betonilaskuri",
  ui: () => ({
    largo: (u) => `Pituus (${u})`,
    ancho: (u) => `Leveys (${u})`,
    espesor: (u) => `Paksuus (${u})`,
    espesorAyuda: "Terassin tai käytävän laatta on usein 10 cm (4 in) paksu. Ajoväylän laatta on 12 tai 15 cm.",
    margen: "Lisävara (%)",
    margenAyuda: "Epätasaista alustaa ja hukkaa varten. Tavallisesti 5 tai 10 %.",
    bolsa: (u) => `Sementtisäkin paino (${u})`,
    volumen: (u) => `Tarkka tilavuus (${u})`,
    volumenTotal: (u) => `Tarvittava betoni (${u})`,
    volumenPies: "Tarvittava betoni (ft³)",
    cemento: (u) => `Sementti (${u})`,
    bolsas: "Sementtisäkit",
    arena: (u) => `Hiekka (${u})`,
    piedra: (u) => `Sora tai murske (${u})`,
    agua: (u) => (u === "L" ? "Vesi (litraa)" : "Vesi (gallonaa)"),
    errorMedida: "Mitan on oltava suurempi kuin 0.",
    aviso: "Materiaalimäärät ovat suuntaa antavia yleiselle sekoitussuhteelle 1:2:3 (noin 350 kg sementtiä kuutiota kohden). Ne vaihtelevat reseptin, työn ja paikallisten materiaalien mukaan. Tarkista ne työn johtajalta.",
  }),
};
