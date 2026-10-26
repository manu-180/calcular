import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosHu: TextosUi<UiPromedio> = {
  slug: "atlag-kalkulator",
  ui: () => ({
    nota: (n) => `Jegy vagy érték (${n}.)`,
    notaAyuda: "Írd be az összes jegyet vagy értéket a súlyával együtt. A fölösleges sorokat hagyd üresen.",
    peso: (n) => `Súly (${n}.)`,
    pesoAyuda: "Lehet százalék, kreditszám vagy az, hogy hányszor számít. Súlyok nélkül minden érték ugyanannyit ér.",
    ponderado: "Súlyozott átlag",
    simple: "Egyszerű átlag",
    cantidad: "Értékek száma",
    sumaPesos: "A súlyok összege",
    errorSinNotas: "Adj meg legalább egy értéket.",
    errorFaltaPeso: "Ennél az értéknél hiányzik a súly. Ha súlyokat használsz, mindegyik értékhez írj súlyt.",
    errorFaltaNota: "Ehhez a súlyhoz nem tartozik érték. Írd be az értéket, vagy töröld a súlyt.",
    errorPesosCero: "A súlyok összege nulla: legalább egy súlynak nagyobbnak kell lennie nullánál.",
    sinPesos: "Súlyok nélkül a súlyozott átlag ugyanannyi, mint az egyszerű átlag.",
  }),
};
