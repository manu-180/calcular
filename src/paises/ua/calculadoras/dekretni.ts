import { definirCalculadora, enMapa } from "@/motor/calculo";
import { serednodenna } from "../lib/serednia";

export default definirCalculadora({
  id: "ua.dekretni",
  mercado: "ua",
  concepto: "propio",
  slug: "dekretni",
  estado: "publicado",
  requiere: {
    "ua.dekretni-dni": "mapa",
    "ua.serednia-kilkist-dniv": "numero",
    "ua.minimalna-zarplata": "numero",
    "ua.maks-baza-yesv": "numero",
  },
  campos: [
    { id: "zarobitok", tipo: "moneda", etiqueta: "Заробіток за 12 місяців перед декретною відпусткою", min: 0, porDefecto: 300000, ayuda: "Зарплата, з якої сплачено ЄСВ, за 12 календарних місяців перед місяцем початку відпустки." },
    { id: "dni", tipo: "entero", etiqueta: "Календарних днів зайнятості в цих 12 місяцях", min: 1, max: 366, porDefecto: 365, ayuda: "Не враховуйте дні лікарняних і відпустки без збереження зарплати." },
    { id: "typ", tipo: "opcion-dato", dato: "ua.dekretni-dni", etiqueta: "Тривалість відпустки", porDefecto: "zvychaini" },
  ],
  calcular(e, v, { redondear }) {
    const sdFakt = serednodenna(e.zarobitok, e.dni, redondear, { zarobitok: "zarobitok", dni: "dni" });
    const dniMis = v["ua.serednia-kilkist-dniv"];
    const mzp = v["ua.minimalna-zarplata"];
    const maksDen = redondear((mzp * v["ua.maks-baza-yesv"]) / dniMis);
    const minDen = redondear(mzp / dniMis);
    const observaciones: string[] = [];
    let sd = sdFakt;
    if (sd > maksDen) {
      sd = maksDen;
      observaciones.push("Середньоденна зарплата перевищує максимальну базу ЄСВ у розрахунку на день, тому взято межу.");
    } else if (sd < minDen) {
      sd = minDen;
      observaciones.push("Допомога не може бути меншою за обчислену з мінімальної зарплати, тому взято мінімум.");
    }
    const dni = enMapa(v["ua.dekretni-dni"], e.typ);
    const suma = redondear(sd * dni);
    return { suma, serednodenna: sd, dni, naMisiats: redondear(sd * dniMis), observaciones };
  },
  resultado: [
    { clave: "suma", etiqueta: "Декретні за всю відпустку", formato: "moneda", destacada: true },
    { clave: "serednodenna", etiqueta: "Виплата за день (100 % середньоденної зарплати)", formato: "moneda" },
    { clave: "dni", etiqueta: "Днів відпустки", formato: "dias" },
    { clave: "naMisiats", etiqueta: "У розрахунку на місяць", formato: "moneda" },
  ],
});
