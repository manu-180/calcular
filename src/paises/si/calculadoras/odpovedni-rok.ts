import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.odpovedni-rok",
  mercado: "si",
  concepto: "preaviso",
  slug: "odpovedni-rok",
  estado: "publicado",
  requiere: { "si.odpovedni-rok": "mapa" },
  campos: [
    {
      id: "razlog",
      tipo: "opcion",
      etiqueta: "Kdo odpoveduje in zakaj",
      opciones: [
        { valor: "delodajalec", etiqueta: "Delodajalec: poslovni razlog ali nesposobnost" },
        { valor: "krivdni", etiqueta: "Delodajalec: krivdni razlog" },
        { valor: "delavec", etiqueta: "Delavec: redna odpoved" },
        { valor: "poskusno", etiqueta: "Neuspešno poskusno delo" },
      ],
      porDefecto: "delodajalec",
    },
    { id: "leta", tipo: "entero", etiqueta: "Polna leta zaposlitve pri delodajalcu", min: 0, max: 60, porDefecto: 5 },
  ],
  calcular(e, v) {
    if (e.leta < 0) throw new ErrorEntrada("Vnesite število let.", "leta");
    const m = v["si.odpovedni-rok"];
    let dni: number;
    if (e.razlog === "poskusno") dni = enMapa(m, "poskusno");
    else if (e.razlog === "krivdni") dni = enMapa(m, "krivdni");
    else if (e.razlog === "delavec") dni = e.leta < 1 ? enMapa(m, "delavec-do1") : enMapa(m, "delavec-nad1");
    else if (e.leta < 1) dni = enMapa(m, "do1");
    else if (e.leta <= 2) dni = enMapa(m, "do2");
    else if (e.leta > 25) dni = enMapa(m, "nad25");
    else dni = Math.min(enMapa(m, "najvec"), enMapa(m, "do2") + (e.leta - 2) * enMapa(m, "prirastek"));
    return { dni };
  },
  resultado: [{ clave: "dni", etiqueta: "Najkrajši odpovedni rok", formato: "dias", destacada: true }],
});
