import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { recibeAuxilio } from "../reglas";

export default definirCalculadora({
  id: "co.prima-de-servicios",
  mercado: "co",
  concepto: "bono-semestral",
  slug: "prima-de-servicios",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.auxilio-transporte": "numero",
    "co.auxilio-tope": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días trabajados en el semestre",
      ayuda: "El semestre completo son 180 días (meses de 30 días).",
      min: 1,
      max: 180,
      porDefecto: 180,
    },
    { id: "auxilio", tipo: "si-no", etiqueta: "Recibes auxilio de transporte", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    if (entrada.dias < 1 || entrada.dias > 180) throw new ErrorEntrada("Un semestre tiene entre 1 y 180 días.", "dias");
    const conAuxilio = entrada.auxilio && recibeAuxilio(entrada.salario, valores["co.smmlv"], valores["co.auxilio-tope"]);
    const auxilio = conAuxilio ? valores["co.auxilio-transporte"] : 0;
    const base = entrada.salario + auxilio;
    const prima = redondear((base * entrada.dias) / 360);
    const observaciones: string[] = [];
    if (entrada.auxilio && !conAuxilio) observaciones.push("Ganas más de dos salarios mínimos, así que el auxilio de transporte no entra en la prima.");
    return { base, auxilio, prima, observaciones };
  },
  resultado: [
    { clave: "auxilio", etiqueta: "Auxilio de transporte incluido", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "base", etiqueta: "Salario base de la prima", formato: "moneda", decimales: 0 },
    { clave: "prima", etiqueta: "Prima de servicios del semestre", formato: "moneda", decimales: 0, destacada: true },
  ],
});
