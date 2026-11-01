import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.nssf-contribution",
  mercado: "kh",
  concepto: "aportes-seguridad-social",
  slug: "nssf-contribution",
  estado: "borrador",
  requiere: {
    "kh.nssf-pension-employee": "numero",
    "kh.nssf-pension-employer": "numero",
    "kh.nssf-health-employer": "numero",
    "kh.nssf-risk-employer": "numero",
    "kh.nssf-wage-ceiling": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "ប្រាក់ឈ្នួលប្រចាំខែ (រៀល)", min: 0, porDefecto: 1000000 }],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ឈ្នួល។", "salario");
    const base = Math.min(e.salario, v["kh.nssf-wage-ceiling"]);
    const empleado = redondear(porcentaje(base, v["kh.nssf-pension-employee"]));
    const empleador = redondear(porcentaje(base, v["kh.nssf-pension-employer"] + v["kh.nssf-health-employer"] + v["kh.nssf-risk-employer"]));
    return { empleado, empleador, total: redondear(empleado + empleador) };
  },
  resultado: [
    { clave: "empleado", etiqueta: "ផ្នែកនិយោជិត", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "ផ្នែកនិយោជក", formato: "moneda" },
    { clave: "total", etiqueta: "សរុប", formato: "moneda" },
  ],
});
