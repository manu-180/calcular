import { definirCalculadora, enMapa } from "@/motor/calculo";
import { estadoValido, OPCIONES_ESTADO_CIVIL } from "../lib/impuestos";

export default definirCalculadora({
  id: "us.roth-ira-contribution",
  mercado: "us",
  concepto: "propio",
  slug: "roth-ira-contribution",
  estado: "publicado",
  requiere: {
    "us.ira-limit": "numero",
    "us.ira-catch-up": "numero",
    "us.roth-phaseout-start": "mapa",
    "us.roth-phaseout-end": "mapa",
    "us.roth-minimum": "numero",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    { id: "magi", tipo: "moneda", etiqueta: "Modified AGI for Roth IRA purposes", min: 0, porDefecto: 100000 },
    { id: "edad", tipo: "entero", etiqueta: "Your age at the end of the year", min: 0, max: 120, porDefecto: 35 },
    { id: "compensacion", tipo: "moneda", etiqueta: "Taxable compensation (wages and self-employment income)", min: 0, porDefecto: 100000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const limite = valores["us.ira-limit"] + (entrada.edad >= 50 ? valores["us.ira-catch-up"] : 0);
    const base = Math.min(limite, entrada.compensacion);
    const inicio = enMapa(valores["us.roth-phaseout-start"], estado);
    const fin = enMapa(valores["us.roth-phaseout-end"], estado);
    let maximo: number;
    if (entrada.magi <= inicio) maximo = base;
    else if (entrada.magi >= fin) maximo = 0;
    else {
      // Pub. 590-A, hoja 2-2: el cociente va redondeado a tres decimales y el resultado sube al
      // múltiplo de 10 siguiente, con un piso de 200.
      const cociente = Math.round(((entrada.magi - inicio) / (fin - inicio)) * 1000) / 1000;
      const reducido = Math.ceil(redondear(base - base * cociente) / 10) * 10;
      maximo = Math.min(base, Math.max(valores["us.roth-minimum"], reducido));
    }
    const observaciones: string[] = [];
    if (estado === "mfs") observaciones.push("This uses the range for married people who lived with their spouse at some point in the year. If you lived apart all year, use the single range.");
    if (maximo === 0) observaciones.push("Your income is too high for a direct Roth IRA contribution. A traditional IRA is still allowed.");
    return {
      limite,
      inicio,
      fin,
      maximo: redondear(maximo),
      porMes: redondear(maximo / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "limite", etiqueta: "IRA limit for your age", formato: "moneda" },
    { clave: "inicio", etiqueta: "Phase-out starts at", formato: "moneda" },
    { clave: "fin", etiqueta: "Phase-out ends at", formato: "moneda" },
    { clave: "maximo", etiqueta: "Most you can put in a Roth IRA", formato: "moneda", destacada: true },
    { clave: "porMes", etiqueta: "Per month to reach it", formato: "moneda" },
  ],
});
