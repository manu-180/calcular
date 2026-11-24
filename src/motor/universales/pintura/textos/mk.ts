import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "литри" : "галони");

export const textosMk: TextosUi<UiPintura> = {
  slug: "kalkulator-za-boja",
  ui: () => ({
    modo: "Какви мерки имате?",
    modoMedidas: "Должина и висина на ѕидовите",
    modoSuperficie: "Вкупната површина",
    largo: (u) => `Вкупна должина на ѕидовите (${u})`,
    largoAyuda: "Сите ѕидови што ќе ги боите, собрани заедно. За просторија тоа е периметарот.",
    alto: (u) => `Висина на ѕидовите (${u})`,
    superficie: (u) => `Површина за боење (${u})`,
    aberturas: (u) => `Прозорци и врати што не се бојат (${u})`,
    aberturasAyuda: "Една врата е околу 2 м² (21 кв. стапка), а обичен прозорец е од 1 до 2 м².",
    manos: "Број на слоеви",
    rendimiento: (u) => `Покривност на бојата (${u})`,
    rendimientoAyuda: "Пишува на кантата: колку површина покрива со еден слој. Ако не ја знаете, оставете ја предложената вредност.",
    recomendado: (u) => `Боја за купување (${volumen(u)})`,
    recomendadoAyuda: "Вклучува 10 % резерва за поправки и за она што останува на валјакот.",
    necesario: (u) => `Точна количина (${volumen(u)})`,
    neta: (u) => `Површина за боење (${u})`,
    errorMedidas: "Пополнете ги должината и висината на ѕидовите.",
    errorSuperficie: "Пополнете ја површината за боење.",
    errorAberturas: "Вратите и прозорците не можат да го зафаќаат целиот ѕид.",
    errorRendimiento: "Покривноста треба да биде поголема од 0.",
  }),
};
