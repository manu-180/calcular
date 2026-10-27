import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.sick-leave-calculator",
  mercado: "mw",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "mw.sick-full-pay": "numero",
    "mw.sick-half-pay": "numero",
    "mw.sick-qualifying": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months of continuous service", min: 0, porDefecto: 24 },
    { id: "semanas", tipo: "numero", etiqueta: "Weeks of sick leave this year", min: 0, porDefecto: 6 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your normal wage for one week", min: 0, porDefecto: 50000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanas <= 0) throw new ErrorEntrada("Enter the weeks of sick leave.", "semanas");
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your normal wage for one week.", "semanal");
    if (e.meses < v["mw.sick-qualifying"]) {
      return {
        pago: 0,
        completas: 0,
        medias: 0,
        sinPago: e.semanas,
        observaciones: [`Paid sick leave under the Act starts after ${v["mw.sick-qualifying"]} months of continuous service. Check your contract for anything better.`],
      };
    }
    const completas = Math.min(e.semanas, v["mw.sick-full-pay"]);
    const medias = Math.min(e.semanas - completas, v["mw.sick-half-pay"]);
    const sinPago = e.semanas - completas - medias;
    const pago = redondear(completas * e.semanal + (medias * e.semanal) / 2);
    return { pago, completas, medias, sinPago, observaciones: [] };
  },
  resultado: [
    { clave: "pago", etiqueta: "Sick pay for these weeks", formato: "moneda", destacada: true },
    { clave: "completas", etiqueta: "Weeks on full pay", formato: "semanas", decimales: 1 },
    { clave: "medias", etiqueta: "Weeks on half pay", formato: "semanas", decimales: 1, ocultarSiCero: true },
    { clave: "sinPago", etiqueta: "Weeks beyond the paid leave", formato: "semanas", decimales: 1, ocultarSiCero: true },
  ],
});
