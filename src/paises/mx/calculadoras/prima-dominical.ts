import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.prima-dominical",
  mercado: "mx",
  concepto: "propio",
  slug: "prima-dominical",
  estado: "publicado",
  requiere: {
    "mx.prima-dominical": "numero",
    "mx.exencion-prima-dominical": "numero",
    "mx.uma-diaria": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "domingos", tipo: "entero", etiqueta: "Domingos que trabajaste", min: 0, max: 31, porDefecto: 1 },
    { id: "prima", tipo: "porcentaje", etiqueta: "Prima dominical que da tu empresa", min: 0, max: 100, requerido: false, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["mx.prima-dominical"];
    const tasa = entrada.prima ?? minimo;
    if (tasa < minimo) throw new ErrorEntrada(`La prima dominical no puede ser menor al ${minimo} %.`, "prima");
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const porDomingo = redondear(porcentaje(diario, tasa));
    const prima = redondear(porDomingo * entrada.domingos);
    const exento = Math.min(prima, redondear(valores["mx.exencion-prima-dominical"] * valores["mx.uma-diaria"] * entrada.domingos));
    return { diario, porDomingo, prima, exento, gravado: redondear(prima - exento) };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "porDomingo", etiqueta: "Prima por cada domingo", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima dominical total", formato: "moneda", destacada: true },
    { clave: "exento", etiqueta: "Parte que no paga ISR", formato: "moneda" },
    { clave: "gravado", etiqueta: "Parte que paga ISR", formato: "moneda", ocultarSiCero: true },
  ],
});
