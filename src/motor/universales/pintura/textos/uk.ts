import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "літрів" : "галонів");

export const textosUk: TextosUi<UiPintura> = {
  slug: "skilky-farby-potribno",
  ui: () => ({
    modo: "Які розміри ви знаєте?",
    modoMedidas: "Довжину і висоту стін",
    modoSuperficie: "Загальну площу",
    largo: (u) => `Загальна довжина стін (${u})`,
    largoAyuda: "Сума всіх стін, які ви фарбуватимете. Для кімнати це її периметр.",
    alto: (u) => `Висота стін (${u})`,
    superficie: (u) => `Площа для фарбування (${u})`,
    aberturas: (u) => `Двері й вікна, які віднімаємо (${u})`,
    aberturasAyuda: "Двері займають близько 2 м² (21 ft²), звичайне вікно від 1 до 2 м².",
    manos: "Кількість шарів",
    rendimiento: (u) => `Витрата фарби (${u})`,
    rendimientoAyuda: "Її вказано на банці: яку площу покриває фарба за один шар. Якщо не знаєте, залиште рекомендоване значення.",
    recomendado: (u) => `Скільки купити (${volumen(u)})`,
    recomendadoAyuda: "Враховано запас 10% на підфарбовування і фарбу, що лишається на валику.",
    necesario: (u) => `Точна кількість (${volumen(u)})`,
    neta: (u) => `Площа для фарбування (${u})`,
    errorMedidas: "Введіть довжину і висоту стін.",
    errorSuperficie: "Введіть площу для фарбування.",
    errorAberturas: "Двері й вікна не можуть займати всю стіну.",
    errorRendimiento: "Витрата фарби має бути більшою за нуль.",
  }),
};
