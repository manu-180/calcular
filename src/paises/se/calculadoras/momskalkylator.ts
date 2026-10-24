import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.momskalkylator",
  mercado: "se",
  concepto: "iva",
  slug: "momskalkylator",
  estado: "publicado",
  requiere: { "se.momssatser": "mapa" },
  campos: [
    { id: "belopp", tipo: "moneda", etiqueta: "Belopp", min: 0, porDefecto: 1000 },
    {
      id: "riktning",
      tipo: "opcion",
      etiqueta: "Vad vill du räkna ut?",
      opciones: [
        { valor: "lagg-till", etiqueta: "Lägga på moms (beloppet är utan moms)" },
        { valor: "dra-av", etiqueta: "Räkna ut momsen i ett pris (beloppet är med moms)" },
      ],
      porDefecto: "lagg-till",
    },
    { id: "sats", tipo: "opcion-dato", dato: "se.momssatser", etiqueta: "Momssats", porDefecto: "generell" },
  ],
  calcular(e, v, { redondear }) {
    if (e.belopp <= 0) throw new ErrorEntrada("Skriv ett belopp som är större än noll.", "belopp");
    const sats = enMapa(v["se.momssatser"], e.sats);
    const exkl = e.riktning === "lagg-till" ? e.belopp : redondear(e.belopp / (1 + sats / 100));
    const moms = e.riktning === "lagg-till" ? redondear((e.belopp * sats) / 100) : redondear(e.belopp - exkl);
    return {
      moms,
      exkl,
      inkl: redondear(exkl + moms),
      sats,
      andelAvPris: (sats / (100 + sats)) * 100,
    };
  },
  resultado: [
    { clave: "moms", etiqueta: "Moms", formato: "moneda", destacada: true },
    { clave: "exkl", etiqueta: "Belopp utan moms", formato: "moneda" },
    { clave: "inkl", etiqueta: "Belopp med moms", formato: "moneda" },
    { clave: "sats", etiqueta: "Momssats", formato: "porcentaje", decimales: 0 },
    { clave: "andelAvPris", etiqueta: "Momsens andel av priset med moms", formato: "porcentaje", decimales: 2 },
  ],
});
