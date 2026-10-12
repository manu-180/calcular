import { definirCalculadora } from "@/motor/calculo";
import liquidacionPorEgreso from "./liquidacion-por-egreso";

export default definirCalculadora({
  id: "uy.renuncia",
  mercado: "uy",
  concepto: "propio",
  slug: "renuncia",
  estado: "publicado",
  requiere: liquidacionPorEgreso.requiere,
  campos: [
    { id: "nominal", tipo: "moneda", etiqueta: "Sueldo nominal mensual", ayuda: "Si cobrás horas extra o comisiones, sumá el promedio mensual del último año.", min: 0 },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "egreso", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "licenciaPendiente",
      tipo: "entero",
      etiqueta: "Días de licencia de años anteriores sin gozar",
      ayuda: "Si no te quedó licencia pendiente, dejá 0.",
      min: 0,
      max: 120,
      porDefecto: 0,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos menores de 18 a tu cargo", min: 0, max: 15, porDefecto: 0 },
    { id: "conyuge", tipo: "si-no", etiqueta: "Tenés cónyuge o concubino a cargo en el Fonasa", porDefecto: false },
  ],
  calcular(entrada, valores, contexto) {
    // La renuncia es la liquidación por egreso sin indemnización: se reusa el mismo cálculo.
    const r = liquidacionPorEgreso.calcular({ ...entrada, motivo: "renuncia" }, valores, contexto);
    return {
      aguinaldo: r.aguinaldo,
      diasLicencia: r.diasLicencia,
      licencia: r.licencia,
      salarioVacacional: r.salarioVacacional,
      total: r.total,
      observaciones: [
        "Si renunciás no cobrás indemnización por despido ni seguro de paro. Lo demás se cobra igual.",
        "Los montos son nominales: sobre el aguinaldo y la licencia se descuentan aportes e IRPF.",
      ],
    };
  },
  resultado: [
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "diasLicencia", etiqueta: "Días de licencia a pagar", formato: "dias" },
    { clave: "licencia", etiqueta: "Licencia no gozada", formato: "moneda" },
    { clave: "salarioVacacional", etiqueta: "Salario vacacional", formato: "moneda" },
    { clave: "total", etiqueta: "Total que cobrás al renunciar", formato: "moneda", destacada: true },
  ],
});
