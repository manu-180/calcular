import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerieTupla } from "@/motor/tipos";
import { denUtc, dniUMisiatsi, sumaZaDniamy, zDnia } from "../lib/daty";
import { dostupni, indeksZa, misiatsRik, pochatokMisiatsia, zsunuty } from "../lib/infliatsiia";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "ua.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "ua.try-vidsotky-richnykh",
  mercado: "ua",
  concepto: "propio",
  slug: "try-vidsotky-richnykh",
  estado: "publicado",
  requiere: {
    "ua.richni-625": "numero",
    "ua.ipc": "serie",
  },
  campos: [
    { id: "borh", tipo: "moneda", etiqueta: "Сума простроченого боргу", min: 0, porDefecto: 100000 },
    { id: "pochatok", tipo: "fecha", etiqueta: "Перший день прострочення", min: "2010-01-01", porDefecto: "2025-01-01" },
    { id: "pohashennia", tipo: "fecha", etiqueta: "Дата погашення боргу", min: "2010-01-01", porDefecto: "hoy", ayuda: "День, коли борг сплатили. Якщо ще не сплатили, залиште сьогоднішню дату." },
    { id: "inshaStavka", tipo: "si-no", etiqueta: "Договір встановлює інший розмір процентів річних", porDefecto: false },
    { id: "stavka", tipo: "porcentaje", etiqueta: "Проценти річних за договором", min: 0, max: 100, porDefecto: 10, visibleSi: { inshaStavka: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.borh <= 0) throw new ErrorEntrada("Введіть суму боргу, більшу за нуль.", "borh");
    if (e.pohashennia <= e.pochatok) throw new ErrorEntrada("Дата погашення має бути пізніше за перший день прострочення.", "pohashennia");
    const stavka = e.inshaStavka ? (e.stavka ?? v["ua.richni-625"]) : v["ua.richni-625"];
    const ostanniiDen = zDnia(denUtc(e.pohashennia) - 1);
    const dni = denUtc(e.pohashennia) - denUtc(e.pochatok);
    const richni = redondear(sumaZaDniamy(e.pochatok, ostanniiDen, () => (e.borh * stavka) / 100));

    // Неповний місяць прострочення рахують як повний, якщо в ньому більше 15 днів прострочення
    // (постанова ОП КГС ВС від 03.02.2023 у справі № 910/9374/21).
    const ostanniiIpc = v["ua.ipc"];
    const rivni = dostupni(IPC, ostanniiIpc);
    const m1 = pochatokMisiatsia(e.pochatok);
    const m2 = pochatokMisiatsia(e.pohashennia);
    let vid: FechaISO;
    let do_: FechaISO;
    if (m1 === m2) {
      vid = m1;
      do_ = dni > 15 ? m1 : zsunuty(m1, -1);
    } else {
      const dniPershoho = dniUMisiatsi(e.pochatok) - Number(e.pochatok.slice(8, 10)) + 1;
      const dniOstann = Number(e.pohashennia.slice(8, 10)) - 1;
      vid = dniPershoho > 15 ? m1 : zsunuty(m1, 1);
      do_ = dniOstann > 15 ? m2 : zsunuty(m2, -1);
    }
    const observaciones: string[] = [];
    if (do_ > ostanniiIpc.fecha) {
      do_ = ostanniiIpc.fecha;
      observaciones.push(`Індекс інфляції опубліковано до місяця: ${misiatsRik(ostanniiIpc.fecha)}. Інфляційні втрати пораховано до нього.`);
    }
    let indeks = 1;
    let misiatsiv = 0;
    if (vid <= do_) {
      const i = indeksZa(rivni, vid, do_);
      if (i === null) throw new ErrorEntrada({ codigo: "calculo-fallido" });
      indeks = i;
      misiatsiv = (Number(do_.slice(0, 4)) - Number(vid.slice(0, 4))) * 12 + Number(do_.slice(5, 7)) - Number(vid.slice(5, 7)) + 1;
    }
    const infliatsiini = redondear(Math.max(0, e.borh * (indeks - 1)));
    if (indeks < 1) observaciones.push("За цей період ціни знизилися, тому інфляційних втрат немає.");
    return {
      razom: redondear(richni + infliatsiini),
      richni,
      infliatsiini,
      indeks: indeks * 100,
      dni,
      misiatsiv,
      zBorhom: redondear(e.borh + richni + infliatsiini),
      observaciones,
    };
  },
  resultado: [
    { clave: "razom", etiqueta: "Проценти річних та інфляційні втрати разом", formato: "moneda", destacada: true },
    { clave: "richni", etiqueta: "Проценти річних", formato: "moneda" },
    { clave: "infliatsiini", etiqueta: "Інфляційні втрати", formato: "moneda" },
    { clave: "indeks", etiqueta: "Індекс інфляції за період", formato: "porcentaje", decimales: 2 },
    { clave: "dni", etiqueta: "Днів прострочення", formato: "dias" },
    { clave: "misiatsiv", etiqueta: "Місяців для індексу інфляції", formato: "numero", decimales: 0 },
    { clave: "zBorhom", etiqueta: "Разом із боргом", formato: "moneda" },
  ],
});
