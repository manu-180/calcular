import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: la fracción de sueldo por año y los años mínimos de la Payment of Gratuity Act no se
// pudieron leer en una fuente oficial (ver motivo en datos.json).
export default definirCalculadora({
  id: "lk.gratuity-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "gratuity-calculator",
  estado: "borrador",
  requiere: {
    "lk.gratuity-months-per-year": "numero",
    "lk.gratuity-min-years": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Last monthly salary", min: 0, porDefecto: 150000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your last monthly salary.", "sueldo");
    const derecho = e.anios >= v["lk.gratuity-min-years"];
    const gratificacion = derecho ? redondear(e.sueldo * v["lk.gratuity-months-per-year"] * e.anios) : 0;
    const observaciones: string[] = [];
    if (!derecho) observaciones.push("You do not have enough completed years of service for a gratuity yet.");
    return { gratificacion, observaciones };
  },
  resultado: [{ clave: "gratificacion", etiqueta: "Gratuity", formato: "moneda", destacada: true }],
});
