import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosUk: TextosUi<UiOvulacion> = {
  slug: "kalkuliator-ovuliatsii",
  ui: () => ({
    fum: "Перший день останньої менструації",
    fumAyuda: "Перший день кровотечі, а не останній.",
    ciclo: "Тривалість менструального циклу (днів)",
    cicloAyuda: "Від першого дня однієї менструації до дня перед наступною. Якщо тривалість змінюється, введіть середню.",
    ovulacion: "Орієнтовний день овуляції",
    fertilDesde: "Початок фертильних днів",
    fertilHasta: "Кінець фертильних днів",
    proxima: "Наступна менструація",
    tabla: "Наступні цикли",
    colRegla: "Менструація",
    colDesde: "Фертильні дні з",
    colHasta: "Фертильні дні до",
    colOvulacion: "Овуляція",
    errorCiclo: "Тривалість циклу має бути від 21 до 45 днів.",
    aviso: "Це оцінка для регулярних циклів. Вона не є методом контрацепції і не замінює консультації з лікарем.",
  }),
};
