import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosPl: TextosUi<UiMetrosCuadrados> = {
  slug: "kalkulator-metrow-kwadratowych",
  ui: () => ({
    forma: (n) => `Część ${n}: kształt`,
    formaAyuda: "Jeśli pokój ma kształt litery L albo jest nieregularny, podziel go na części, a kalkulator je zsumuje.",
    ninguna: "Nie używam",
    rectangulo: "Prostokąt albo kwadrat",
    triangulo: "Trójkąt",
    circulo: "Koło",
    medidaA: (n, u) => `Część ${n}: długość, podstawa albo średnica (${u})`,
    medidaAAyuda: "Prostokąt: długość i szerokość. Trójkąt: podstawa i wysokość. Koło: tylko średnica.",
    medidaB: (n, u) => `Część ${n}: szerokość albo wysokość (${u})`,
    total: (u) => `Łączna powierzchnia (${u})`,
    equivale: (u) => `To samo w ${u}`,
    parcial: (n, u) => `Część ${n} (${u})`,
    errorMedida: "Brakuje tego wymiaru albo wynosi 0.",
  }),
};
