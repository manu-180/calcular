import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.feriados-pagos",
  mercado: "uy",
  concepto: "propio",
  slug: "feriados-pagos",
  estado: "publicado",
  requiere: {
    "uy.feriado-pago-factor": "numero",
    "uy.feriado-divisor-mensual": "numero",
  },
  campos: [
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Cómo cobrás",
      opciones: [
        { valor: "mensual", etiqueta: "Mensual" },
        { valor: "jornalero", etiqueta: "Por día (jornalero)" },
      ],
      porDefecto: "mensual",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Sueldo mensual o jornal", min: 0 },
    { id: "trabajados", tipo: "entero", etiqueta: "Feriados pagos que trabajaste", min: 0, max: 5, porDefecto: 1 },
    {
      id: "noTrabajados",
      tipo: "entero",
      etiqueta: "Feriados pagos que no trabajaste",
      ayuda: "Solo para jornaleros: igual se pagan.",
      min: 0,
      max: 5,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const factor = valores["uy.feriado-pago-factor"];
    if (entrada.modalidad === "mensual") {
      const dia = redondear(entrada.monto / valores["uy.feriado-divisor-mensual"]);
      const extra = redondear(dia * (factor - 1) * entrada.trabajados);
      return {
        dia,
        porTrabajados: extra,
        porNoTrabajados: null,
        total: extra,
        observaciones: ["Los feriados que no trabajás ya están pagos dentro de tu sueldo mensual. Si trabajás uno, cobrás el mes completo más un día."],
      };
    }
    const porTrabajados = redondear(entrada.monto * factor * entrada.trabajados);
    const porNoTrabajados = redondear(entrada.monto * entrada.noTrabajados);
    return {
      dia: entrada.monto,
      porTrabajados,
      porNoTrabajados,
      total: redondear(porTrabajados + porNoTrabajados),
      observaciones: ["Si sos jornalero, los feriados pagos se cobran aunque no los trabajes. Si los trabajás, cobrás doble jornal."],
    };
  },
  resultado: [
    { clave: "dia", etiqueta: "Valor del día", formato: "moneda" },
    { clave: "porTrabajados", etiqueta: "Por feriados trabajados", formato: "moneda", ayuda: "Mensuales: lo que se suma al sueldo. Jornaleros: el doble jornal." },
    { clave: "porNoTrabajados", etiqueta: "Por feriados no trabajados", formato: "moneda" },
    { clave: "total", etiqueta: "Total por feriados", formato: "moneda", destacada: true },
  ],
});
