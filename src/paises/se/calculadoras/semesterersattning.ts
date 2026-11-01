import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.semesterersattning",
  mercado: "se",
  concepto: "vacaciones",
  slug: "semesterersattning",
  estado: "publicado",
  requiere: {
    "se.semesterlon-procent": "numero",
    "se.semestertillagg": "mapa",
  },
  campos: [
    {
      id: "regel",
      tipo: "opcion",
      etiqueta: "Hur får du betalt?",
      opciones: [
        { valor: "procent", etiqueta: "Timlön eller rörlig lön (procentregeln)" },
        { valor: "manad", etiqueta: "Fast månadslön (sammalöneregeln)" },
        { valor: "vecka", etiqueta: "Fast veckolön (sammalöneregeln)" },
      ],
      porDefecto: "procent",
    },
    { id: "lonesumma", tipo: "moneda", etiqueta: "Lön under intjänandeåret", min: 0, porDefecto: 250000, visibleSi: { regel: ["procent"] }, ayuda: "Räkna inte med semesterlön du redan har fått." },
    { id: "lon", tipo: "moneda", etiqueta: "Månads- eller veckolön, med fasta tillägg", min: 0, porDefecto: 32000, visibleSi: { regel: ["manad", "vecka"] } },
    { id: "dagar", tipo: "entero", etiqueta: "Betalda semesterdagar", min: 0, max: 60, porDefecto: 25, visibleSi: { regel: ["manad", "vecka"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.regel === "procent") {
      const summa = e.lonesumma ?? 0;
      if (summa <= 0) throw new ErrorEntrada("Skriv lönen du har tjänat under intjänandeåret.", "lonesumma");
      return {
        semesterlon: redondear(porcentaje(summa, v["se.semesterlon-procent"])),
        tillaggPerDag: null,
        observaciones: ["Procentregeln ger tolv procent av den lön du har tjänat in under intjänandeåret. Slutar du får du beloppet som semesterersättning."],
      };
    }
    const lon = e.lon ?? 0;
    const dagar = e.dagar ?? 0;
    if (lon <= 0) throw new ErrorEntrada("Skriv din lön.", "lon");
    if (dagar <= 0) throw new ErrorEntrada("Skriv hur många betalda semesterdagar du tar ut.", "dagar");
    const sats = enMapa(v["se.semestertillagg"], e.regel);
    const tillaggPerDag = redondear(porcentaje(lon, sats));
    return {
      semesterlon: redondear(tillaggPerDag * dagar),
      tillaggPerDag,
      observaciones: ["Med sammalöneregeln får du din vanliga lön under semestern. Det här är semestertillägget som du får utöver lönen."],
    };
  },
  resultado: [
    { clave: "semesterlon", etiqueta: "Semesterersättning eller semestertillägg", formato: "moneda", destacada: true },
    { clave: "tillaggPerDag", etiqueta: "Semestertillägg per semesterdag", formato: "moneda" },
  ],
});
