import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";

export default definirCalculadora({
  id: "no.trinnskatt",
  mercado: "no",
  concepto: "propio",
  slug: "trinnskatt",
  estado: "publicado",
  requiere: { "no.trinnskatt": "escala" },
  campos: [{ id: "inntekt", tipo: "moneda", etiqueta: "Personinntekt i året (lønn før skatt)", min: 0, porDefecto: 800000 }],
  tablas: [{ clave: "trinn", titulo: "Trinnskatt trinn for trinn", filasVisibles: 6 }],
  calcular(e, v, { redondear }) {
    if (e.inntekt <= 0) throw new ErrorEntrada("Skriv inn en inntekt over null.", "inntekt");
    const skala = v["no.trinnskatt"];
    const filas: (string | number)[][] = [];
    let sum = 0;
    let marginal = 0;
    skala.forEach((f, i) => {
      if (i === 0) return;
      const iTrinnet = e.inntekt <= f.desde ? 0 : (f.hasta === null ? e.inntekt : Math.min(e.inntekt, f.hasta)) - f.desde;
      const skatt = redondear((iTrinnet * f.tasa) / 100);
      if (iTrinnet > 0) marginal = f.tasa;
      sum += skatt;
      filas.push([`Trinn ${i}`, f.tasa, redondear(iTrinnet), skatt]);
    });
    const trinn: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "trinn", etiqueta: "Trinn", formato: "texto" },
        { clave: "sats", etiqueta: "Sats", formato: "porcentaje" },
        { clave: "inntekt", etiqueta: "Inntekt i trinnet", formato: "moneda" },
        { clave: "skatt", etiqueta: "Trinnskatt", formato: "moneda" },
      ],
      filas,
    };
    const total = redondear(sum);
    return {
      trinnskatt: total,
      perManed: redondear(total / 12),
      marginal,
      andel: redondear((total / e.inntekt) * 100),
      trinn,
    };
  },
  resultado: [
    { clave: "trinnskatt", etiqueta: "Trinnskatt i året", formato: "moneda", destacada: true },
    { clave: "perManed", etiqueta: "Trinnskatt per måned (snitt)", formato: "moneda" },
    { clave: "marginal", etiqueta: "Sats i øverste trinn du når", formato: "porcentaje", decimales: 1 },
    { clave: "andel", etiqueta: "Trinnskatt i prosent av inntekten", formato: "porcentaje", decimales: 2 },
  ],
});
