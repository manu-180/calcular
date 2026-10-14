import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nl.thuiswerkvergoeding-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "thuiswerkvergoeding-berekenen",
  estado: "publicado",
  requiere: {
    "nl.thuiswerkvergoeding": "numero",
  },
  campos: [
    { id: "dagen", tipo: "numero", etiqueta: "Thuiswerkdagen per week", min: 0, max: 7, porDefecto: 2 },
    { id: "weken", tipo: "numero", etiqueta: "Werkweken per jaar", min: 1, max: 52, porDefecto: 46 },
    { id: "bedrag", tipo: "moneda", etiqueta: "Vergoeding per thuiswerkdag die je krijgt (optioneel)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.dagen <= 0) throw new ErrorEntrada("Vul in hoeveel dagen per week je thuiswerkt.", "dagen");
    const dagenPerJaar = entrada.dagen * entrada.weken;
    const max = v["nl.thuiswerkvergoeding"];
    const onbelast = redondear(dagenPerJaar * max);
    const vergoeding = redondear(dagenPerJaar * (entrada.bedrag ?? max));
    const belast = redondear(Math.max(0, vergoeding - onbelast));
    return {
      onbelast,
      perMaand: redondear(onbelast / 12),
      dagenPerJaar,
      vergoeding,
      belast,
      observaciones: belast > 0 ? ["Het deel boven het onbelaste bedrag per dag is belast loon, tenzij je werkgever het in de vrije ruimte van de werkkostenregeling onderbrengt."] : [],
    };
  },
  resultado: [
    { clave: "onbelast", etiqueta: "Maximale onbelaste thuiswerkvergoeding per jaar", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Per maand (gemiddeld)", formato: "moneda" },
    { clave: "dagenPerJaar", etiqueta: "Thuiswerkdagen per jaar", formato: "dias" },
    { clave: "vergoeding", etiqueta: "Jouw vergoeding per jaar", formato: "moneda" },
    { clave: "belast", etiqueta: "Waarvan belast", formato: "moneda", ocultarSiCero: true },
  ],
});
