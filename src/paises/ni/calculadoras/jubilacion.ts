import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

const SEMANAS_POR_FACTOR = 52;

export default definirCalculadora({
  id: "ni.jubilacion",
  mercado: "ni",
  concepto: "jubilacion",
  slug: "jubilacion",
  estado: "publicado",
  requiere: {
    "ni.pension-vejez-edad": "numero",
    "ni.pension-vejez-semanas": "numero",
    "ni.pension-vejez-reducida-semanas": "numero",
    "ni.pension-base-semanas": "numero",
    "ni.pension-factor-basico": "numero",
    "ni.pension-factor-anual": "numero",
    "ni.pension-semanas-sin-factor": "numero",
    "ni.pension-tasa-maxima": "numero",
    "ni.pension-tope-usd": "numero",
    "ni.pension-asignaciones": "mapa",
    "ni.tipo-cambio": "serie",
  },
  campos: [
    { id: "semanas", tipo: "entero", etiqueta: "Semanas cotizadas al INSS", min: 0, porDefecto: 750 },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual promedio de tus últimos años",
      min: 0,
      ayuda: "El INSS promedia tus últimas semanas cotizadas: unos siete años de salario.",
    },
    { id: "edad", tipo: "entero", etiqueta: "Tu edad", min: 15, max: 100, porDefecto: 60 },
    { id: "conyuge", tipo: "si-no", etiqueta: "Tenés a cargo a tu esposa o esposo inválido", porDefecto: false },
    { id: "dependientes", tipo: "entero", etiqueta: "Hijos menores de 15 años o padres mayores de 60 a tu cargo", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const requeridas = valores["ni.pension-vejez-semanas"];
    const observaciones: string[] = [];
    if (entrada.semanas < requeridas) {
      observaciones.push(
        entrada.semanas >= valores["ni.pension-vejez-reducida-semanas"]
          ? `Con menos de ${requeridas} semanas no hay pensión completa. A los ${valores["ni.pension-vejez-edad"]} años podés pedir la pensión reducida, de un monto fijo que depende de tus semanas.`
          : `Con menos de ${valores["ni.pension-vejez-reducida-semanas"]} semanas no hay pensión de vejez. Podés seguir cotizando, también con el seguro facultativo.`,
      );
      return { tasa: 0, pension: 0, asignaciones: 0, total: 0, faltan: requeridas - entrada.semanas, observaciones };
    }
    const bloques = Math.floor((entrada.semanas - valores["ni.pension-semanas-sin-factor"]) / SEMANAS_POR_FACTOR);
    const tasa = Math.min(valores["ni.pension-tasa-maxima"], valores["ni.pension-factor-basico"] + bloques * valores["ni.pension-factor-anual"]);
    const pension = redondear(entrada.salario * tasa);
    const pctAsignaciones = (entrada.conyuge ? enMapa(valores["ni.pension-asignaciones"], "conyuge") : 0) + entrada.dependientes * enMapa(valores["ni.pension-asignaciones"], "dependiente");
    const asignaciones = redondear(porcentaje(pension, pctAsignaciones));
    const tope = redondear(Math.min(entrada.salario, valores["ni.pension-tope-usd"] * valores["ni.tipo-cambio"].valor));
    const total = redondear(Math.min(pension + asignaciones, tope));
    if (total < pension + asignaciones) observaciones.push(`Se aplicó el tope: la pensión con asignaciones no puede pasar tu salario base ni el equivalente en córdobas de ${valores["ni.pension-tope-usd"]} dólares.`);
    if (entrada.edad < valores["ni.pension-vejez-edad"]) observaciones.push(`La pensión de vejez se cobra desde los ${valores["ni.pension-vejez-edad"]} años, salvo los casos especiales (maestras, mineros, trabajos de desgaste).`);
    observaciones.push("Es una estimación con la fórmula del Reglamento: el INSS usa el promedio exacto de tus semanas cotizadas.");
    observaciones.push("Además de la pensión mensual cobrás el décimo tercer mes cada diciembre.");
    return { tasa: redondear(tasa * 100), pension, asignaciones, total, faltan: 0, observaciones };
  },
  resultado: [
    { clave: "faltan", etiqueta: "Semanas que te faltan para la pensión completa", formato: "numero", ocultarSiCero: true },
    { clave: "tasa", etiqueta: "Tasa de reemplazo", formato: "porcentaje", ocultarSiCero: true },
    { clave: "pension", etiqueta: "Pensión básica", formato: "moneda", ocultarSiCero: true },
    { clave: "asignaciones", etiqueta: "Asignaciones familiares", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Pensión mensual estimada", formato: "moneda", destacada: true },
  ],
});
