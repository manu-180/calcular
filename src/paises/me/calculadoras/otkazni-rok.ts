import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "me.otkazni-rok",
  mercado: "me",
  concepto: "preaviso",
  slug: "otkazni-rok",
  estado: "publicado",
  requiere: { "me.otkazni-rok": "numero", "me.otkazni-probni": "numero", "me.otkazni-casovi": "numero" },
  campos: [
    {
      id: "slucaj",
      tipo: "opcion",
      etiqueta: "O kom otkazu je riječ",
      opciones: [
        { valor: "redovni", etiqueta: "Otkaz zaposlenog ili odluka poslodavca" },
        { valor: "probni", etiqueta: "Otkaz za vrijeme probnog rada" },
      ],
      porDefecto: "redovni",
    },
    { id: "datum", tipo: "fecha", etiqueta: "Datum dostavljanja otkaza", porDefecto: "hoy" },
    { id: "ugovoreno", tipo: "entero", etiqueta: "Dana otkaznog roka po ugovoru", ayuda: "Nije obavezno. Ako ne unesete, uzima se zakonski minimum.", min: 1, max: 365, requerido: false },
  ],
  calcular(e, v) {
    const minimum = e.slucaj === "probni" ? v["me.otkazni-probni"] : v["me.otkazni-rok"];
    const dana = e.ugovoreno ?? minimum;
    if (dana < minimum) throw new ErrorEntrada(`Zakon traži najmanje ${minimum} dana.`, "ugovoreno");
    const sedmica = Math.ceil(dana / 7);
    return { kraj: sumarDias(e.datum, dana), dana, minimum, casovi: sedmica * v["me.otkazni-casovi"] };
  },
  resultado: [
    { clave: "kraj", etiqueta: "Poslednji dan otkaznog roka", formato: "fecha", destacada: true },
    { clave: "dana", etiqueta: "Trajanje", formato: "dias" },
    { clave: "minimum", etiqueta: "Zakonski minimum", formato: "dias" },
    { clave: "casovi", etiqueta: "Časovi za traženje posla, ukupno najmanje", formato: "numero", decimales: 0 },
  ],
});
