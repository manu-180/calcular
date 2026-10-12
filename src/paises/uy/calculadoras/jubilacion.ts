import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { edadConAnios } from "../lib/jubilacion";

export default definirCalculadora({
  id: "uy.jubilacion",
  mercado: "uy",
  concepto: "jubilacion",
  slug: "jubilacion",
  estado: "publicado",
  requiere: {
    "uy.jubilacion-edad-normal": "mapa",
    "uy.jubilacion-anios-minimos": "mapa",
    "uy.jubilacion-anios-minimos-bps": "mapa",
    "uy.jubilacion-tasas": "mapa",
    "uy.jubilacion-tasa-normal": "numero",
  },
  campos: [
    { id: "nacimiento", tipo: "entero", etiqueta: "Año en que naciste", min: 1973, max: 2010, porDefecto: 1980 },
    { id: "edad", tipo: "entero", etiqueta: "Edad a la que pensás jubilarte", min: 60, max: 80, porDefecto: 65 },
    { id: "anios", tipo: "numero", etiqueta: "Años de servicio con aportes al jubilarte", min: 0, max: 60, porDefecto: 30 },
    {
      id: "sbj",
      tipo: "moneda",
      etiqueta: "Sueldo básico jubilatorio (estimado)",
      ayuda: "Es el promedio mensual de tus 20 mejores años de sueldo, actualizados. Si no lo sabés, usá tu sueldo nominal actual como aproximación.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.nacimiento < 1973) throw new ErrorEntrada("Si naciste antes de 1973 se te aplica el régimen anterior, que esta calculadora no cubre.", "nacimiento");
    if (entrada.nacimiento + entrada.edad < 2033) throw new ErrorEntrada("Si te jubilás antes de 2033 se aplica el régimen anterior, que esta calculadora no cubre.", "edad");
    const minima = edadConAnios(
      { edadNormal: valores["uy.jubilacion-edad-normal"], aniosMinimos: valores["uy.jubilacion-anios-minimos"], aniosMinimosBps: valores["uy.jubilacion-anios-minimos-bps"] },
      entrada.nacimiento,
      Math.floor(entrada.anios),
      true,
    );
    if (minima === null) throw new ErrorEntrada("Con esos años de servicio no llegás a una causal jubilatoria común.", "anios");
    if (entrada.edad < minima) throw new ErrorEntrada(`Con ${Math.floor(entrada.anios)} años de servicio te podés jubilar desde los ${minima} años.`, "edad");
    // Art. 46: 1,5 % por año a la edad normal; si el cese es más tarde, la tasa de la tabla por edad, si es mayor.
    const tasas = valores["uy.jubilacion-tasas"];
    const edadTabla = Math.min(entrada.edad, Math.max(...Object.keys(tasas).map(Number)));
    const tasa = Math.max(valores["uy.jubilacion-tasa-normal"], enMapa(tasas, String(edadTabla)));
    const reemplazo = tasa * entrada.anios;
    const observaciones: string[] = ["Es solo la jubilación del BPS (primer pilar). Si estás en una AFAP, se suma lo que te pague por tu ahorro."];
    if (entrada.nacimiento + entrada.edad < 2043) observaciones.push("Entre 2033 y 2042 rige la convergencia: una parte se calcula con el régimen anterior, así que el monto real puede ser otro.");
    observaciones.push("La jubilación tiene un mínimo y un suplemento solidario para montos bajos que esta estimación no incluye.");
    return { edadMinima: minima, tasa, reemplazo, jubilacion: redondear(porcentaje(entrada.sbj, reemplazo)), observaciones };
  },
  resultado: [
    { clave: "edadMinima", etiqueta: "Edad mínima con tus años de servicio", formato: "anios" },
    { clave: "tasa", etiqueta: "Tasa por año de servicio", formato: "porcentaje" },
    { clave: "reemplazo", etiqueta: "Porcentaje del sueldo básico jubilatorio", formato: "porcentaje" },
    { clave: "jubilacion", etiqueta: "Jubilación estimada del BPS por mes", formato: "moneda", destacada: true },
  ],
});
