import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "us.401k-contribution",
  mercado: "us",
  concepto: "propio",
  slug: "401k-contribution",
  estado: "publicado",
  requiere: {
    "us.401k-limit": "numero",
    "us.401k-catch-up": "numero",
    "us.401k-catch-up-60-63": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Yearly salary", min: 0, porDefecto: 75000 },
    { id: "aporte", tipo: "porcentaje", etiqueta: "Your contribution (% of salary)", min: 0, max: 100, porDefecto: 6 },
    { id: "edad", tipo: "entero", etiqueta: "Your age at the end of the year", min: 16, max: 110, porDefecto: 35 },
    { id: "coincidencia", tipo: "porcentaje", etiqueta: "Employer match (% of your contribution)", min: 0, max: 300, porDefecto: 50 },
    { id: "topeCoincidencia", tipo: "porcentaje", etiqueta: "Matched up to (% of salary)", min: 0, max: 100, porDefecto: 6 },
  ],
  calcular(entrada, valores, { redondear }) {
    const extra = entrada.edad >= 60 && entrada.edad <= 63 ? valores["us.401k-catch-up-60-63"] : entrada.edad >= 50 ? valores["us.401k-catch-up"] : 0;
    const limite = valores["us.401k-limit"] + extra;
    const pedido = porcentaje(entrada.sueldo, entrada.aporte);
    const aporte = redondear(Math.min(pedido, limite, entrada.sueldo));
    const coincidencia = redondear(porcentaje(Math.min(aporte, porcentaje(entrada.sueldo, entrada.topeCoincidencia)), entrada.coincidencia));
    const observaciones: string[] = [];
    if (pedido > limite) observaciones.push("Your contribution was capped at the yearly limit for your age.");
    if (entrada.aporte < entrada.topeCoincidencia && entrada.coincidencia > 0)
      observaciones.push("You contribute less than the matched percentage, so part of the employer match is left on the table.");
    return {
      limite,
      catchUp: extra,
      aporte,
      porMes: redondear(aporte / 12),
      coincidencia,
      total: redondear(aporte + coincidencia),
      paraElMaximo: entrada.sueldo > 0 ? redondear(Math.min(100, (limite / entrada.sueldo) * 100)) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "limite", etiqueta: "Your 2026 contribution limit", formato: "moneda" },
    { clave: "catchUp", etiqueta: "Catch-up included in the limit", formato: "moneda", ocultarSiCero: true },
    { clave: "aporte", etiqueta: "Your yearly contribution", formato: "moneda", destacada: true },
    { clave: "porMes", etiqueta: "Your contribution per month", formato: "moneda" },
    { clave: "coincidencia", etiqueta: "Employer match", formato: "moneda" },
    { clave: "total", etiqueta: "Total going into your 401(k)", formato: "moneda" },
    { clave: "paraElMaximo", etiqueta: "Percentage needed to max out", formato: "porcentaje" },
  ],
});
