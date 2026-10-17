import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.iva",
  mercado: "it",
  concepto: "iva",
  slug: "calcolo-iva",
  estado: "publicado",
  requiere: {
    "it.aliquote-iva": "mapa",
  },
  campos: [
    {
      id: "operazione",
      tipo: "opcion",
      etiqueta: "Cosa vuoi fare?",
      opciones: [
        { valor: "aggiungi", etiqueta: "Aggiungere l'IVA a un prezzo netto" },
        { valor: "scorpora", etiqueta: "Scorporare l'IVA da un prezzo ivato" },
      ],
      porDefecto: "aggiungi",
    },
    { id: "importo", tipo: "moneda", etiqueta: "Importo", ayuda: "Netto se aggiungi l'IVA, IVA inclusa se la scorpori.", min: 0, porDefecto: 100 },
    { id: "aliquota", tipo: "opcion-dato", dato: "it.aliquote-iva", etiqueta: "Aliquota IVA", porDefecto: "ordinaria" },
  ],
  calcular(e, v, { redondear }) {
    if (e.importo < 0) throw new ErrorEntrada("L'importo non può essere negativo.", "importo");
    const aliquota = enMapa(v["it.aliquote-iva"], e.aliquota);
    if (e.operazione === "scorpora") {
      const totale = redondear(e.importo);
      const imponibile = redondear(e.importo / (1 + aliquota / 100));
      return { imponibile, iva: redondear(totale - imponibile), totale, aliquota };
    }
    const imponibile = redondear(e.importo);
    const iva = redondear(porcentaje(e.importo, aliquota));
    return { imponibile, iva, totale: redondear(imponibile + iva), aliquota };
  },
  resultado: [
    { clave: "totale", etiqueta: "Prezzo IVA inclusa", formato: "moneda", destacada: true },
    { clave: "imponibile", etiqueta: "Imponibile (senza IVA)", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "aliquota", etiqueta: "Aliquota applicata", formato: "porcentaje", decimales: 0 },
  ],
});
