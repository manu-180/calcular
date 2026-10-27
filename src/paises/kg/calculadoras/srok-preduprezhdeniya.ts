import { definirCalculadora, enMapa } from "@/motor/calculo";
import { naRabochiy, plusDney, plusMesyatsev, plusRabochikhDney, prochitat, sklonenie, vykhodnoy, zapisat } from "../lib/daty";

export default definirCalculadora({
  id: "kg.srok-preduprezhdeniya",
  mercado: "kg",
  concepto: "preaviso",
  slug: "srok-preduprezhdeniya",
  estado: "publicado",
  requiere: {
    "kg.preduprezhdenie-mesyatsy": "mapa",
    "kg.preduprezhdenie-nedeli": "mapa",
    "kg.preduprezhdenie-dni": "mapa",
    "kg.preduprezhdenie-rabochie-dni": "mapa",
  },
  campos: [
    {
      id: "situatsiya",
      tipo: "opcion",
      etiqueta: "Ситуация",
      opciones: [
        { valor: "sobstvennoe", etiqueta: "Работник увольняется по собственному желанию" },
        { valor: "sokrashchenie", etiqueta: "Ликвидация организации или сокращение штата" },
        { valor: "nesootvetstvie", etiqueta: "Несоответствие должности по здоровью или квалификации" },
        { valor: "ispytanie-rabotodatel", etiqueta: "Работник не выдержал испытание" },
        { valor: "ispytanie-rabotnik", etiqueta: "Работник сам уходит во время испытания" },
        { valor: "korotkiy-rabotnik", etiqueta: "Договор до 2 месяцев: работник уходит досрочно" },
        { valor: "korotkiy-rabotodatel", etiqueta: "Договор до 2 месяцев: ликвидация или сокращение" },
      ],
      porDefecto: "sobstvennoe",
    },
    { id: "data", tipo: "fecha", etiqueta: "Дата письменного предупреждения", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    const nachalo = prochitat(e.data);
    const s = e.situatsiya;
    let konets: Date;
    let srok: string;
    if (s === "sobstvennoe" || s === "sokrashchenie") {
      const n = enMapa(v["kg.preduprezhdenie-mesyatsy"], s);
      konets = plusMesyatsev(nachalo, n);
      srok = sklonenie(n, ["месяц", "месяца", "месяцев"]);
    } else if (s === "nesootvetstvie") {
      const n = enMapa(v["kg.preduprezhdenie-nedeli"], s);
      konets = plusDney(nachalo, n * 7);
      srok = sklonenie(n, ["неделя", "недели", "недель"]);
    } else if (s === "ispytanie-rabotodatel" || s === "ispytanie-rabotnik") {
      const n = enMapa(v["kg.preduprezhdenie-rabochie-dni"], s);
      konets = plusRabochikhDney(nachalo, n);
      srok = sklonenie(n, ["рабочий день", "рабочих дня", "рабочих дней"]);
    } else {
      const n = enMapa(v["kg.preduprezhdenie-dni"], s);
      konets = plusDney(nachalo, n);
      srok = sklonenie(n, ["календарный день", "календарных дня", "календарных дней"]);
    }
    const observaciones: string[] = [];
    if (vykhodnoy(konets)) {
      observaciones.push("Срок кончается в выходной, поэтому он переносится на следующий рабочий день.");
      konets = naRabochiy(konets);
    }
    observaciones.push("Праздничные дни калькулятор не учитывает: если срок кончается в праздник, днем окончания будет следующий рабочий день.");
    if (s === "sokrashchenie") {
      observaciones.push("Пока идет срок предупреждения, работнику дают один свободный рабочий день в неделю для поиска работы с сохранением средней оплаты.");
    }
    if (s === "sobstvennoe" || s === "sokrashchenie" || s === "korotkiy-rabotnik") {
      observaciones.push("По соглашению сторон договор можно расторгнуть раньше.");
    }
    return { konets: zapisat(konets), srok, observaciones };
  },
  resultado: [
    { clave: "konets", etiqueta: "Срок предупреждения истекает", formato: "fecha", destacada: true },
    { clave: "srok", etiqueta: "Срок по Трудовому кодексу", formato: "texto" },
  ],
});
