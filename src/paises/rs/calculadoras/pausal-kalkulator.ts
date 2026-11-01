import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.pausal-kalkulator",
  mercado: "rs",
  concepto: "regimen-simplificado",
  slug: "pausal-kalkulator",
  estado: "publicado",
  requiere: {
    "rs.porez-samostalna-delatnost": "numero",
    "rs.pio-samostalni": "numero",
    "rs.zdravstvo-samostalni": "numero",
    "rs.nezaposlenost": "numero",
    "rs.najniza-osnovica": "numero",
    "rs.najvisa-osnovica": "numero",
    "rs.pausal-limit-prometa": "numero",
    "rs.pdv-limit-prometa": "numero",
  },
  campos: [
    { id: "prihod", tipo: "moneda", etiqueta: "Mesečni paušalni prihod iz rešenja", ayuda: "Iznos koji je utvrdila Poreska uprava, a ne ono što ste fakturisali.", min: 0, porDefecto: 100000 },
    { id: "promet", tipo: "moneda", etiqueta: "Promet u poslednjih 12 meseci", ayuda: "Nije obavezno. Služi za proveru granica.", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.prihod <= 0) throw new ErrorEntrada("Unesite paušalni prihod veći od nule.", "prihod");
    const osnovica = Math.min(Math.max(e.prihod, v["rs.najniza-osnovica"]), v["rs.najvisa-osnovica"]);
    const porez = redondear((e.prihod * v["rs.porez-samostalna-delatnost"]) / 100);
    const pio = redondear((osnovica * v["rs.pio-samostalni"]) / 100);
    const zdravstvo = redondear((osnovica * v["rs.zdravstvo-samostalni"]) / 100);
    const nezaposlenost = redondear((osnovica * v["rs.nezaposlenost"]) / 100);
    const ukupno = redondear(porez + pio + zdravstvo + nezaposlenost);
    const observaciones: string[] = [];
    if (e.promet !== null && e.promet > v["rs.pausal-limit-prometa"]) observaciones.push("Promet je iznad godišnje granice za paušalno oporezivanje, koja se gleda za prethodnu godinu.");
    if (e.promet !== null && e.promet > v["rs.pdv-limit-prometa"]) observaciones.push("Promet je iznad granice za malog obveznika PDV, pa je potrebna evidencija za PDV.");
    return { ukupno, porez, pio, zdravstvo, nezaposlenost, osnovica, godisnje: redondear(ukupno * 12), observaciones };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Mesečna obaveza", formato: "moneda", destacada: true },
    { clave: "porez", etiqueta: "Porez", formato: "moneda" },
    { clave: "pio", etiqueta: "Doprinos za PIO", formato: "moneda" },
    { clave: "zdravstvo", etiqueta: "Doprinos za zdravstvo", formato: "moneda" },
    { clave: "nezaposlenost", etiqueta: "Doprinos za nezaposlenost", formato: "moneda" },
    { clave: "osnovica", etiqueta: "Osnovica doprinosa", formato: "moneda" },
    { clave: "godisnje", etiqueta: "Obaveza za godinu", formato: "moneda" },
  ],
});
