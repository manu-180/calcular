import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { plusDney, plusMesyatsev, prochitat, sklonenie, zapisat } from "../lib/daty";

export default definirCalculadora({
  id: "kg.ispytatelnyy-srok",
  mercado: "kg",
  concepto: "propio",
  slug: "ispytatelnyy-srok",
  estado: "publicado",
  requiere: { "kg.ispytanie-maks": "mapa", "kg.preduprezhdenie-rabochie-dni": "mapa" },
  campos: [
    { id: "dolzhnost", tipo: "opcion-dato", dato: "kg.ispytanie-maks", etiqueta: "Должность", porDefecto: "obshchiy" },
    { id: "nachalo", tipo: "fecha", etiqueta: "Первый рабочий день", porDefecto: "hoy" },
    { id: "mesyatsev", tipo: "entero", etiqueta: "Испытательный срок по трудовому договору, месяцев", min: 1, max: 6, porDefecto: 3 },
    {
      id: "otsutstvie",
      tipo: "entero",
      etiqueta: "Дней отсутствия во время испытания",
      min: 0,
      max: 365,
      porDefecto: 0,
      ayuda: "Больничный и другие дни, когда вы фактически не работали. Они не засчитываются в испытательный срок.",
    },
  ],
  calcular(e, v) {
    const maks = enMapa(v["kg.ispytanie-maks"], e.dolzhnost);
    if (e.mesyatsev > maks) {
      throw new ErrorEntrada(`Для этой должности испытательный срок не может быть больше ${sklonenie(maks, ["месяца", "месяцев", "месяцев"])}.`, "mesyatsev");
    }
    const konets = plusDney(plusMesyatsev(prochitat(e.nachalo), e.mesyatsev), e.otsutstvie);
    const observaciones: string[] = [];
    if (e.otsutstvie > 0) observaciones.push(`Срок продлен на ${sklonenie(e.otsutstvie, ["день", "дня", "дней"])} отсутствия.`);
    observaciones.push("Если до конца срока работодатель не расторг договор, испытание считается выдержанным.");
    return { konets: zapisat(konets), maks, observaciones };
  },
  resultado: [
    { clave: "konets", etiqueta: "Испытательный срок истекает", formato: "fecha", destacada: true },
    { clave: "maks", etiqueta: "Максимум для этой должности", formato: "meses" },
  ],
});
