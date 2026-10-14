import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares } from "../lib/impuestos";

export default definirCalculadora({
  id: "au.stamp-duty-calculator-nsw",
  mercado: "au",
  concepto: "propio",
  slug: "stamp-duty-calculator-nsw",
  estado: "publicado",
  requiere: {
    "au.nsw-transfer-duty": "escala",
    "au.nsw-duty-minimo": "numero",
    "au.nsw-fhb": "mapa",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Property price or market value (whichever is higher)", min: 0, porDefecto: 1000000 },
    { id: "residencial", tipo: "si-no", etiqueta: "It is a residential property", porDefecto: true },
    { id: "primeraVivienda", tipo: "si-no", etiqueta: "You qualify for the First Home Buyers Assistance Scheme", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the price of the property.", "valor");
    const escala = v["au.nsw-transfer-duty"];
    // La última fila es la premium duty, que la ley aplica solo a propiedad residencial.
    const filas = entrada.residencial ? escala : escala.slice(0, -1);
    const general = redondear(Math.max(v["au.nsw-duty-minimo"], aplicarEscala(filas, entrada.valor)));
    const fhb = v["au.nsw-fhb"];
    const observaciones: string[] = [];
    let duty = general;
    if (entrada.primeraVivienda && entrada.valor <= fhb.exencion) {
      duty = 0;
      observaciones.push(`First home buyers pay no transfer duty on a home valued at ${dolares(fhb.exencion)} or less.`);
    } else if (entrada.primeraVivienda && entrada.valor < fhb.tope) {
      observaciones.push(`Reduced duty applies to first homes valued under ${dolares(fhb.tope)}. This figure is the full duty before that concession.`);
    }
    if (entrada.residencial && entrada.valor > escala[escala.length - 1].desde) {
      observaciones.push("The value is above the premium threshold, so premium property duty applies on the part above it.");
    }
    return { duty, general, porcentaje: (duty / entrada.valor) * 100, observaciones };
  },
  resultado: [
    { clave: "duty", etiqueta: "Transfer duty (stamp duty)", formato: "moneda", destacada: true },
    { clave: "general", etiqueta: "Duty at the general rates", formato: "moneda" },
    { clave: "porcentaje", etiqueta: "Duty as a share of the price", formato: "porcentaje", decimales: 2 },
  ],
});
