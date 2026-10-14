import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { euros } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.illness-benefit",
  mercado: "ie",
  concepto: "propio",
  slug: "illness-benefit",
  estado: "publicado",
  requiere: {
    "ie.illness-benefit-rates": "escala",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Your average gross weekly earnings", min: 0, porDefecto: 450 },
    { id: "semanas", tipo: "entero", etiqueta: "Weeks you expect to be off sick", min: 1, max: 104, porDefecto: 4 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your average weekly earnings before tax.", "semanal");
    const escala = v["ie.illness-benefit-rates"];
    const tarifa = redondear(aplicarEscala(escala, entrada.semanal));
    const ultima = escala[escala.length - 1];
    const maxima = ultima.cuotaFija ?? tarifa;
    const observaciones: string[] = [];
    if (tarifa < maxima) observaciones.push(`Your rate is below the maximum because your average weekly earnings are under ${euros(ultima.desde)}.`);
    observaciones.push("The rate depends on your earnings in the relevant tax year. You may also get an increase for a qualified adult or for children.");
    return { tarifa, total: redondear(tarifa * entrada.semanas), maxima, observaciones };
  },
  resultado: [
    { clave: "tarifa", etiqueta: "Illness Benefit a week", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "For the weeks you entered", formato: "moneda" },
    { clave: "maxima", etiqueta: "Maximum personal rate", formato: "moneda" },
  ],
});
