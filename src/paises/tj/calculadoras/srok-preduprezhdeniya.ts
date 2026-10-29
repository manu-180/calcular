import { definirCalculadora, enMapa } from "@/motor/calculo";

// Черновик: сроки взяты из пересказа Трудового кодекса, месяцы условно переведены в дни.
export default definirCalculadora({
  id: "tj.srok-preduprezhdeniya",
  mercado: "tj",
  concepto: "preaviso",
  slug: "srok-preduprezhdeniya",
  estado: "borrador",
  requiere: { "tj.preduprezhdenie": "mapa" },
  campos: [
    { id: "data", tipo: "fecha", etiqueta: "Дата вручения предупреждения", porDefecto: "hoy" },
    { id: "osnovanie", tipo: "opcion-dato", etiqueta: "Основание", dato: "tj.preduprezhdenie" },
  ],
  calcular(e, v) {
    const dney = enMapa(v["tj.preduprezhdenie"], e.osnovanie);
    const [g, m, d] = e.data.split("-").map(Number);
    const konets = new Date(Date.UTC(g, m - 1, d) + dney * 86400000).toISOString().slice(0, 10);
    return {
      dney,
      konets,
      observaciones: ["Месяцы здесь посчитаны как по 30 дней. Для точной даты сверьтесь с кадровой службой."],
    };
  },
  resultado: [
    { clave: "konets", etiqueta: "Предупреждение истекает", formato: "fecha", destacada: true },
    { clave: "dney", etiqueta: "Срок, дней", formato: "numero", decimales: 0 },
  ],
});
