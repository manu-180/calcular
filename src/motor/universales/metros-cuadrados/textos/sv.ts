import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosSv: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadratmeter",
  ui: () => ({
    forma: (n) => `Yta ${n}: form`,
    formaAyuda: "Är rummet L-format eller oregelbundet, dela upp det i delar så läggs de ihop.",
    ninguna: "Används inte",
    rectangulo: "Rektangel eller kvadrat",
    triangulo: "Triangel",
    circulo: "Cirkel",
    medidaA: (n, u) => `Yta ${n}: längd, bas eller diameter (${u})`,
    medidaAAyuda: "Rektangel: längd och bredd. Triangel: bas och höjd. Cirkel: bara diametern.",
    medidaB: (n, u) => `Yta ${n}: bredd eller höjd (${u})`,
    total: (u) => `Total yta (${u})`,
    equivale: (u) => `Motsvarar i ${u}`,
    parcial: (n, u) => `Yta ${n} (${u})`,
    errorMedida: "Det här måttet saknas eller är 0.",
  }),
};
