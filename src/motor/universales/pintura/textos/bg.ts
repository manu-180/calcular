import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "литри" : "галони");

export const textosBg: TextosUi<UiPintura> = {
  slug: "kalkulator-za-boya",
  ui: () => ({
    modo: "Какви мерки имате?",
    modoMedidas: "Дължина и височина на стените",
    modoSuperficie: "Общата площ",
    largo: (u) => `Обща дължина на стените (${u})`,
    largoAyuda: "Всички стени, които ще боядисвате, събрани заедно. За стая това е периметърът.",
    alto: (u) => `Височина на стените (${u})`,
    superficie: (u) => `Площ за боядисване (${u})`,
    aberturas: (u) => `Врати и прозорци, които не се боядисват (${u})`,
    aberturasAyuda: "Една врата е около 2 м² (21 кв. фута), а обикновен прозорец е от 1 до 2 м².",
    manos: "Брой слоеве",
    rendimiento: (u) => `Разходна норма на боята (${u})`,
    rendimientoAyuda: "Пише я на кутията: колко площ покрива с един слой. Ако не я знаете, оставете предложената стойност.",
    recomendado: (u) => `Боя за купуване (${volumen(u)})`,
    recomendadoAyuda: "Включва 10% резерв за поправки и за това, което остава във валяка.",
    necesario: (u) => `Точно количество (${volumen(u)})`,
    neta: (u) => `Площ за боядисване (${u})`,
    errorMedidas: "Попълнете дължината и височината на стените.",
    errorSuperficie: "Попълнете площта за боядисване.",
    errorAberturas: "Вратите и прозорците не могат да заемат цялата стена.",
    errorRendimiento: "Разходната норма трябва да е по-голяма от 0.",
  }),
};
