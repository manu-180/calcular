import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { dolares, impuestoResidente, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.srs-tax-savings",
  mercado: "sg",
  concepto: "propio",
  slug: "srs-tax-savings",
  estado: "publicado",
  requiere: {
    "sg.renta-residentes": "escala",
    "sg.srs-tope": "mapa",
  },
  campos: [
    { id: "gravable", tipo: "moneda", etiqueta: "Chargeable income before SRS relief", min: 0, porDefecto: 120000, ayuda: "Your income after all other reliefs." },
    { id: "perfil", tipo: "opcion-dato", dato: "sg.srs-tope", etiqueta: "You are", porDefecto: "ciudadano-pr" },
    { id: "aporte", tipo: "moneda", etiqueta: "SRS contribution this year", min: 0, porDefecto: 15300 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.gravable <= 0) throw new ErrorEntrada("Enter your chargeable income.", "gravable");
    const escala = v["sg.renta-residentes"];
    const tope = enMapa(v["sg.srs-tope"], entrada.perfil);
    const alivio = Math.min(entrada.aporte, tope, entrada.gravable);
    const antes = redondear(impuestoResidente(entrada.gravable, escala));
    const despues = redondear(impuestoResidente(entrada.gravable - alivio, escala));
    const observaciones: string[] = [];
    if (entrada.aporte > tope) observaciones.push(`The yearly SRS limit for you is ${dolares(tope)}, so only that much counts for relief.`);
    observaciones.push("SRS relief counts towards the yearly cap on all personal reliefs.");
    return {
      ahorro: redondear(antes - despues),
      antes,
      despues,
      alivio,
      tope,
      marginal: tasaMarginal(escala, entrada.gravable),
      observaciones,
    };
  },
  resultado: [
    { clave: "ahorro", etiqueta: "Tax you save this year", formato: "moneda", destacada: true },
    { clave: "antes", etiqueta: "Tax without SRS", formato: "moneda" },
    { clave: "despues", etiqueta: "Tax with SRS", formato: "moneda" },
    { clave: "alivio", etiqueta: "SRS relief", formato: "moneda" },
    { clave: "tope", etiqueta: "Your yearly SRS limit", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your top tax rate before SRS", formato: "porcentaje", decimales: 1 },
  ],
});
