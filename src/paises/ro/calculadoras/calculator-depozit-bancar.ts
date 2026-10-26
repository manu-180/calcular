import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ro.calculator-depozit-bancar",
  mercado: "ro",
  concepto: "plazo-fijo",
  slug: "calculator-depozit-bancar",
  estado: "publicado",
  requiere: { "ro.impozit-dobanzi": "numero" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Suma depusă", min: 0, porDefecto: 10000 },
    { id: "dobanda", tipo: "porcentaje", etiqueta: "Dobânda anuală a depozitului", min: 0, max: 30, porDefecto: 6 },
    {
      id: "termen",
      tipo: "opcion",
      etiqueta: "Termenul depozitului",
      opciones: [
        { valor: "1", etiqueta: "1 lună" },
        { valor: "3", etiqueta: "3 luni" },
        { valor: "6", etiqueta: "6 luni" },
        { valor: "12", etiqueta: "12 luni" },
      ],
      porDefecto: "12",
    },
    { id: "luni", tipo: "entero", etiqueta: "Cât timp țineți banii (luni)", min: 1, max: 120, porDefecto: 12 },
    { id: "capitalizare", tipo: "si-no", etiqueta: "Depozit cu prelungire automată și capitalizarea dobânzii", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Introduceți suma depusă.", "suma");
    const termen = Number(e.termen);
    if (e.luni < termen) throw new ErrorEntrada("Perioada trebuie să fie de cel puțin un termen al depozitului.", "luni");
    const perioade = Math.floor(e.luni / termen);
    const rata = e.dobanda / 100;
    let sold = e.suma;
    let brut = 0;
    let impozit = 0;
    for (let i = 0; i < perioade; i++) {
      const baza = e.capitalizare ? sold : e.suma;
      const d = redondear((baza * rata * termen) / 12);
      const imp = redondear((d * v["ro.impozit-dobanzi"]) / 100);
      brut += d;
      impozit += imp;
      if (e.capitalizare) sold = redondear(sold + d - imp);
    }
    brut = redondear(brut);
    impozit = redondear(impozit);
    const net = redondear(brut - impozit);
    const observaciones: string[] = [];
    if (perioade * termen < e.luni) observaciones.push(`Se socotesc doar termenele încheiate: ${perioade * termen} din ${e.luni} luni.`);
    return {
      final: redondear(e.suma + net),
      brut,
      impozit,
      net,
      randament: (net / e.suma) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "final", etiqueta: "Suma la final", formato: "moneda", destacada: true },
    { clave: "net", etiqueta: "Dobânda netă încasată", formato: "moneda" },
    { clave: "brut", etiqueta: "Dobânda brută", formato: "moneda" },
    { clave: "impozit", etiqueta: "Impozit pe dobândă reținut de bancă", formato: "moneda" },
    { clave: "randament", etiqueta: "Câștig net în toată perioada", formato: "porcentaje", decimales: 2 },
  ],
});
