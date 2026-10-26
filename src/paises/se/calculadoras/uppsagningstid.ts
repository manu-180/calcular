import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function helaAr(fran: string, till: string): number {
  let ar = Number(till.slice(0, 4)) - Number(fran.slice(0, 4));
  if (till.slice(5) < fran.slice(5)) ar -= 1;
  return ar;
}

function steg(ar: number): string {
  if (ar < 2) return "under-2";
  if (ar < 4) return "2-4";
  if (ar < 6) return "4-6";
  if (ar < 8) return "6-8";
  if (ar < 10) return "8-10";
  return "over-10";
}

export default definirCalculadora({
  id: "se.uppsagningstid",
  mercado: "se",
  concepto: "preaviso",
  slug: "uppsagningstid",
  estado: "publicado",
  requiere: { "se.uppsagningstid": "mapa" },
  campos: [
    { id: "anstalld", tipo: "fecha", etiqueta: "Anställd hos arbetsgivaren sedan", min: "1960-01-01", porDefecto: "2020-01-01" },
    { id: "uppsagning", tipo: "fecha", etiqueta: "Dag för uppsägningen", min: "1960-01-01", porDefecto: "hoy" },
    {
      id: "vem",
      tipo: "opcion",
      etiqueta: "Vem säger upp?",
      opciones: [
        { valor: "arbetsgivaren", etiqueta: "Arbetsgivaren säger upp mig" },
        { valor: "jag", etiqueta: "Jag säger upp mig själv" },
      ],
      porDefecto: "arbetsgivaren",
    },
  ],
  calcular(e, v) {
    if (e.uppsagning < e.anstalld) throw new ErrorEntrada("Uppsägningen kan inte ske innan anställningen började.", "uppsagning");
    const ar = helaAr(e.anstalld, e.uppsagning);
    const tabell = v["se.uppsagningstid"];
    const manader = e.vem === "jag" ? enMapa(tabell, "under-2") : enMapa(tabell, steg(ar));
    const observaciones: string[] = [];
    if (e.vem === "jag") observaciones.push("När du själv säger upp dig gäller minst en månads uppsägningstid enligt lagen, oavsett hur länge du har varit anställd.");
    else observaciones.push("Anställningstiden räknas hos samma arbetsgivare. Under uppsägningstiden har du rätt att behålla lön och förmåner.");
    observaciones.push("Kollektivavtal och anställningsavtal kan ge en annan uppsägningstid.");
    return { manader, ar, observaciones };
  },
  resultado: [
    { clave: "manader", etiqueta: "Uppsägningstid", formato: "meses", destacada: true },
    { clave: "ar", etiqueta: "Hela år i anställningen", formato: "anios" },
  ],
});
