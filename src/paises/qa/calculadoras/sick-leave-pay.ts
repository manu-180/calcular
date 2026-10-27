import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_SEMANAL, salarioSemanal } from "../lib/salarios";

export default definirCalculadora({
  id: "qa.sick-leave-pay",
  mercado: "qa",
  concepto: "propio",
  slug: "sick-leave-pay",
  estado: "publicado",
  requiere: {
    "qa.sick-leave": "mapa",
    "qa.sick-leave-qualifying": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 6000 },
    { id: "meses", tipo: "numero", etiqueta: "Months since you joined the employer", min: 0, max: 720, porDefecto: 24 },
    { id: "semanas", tipo: "numero", etiqueta: "Weeks of sick leave this service year", ayuda: "Certified by a doctor approved by your employer.", min: 0, max: 52, porDefecto: 3 },
    CAMPO_SEMANAL,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanas <= 0) throw new ErrorEntrada("Enter the weeks of sick leave.", "semanas");
    const t = v["qa.sick-leave"];
    const semanal = salarioSemanal(entrada.basico, entrada.metodoSemanal);
    const observaciones: string[] = [];
    if (entrada.meses < v["qa.sick-leave-qualifying"]) {
      observaciones.push("Paid sick leave starts after three months with the employer.");
      return { pago: 0, completas: 0, medias: 0, sinPago: redondear(entrada.semanas), semanal: redondear(semanal), observaciones };
    }
    const completas = Math.min(entrada.semanas, enMapa(t, "full-pay"));
    const medias = Math.min(Math.max(0, entrada.semanas - completas), enMapa(t, "half-pay"));
    const sinPago = Math.max(0, entrada.semanas - completas - medias);
    if (entrada.semanas >= enMapa(t, "max-weeks")) observaciones.push("After the twelfth week, the employer may end the contract if a specialist confirms you can't return to work.");
    return {
      pago: redondear(completas * semanal + (medias * semanal) / 2),
      completas: redondear(completas),
      medias: redondear(medias),
      sinPago: redondear(sinPago),
      semanal: redondear(semanal),
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Sick pay for the period", formato: "moneda", destacada: true },
    { clave: "completas", etiqueta: "Weeks on full pay", formato: "semanas", decimales: 2 },
    { clave: "medias", etiqueta: "Weeks on half pay", formato: "semanas", decimales: 2 },
    { clave: "sinPago", etiqueta: "Weeks without pay", formato: "semanas", decimales: 2 },
    { clave: "semanal", etiqueta: "Weekly basic salary", formato: "moneda" },
  ],
});
