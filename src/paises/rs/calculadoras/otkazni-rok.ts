import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "rs.otkazni-rok",
  mercado: "rs",
  concepto: "preaviso",
  slug: "otkazni-rok",
  estado: "publicado",
  requiere: {
    "rs.otkazni-zaposleni-min": "numero",
    "rs.otkazni-zaposleni-max": "numero",
    "rs.otkazni-poslodavac-min": "numero",
    "rs.otkazni-poslodavac-max": "numero",
  },
  campos: [
    {
      id: "ko",
      tipo: "opcion",
      etiqueta: "Ko otkazuje",
      opciones: [
        { valor: "zaposleni", etiqueta: "Zaposleni" },
        { valor: "poslodavac", etiqueta: "Poslodavac, zbog rezultata rada ili znanja" },
      ],
      porDefecto: "zaposleni",
    },
    { id: "datum", tipo: "fecha", etiqueta: "Datum dostavljanja otkaza", porDefecto: "hoy" },
    { id: "dana", tipo: "entero", etiqueta: "Dana otkaznog roka po opštem aktu ili ugovoru", ayuda: "Nije obavezno. Ako ne unesete, uzima se zakonski minimum.", min: 1, max: 60, requerido: false },
  ],
  calcular(e, v) {
    const zaposleni = e.ko === "zaposleni";
    const min = zaposleni ? v["rs.otkazni-zaposleni-min"] : v["rs.otkazni-poslodavac-min"];
    const max = zaposleni ? v["rs.otkazni-zaposleni-max"] : v["rs.otkazni-poslodavac-max"];
    const dana = e.dana ?? min;
    if (dana < min || dana > max) throw new ErrorEntrada(`Otkazni rok mora biti između ${min} i ${max} dana.`, "dana");
    return { dana, poslednjiDan: sumarDias(e.datum, dana), minimum: min, maksimum: max };
  },
  resultado: [
    { clave: "poslednjiDan", etiqueta: "Poslednji dan otkaznog roka", formato: "fecha", destacada: true },
    { clave: "dana", etiqueta: "Trajanje", formato: "dias" },
    { clave: "minimum", etiqueta: "Zakonski najmanje", formato: "dias" },
    { clave: "maksimum", etiqueta: "Zakonski najviše", formato: "dias" },
  ],
});
