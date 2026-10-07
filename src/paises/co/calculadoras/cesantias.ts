import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { recibeAuxilio } from "../reglas";

export default definirCalculadora({
  id: "co.cesantias",
  mercado: "co",
  concepto: "fondo-cesantia",
  slug: "cesantias",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.auxilio-transporte": "numero",
    "co.auxilio-tope": "numero",
    "co.intereses-cesantias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días trabajados en el año",
      ayuda: "El año completo son 360 días (meses de 30 días).",
      min: 1,
      max: 360,
      porDefecto: 360,
    },
    { id: "auxilio", tipo: "si-no", etiqueta: "Recibes auxilio de transporte", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1 || entrada.dias > 360) throw new ErrorEntrada("Un año tiene entre 1 y 360 días.", "dias");
    const conAuxilio = entrada.auxilio && recibeAuxilio(entrada.salario, valores["co.smmlv"], valores["co.auxilio-tope"]);
    const base = entrada.salario + (conAuxilio ? valores["co.auxilio-transporte"] : 0);
    const cesantias = redondear((base * entrada.dias) / 360);
    const intereses = redondear((porcentaje(cesantias, valores["co.intereses-cesantias"]) * entrada.dias) / 360);
    return { base, cesantias, intereses, total: redondear(cesantias + intereses) };
  },
  resultado: [
    { clave: "base", etiqueta: "Salario base de las cesantías", formato: "moneda", decimales: 0 },
    { clave: "cesantias", etiqueta: "Cesantías (van a tu fondo)", formato: "moneda", decimales: 0 },
    { clave: "intereses", etiqueta: "Intereses sobre las cesantías (te los pagan a ti)", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Total", formato: "moneda", decimales: 0, destacada: true },
  ],
});
