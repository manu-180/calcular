import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ro.calculator-ore-suplimentare",
  mercado: "ro",
  concepto: "horas-extra",
  slug: "calculator-ore-suplimentare",
  estado: "borrador",
  requiere: { "ro.spor-ore-suplimentare": "numero" },
  campos: [
    { id: "salariu", tipo: "moneda", etiqueta: "Salariul de bază brut lunar", min: 0, porDefecto: 6000 },
    { id: "oreLuna", tipo: "numero", etiqueta: "Ore de lucru normale în luna respectivă", min: 1, max: 250, porDefecto: 168 },
    { id: "ore", tipo: "numero", etiqueta: "Ore suplimentare lucrate", min: 0, max: 200, porDefecto: 10 },
    { id: "spor", tipo: "porcentaje", etiqueta: "Sporul din contract (lăsați gol pentru minimul legal)", min: 0, max: 300, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.salariu <= 0) throw new ErrorEntrada("Introduceți salariul de bază.", "salariu");
    const minim = v["ro.spor-ore-suplimentare"];
    const spor = Math.max(e.spor ?? minim, minim);
    const tarif = e.salariu / e.oreLuna;
    const plata = redondear(tarif * e.ore * (1 + spor / 100));
    const observaciones: string[] = [];
    if (e.spor !== null && e.spor < minim) observaciones.push("Sporul nu poate fi mai mic decât minimul legal; calculul folosește minimul.");
    observaciones.push("Sporul se plătește doar dacă orele nu sunt compensate cu timp liber plătit.");
    return { plata, tarif: redondear(tarif), spor, total: redondear(e.salariu + plata), observaciones };
  },
  resultado: [
    { clave: "plata", etiqueta: "Plata pentru orele suplimentare (brut)", formato: "moneda", destacada: true },
    { clave: "tarif", etiqueta: "Tariful orar normal", formato: "moneda" },
    { clave: "spor", etiqueta: "Sporul aplicat", formato: "porcentaje", decimales: 0 },
    { clave: "total", etiqueta: "Salariul de bază plus orele suplimentare", formato: "moneda" },
  ],
});
