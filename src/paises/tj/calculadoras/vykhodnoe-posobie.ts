import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// Черновик: размеры выплат взяты из пересказа Трудового кодекса на справочном сайте.
export default definirCalculadora({
  id: "tj.vykhodnoe-posobie",
  mercado: "tj",
  concepto: "indemnizacion-despido",
  slug: "vykhodnoe-posobie",
  estado: "borrador",
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
      observaciones: ["Закон устанавливает нижнюю границу выплаты. Договор или соглашение могут предусматривать больше."],
    };
  },
  resultado: [
    { clave: "posobie", etiqueta: "Выходное пособие не меньше", formato: "moneda", destacada: true },
    { clave: "mesyatsev", etiqueta: "Среднемесячных заработков", formato: "numero", decimales: 0 },
  ],
});
