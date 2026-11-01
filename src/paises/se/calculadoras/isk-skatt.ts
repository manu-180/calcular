import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.isk-skatt",
  mercado: "se",
  concepto: "propio",
  slug: "isk-skatt",
  estado: "publicado",
  requiere: {
    "se.isk-schablonranta": "numero",
    "se.isk-grundniva": "numero",
    "se.kapitalskatt": "numero",
  },
  campos: [
    { id: "q1", tipo: "moneda", etiqueta: "Värde 1 januari", min: 0, porDefecto: 400000 },
    { id: "q2", tipo: "moneda", etiqueta: "Värde 1 april", min: 0, porDefecto: 410000 },
    { id: "q3", tipo: "moneda", etiqueta: "Värde 1 juli", min: 0, porDefecto: 420000 },
    { id: "q4", tipo: "moneda", etiqueta: "Värde 1 oktober", min: 0, porDefecto: 430000 },
    { id: "insattningar", tipo: "moneda", etiqueta: "Summa insättningar under året", min: 0, porDefecto: 40000, ayuda: "Räkna inte med överföringar från ett annat eget investeringssparkonto." },
  ],
  calcular(e, v) {
    const summa = e.q1 + e.q2 + e.q3 + e.q4 + e.insattningar;
    if (summa <= 0) throw new ErrorEntrada("Skriv värdet på kontot.", "q1");
    const kapitalunderlag = summa / 4;
    const ranta = v["se.isk-schablonranta"];
    const grundniva = v["se.isk-grundniva"];
    const schablonintakt = Math.floor((kapitalunderlag * ranta) / 100);
    const avdrag = Math.floor((Math.min(kapitalunderlag, grundniva) * ranta) / 100);
    const skatt = Math.floor(((schablonintakt - avdrag) * v["se.kapitalskatt"]) / 100);
    return {
      skatt,
      kapitalunderlag,
      schablonintakt,
      avdrag,
      effektiv: (ranta * v["se.kapitalskatt"]) / 100,
      observaciones: [
        "Den skattefria grundnivån gäller ditt sammanlagda sparande på investeringssparkonto, kapitalförsäkring och PEPP. Har du flera konton delas den mellan dem.",
      ],
    };
  },
  resultado: [
    { clave: "skatt", etiqueta: "Skatt på ISK för året", formato: "moneda", decimales: 0, destacada: true },
    { clave: "kapitalunderlag", etiqueta: "Kapitalunderlag", formato: "moneda" },
    { clave: "schablonintakt", etiqueta: "Schablonintäkt", formato: "moneda", decimales: 0 },
    { clave: "avdrag", etiqueta: "Avdrag för den skattefria grundnivån", formato: "moneda", decimales: 0 },
    { clave: "effektiv", etiqueta: "Skatt i procent av underlaget över grundnivån", formato: "porcentaje", decimales: 3 },
  ],
});
