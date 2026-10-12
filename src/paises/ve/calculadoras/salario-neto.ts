import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { CAMPO_MONEDA } from "../reglas";

// Borrador: los porcentajes del IVSS, el paro forzoso y el FAOV no se pudieron leer en fuente primaria https (ver datos.json).
export default definirCalculadora({
  id: "ve.salario-neto",
  mercado: "ve",
  concepto: "sueldo-neto",
  slug: "salario-neto",
  estado: "borrador",
  requiere: {
    "ve.salario-minimo": "numero",
    "ve.tasa-bcv-usd": "serie",
    "ve.ivss-trabajador": "numero",
    "ve.ivss-tope-salarios-minimos": "numero",
    "ve.rpe-trabajador": "numero",
    "ve.rpe-tope-salarios-minimos": "numero",
    "ve.faov-trabajador": "numero",
  },
  campos: [CAMPO_MONEDA, { id: "salario", tipo: "numero", etiqueta: "Salario mensual", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["ve.tasa-bcv-usd"].valor;
    const bs = entrada.moneda === "VES" ? entrada.salario : entrada.salario * tasa;
    const sm = valores["ve.salario-minimo"];
    // Los topes del IVSS y del paro forzoso están en salarios mínimos; el FAOV va sobre todo el salario.
    const ivss = redondear(porcentaje(Math.min(bs, sm * valores["ve.ivss-tope-salarios-minimos"]), valores["ve.ivss-trabajador"]));
    const rpe = redondear(porcentaje(Math.min(bs, sm * valores["ve.rpe-tope-salarios-minimos"]), valores["ve.rpe-trabajador"]));
    const faov = redondear(porcentaje(bs, valores["ve.faov-trabajador"]));
    const neto = redondear(bs - ivss - rpe - faov);
    return { salarioBs: redondear(bs), ivss, rpe, faov, neto, netoUsd: redondear(neto / tasa) };
  },
  resultado: [
    { clave: "salarioBs", etiqueta: "Salario en bolívares", formato: "moneda", moneda: "VES" },
    { clave: "ivss", etiqueta: "Seguro Social (IVSS)", formato: "moneda", moneda: "VES" },
    { clave: "rpe", etiqueta: "Paro forzoso (Régimen Prestacional de Empleo)", formato: "moneda", moneda: "VES" },
    { clave: "faov", etiqueta: "FAOV (vivienda)", formato: "moneda", moneda: "VES" },
    { clave: "neto", etiqueta: "Salario neto", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "netoUsd", etiqueta: "Salario neto en dólares", formato: "moneda", moneda: "USD" },
  ],
});
