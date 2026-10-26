import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { denUtc, dniURotsi, zDnia } from "../lib/daty";
import datos from "../datos.json";

interface TramoStavky {
  desde: string;
  hasta?: string;
  valor: number;
  estado: string;
}

const STAVKY = ((datos.datos.find((d) => d.id === "ua.oblikova-stavka")?.tramos ?? []) as unknown as TramoStavky[]).filter((t) => t.estado === "verificado");

function stavkaNa(fecha: string): number | null {
  const t = STAVKY.find((x) => x.desde <= fecha && (x.hasta === undefined || fecha <= x.hasta));
  return t ? t.valor : null;
}

export default definirCalculadora({
  id: "ua.kalkuliator-peni",
  mercado: "ua",
  concepto: "propio",
  slug: "kalkuliator-peni",
  estado: "publicado",
  requiere: {
    "ua.oblikova-stavka": "numero",
    "ua.penia-mnozhnyk": "numero",
  },
  campos: [
    { id: "borh", tipo: "moneda", etiqueta: "Сума простроченого платежу", min: 0, porDefecto: 100000 },
    { id: "vid", tipo: "fecha", etiqueta: "Перший день нарахування пені", min: "2015-01-01", porDefecto: "2026-04-01" },
    { id: "do", tipo: "fecha", etiqueta: "Останній день нарахування пені (включно)", min: "2015-01-01", porDefecto: "hoy" },
    { id: "dohovir", tipo: "porcentaje", etiqueta: "Пеня за договором, % за кожен день", min: 0, max: 100, requerido: false, ayuda: "Якщо залишити порожнім, калькулятор рахує граничний розмір: подвійну облікову ставку НБУ." },
  ],
  calcular(e, v, { redondear, fecha }) {
    if (e.borh <= 0) throw new ErrorEntrada("Введіть суму боргу, більшу за нуль.", "borh");
    if (e.do < e.vid) throw new ErrorEntrada("Останній день має бути не раніше за перший.", "do");
    if (e.do > fecha) throw new ErrorEntrada("Облікова ставка на майбутні дні ще невідома. Оберіть дату не пізніше сьогоднішньої.", "do");
    const k = v["ua.penia-mnozhnyk"];
    let penia = 0;
    let granychna = 0;
    let obmezheno = false;
    for (let d = denUtc(e.vid); d <= denUtc(e.do); d++) {
      const f = zDnia(d);
      const s = stavkaNa(f);
      if (s === null) throw new ErrorEntrada("Для цього періоду немає облікової ставки в нашому ряді.", "vid");
      const limit = (e.borh * k * s) / 100 / dniURotsi(Number(f.slice(0, 4)));
      granychna += limit;
      if (e.dohovir !== null && e.dohovir !== undefined) {
        const zaDohovorom = (e.borh * e.dohovir) / 100;
        if (zaDohovorom > limit) obmezheno = true;
        penia += Math.min(zaDohovorom, limit);
      } else {
        penia += limit;
      }
    }
    const observaciones: string[] = [];
    if (obmezheno) observaciones.push("Пеня за договором більша за подвійну облікову ставку НБУ, тому її обмежено.");
    return {
      penia: redondear(penia),
      granychna: redondear(granychna),
      dni: denUtc(e.do) - denUtc(e.vid) + 1,
      stavkaZaraz: v["ua.oblikova-stavka"],
      observaciones,
    };
  },
  resultado: [
    { clave: "penia", etiqueta: "Пеня", formato: "moneda", destacada: true },
    { clave: "granychna", etiqueta: "Граничний розмір пені за період", formato: "moneda" },
    { clave: "dni", etiqueta: "Днів нарахування", formato: "dias" },
    { clave: "stavkaZaraz", etiqueta: "Облікова ставка НБУ сьогодні", formato: "porcentaje", decimales: 1 },
  ],
});
