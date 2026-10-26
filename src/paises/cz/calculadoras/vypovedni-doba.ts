import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { diasEntre } from "@/motor/vigencia";

function posledniDen(rok: number, mesic: number): number {
  const dny = [31, rok % 4 === 0 && (rok % 100 !== 0 || rok % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return dny[mesic - 1];
}

function datum(rok: number, mesic: number, den: number): FechaISO {
  return `${rok}-${String(mesic).padStart(2, "0")}-${String(den).padStart(2, "0")}` as FechaISO;
}

function posunMesice(rok: number, mesic: number, o: number): { rok: number; mesic: number } {
  const t = rok * 12 + (mesic - 1) + o;
  return { rok: Math.floor(t / 12), mesic: (t % 12) + 1 };
}

export default definirCalculadora({
  id: "cz.vypovedni-doba",
  mercado: "cz",
  concepto: "preaviso",
  slug: "vypovedni-doba",
  estado: "publicado",
  requiere: { "cz.vypovedni-doba": "numero" },
  campos: [
    { id: "doruceni", tipo: "fecha", etiqueta: "Den doručení výpovědi", min: "2020-01-01", porDefecto: "hoy" },
    { id: "mesice", tipo: "entero", etiqueta: "Délka výpovědní doby v měsících", min: 1, max: 12, porDefecto: 2 },
  ],
  calcular(e, v) {
    const rok = Number(e.doruceni.slice(0, 4));
    const mesic = Number(e.doruceni.slice(5, 7));
    const den = Number(e.doruceni.slice(8, 10));
    if (!rok || !mesic || !den) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const observaciones: string[] = [];
    let zacatek: FechaISO;
    let konec: FechaISO;
    if (e.doruceni >= "2025-06-01") {
      zacatek = e.doruceni;
      const k = posunMesice(rok, mesic, e.mesice);
      konec = datum(k.rok, k.mesic, Math.min(den, posledniDen(k.rok, k.mesic)));
      observaciones.push("Výpovědní doba začíná dnem doručení výpovědi a končí dnem se stejným číslem v posledním měsíci. Když takový den v měsíci není, končí posledním dnem měsíce.");
    } else {
      const z = posunMesice(rok, mesic, 1);
      zacatek = datum(z.rok, z.mesic, 1);
      const k = posunMesice(rok, mesic, e.mesice);
      konec = datum(k.rok, k.mesic, posledniDen(k.rok, k.mesic));
      observaciones.push("U výpovědí doručených do 31. 5. 2025 začínala výpovědní doba prvním dnem následujícího měsíce.");
    }
    if (e.mesice < v["cz.vypovedni-doba"]) {
      observaciones.push("Zákonná výpovědní doba je nejméně 2 měsíce. Kratší je jen u výpovědi zaměstnavatele z důvodů podle § 52 písm. f) až h).");
    }
    return {
      konec,
      zacatek,
      dny: diasEntre(zacatek, konec) + 1,
      observaciones,
    };
  },
  resultado: [
    { clave: "konec", etiqueta: "Poslední den pracovního poměru", formato: "fecha", destacada: true },
    { clave: "zacatek", etiqueta: "Začátek výpovědní doby", formato: "fecha" },
    { clave: "dny", etiqueta: "Délka výpovědní doby", formato: "dias", decimales: 0 },
  ],
});
