import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.severance-pay",
  mercado: "lr",
  concepto: "indemnizacion-despido",
  slug: "severance-pay",
  estado: "borrador",
  requiere: {
    "lr.severance-weeks": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Your pay for one week", min: 0, porDefecto: 10000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your pay for one week.", "semanal");
    if (entrada.anios < 0) throw new ErrorEntrada("Enter your completed years of service.", "anios");
    const semanas = entrada.anios * v["lr.severance-weeks"];
    return { total: redondear(semanas * entrada.semanal), semanas };
  },
  resultado: [
    { clave: "total", etiqueta: "Redundancy severance pay", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of pay", formato: "semanas" },
  ],
});
