import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DIARIO, salarioDiario } from "../lib/salarios";

export default definirCalculadora({
  id: "ae.sick-leave-pay",
  mercado: "ae",
  concepto: "propio",
  slug: "sick-leave-pay",
  estado: "publicado",
  requiere: {
    "ae.sick-leave": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly wage", min: 0, porDefecto: 9000 },
    { id: "previos", tipo: "numero", etiqueta: "Sick days already taken this year of service", min: 0, max: 365, porDefecto: 0 },
    { id: "dias", tipo: "numero", etiqueta: "Sick days to work out", min: 0, max: 365, porDefecto: 20 },
    { id: "prueba", tipo: "si-no", etiqueta: "You're still on probation", porDefecto: false },
    CAMPO_DIARIO,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.dias <= 0) throw new ErrorEntrada("Enter the sick days.", "dias");
    const t = v["ae.sick-leave"];
    const diario = salarioDiario(entrada.salario, entrada.metodoDiario, "salario");
    const llena = enMapa(t, "full-pay");
    const media = enMapa(t, "half-pay");
    const maximo = llena + media + enMapa(t, "unpaid");
    const tramo = (desde: number, hasta: number) => Math.max(0, Math.min(entrada.previos + entrada.dias, hasta) - Math.max(entrada.previos, desde));
    const observaciones: string[] = [];
    if (entrada.prueba) {
      observaciones.push("Sick leave during probation is unpaid. Your employer may grant it without pay with a medical report.");
      return { pago: 0, completos: 0, medios: 0, sinPaga: entrada.dias, diario: redondear(diario), observaciones };
    }
    const completos = tramo(0, llena);
    const medios = tramo(llena, llena + media);
    const sinPaga = entrada.dias - completos - medios;
    if (entrada.previos + entrada.dias > maximo) observaciones.push("Sick leave is limited to 90 days a year. After that, the employer may end the contract, paying all your dues.");
    observaciones.push("You have to tell your employer within 3 business days and give a medical report.");
    return { pago: redondear(diario * completos + (diario * medios) / 2), completos, medios, sinPaga, diario: redondear(diario), observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Sick leave pay", formato: "moneda", destacada: true },
    { clave: "completos", etiqueta: "Days at full pay", formato: "dias", decimales: 1 },
    { clave: "medios", etiqueta: "Days at half pay", formato: "dias", decimales: 1 },
    { clave: "sinPaga", etiqueta: "Unpaid days", formato: "dias", decimales: 1 },
    { clave: "diario", etiqueta: "Daily wage", formato: "moneda" },
  ],
});
