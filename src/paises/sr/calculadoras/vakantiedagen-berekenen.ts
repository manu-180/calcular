import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.vakantiedagen-berekenen",
  mercado: "sr",
  concepto: "vacaciones",
  slug: "vakantiedagen-berekenen",
  estado: "publicado",
  requiere: {
    "sr.vakantiedagen-basis": "numero",
    "sr.vakantiedagen-stap": "numero",
    "sr.vakantiedagen-max": "numero",
  },
  campos: [
    {
      id: "situatie",
      tipo: "opcion",
      etiqueta: "Hoe lang ben je in dienst?",
      opciones: [
        { valor: "volle-jaren", etiqueta: "Minstens een vol kalenderjaar" },
        { valor: "eerste-jaar", etiqueta: "Ik ben dit jaar begonnen" },
      ],
      porDefecto: "volle-jaren",
    },
    { id: "jaren", tipo: "entero", etiqueta: "Volle kalenderjaren bij dezelfde werkgever", min: 1, max: 60, porDefecto: 1, visibleSi: { situatie: ["volle-jaren"] } },
    { id: "maanden", tipo: "entero", etiqueta: "Volle maanden in dienst in het eerste kalenderjaar", min: 0, max: 11, porDefecto: 6, visibleSi: { situatie: ["eerste-jaar"] } },
  ],
  calcular(entrada, valores) {
    if (entrada.situatie === "eerste-jaar") {
      const maanden = entrada.maanden ?? 0;
      if (maanden > 11) throw new ErrorEntrada("Na twaalf volle maanden is het een vol kalenderjaar. Kies de andere optie.", "maanden");
      return { dagen: maanden, maximum: valores["sr.vakantiedagen-max"], observaciones: ["In het eerste, onvolledige kalenderjaar krijg je een werkdag vakantie per volle maand in dienst."] };
    }
    const jaren = entrada.jaren ?? 1;
    const dagen = Math.min(valores["sr.vakantiedagen-basis"] + valores["sr.vakantiedagen-stap"] * (jaren - 1), valores["sr.vakantiedagen-max"]);
    return { dagen, maximum: valores["sr.vakantiedagen-max"], observaciones: [] };
  },
  resultado: [
    { clave: "dagen", etiqueta: "Vakantiedagen per jaar", formato: "dias", destacada: true },
    { clave: "maximum", etiqueta: "Wettelijk maximum", formato: "dias" },
  ],
});
