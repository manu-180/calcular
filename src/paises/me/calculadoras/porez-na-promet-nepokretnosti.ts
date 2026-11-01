import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "me.porez-na-promet-nepokretnosti",
  mercado: "me",
  concepto: "propio",
  slug: "porez-na-promet-nepokretnosti",
  estado: "publicado",
  requiere: { "me.porez-promet": "escala" },
  campos: [
    { id: "cijena", tipo: "moneda", etiqueta: "Tržišna vrijednost nepokretnosti", min: 0, porDefecto: 120000 },
    { id: "novogradnja", tipo: "si-no", etiqueta: "Novoizgrađen objekat ili građevinsko zemljište na koje se plaća PDV", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.cijena <= 0) throw new ErrorEntrada("Unesite vrijednost veću od nule.", "cijena");
    const observaciones: string[] = [];
    if (e.novogradnja) observaciones.push("Ovaj promet se oporezuje PDV-om, pa se porez na promet nepokretnosti ne plaća.");
    const porez = e.novogradnja ? 0 : redondear(aplicarEscalaMarginal(v["me.porez-promet"], e.cijena));
    return { porez, efektivna: (porez / e.cijena) * 100, ukupno: redondear(e.cijena + porez), observaciones };
  },
  resultado: [
    { clave: "porez", etiqueta: "Porez na promet", formato: "moneda", destacada: true },
    { clave: "efektivna", etiqueta: "Stvarna stopa", formato: "porcentaje", decimales: 2 },
    { clave: "ukupno", etiqueta: "Vrijednost sa porezom", formato: "moneda" },
  ],
});
