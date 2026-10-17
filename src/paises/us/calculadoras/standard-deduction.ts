import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { deduccionEstandar, estadoValido, maxPersonas, OPCIONES_ESTADO_CIVIL } from "../lib/impuestos";

export default definirCalculadora({
  id: "us.standard-deduction",
  mercado: "us",
  concepto: "propio",
  slug: "standard-deduction",
  estado: "publicado",
  requiere: {
    "us.standard-deduction": "mapa",
    "us.additional-standard-deduction": "mapa",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    { id: "mayores", tipo: "entero", etiqueta: "People on the return who are 65 or older", min: 0, max: 2, porDefecto: 0, ayuda: "For 2026, born before January 2, 1962." },
    { id: "ciegos", tipo: "entero", etiqueta: "People on the return who are blind", min: 0, max: 2, porDefecto: 0 },
    { id: "itemizadas", tipo: "moneda", etiqueta: "Your itemized deductions, to compare", min: 0, requerido: false, ayuda: "Mortgage interest, state and local taxes up to the cap, charity and large medical bills." },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const tope = maxPersonas(estado);
    if (entrada.mayores > tope) throw new ErrorEntrada("Only a joint return can count two people.", "mayores");
    if (entrada.ciegos > tope) throw new ErrorEntrada("Only a joint return can count two people.", "ciegos");
    const basica = enMapa(valores["us.standard-deduction"], estado);
    const total = deduccionEstandar(valores["us.standard-deduction"], valores["us.additional-standard-deduction"], estado, entrada.mayores + entrada.ciegos);
    const itemizadas = entrada.itemizadas;
    return {
      basica,
      adicional: redondear(total - basica),
      total,
      conviene: itemizadas === null ? null : itemizadas > total ? "Itemize" : "Take the standard deduction",
      diferencia: itemizadas === null ? null : redondear(Math.abs(itemizadas - total)),
      observaciones: [
        "If someone can claim you as a dependent, your standard deduction may be smaller.",
        ...(estado === "mfs" ? ["If your spouse itemizes on a separate return, you have to itemize too."] : []),
      ],
    };
  },
  resultado: [
    { clave: "basica", etiqueta: "Basic standard deduction", formato: "moneda" },
    { clave: "adicional", etiqueta: "Additional amount for age or blindness", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Your standard deduction", formato: "moneda", destacada: true },
    { clave: "conviene", etiqueta: "Better choice", formato: "texto" },
    { clave: "diferencia", etiqueta: "Difference between the two", formato: "moneda" },
  ],
});
