import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.koerselsgodtgoerelse",
  mercado: "dk",
  concepto: "propio",
  slug: "koerselsgodtgoerelse",
  estado: "publicado",
  requiere: { "dk.koerselsgodtgoerelse": "mapa", "dk.koerselsgodtgoerelse-km": "numero" },
  campos: [
    {
      id: "koeretoej",
      tipo: "opcion",
      etiqueta: "Køretøj",
      opciones: [
        { valor: "bil", etiqueta: "Egen bil eller motorcykel" },
        { valor: "cykel", etiqueta: "Cykel, knallert eller el-løbehjul" },
      ],
      porDefecto: "bil",
    },
    { id: "km", tipo: "numero", etiqueta: "Erhvervsmæssig kørsel (km)", min: 0, porDefecto: 1000 },
    {
      id: "tidligere",
      tipo: "numero",
      etiqueta: "Kilometer, du allerede har fået godtgørelse for i år",
      ayuda: "Satsen falder, når du har fået godtgørelse for mange kilometer i året.",
      min: 0,
      porDefecto: 0,
      visibleSi: { koeretoej: ["bil"] },
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.km <= 0) throw new ErrorEntrada("Skriv antal kilometer.", "km");
    const s = v["dk.koerselsgodtgoerelse"];
    if (e.koeretoej === "cykel") {
      const sats = enMapa(s, "cykel");
      return { godtgoerelse: redondear(e.km * sats), lav: null, hoej: null, satsHoej: sats, satsLav: null };
    }
    const graense = v["dk.koerselsgodtgoerelse-km"];
    const foer = e.tidligere ?? 0;
    const kmHoej = Math.max(0, Math.min(foer + e.km, graense) - foer);
    const kmLav = e.km - kmHoej;
    const satsHoej = enMapa(s, "bil-til-20000");
    const satsLav = enMapa(s, "bil-over-20000");
    return {
      godtgoerelse: redondear(kmHoej * satsHoej + kmLav * satsLav),
      hoej: kmHoej,
      lav: kmLav,
      satsHoej,
      satsLav,
    };
  },
  resultado: [
    { clave: "godtgoerelse", etiqueta: "Skattefri kørselsgodtgørelse", formato: "moneda", destacada: true },
    { clave: "hoej", etiqueta: "Kilometer med høj sats", formato: "numero", decimales: 0 },
    { clave: "satsHoej", etiqueta: "Sats pr. km", formato: "moneda" },
    { clave: "lav", etiqueta: "Kilometer over grænsen", formato: "numero", decimales: 0 },
    { clave: "satsLav", etiqueta: "Sats pr. km over grænsen", formato: "moneda" },
  ],
});
