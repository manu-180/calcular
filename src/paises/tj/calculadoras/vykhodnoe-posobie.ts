import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// Трудовой кодекс: ч. 2 ст. 51 (три оклада) и ч. 1 ст. 169 (средний месячный заработок). Сокращение есть в обеих статьях.
export default definirCalculadora({
  id: "tj.vykhodnoe-posobie",
  mercado: "tj",
  concepto: "indemnizacion-despido",
  slug: "vykhodnoe-posobie",
  estado: "publicado",
  requiere: { "tj.vykhodnoe-mesyatsev": "mapa" },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Среднемесячный заработок", min: 0, porDefecto: 5000 },
    { id: "osnovanie", tipo: "opcion-dato", etiqueta: "Основание увольнения", dato: "tj.vykhodnoe-mesyatsev" },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите заработок больше нуля.", "zarabotok");
    const mesyatsev = enMapa(v["tj.vykhodnoe-mesyatsev"], e.osnovanie);
    return {
      posobie: redondear(e.zarabotok * mesyatsev),
      mesyatsev,
      observaciones: [
        e.osnovanie === "obychnoe"
          ? "По статье 169 средний заработок может сохраняться еще на второй и третий месяц, если орган по труду примет такое решение. Обратиться в него нужно в течение десяти дней после увольнения."
          : "Закон устанавливает нижнюю границу выплаты. Договор или соглашение могут предусматривать больше.",
      ],
    };
  },
  resultado: [
    { clave: "posobie", etiqueta: "Выходное пособие не меньше", formato: "moneda", destacada: true },
    { clave: "mesyatsev", etiqueta: "Средних месячных заработков", formato: "numero", decimales: 0 },
  ],
});
