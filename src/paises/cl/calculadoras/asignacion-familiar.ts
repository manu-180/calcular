import { aplicarEscala, definirCalculadora } from "@/motor/calculo";

const TRAMOS = ["A", "B", "C", "D"];

export default definirCalculadora({
  id: "cl.asignacion-familiar",
  mercado: "cl",
  concepto: "propio",
  slug: "asignacion-familiar",
  estado: "publicado",
  requiere: {
    "cl.asignacion-familiar": "escala",
    "cl.subsidio-familiar": "numero",
  },
  campos: [
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "Tu ingreso mensual",
      ayuda: "Por regla general, el promedio de tus ingresos de enero a junio.",
      min: 0,
    },
    { id: "cargas", tipo: "entero", etiqueta: "Cargas familiares reconocidas", min: 1, max: 20, porDefecto: 1 },
  ],
  calcular(entrada, valores) {
    const escala = valores["cl.asignacion-familiar"];
    let indice = 0;
    escala.forEach((f, i) => {
      if (entrada.ingreso >= f.desde) indice = i;
    });
    const porCarga = aplicarEscala(escala, Math.max(entrada.ingreso, 1));
    const observaciones: string[] = [];
    if (porCarga === 0) observaciones.push("Con ese ingreso no recibes monto en dinero, pero tus cargas siguen reconocidas para salud y otros beneficios.");
    return {
      tramo: TRAMOS[indice] ?? String(indice + 1),
      porCarga,
      total: porCarga * entrada.cargas,
      subsidioFamiliar: valores["cl.subsidio-familiar"],
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Asignación familiar al mes", formato: "moneda", destacada: true },
    { clave: "porCarga", etiqueta: "Monto por carga", formato: "moneda" },
    { clave: "tramo", etiqueta: "Tramo", formato: "texto" },
    { clave: "subsidioFamiliar", etiqueta: "Subsidio familiar (SUF) por carga, como referencia", formato: "moneda" },
  ],
});
