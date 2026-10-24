import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DIARIO, salarioDiario } from "../lib/salarios";

export default definirCalculadora({
  id: "ae.gratuity-calculator",
  mercado: "ae",
  concepto: "indemnizacion-despido",
  slug: "gratuity-calculator",
  estado: "publicado",
  requiere: {
    "ae.gratuity": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Last monthly basic wage", ayuda: "Basic wage only, without housing, transport or other allowances.", min: 0, porDefecto: 12000 },
    { id: "anios", tipo: "numero", etiqueta: "Years of continuous service", min: 0, max: 60, porDefecto: 8 },
    { id: "ausencias", tipo: "entero", etiqueta: "Days of unpaid absence during your service", min: 0, max: 20000, porDefecto: 0 },
    CAMPO_DIARIO,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios <= 0) throw new ErrorEntrada("Enter your years of service.", "anios");
    const tabla = v["ae.gratuity"];
    const diario = salarioDiario(entrada.basico, entrada.metodoDiario);
    const servicio = Math.max(0, entrada.anios - entrada.ausencias / 365);
    const observaciones: string[] = [];
    if (servicio < 1) {
      observaciones.push("Gratuity starts after one year of continuous service, so nothing is due yet.");
      return { gratuidad: 0, dias: 0, diario: redondear(diario), servicio, tope: redondear(entrada.basico * 12 * enMapa(tabla, "cap-years")), observaciones };
    }
    const primeros = Math.min(servicio, 5) * enMapa(tabla, "first-5-years");
    const despues = Math.max(0, servicio - 5) * enMapa(tabla, "after-5-years");
    const dias = primeros + despues;
    const tope = entrada.basico * 12 * enMapa(tabla, "cap-years");
    const bruto = dias * diario;
    if (bruto > tope) observaciones.push("The total reaches the cap of two years' wage.");
    observaciones.push("This is for foreign full-time workers. Emiratis receive their end-of-service benefits under the pensions law instead.");
    return { gratuidad: redondear(Math.min(bruto, tope)), dias: redondear(dias), diario: redondear(diario), servicio, tope: redondear(tope), observaciones };
  },
  resultado: [
    { clave: "gratuidad", etiqueta: "End-of-service gratuity", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "Days of basic wage", formato: "dias", decimales: 2 },
    { clave: "diario", etiqueta: "Daily basic wage", formato: "moneda" },
    { clave: "servicio", etiqueta: "Service counted", formato: "anios", decimales: 2 },
    { clave: "tope", etiqueta: "Cap (two years' wage)", formato: "moneda" },
  ],
});
