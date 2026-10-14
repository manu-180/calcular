import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

const euro = (n: number) => new Intl.NumberFormat("it-IT").format(n);

export default definirCalculadora({
  id: "it.regime-forfettario",
  mercado: "it",
  concepto: "regimen-simplificado",
  slug: "calcolo-regime-forfettario",
  estado: "publicado",
  requiere: {
    "it.forfettario-coefficienti": "mapa",
    "it.forfettario-aliquote": "mapa",
    "it.forfettario-soglie": "mapa",
  },
  campos: [
    { id: "ricavi", tipo: "moneda", etiqueta: "Ricavi o compensi incassati nell'anno", min: 0, porDefecto: 40000 },
    { id: "attivita", tipo: "opcion-dato", dato: "it.forfettario-coefficienti", etiqueta: "Attività (gruppo ATECO)", porDefecto: "professioni" },
    { id: "aliquota", tipo: "opcion-dato", dato: "it.forfettario-aliquote", etiqueta: "Imposta sostitutiva", porDefecto: "ordinaria" },
    {
      id: "contributi",
      tipo: "moneda",
      etiqueta: "Contributi previdenziali versati nell'anno",
      ayuda: "Quelli pagati davvero nell'anno (INPS o cassa professionale): si sottraggono dal reddito.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.ricavi < 0) throw new ErrorEntrada("I ricavi non possono essere negativi.", "ricavi");
    const coefficiente = enMapa(v["it.forfettario-coefficienti"], e.attivita);
    const aliquota = enMapa(v["it.forfettario-aliquote"], e.aliquota);
    const soglie = v["it.forfettario-soglie"];
    const redditoLordo = redondear(porcentaje(e.ricavi, coefficiente));
    const imponibile = redondear(Math.max(0, redditoLordo - e.contributi));
    const imposta = redondear(porcentaje(imponibile, aliquota));
    const observaciones: string[] = [];
    if (e.ricavi > soglie["uscita-immediata"]) observaciones.push(`Con ricavi sopra i ${euro(soglie["uscita-immediata"])} euro esci dal forfettario già da quest'anno e devi applicare l'IVA dall'operazione che fa superare la soglia.`);
    else if (e.ricavi > soglie.accesso) observaciones.push(`Con ricavi sopra gli ${euro(soglie.accesso)} euro quest'anno resti nel forfettario, ma dall'anno prossimo passi al regime ordinario.`);
    if (e.contributi > redditoLordo) observaciones.push("I contributi superano il reddito forfettario: la parte in eccesso si può dedurre da altri redditi, se ne hai.");
    return {
      coefficiente,
      redditoLordo,
      imponibile,
      aliquota,
      imposta,
      netto: redondear(e.ricavi - imposta - e.contributi),
      observaciones,
    };
  },
  resultado: [
    { clave: "imposta", etiqueta: "Imposta sostitutiva da pagare", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Quello che ti resta dopo imposta e contributi", formato: "moneda" },
    { clave: "coefficiente", etiqueta: "Coefficiente di redditività", formato: "porcentaje", decimales: 0 },
    { clave: "redditoLordo", etiqueta: "Reddito forfettario", formato: "moneda" },
    { clave: "imponibile", etiqueta: "Reddito imponibile (dopo i contributi)", formato: "moneda" },
    { clave: "aliquota", etiqueta: "Aliquota", formato: "porcentaje", decimales: 0 },
  ],
});
