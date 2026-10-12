import { definirCalculadora, enMapa, porRegion } from "@/motor/calculo";
import { DIAS_PERIODO } from "../nomina";

export default definirCalculadora({
  id: "mx.salario-minimo-profesional",
  mercado: "mx",
  concepto: "propio",
  slug: "salario-minimo-profesional",
  estado: "publicado",
  requiere: {
    "mx.salarios-minimos-profesionales": "mapa",
    "mx.salarios-minimos-profesionales-frontera": "mapa",
    "mx.salario-minimo": "numero-por-region",
  },
  campos: [
    { id: "oficio", tipo: "opcion-dato", etiqueta: "Oficio o profesión", dato: "mx.salarios-minimos-profesionales", porDefecto: "albanileria-oficial-de" },
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    // La CONASAMI publica una tabla por zona; el campo de oficio toma sus opciones de la zona general
    // porque los dos mapas tienen las mismas claves.
    const tabla = entrada.region === "frontera-norte" ? valores["mx.salarios-minimos-profesionales-frontera"] : valores["mx.salarios-minimos-profesionales"];
    const diario = enMapa(tabla, entrada.oficio);
    const general = porRegion(valores["mx.salario-minimo"], entrada.region);
    return {
      diario,
      semanal: redondear(diario * DIAS_PERIODO.semanal),
      quincenal: redondear(diario * DIAS_PERIODO.quincenal),
      mensual: redondear(diario * DIAS_PERIODO.mensual),
      sobreGeneral: redondear(diario - general),
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario mínimo profesional diario", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Por semana (7 días)", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Por quincena (15 días)", formato: "moneda" },
    { clave: "mensual", etiqueta: "Por mes (30.4 días)", formato: "moneda" },
    { clave: "sobreGeneral", etiqueta: "Por encima del salario mínimo general de tu zona", formato: "moneda", ocultarSiCero: true },
  ],
});
