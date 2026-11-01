import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.obracun-otpremnine",
  mercado: "rs",
  concepto: "indemnizacion-despido",
  slug: "obracun-otpremnine",
  estado: "publicado",
  requiere: {
    "rs.otpremnina-razlomak": "numero",
    "rs.otpremnina-penzija-zarada": "numero",
    "rs.prosecna-bruto": "serie",
  },
  campos: [
    {
      id: "vrsta",
      tipo: "opcion",
      etiqueta: "Razlog",
      opciones: [
        { valor: "visak", etiqueta: "Prestanak potrebe za radom (tehnološki višak)" },
        { valor: "penzija", etiqueta: "Odlazak u penziju" },
      ],
      porDefecto: "visak",
    },
    { id: "zarada", tipo: "moneda", etiqueta: "Prosečna mesečna zarada za poslednja tri meseca", min: 0, porDefecto: 120000, visibleSi: { vrsta: ["visak"] } },
    { id: "godine", tipo: "entero", etiqueta: "Navršene godine rada kod poslodavca", min: 0, max: 60, porDefecto: 9, visibleSi: { vrsta: ["visak"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.vrsta === "penzija") {
      const prosek = v["rs.prosecna-bruto"];
      return { otpremnina: redondear(prosek.valor * v["rs.otpremnina-penzija-zarada"]), poGodini: null, osnova: prosek.valor, fecha: prosek.fecha };
    }
    if ((e.zarada ?? 0) <= 0) throw new ErrorEntrada("Unesite prosečnu zaradu veću od nule.", "zarada");
    const zarada = e.zarada ?? 0;
    const poGodini = redondear(zarada * v["rs.otpremnina-razlomak"]);
    return { otpremnina: redondear(zarada * v["rs.otpremnina-razlomak"] * (e.godine ?? 0)), poGodini, osnova: zarada, fecha: null };
  },
  resultado: [
    { clave: "otpremnina", etiqueta: "Najmanja otpremnina", formato: "moneda", destacada: true },
    { clave: "poGodini", etiqueta: "Po navršenoj godini rada", formato: "moneda" },
    { clave: "osnova", etiqueta: "Zarada koja se uzima", formato: "moneda" },
    { clave: "fecha", etiqueta: "Mesec poslednjeg podatka RZS", formato: "fecha" },
  ],
});
