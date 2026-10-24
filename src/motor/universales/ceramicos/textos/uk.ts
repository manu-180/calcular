import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosUk: TextosUi<UiCeramicos> = {
  slug: "skilky-plytky-potribno",
  ui: () => ({
    superficie: (u) => `Площа для укладання (${u})`,
    largo: (u) => `Довжина плитки (${u})`,
    ancho: (u) => `Ширина плитки (${u})`,
    desperdicio: "Запас на підрізку (%)",
    desperdicioAyuda: "На підрізку і бій. Для прямого укладання беріть 10%, для діагонального 15%.",
    porCaja: "Плиток в одній коробці",
    porCajaAyuda: "Необовʼязково. Заповніть, щоб побачити, скільки коробок купити.",
    piezas: "Потрібно плиток (шт.)",
    cajas: "Скільки коробок купити",
    conDesperdicio: (u) => `Площа із запасом (${u})`,
    cubre: (u) => `Площа, яку покривають коробки (${u})`,
    errorSuperficie: "Площа має бути більшою за нуль.",
    errorPieza: "Розміри плитки мають бути більшими за нуль.",
  }),
};
