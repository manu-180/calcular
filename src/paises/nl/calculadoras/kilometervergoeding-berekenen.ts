import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nl.kilometervergoeding-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "kilometervergoeding-berekenen",
  estado: "publicado",
  requiere: {
    "nl.kilometervergoeding": "numero",
  },
  campos: [
    { id: "afstand", tipo: "numero", etiqueta: "Afstand van huis naar werk, enkele reis (km)", min: 0, max: 500, porDefecto: 20 },
    { id: "dagen", tipo: "numero", etiqueta: "Dagen per week naar je werk", min: 0, max: 7, porDefecto: 3 },
    { id: "weken", tipo: "numero", etiqueta: "Werkweken per jaar", min: 1, max: 52, porDefecto: 46 },
    { id: "tarief", tipo: "moneda", etiqueta: "Vergoeding per kilometer die je krijgt (optioneel)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.afstand <= 0 || entrada.dagen <= 0) throw new ErrorEntrada("Vul je afstand en het aantal dagen in.", "afstand");
    const kmPerJaar = entrada.afstand * 2 * entrada.dagen * entrada.weken;
    const max = v["nl.kilometervergoeding"];
    const onbelast = redondear(kmPerJaar * max);
    const tarief = entrada.tarief ?? max;
    const vergoeding = redondear(kmPerJaar * tarief);
    const belast = redondear(Math.max(0, vergoeding - onbelast));
    const observaciones: string[] = [];
    if (belast > 0) observaciones.push("Je krijgt meer dan het onbelaste bedrag per kilometer. Over het meerdere betaal je loonheffing, tenzij je werkgever het in de vrije ruimte van de werkkostenregeling onderbrengt.");
    return {
      onbelast,
      perMaand: redondear(onbelast / 12),
      kmPerJaar,
      vergoeding,
      belast,
      observaciones,
    };
  },
  resultado: [
    { clave: "onbelast", etiqueta: "Maximale onbelaste vergoeding per jaar", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Per maand (gemiddeld)", formato: "moneda" },
    { clave: "kmPerJaar", etiqueta: "Kilometers per jaar (heen en terug)", formato: "numero" },
    { clave: "vergoeding", etiqueta: "Jouw vergoeding per jaar", formato: "moneda" },
    { clave: "belast", etiqueta: "Waarvan belast", formato: "moneda", ocultarSiCero: true },
  ],
});
