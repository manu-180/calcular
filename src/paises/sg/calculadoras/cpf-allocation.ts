import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aporteCpf } from "../lib/impuestos";

const GRUPOS = [
  { valor: "35-y-menos", etiqueta: "35 and below" },
  { valor: "35-45", etiqueta: "Above 35 to 45" },
  { valor: "45-50", etiqueta: "Above 45 to 50" },
  { valor: "50-55", etiqueta: "Above 50 to 55" },
  { valor: "55-60", etiqueta: "Above 55 to 60" },
  { valor: "60-65", etiqueta: "Above 60 to 65" },
  { valor: "65-70", etiqueta: "Above 65 to 70" },
  { valor: "mas-70", etiqueta: "Above 70" },
] as const;

const GRUPO_TASA: Record<string, string> = { "35-y-menos": "55-y-menos", "35-45": "55-y-menos", "45-50": "55-y-menos", "50-55": "55-y-menos" };

export default definirCalculadora({
  id: "sg.cpf-allocation",
  mercado: "sg",
  concepto: "propio",
  slug: "cpf-allocation",
  estado: "publicado",
  requiere: {
    "sg.cpf-asignacion-ma": "mapa",
    "sg.cpf-asignacion-sa-ra": "mapa",
    "sg.cpf-tasa-empleador": "mapa",
    "sg.cpf-tasa-empleado": "mapa",
    "sg.cpf-factor-gradual": "mapa",
    "sg.cpf-tope-ow": "numero",
    "sg.cpf-tramos-salario": "mapa",
  },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "Start from",
      opciones: [
        { valor: "salario", etiqueta: "My monthly salary" },
        { valor: "aporte", etiqueta: "A CPF contribution amount" },
      ],
      porDefecto: "salario",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 5000 },
    { id: "edad", tipo: "opcion", etiqueta: "Your age group", opciones: GRUPOS, porDefecto: "35-y-menos" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const aporte =
      entrada.modo === "aporte"
        ? entrada.monto
        : aporteCpf(entrada.monto, GRUPO_TASA[entrada.edad] ?? entrada.edad, {
            tasaEmpleador: v["sg.cpf-tasa-empleador"],
            tasaEmpleado: v["sg.cpf-tasa-empleado"],
            factorGradual: v["sg.cpf-factor-gradual"],
            topeOw: v["sg.cpf-tope-ow"],
            tramos: v["sg.cpf-tramos-salario"],
          }).total;
    const medisave = redondear(aporte * enMapa(v["sg.cpf-asignacion-ma"], entrada.edad));
    const especial = redondear(aporte * enMapa(v["sg.cpf-asignacion-sa-ra"], entrada.edad));
    const ordinaria = redondear(aporte - medisave - especial);
    const mayor55 = !(entrada.edad in GRUPO_TASA);
    const observaciones = mayor55
      ? ["From 55, the Special Account is closed. This share goes to your Retirement Account up to the Full Retirement Sum, and to your Ordinary Account after that."]
      : [];
    return {
      aporte,
      ordinaria,
      especial: mayor55 ? null : especial,
      retiro: mayor55 ? especial : null,
      medisave,
      observaciones,
    };
  },
  resultado: [
    { clave: "aporte", etiqueta: "Total CPF contribution", formato: "moneda", destacada: true },
    { clave: "ordinaria", etiqueta: "Ordinary Account (OA)", formato: "moneda" },
    { clave: "especial", etiqueta: "Special Account (SA)", formato: "moneda" },
    { clave: "retiro", etiqueta: "Retirement Account (RA)", formato: "moneda" },
    { clave: "medisave", etiqueta: "MediSave Account (MA)", formato: "moneda" },
  ],
});
