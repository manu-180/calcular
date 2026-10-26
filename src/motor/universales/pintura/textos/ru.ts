import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "литров" : "галлонов");
const unidad = (u: string) => ({ m: "м", ft: "футы", "m²": "м²", "ft²": "кв. футы", "m²/L": "м² на литр", "ft²/gal": "кв. футов на галлон" })[u] ?? u;

export const textosRu: TextosUi<UiPintura> = {
  slug: "kalkulyator-kraski",
  ui: () => ({
    modo: "Какие размеры вам известны?",
    modoMedidas: "Длина и высота стен",
    modoSuperficie: "Общая площадь",
    largo: (u) => `Общая длина стен (${unidad(u)})`,
    largoAyuda: "Сумма длин всех стен, которые вы будете красить. Для комнаты это периметр.",
    alto: (u) => `Высота стен (${unidad(u)})`,
    superficie: (u) => `Площадь окрашивания (${unidad(u)})`,
    aberturas: (u) => `Двери и окна, которые не красят (${unidad(u)})`,
    aberturasAyuda: "Дверь занимает около 2 м² (21 кв. фут), обычное окно от 1 до 2 м².",
    manos: "Количество слоев",
    rendimiento: (u) => `Расход краски (${unidad(u)})`,
    rendimientoAyuda: "Указан на банке: сколько площади покрывает краска за один слой. Если не знаете, оставьте предложенное значение.",
    recomendado: (u) => `Сколько краски купить (${volumen(u)})`,
    recomendadoAyuda: "С запасом 10% на подкраску и то, что остается на валике.",
    necesario: (u) => `Точное количество (${volumen(u)})`,
    neta: (u) => `Площадь окрашивания (${unidad(u)})`,
    errorMedidas: "Укажите длину и высоту стен.",
    errorSuperficie: "Укажите площадь окрашивания.",
    errorAberturas: "Двери и окна не могут занимать всю стену.",
    errorRendimiento: "Расход краски должен быть больше 0.",
  }),
};
