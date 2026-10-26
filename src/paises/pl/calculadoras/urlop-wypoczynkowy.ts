import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pl.urlop-wypoczynkowy",
  mercado: "pl",
  concepto: "vacaciones",
  slug: "urlop-wypoczynkowy",
  estado: "publicado",
  requiere: {
    "pl.wymiar-urlopu": "mapa",
    "pl.staz-za-szkole": "mapa",
  },
  campos: [
    { id: "staz", tipo: "numero", etiqueta: "Lata pracy u wszystkich pracodawców", min: 0, max: 60, porDefecto: 3 },
    { id: "szkola", tipo: "opcion-dato", dato: "pl.staz-za-szkole", etiqueta: "Ukończona szkoła", porDefecto: "wyzsza" },
    { id: "etat", tipo: "numero", etiqueta: "Wymiar etatu (1 to pełny etat)", min: 0.01, max: 1, porDefecto: 1 },
    { id: "miesiace", tipo: "entero", etiqueta: "Miesiące pracy u tego pracodawcy w tym roku", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v) {
    if (e.etat <= 0 || e.etat > 1) throw new ErrorEntrada("Wymiar etatu wpisz jako liczbę od 0,01 do 1.", "etat");
    const zaSzkole = enMapa(v["pl.staz-za-szkole"], e.szkola);
    const stazUrlopowy = e.staz + zaSzkole;
    const w = v["pl.wymiar-urlopu"];
    const pelny = stazUrlopowy >= 10 ? enMapa(w, "od-10") : enMapa(w, "ponizej-10");
    const naEtat = Math.ceil(pelny * e.etat - 1e-9);
    const dni = Math.min(naEtat, Math.ceil((naEtat * e.miesiace) / 12 - 1e-9));
    const observaciones: string[] = [];
    if (e.miesiace < 12) observaciones.push("Przy pracy przez część roku urlop jest proporcjonalny: 1/12 wymiaru za każdy miesiąc, a niepełny dzień zaokrągla się w górę.");
    if (zaSzkole > 0) observaciones.push("Okresy nauki i pracy, które się pokrywały, liczy się tylko raz. Wlicza się to, co jest korzystniejsze.");
    return {
      dni,
      godziny: dni * 8,
      pelny,
      stazUrlopowy,
      doDziesieciu: stazUrlopowy >= 10 ? 0 : 10 - stazUrlopowy,
      observaciones,
    };
  },
  resultado: [
    { clave: "dni", etiqueta: "Urlop w tym roku", formato: "dias", decimales: 0, destacada: true },
    { clave: "godziny", etiqueta: "Urlop w godzinach (8 godzin za dzień)", formato: "horas", decimales: 0 },
    { clave: "pelny", etiqueta: "Pełny wymiar na cały etat", formato: "dias", decimales: 0 },
    { clave: "stazUrlopowy", etiqueta: "Staż urlopowy ze szkołą", formato: "anios", decimales: 1 },
    { clave: "doDziesieciu", etiqueta: "Brakuje do 26 dni urlopu", formato: "anios", decimales: 1, ocultarSiCero: true },
  ],
});
