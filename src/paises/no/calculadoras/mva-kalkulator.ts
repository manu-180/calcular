import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.mva-kalkulator",
  mercado: "no",
  concepto: "iva",
  slug: "mva-kalkulator",
  estado: "publicado",
  requiere: { "no.mva": "mapa" },
  campos: [
    { id: "belop", tipo: "moneda", etiqueta: "Beløp", min: 0, porDefecto: 1000 },
    {
      id: "retning",
      tipo: "opcion",
      etiqueta: "Hva vil du gjøre",
      opciones: [
        { valor: "legg-til", etiqueta: "Legge til mva. (beløpet er eks. mva.)" },
        { valor: "trekk-ut", etiqueta: "Trekke ut mva. (beløpet er inkl. mva.)" },
      ],
      porDefecto: "legg-til",
    },
    { id: "sats", tipo: "opcion-dato", dato: "no.mva", etiqueta: "Mva-sats", porDefecto: "alminnelig" },
  ],
  calcular(e, v, { redondear }) {
    if (e.belop <= 0) throw new ErrorEntrada("Skriv inn et beløp over null.", "belop");
    const sats = enMapa(v["no.mva"], e.sats);
    const eks = e.retning === "legg-til" ? e.belop : e.belop / (1 + sats / 100);
    const mva = redondear((eks * sats) / 100);
    const eksRundet = e.retning === "legg-til" ? redondear(e.belop) : redondear(e.belop - mva);
    return {
      inkl: e.retning === "legg-til" ? redondear(eksRundet + mva) : redondear(e.belop),
      eks: eksRundet,
      mva,
      sats,
    };
  },
  resultado: [
    { clave: "inkl", etiqueta: "Pris inkl. mva.", formato: "moneda", destacada: true },
    { clave: "eks", etiqueta: "Pris eks. mva.", formato: "moneda" },
    { clave: "mva", etiqueta: "Merverdiavgift", formato: "moneda" },
    { clave: "sats", etiqueta: "Mva-sats", formato: "porcentaje", decimales: 0 },
  ],
});
