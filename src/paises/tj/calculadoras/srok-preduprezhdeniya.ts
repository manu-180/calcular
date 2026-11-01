import { definirCalculadora, enMapa } from "@/motor/calculo";

// Черновик: изменения 2026 года не прочитаны полностью (см. datos.json). Трудовой кодекс: ч. 1 ст. 45 (срок в месяцах), ч. 1 ст. 41 (две недели). Месяцы считаются календарными.
function plyusMesyatsy(data: string, mesyatsy: number): string {
  const [g, m, d] = data.split("-").map(Number);
  const posledniy = new Date(Date.UTC(g, m - 1 + mesyatsy + 1, 0)).getUTCDate();
  return new Date(Date.UTC(g, m - 1 + mesyatsy, Math.min(d, posledniy))).toISOString().slice(0, 10);
}

export default definirCalculadora({
  id: "tj.srok-preduprezhdeniya",
  mercado: "tj",
  concepto: "preaviso",
  slug: "srok-preduprezhdeniya",
  estado: "borrador",
  requiere: { "tj.preduprezhdenie": "mapa", "tj.preduprezhdenie-rabotnika": "numero" },
  campos: [
    { id: "data", tipo: "fecha", etiqueta: "Дата вручения предупреждения", porDefecto: "hoy" },
    {
      id: "osnovanie",
      tipo: "opcion",
      etiqueta: "Основание",
      opciones: [
        { valor: "likvidatsiya", etiqueta: "Ликвидация, сокращение численности или штата" },
        { valor: "kvalifikatsiya", etiqueta: "Недостаточная квалификация или состояние здоровья" },
        { valor: "rabotnik", etiqueta: "Увольнение по инициативе работника" },
      ],
      porDefecto: "likvidatsiya",
    },
  ],
  calcular(e, v) {
    if (e.osnovanie === "rabotnik") {
      const dney = v["tj.preduprezhdenie-rabotnika"];
      const [g, m, d] = e.data.split("-").map(Number);
      return { konets: new Date(Date.UTC(g, m - 1, d + dney)).toISOString().slice(0, 10), srok: `${dney} дн.` };
    }
    const mesyatsy = enMapa(v["tj.preduprezhdenie"], e.osnovanie);
    return { konets: plyusMesyatsy(e.data, mesyatsy), srok: `${mesyatsy} мес.` };
  },
  resultado: [
    { clave: "konets", etiqueta: "Предупреждение истекает", formato: "fecha", destacada: true },
    { clave: "srok", etiqueta: "Срок", formato: "texto" },
  ],
});
