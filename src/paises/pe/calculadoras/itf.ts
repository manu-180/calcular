import { definirCalculadora, porcentaje } from "@/motor/calculo";

// TUO de la Ley 28194, art. 13: el ITF se expresa con dos decimales suprimiendo el tercero, y el
// segundo decimal se ajusta a 0 si es menor que 5 o a 5 si es 5 o más. No es un redondeo común.
function redondeoItf(monto: number): number {
  const centavos = Math.floor(monto * 100 + 1e-9);
  return (Math.floor(centavos / 5) * 5) / 100;
}

export default definirCalculadora({
  id: "pe.itf",
  mercado: "pe",
  concepto: "propio",
  slug: "itf",
  estado: "publicado",
  requiere: {
    "pe.tasa-itf": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto de la operación", ayuda: "Depósito, retiro, transferencia o pago que pasa por un banco.", min: 0 },
    { id: "operaciones", tipo: "entero", etiqueta: "Cantidad de operaciones de ese monto", min: 1, max: 1000, porDefecto: 1 },
  ],
  calcular(entrada, valores) {
    const exacto = porcentaje(entrada.monto, valores["pe.tasa-itf"]);
    const porOperacion = redondeoItf(exacto);
    const observaciones: string[] = [];
    if (porOperacion === 0) observaciones.push("En operaciones chicas el ITF sale menos de 5 céntimos y se redondea a cero.");
    observaciones.push("Algunas operaciones están exoneradas, como los abonos y cargos en cuentas de sueldo y de CTS. Tu banco te lo detalla en el estado de cuenta.");
    return { exacto, porOperacion, total: Math.round(porOperacion * entrada.operaciones * 100) / 100, observaciones };
  },
  resultado: [
    { clave: "porOperacion", etiqueta: "ITF por operación", formato: "moneda", destacada: true },
    { clave: "exacto", etiqueta: "ITF sin redondear", formato: "moneda", decimales: 4 },
    { clave: "total", etiqueta: "ITF de todas las operaciones", formato: "moneda" },
  ],
});
