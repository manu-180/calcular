import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.afa-kalkulator",
  mercado: "hu",
  concepto: "iva",
  slug: "afa-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.afa": "mapa",
  },
  campos: [
    {
      id: "irany",
      tipo: "opcion",
      etiqueta: "Mit szeretnél kiszámolni?",
      opciones: [
        { valor: "nettobol", etiqueta: "Nettóból bruttó (ÁFA hozzáadása)" },
        { valor: "bruttobol", etiqueta: "Bruttóból nettó (ÁFA kivonása)" },
      ],
      porDefecto: "nettobol",
    },
    { id: "osszeg", tipo: "moneda", etiqueta: "Összeg", min: 0, porDefecto: 10000 },
    { id: "kulcs", tipo: "opcion-dato", dato: "hu.afa", etiqueta: "ÁFA-kulcs", porDefecto: "altalanos" },
  ],
  calcular(e, v, { redondear }) {
    if (e.osszeg <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb összeget.", "osszeg");
    const kulcs = enMapa(v["hu.afa"], e.kulcs);
    const netto = e.irany === "nettobol" ? e.osszeg : redondear(e.osszeg / (1 + kulcs / 100));
    const afa = e.irany === "nettobol" ? redondear((netto * kulcs) / 100) : redondear(e.osszeg - netto);
    return { afa, netto, brutto: redondear(netto + afa), kulcs };
  },
  resultado: [
    { clave: "afa", etiqueta: "ÁFA összege", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Nettó összeg", formato: "moneda" },
    { clave: "brutto", etiqueta: "Bruttó összeg", formato: "moneda" },
    { clave: "kulcs", etiqueta: "Alkalmazott ÁFA-kulcs", formato: "porcentaje" },
  ],
});
