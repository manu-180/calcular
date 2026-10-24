import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.sdl-calculator",
  mercado: "tz",
  concepto: "propio",
  slug: "sdl-calculator",
  estado: "publicado",
  requiere: {
    "tz.sdl-rate": "numero",
    "tz.sdl-min-employees": "numero",
  },
  campos: [
    { id: "nomina", tipo: "moneda", etiqueta: "Gross emoluments paid to all employees this month", min: 0, porDefecto: 20000000 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees", min: 0, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.nomina < 0) throw new ErrorEntrada("Emoluments cannot be negative.", "nomina");
    const aplica = e.empleados >= v["tz.sdl-min-employees"];
    const sdl = aplica ? redondear(porcentaje(e.nomina, v["tz.sdl-rate"])) : 0;
    const observaciones = aplica ? [] : ["SDL applies to employers with ten or more employees."];
    return { sdl, anual: redondear(sdl * 12), aplica: aplica ? "Yes" : "No", observaciones };
  },
  resultado: [
    { clave: "sdl", etiqueta: "SDL for the month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "SDL over 12 months", formato: "moneda" },
    { clave: "aplica", etiqueta: "SDL applies to you", formato: "texto" },
  ],
});
