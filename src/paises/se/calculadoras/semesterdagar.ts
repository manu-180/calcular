import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.semesterdagar",
  mercado: "se",
  concepto: "propio",
  slug: "semesterdagar",
  estado: "publicado",
  requiere: { "se.semesterdagar": "numero" },
  campos: [
    { id: "anstallda", tipo: "entero", etiqueta: "Dagar du var anställd under intjänandeåret", min: 0, max: 366, porDefecto: 365 },
    {
      id: "franvaro",
      tipo: "entero",
      etiqueta: "Dagar du var helt ledig utan lön",
      min: 0,
      max: 366,
      porDefecto: 0,
      ayuda: "Räkna inte med semester, sjukdom upp till 180 dagar eller annan ledighet som är semesterlönegrundande.",
    },
    {
      id: "arslangd",
      tipo: "opcion",
      etiqueta: "Dagar i intjänandeåret",
      opciones: [
        { valor: "365", etiqueta: "365 dagar" },
        { valor: "366", etiqueta: "366 dagar (skottår)" },
      ],
      porDefecto: "365",
    },
  ],
  calcular(e, v) {
    const dagarAr = Number(e.arslangd);
    if (e.anstallda <= 0) throw new ErrorEntrada("Skriv hur många dagar du var anställd.", "anstallda");
    if (e.anstallda > dagarAr) throw new ErrorEntrada("Du kan inte ha varit anställd fler dagar än året har.", "anstallda");
    if (e.franvaro > e.anstallda) throw new ErrorEntrada("Frånvaron kan inte vara längre än anställningstiden.", "franvaro");
    const fulla = v["se.semesterdagar"];
    const betalda = Math.min(fulla, Math.ceil(((e.anstallda - e.franvaro) / dagarAr) * fulla - 1e-9));
    return {
      betalda,
      obetalda: fulla - betalda,
      fulla,
      observaciones: [`Du har rätt till ${fulla} semesterdagar varje år. De dagar som inte är betalda kan du ta ut som ledighet utan lön eller avstå från.`],
    };
  },
  resultado: [
    { clave: "betalda", etiqueta: "Betalda semesterdagar", formato: "dias", destacada: true },
    { clave: "obetalda", etiqueta: "Obetalda semesterdagar", formato: "dias" },
    { clave: "fulla", etiqueta: "Semesterdagar per år enligt lagen", formato: "dias" },
  ],
});
