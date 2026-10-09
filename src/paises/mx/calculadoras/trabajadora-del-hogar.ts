import { definirCalculadora, porcentaje, porRegion } from "@/motor/calculo";
import { diasDeVacaciones, OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.trabajadora-del-hogar",
  mercado: "mx",
  concepto: "trabajo-domestico",
  slug: "trabajadora-del-hogar",
  estado: "publicado",
  requiere: {
    "mx.salario-minimo-hogar": "numero-por-region",
    "mx.dias-aguinaldo": "numero",
    "mx.vacaciones-primer-anio": "numero",
    "mx.prima-vacacional": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo en efectivo", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "semanal" },
    { id: "region", tipo: "region", etiqueta: "Dónde trabaja", porDefecto: "general" },
    { id: "anios", tipo: "entero", etiqueta: "Años completos trabajando contigo", min: 0, max: 60, porDefecto: 1 },
    { id: "jornadaCompleta", tipo: "si-no", etiqueta: "Trabaja la jornada completa (8 horas diarias)", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const minimo = porRegion(valores["mx.salario-minimo-hogar"], entrada.region);
    const aguinaldo = redondear(diario * valores["mx.dias-aguinaldo"]);
    const dias = diasDeVacaciones(entrada.anios, valores["mx.vacaciones-primer-anio"]);
    const pagoVacaciones = redondear(diario * dias);
    const primaVacacional = redondear(porcentaje(pagoVacaciones, valores["mx.prima-vacacional"]));
    const costoAnual = redondear(diario * 365 + aguinaldo + primaVacacional);

    const observaciones: string[] = [];
    if (entrada.jornadaCompleta && diario < minimo) {
      observaciones.push("El salario diario es menor que el salario mínimo profesional de las personas trabajadoras del hogar. Por jornada completa no puede ser menor.");
    }
    if (dias === 0) observaciones.push("Las vacaciones se ganan al cumplir el primer año.");
    observaciones.push("Las cuotas del IMSS no están incluidas: el propio IMSS las calcula cuando la inscribes, según su salario y los días que trabaja.");

    return {
      diario,
      minimo,
      aguinaldo,
      dias,
      pagoVacaciones,
      primaVacacional,
      costoAnual,
      costoMensual: redondear(costoAnual / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "costoMensual", etiqueta: "Costo mensual promedio (sin IMSS)", formato: "moneda", destacada: true },
    { clave: "aguinaldo", etiqueta: "Aguinaldo de diciembre", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "minimo", etiqueta: "Salario mínimo diario del hogar en su zona", formato: "moneda" },
    { clave: "dias", etiqueta: "Días de vacaciones al año", formato: "dias" },
    { clave: "pagoVacaciones", etiqueta: "Pago de esos días de vacaciones", formato: "moneda" },
    { clave: "primaVacacional", etiqueta: "Prima vacacional", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Costo total al año (sin IMSS)", formato: "moneda" },
  ],
});
