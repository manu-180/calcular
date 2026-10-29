import { definirCasos } from "@/motor/calculo";
import srokPreduprezhdeniya from "./srok-preduprezhdeniya";

const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(srokPreduprezhdeniya, [
  {
    nombre: "По собственному желанию, срок кончается в воскресенье",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 43: один месяц. 15.10.2026 + 1 месяц = 15.11.2026, воскресенье; по статье 12 переносится на понедельник 16.11.2026." },
    fecha: "2026-10-27",
    entrada: { situatsiya: "sobstvennoe", data: "2026-10-15" },
    esperado: { konets: "2026-11-16", srok: "1 месяц" },
  },
  {
    nombre: "Сокращение штата",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 46, часть 3: не меньше 1 месяца. 12.10.2026 + 1 месяц = 12.11.2026, четверг." },
    fecha: "2026-10-27",
    entrada: { situatsiya: "sokrashchenie", data: "2026-10-12" },
    esperado: { konets: "2026-11-12" },
  },
  {
    nombre: "Предупреждение 31 января",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 12: в феврале нет 31 числа, срок истекает 28.02.2026, это суббота; перенос на понедельник 02.03.2026." },
    fecha: "2026-10-27",
    entrada: { situatsiya: "sokrashchenie", data: "2026-01-31" },
    esperado: { konets: "2026-03-02" },
  },
  {
    nombre: "Несоответствие должности",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 46, часть 5: не меньше 2 недель. 29.10.2026 + 14 дней = 12.11.2026." },
    fecha: "2026-10-27",
    entrada: { situatsiya: "nesootvetstvie", data: "2026-10-29" },
    esperado: { konets: "2026-11-12", srok: "2 недели" },
  },
  {
    nombre: "Не выдержал испытание",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 24, часть 7: за 3 рабочих дня. Пятница 06.03.2026, затем 9, 10 и 11 марта." },
    fecha: "2026-10-27",
    entrada: { situatsiya: "ispytanie-rabotodatel", data: "2026-03-06" },
    esperado: { konets: "2026-03-11", srok: "3 рабочих дня" },
  },
  {
    nombre: "Договор до двух месяцев",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 169, часть 5: за 3 календарных дня. 29.10.2026 + 3 = 01.11.2026, воскресенье; перенос на 02.11.2026." },
    fecha: "2026-10-27",
    entrada: { situatsiya: "korotkiy-rabotnik", data: "2026-10-29" },
    esperado: { konets: "2026-11-02", srok: "3 календарных дня" },
  },
]);
