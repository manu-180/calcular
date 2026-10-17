import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.ritenuta-acconto",
  mercado: "it",
  concepto: "retencion-honorarios",
  slug: "calcolo-ritenuta-d-acconto",
  estado: "publicado",
  requiere: {
    "it.ritenuta-acconto": "numero",
    "it.rivalsa-inps": "numero",
    "it.aliquote-iva": "mapa",
  },
  campos: [
    { id: "compenso", tipo: "moneda", etiqueta: "Compenso", ayuda: "L'importo della prestazione, senza IVA.", min: 0, porDefecto: 1000 },
    { id: "rivalsa", tipo: "si-no", etiqueta: "Aggiungi la rivalsa INPS (Gestione separata)", porDefecto: false },
    { id: "iva", tipo: "si-no", etiqueta: "La fattura ha l'IVA ordinaria", ayuda: "No per le prestazioni occasionali.", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.compenso <= 0) throw new ErrorEntrada("Inserisci un compenso maggiore di zero.", "compenso");
    const rivalsa = e.rivalsa ? redondear(porcentaje(e.compenso, v["it.rivalsa-inps"])) : 0;
    const imponibile = redondear(e.compenso + rivalsa);
    const iva = e.iva ? redondear(porcentaje(imponibile, v["it.aliquote-iva"].ordinaria)) : 0;
    const totale = redondear(imponibile + iva);
    const ritenuta = redondear(porcentaje(imponibile, v["it.ritenuta-acconto"]));
    return {
      rivalsa,
      imponibile,
      iva,
      totale,
      ritenuta,
      netto: redondear(totale - ritenuta),
      observaciones: [
        "La ritenuta non è una tassa in più: è un anticipo dell'IRPEF che il cliente versa per te e che scali nella dichiarazione dei redditi.",
        "Chi è nel regime forfettario non applica né IVA né ritenuta d'acconto.",
      ],
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Netto a pagare dal cliente", formato: "moneda", destacada: true },
    { clave: "imponibile", etiqueta: "Imponibile", formato: "moneda" },
    { clave: "rivalsa", etiqueta: "Rivalsa INPS", formato: "moneda", ocultarSiCero: true },
    { clave: "iva", etiqueta: "IVA", formato: "moneda", ocultarSiCero: true },
    { clave: "totale", etiqueta: "Totale fattura", formato: "moneda" },
    { clave: "ritenuta", etiqueta: "Ritenuta d'acconto", formato: "moneda" },
  ],
});
