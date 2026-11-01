import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.prekovremeni-rad",
  mercado: "hr",
  concepto: "horas-extra",
  slug: "prekovremeni-rad",
  estado: "publicado",
  requiere: { "hr.prekovremeni-tjedno": "numero", "hr.prekovremeni-godisnje": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Bruto plaća mjesečno", min: 0, porDefecto: 2000 },
    { id: "fond", tipo: "numero", etiqueta: "Mjesečni fond sati", min: 1, max: 300, porDefecto: 174 },
    { id: "sati", tipo: "numero", etiqueta: "Prekovremeni sati u mjesecu", min: 0, max: 200, porDefecto: 10 },
    { id: "postotak", tipo: "porcentaje", etiqueta: "Povećanje iz ugovora ili kolektivnog ugovora", ayuda: "Zakon ne propisuje postotak. Upišite svoj.", min: 0, max: 300, porDefecto: 50 },
    { id: "ukupnoGodine", tipo: "numero", etiqueta: "Prekovremeni sati od početka godine", min: 0, max: 2000, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto plaću veću od nule.", "bruto");
    const satnica = e.bruto / e.fond;
    const osnovno = redondear(satnica * e.sati);
    const povecanje = redondear((satnica * e.sati * e.postotak) / 100);
    const observaciones: string[] = [];
    if (e.ukupnoGodine + e.sati > v["hr.prekovremeni-godisnje"]) observaciones.push("Iznad zakonske granice od 180 sati godišnje. Kolektivni ugovor može dopustiti do 250 sati.");
    return { ukupno: redondear(osnovno + povecanje), satnica: redondear(satnica), osnovno, povecanje, observaciones };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Bruto za prekovremeni rad", formato: "moneda", destacada: true },
    { clave: "satnica", etiqueta: "Bruto satnica", formato: "moneda" },
    { clave: "osnovno", etiqueta: "Osnovna plaća za te sate", formato: "moneda" },
    { clave: "povecanje", etiqueta: "Povećanje", formato: "moneda" },
  ],
});
