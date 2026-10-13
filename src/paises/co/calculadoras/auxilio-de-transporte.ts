import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { recibeAuxilio } from "../reglas";

export default definirCalculadora({
  id: "co.auxilio-de-transporte",
  mercado: "co",
  concepto: "propio",
  slug: "auxilio-de-transporte",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.auxilio-transporte": "numero",
    "co.auxilio-tope": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Días trabajados en el mes", min: 1, max: 30, porDefecto: 30 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    if (entrada.dias < 1 || entrada.dias > 30) throw new ErrorEntrada("Escribe entre 1 y 30 días.", "dias");
    const smmlv = valores["co.smmlv"];
    const tope = redondear(valores["co.auxilio-tope"] * smmlv);
    const aplica = recibeAuxilio(entrada.salario, smmlv, valores["co.auxilio-tope"]);
    const auxilio = aplica ? redondear((valores["co.auxilio-transporte"] / 30) * entrada.dias) : 0;
    return {
      tope,
      derecho: aplica ? "Sí" : "No",
      auxilio,
      observaciones: aplica ? [] : ["Tu salario pasa el tope, así que por ley no te corresponde auxilio de transporte."],
    };
  },
  resultado: [
    { clave: "tope", etiqueta: "Salario máximo para recibirlo", formato: "moneda", decimales: 0 },
    { clave: "derecho", etiqueta: "Te corresponde", formato: "texto" },
    { clave: "auxilio", etiqueta: "Auxilio de transporte del mes", formato: "moneda", decimales: 0, destacada: true },
  ],
});
