import { GRAMATICA } from "../../../i18n/gramatica";
import { formaUk } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoUk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const u = (n: number) => `${formatearNumero(ctx, n)} ${formaUk(n, "одиницю", "одиниці", "одиниць")}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Калькулятор точки беззбитковості",
    title: tituloQueEntre(
      `Калькулятор точки беззбитковості ${GRAMATICA.uk.para(ctx.nombrePais)}`,
      `Точка беззбитковості: калькулятор ${GRAMATICA.uk.para(ctx.nombrePais)}`,
      "Калькулятор точки беззбитковості",
    ),
    description: "Дізнайтеся, скільки одиниць потрібно продати і яку виручку отримувати щомісяця, щоб покрити витрати і досягти бажаного прибутку.",
    intro: [
      "Точка беззбитковості є обсягом продажів, за якого бізнес нічого не заробляє і нічого не втрачає. Нижче неї ви в збитку, вище починаєте отримувати прибуток.",
      "Введіть постійні витрати, ціну і змінні витрати на одиницю. Ми покажемо, скільки треба продати, щоб покрити витрати і досягти своєї мети.",
    ],
    comoSeCalcula: [
      "Маржинальний дохід = ціна − змінні витрати на одиницю.",
      "Одиниць до беззбитковості = постійні витрати ÷ маржинальний дохід, з округленням угору.",
      "Виручка в точці беззбитковості = постійні витрати ÷ (маржинальний дохід ÷ ціна).",
      "Для бажаного прибутку додайте його до постійних витрат і зробіть той самий розрахунок.",
    ],
    ejemplo: [
      `За постійних витрат ${m(fijos)}, ціни ${m(precio)} і змінних витрат ${m(variable)} кожен продаж лишає ${m(precio - variable)}.`,
      `Щоб покрити витрати, потрібно продати ${u(base.unidades)} (${m(base.facturacion)}), а щоб заробляти ${m(objetivo)} на місяць, ${u(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Що таке постійні і змінні витрати?",
        respuesta: "Постійні витрати не змінюються, навіть якщо ви нічого не продаєте: оренда, фіксовані зарплати, комунальні послуги. Змінні зростають з кожним продажем: товар, матеріали, комісії, доставка.",
      },
      {
        pregunta: "Як знизити точку беззбитковості?",
        respuesta: "Є три важелі: підвищити ціну, зменшити змінні витрати на одиницю або скоротити постійні витрати. Найсильніше зазвичай впливає ціна.",
      },
      {
        pregunta: "Чи підходить це для бізнесу послуг?",
        respuesta: "Так. Одиницею може бути година, сеанс чи клієнт на місяць. Як змінні витрати вкажіть, скільки вам коштує надати кожну з них.",
      },
    ],
    glosario: [
      { termino: "Точка беззбитковості", definicion: "Обсяг продажів, за якого виручка дорівнює витратам." },
      { termino: "Маржинальний дохід", definicion: "Те, що кожен продаж лишає на покриття постійних витрат." },
    ],
  };
};
