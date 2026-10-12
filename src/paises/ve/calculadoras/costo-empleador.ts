import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

// Borrador: los aportes patronales no se pudieron leer en fuente primaria https (ver datos.json).
export default definirCalculadora({
  id: "ve.costo-empleador",
  mercado: "ve",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "borrador",
  requiere: {
    "ve.salario-minimo": "numero",
    "ve.ivss-patrono": "mapa",
    "ve.ivss-tope-salarios-minimos": "numero",
    "ve.rpe-patrono": "numero",
    "ve.rpe-tope-salarios-minimos": "numero",
    "ve.faov-patrono": "numero",
    "ve.inces-patrono": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual (en bolívares)", min: 0, moneda: "VES" },
    { id: "riesgo", tipo: "opcion-dato", dato: "ve.ivss-patrono", etiqueta: "Riesgo de la empresa ante el IVSS", porDefecto: "minimo" },
  ],
  calcular(entrada, valores, { redondear }) {
    const sm = valores["ve.salario-minimo"];
    const ivss = redondear(porcentaje(Math.min(entrada.salario, sm * valores["ve.ivss-tope-salarios-minimos"]), enMapa(valores["ve.ivss-patrono"], entrada.riesgo)));
    const rpe = redondear(porcentaje(Math.min(entrada.salario, sm * valores["ve.rpe-tope-salarios-minimos"]), valores["ve.rpe-patrono"]));
    const faov = redondear(porcentaje(entrada.salario, valores["ve.faov-patrono"]));
    const inces = redondear(porcentaje(entrada.salario, valores["ve.inces-patrono"]));
    return { ivss, rpe, faov, inces, total: redondear(entrada.salario + ivss + rpe + faov + inces) };
  },
  resultado: [
    { clave: "ivss", etiqueta: "Seguro Social (IVSS)", formato: "moneda", moneda: "VES" },
    { clave: "rpe", etiqueta: "Paro forzoso", formato: "moneda", moneda: "VES" },
    { clave: "faov", etiqueta: "FAOV (vivienda)", formato: "moneda", moneda: "VES" },
    { clave: "inces", etiqueta: "INCES", formato: "moneda", moneda: "VES" },
    { clave: "total", etiqueta: "Costo mensual total", formato: "moneda", moneda: "VES", destacada: true },
  ],
});
