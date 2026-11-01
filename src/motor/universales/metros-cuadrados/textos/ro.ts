import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosRo: TextosUi<UiMetrosCuadrados> = {
  slug: "calculator-metri-patrati",
  ui: () => ({
    forma: (n) => `Suprafața ${n}: forma`,
    formaAyuda: "Dacă încăperea are formă de L sau este neregulată, împărțiți-o în bucăți, iar calculatorul le adună.",
    ninguna: "Nu se folosește",
    rectangulo: "Dreptunghi sau pătrat",
    triangulo: "Triunghi",
    circulo: "Cerc",
    medidaA: (n, u) => `Suprafața ${n}: lungime, bază sau diametru (${u})`,
    medidaAAyuda: "Dreptunghi: lungime și lățime. Triunghi: bază și înălțime. Cerc: doar diametrul.",
    medidaB: (n, u) => `Suprafața ${n}: lățime sau înălțime (${u})`,
    total: (u) => `Suprafața totală (${u})`,
    equivale: (u) => `Echivalent în ${u}`,
    parcial: (n, u) => `Suprafața ${n} (${u})`,
    errorMedida: "Această măsură lipsește sau este 0.",
  }),
};
