import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: la escala de la indemnización (Employment (Termination and Redundancy Payments) Regulations)
// no se pudo leer en una fuente oficial; ver los motivos en datos.json.
export default definirCalculadora({
  id: "jm.redundancy-calculator",
  mercado: "jm",
  concepto: "indemnizacion-despido",
  slug: "redundancy-calculator",
  estado: "borrador",
  requiere: {
    "jm.redundancy-weeks-first-10": "numero",
    "jm.redundancy-weeks-after-10": "numero",
    "jm.redundancy-qualifying-weeks": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Full years of continuous service", min: 0, max: 60, porDefecto: 8 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your normal pay for a week", min: 0, porDefecto: 40000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.anios < 0) throw new ErrorEntrada("Years of service cannot be negative.", "anios");
    const califica = e.anios * 52 >= v["jm.redundancy-qualifying-weeks"];
    const primeros = Math.min(e.anios, 10);
    const resto = Math.max(0, e.anios - 10);
    const semanas = califica ? primeros * v["jm.redundancy-weeks-first-10"] + resto * v["jm.redundancy-weeks-after-10"] : 0;
    const observaciones: string[] = [];
    if (!califica) observaciones.push("Redundancy pay starts after two years of continuous employment.");
    return { pago: redondear(semanas * e.semanal), semanas, observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Redundancy pay", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of pay", formato: "semanas" },
  ],
});
