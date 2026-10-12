import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const MESES = 12;

function cuotaFija(monto: number, tasaAnual: number, plazo: number): number {
  const r = tasaAnual / 100 / MESES;
  if (r === 0) return monto / plazo;
  return (monto * r) / (1 - (1 + r) ** -plazo);
}

export default definirCalculadora({
  id: "pa.prestamo-personal",
  mercado: "pa",
  concepto: "propio",
  slug: "prestamo-personal",
  estado: "publicado",
  requiere: {
    "pa.feci": "numero",
    "pa.feci-monto-minimo": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del préstamo", min: 0 },
    {
      id: "tasa",
      tipo: "porcentaje",
      etiqueta: "Tasa de interés anual del banco",
      ayuda: "La tasa nominal anual de tu oferta, sin el FECI.",
      min: 0,
      max: 60,
    },
    { id: "plazo", tipo: "entero", etiqueta: "Plazo en meses", min: 1, max: 480, porDefecto: 60 },
    {
      id: "aplicaFeci",
      tipo: "si-no",
      etiqueta: "El préstamo paga FECI",
      ayuda: "Lo pagan los préstamos personales y comerciales locales. No lo pagan, por ejemplo, los préstamos garantizados con depósitos en el mismo banco.",
      porDefecto: true,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { monto, tasa, plazo } = entrada;
    if (plazo < 1) throw new ErrorEntrada("El plazo tiene que ser de al menos un mes.", "plazo");
    const minimo = valores["pa.feci-monto-minimo"];
    const feci = entrada.aplicaFeci && monto > minimo ? valores["pa.feci"] : 0;
    const cuota = cuotaFija(monto, tasa + feci, plazo);
    const cuotaSinFeci = cuotaFija(monto, tasa, plazo);
    const totalPagado = cuota * plazo;
    const observaciones: string[] = [];
    if (entrada.aplicaFeci && monto <= minimo) observaciones.push(`Los préstamos de hasta B/. ${minimo.toLocaleString("en-US")} no pagan FECI.`);
    observaciones.push("La cuota no incluye seguros ni comisiones del banco. Pide la tabla de amortización para ver el costo total.");
    return {
      tasaTotal: tasa + feci,
      cuota: redondear(cuota),
      cuotaSinFeci: redondear(cuotaSinFeci),
      feciTotal: redondear((cuota - cuotaSinFeci) * plazo),
      intereses: redondear(totalPagado - monto),
      totalPagado: redondear(totalPagado),
      observaciones,
    };
  },
  resultado: [
    { clave: "tasaTotal", etiqueta: "Tasa anual con FECI", formato: "porcentaje" },
    { clave: "cuota", etiqueta: "Cuota mensual", formato: "moneda", destacada: true },
    { clave: "cuotaSinFeci", etiqueta: "Cuota sin el FECI", formato: "moneda" },
    { clave: "feciTotal", etiqueta: "Lo que pagas de FECI en todo el préstamo", formato: "moneda", ocultarSiCero: true },
    { clave: "intereses", etiqueta: "Intereses y FECI en total", formato: "moneda" },
    { clave: "totalPagado", etiqueta: "Total a pagar", formato: "moneda" },
  ],
});
