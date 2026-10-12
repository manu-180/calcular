import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { factorIntegracion, topeSbc } from "../imss";
import { diasDeVacaciones, OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.salario-diario-integrado",
  mercado: "mx",
  concepto: "propio",
  slug: "salario-diario-integrado",
  estado: "publicado",
  requiere: {
    "mx.dias-aguinaldo": "numero",
    "mx.prima-vacacional": "numero",
    "mx.vacaciones-primer-anio": "numero",
    "mx.uma-diaria": "numero",
    "mx.tope-sbc-imss": "numero",
    "mx.salario-minimo": "numero-por-region",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "antiguedad", tipo: "entero", etiqueta: "Años completos en la empresa", min: 0, max: 60, porDefecto: 1 },
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
    { id: "diasAguinaldo", tipo: "entero", etiqueta: "Días de aguinaldo que da tu empresa", min: 1, requerido: false, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." },
    { id: "prima", tipo: "porcentaje", etiqueta: "Prima vacacional que da tu empresa", min: 0, max: 100, requerido: false, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." },
    { id: "otras", tipo: "moneda", etiqueta: "Otras percepciones fijas por día", min: 0, requerido: false, ayuda: "Comisiones, bonos o premios que integran salario, ya divididos por día." },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimoAg = valores["mx.dias-aguinaldo"];
    const minimoPrima = valores["mx.prima-vacacional"];
    const diasAg = entrada.diasAguinaldo ?? minimoAg;
    if (diasAg < minimoAg) throw new ErrorEntrada(`La ley pide al menos ${minimoAg} días de aguinaldo.`, "diasAguinaldo");
    const prima = entrada.prima ?? minimoPrima;
    if (prima < minimoPrima) throw new ErrorEntrada(`La prima vacacional no puede ser menor al ${minimoPrima} %.`, "prima");
    const anios = Math.max(1, entrada.antiguedad);
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const factor = factorIntegracion(anios, diasAg, prima, valores["mx.vacaciones-primer-anio"]);
    const sdi = redondear(diario * factor + (entrada.otras ?? 0));
    const sbc = redondear(topeSbc(sdi, { uma: valores["mx.uma-diaria"], salarioMinimo: porRegion(valores["mx.salario-minimo"], entrada.region), topeSbcUma: valores["mx.tope-sbc-imss"] }));
    const observaciones: string[] = [];
    if (sbc < sdi) observaciones.push("Tu salario integrado pasa el tope del IMSS: para las cuotas se usa el tope.");
    if (sbc > sdi) observaciones.push("Para el IMSS el salario base de cotización no puede ser menor al salario mínimo.");
    return {
      diario,
      vacaciones: diasDeVacaciones(anios, valores["mx.vacaciones-primer-anio"]),
      factor,
      sdi,
      sbc,
      mensual: redondear(sdi * 30),
      observaciones,
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Días de vacaciones que se usan", formato: "dias" },
    { clave: "factor", etiqueta: "Factor de integración", formato: "numero", decimales: 4 },
    { clave: "sdi", etiqueta: "Salario diario integrado", formato: "moneda", destacada: true },
    { clave: "sbc", etiqueta: "Salario base de cotización (con tope del IMSS)", formato: "moneda" },
    { clave: "mensual", etiqueta: "Salario integrado de 30 días", formato: "moneda" },
  ],
});
