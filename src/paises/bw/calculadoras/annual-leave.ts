import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// Borrador: los días salen del proyecto de la Employment and Labour Relations Act; falta el texto final.
export default definirCalculadora({
  id: "bw.annual-leave",
  mercado: "bw",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "borrador",
  requiere: {
    "bw.annual-leave-days": "numero",
    "bw.overtime-divisor": "mapa",
  },
  campos: [
    { id: "meses", tipo: "numero", etiqueta: "Months worked in the leave cycle", min: 0, max: 12, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken", min: 0, porDefecto: 0 },
    { id: "salario", tipo: "moneda", etiqueta: "Basic pay a month", min: 0, porDefecto: 6000 },
    { id: "semana", tipo: "opcion-dato", etiqueta: "Your working week", dato: "bw.overtime-divisor", porDefecto: "5-days" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.meses <= 0) throw new ErrorEntrada("Enter the months you worked.", "meses");
    const ganados = entrada.meses * v["bw.annual-leave-days"];
    const saldo = Math.max(0, ganados - entrada.tomados);
    const diario = entrada.salario / enMapa(v["bw.overtime-divisor"], entrada.semana);
    return { saldo, ganados, valor: redondear(saldo * diario), diario: redondear(diario) };
  },
  resultado: [
    { clave: "saldo", etiqueta: "Leave days left", formato: "dias", destacada: true, decimales: 2 },
    { clave: "ganados", etiqueta: "Leave days earned", formato: "dias", decimales: 2 },
    { clave: "valor", etiqueta: "Pay for the days left", formato: "moneda" },
    { clave: "diario", etiqueta: "Daily basic pay", formato: "moneda" },
  ],
});
