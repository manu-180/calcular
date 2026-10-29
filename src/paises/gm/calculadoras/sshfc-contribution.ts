import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.sshfc-contribution",
  mercado: "gm",
  concepto: "aportes-seguridad-social",
  slug: "sshfc-contribution",
  estado: "publicado",
  requiere: {
    "gm.npf-employee-rate": "numero",
    "gm.npf-employer-rate": "numero",
    "gm.fps-rate": "numero",
    "gm.iicf-rate": "numero",
    "gm.iicf-cap": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 10000 },
    { id: "subsidios", tipo: "moneda", etiqueta: "Fixed allowances a month", min: 0, porDefecto: 0, ayuda: "The FPS and the injuries fund are worked out on basic salary plus fixed allowances." },
    {
      id: "esquema",
      tipo: "opcion",
      etiqueta: "Scheme",
      opciones: [
        { valor: "npf", etiqueta: "National Provident Fund (NPF)" },
        { valor: "fps", etiqueta: "Federated Pension Scheme (FPS)" },
      ],
      porDefecto: "npf",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter the basic salary.", "basico");
    const bruto = entrada.basico + entrada.subsidios;
    const trabajador = entrada.esquema === "npf" ? redondear(porcentaje(entrada.basico, v["gm.npf-employee-rate"])) : 0;
    const empleador = redondear(entrada.esquema === "npf" ? porcentaje(entrada.basico, v["gm.npf-employer-rate"]) : porcentaje(bruto, v["gm.fps-rate"]));
    const iicf = redondear(Math.min(porcentaje(bruto, v["gm.iicf-rate"]), v["gm.iicf-cap"]));
    return {
      pension: redondear(trabajador + empleador),
      trabajador,
      empleador,
      iicf,
      totalEmpleador: redondear(empleador + iicf),
      remitir: redondear(trabajador + empleador + iicf),
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "Pension contribution a month", formato: "moneda", destacada: true },
    { clave: "trabajador", etiqueta: "Deducted from the employee", formato: "moneda" },
    { clave: "empleador", etiqueta: "Paid by the employer", formato: "moneda" },
    { clave: "iicf", etiqueta: "Industrial injuries fund (employer)", formato: "moneda" },
    { clave: "totalEmpleador", etiqueta: "Total cost for the employer", formato: "moneda" },
    { clave: "remitir", etiqueta: "Total to remit to the SSHFC", formato: "moneda" },
  ],
});
