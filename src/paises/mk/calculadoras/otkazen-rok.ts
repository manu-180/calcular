import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { sumarDias } from "@/motor/vigencia";
import { dodajMeseci } from "../lib/plata";

function posledenDen(pocetok: FechaISO, meseci: number): FechaISO {
  return sumarDias(dodajMeseci(pocetok, meseci), -1);
}

function denVoNedela(fecha: FechaISO): number {
  const [g, m, d] = fecha.split("-").map(Number);
  // Метод на Сакамото: 0 е недела, 6 е сабота.
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const y = m < 3 ? g - 1 : g;
  return (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + t[m - 1] + d) % 7;
}

function posleRabotniDenovi(pocetok: FechaISO, denovi: number): FechaISO {
  let tekoven = pocetok;
  let izbrojani = 0;
  for (;;) {
    const den = denVoNedela(tekoven);
    if (den !== 0 && den !== 6) izbrojani++;
    if (izbrojani === denovi) return tekoven;
    tekoven = sumarDias(tekoven, 1);
  }
}

export default definirCalculadora({
  id: "mk.otkazen-rok",
  mercado: "mk",
  concepto: "preaviso",
  slug: "otkazen-rok",
  estado: "publicado",
  requiere: { "mk.otkazen-rok": "mapa", "mk.otkazen-rok-sezonski": "numero" },
  campos: [
    {
      id: "koj",
      tipo: "opcion",
      etiqueta: "Кој го дава отказот",
      porDefecto: "rabotnik",
      opciones: [
        { valor: "rabotnik", etiqueta: "Работникот" },
        { valor: "rabotodavach", etiqueta: "Работодавачот, поединечно" },
        { valor: "kolektivno", etiqueta: "Работодавачот, над 150 работници или 5 % од вработените" },
        { valor: "sezonski", etiqueta: "Работодавачот, сезонска работа" },
      ],
    },
    { id: "dogovoreni", tipo: "entero", etiqueta: "Договорени месеци (ако договорот предвидува подолг рок)", min: 1, max: 3, porDefecto: 1, visibleSi: { koj: ["rabotnik"] } },
    { id: "vrachen", tipo: "fecha", etiqueta: "Ден на врачување на отказот", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    const o = v["mk.otkazen-rok"];
    const pocetok = sumarDias(e.vrachen, 1);
    if (e.koj === "sezonski") {
      const denovi = v["mk.otkazen-rok-sezonski"];
      return { pocetok, posleden: posleRabotniDenovi(pocetok, denovi), traenje: `${denovi} работни денови` };
    }
    let meseci = enMapa(o, e.koj);
    if (e.koj === "rabotnik") {
      const dogovoreni = e.dogovoreni ?? meseci;
      if (dogovoreni > enMapa(o, "rabotnik-maks")) throw new ErrorEntrada("Договорениот рок не може да биде подолг од три месеца.", "dogovoreni");
      meseci = dogovoreni;
    }
    return { pocetok, posleden: posledenDen(pocetok, meseci), traenje: meseci === 1 ? "1 месец" : `${meseci} месеци` };
  },
  resultado: [
    { clave: "posleden", etiqueta: "Последен ден од отказниот рок", formato: "fecha", destacada: true },
    { clave: "pocetok", etiqueta: "Прв ден од отказниот рок", formato: "fecha" },
    { clave: "traenje", etiqueta: "Траење", formato: "texto" },
  ],
});
