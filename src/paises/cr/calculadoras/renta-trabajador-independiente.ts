import { aplicarEscalaMarginal, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.renta-trabajador-independiente",
  mercado: "cr",
  concepto: "retencion-honorarios",
  slug: "renta-trabajador-independiente",
  estado: "publicado",
  requiere: {
    "cr.renta-independiente": "escala",
    "cr.impuesto-salario": "escala",
    "cr.credito-hijo-anual": "numero",
    "cr.credito-conyuge-anual": "numero",
  },
  campos: [
    {
      id: "rentaNeta",
      tipo: "moneda",
      etiqueta: "Renta neta del año",
      ayuda: "Sus ingresos de la actividad menos los gastos deducibles.",
      min: 0,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos que declara para el crédito fiscal", min: 0, max: 20, porDefecto: 0 },
    { id: "conyuge", tipo: "si-no", etiqueta: "Declara el crédito por cónyuge", porDefecto: false },
    {
      id: "salarioAnual",
      tipo: "moneda",
      etiqueta: "Salarios o pensión recibidos en el año, si también los tiene",
      ayuda: "Déjelo vacío si solo tiene la actividad por cuenta propia.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    // Art. 15 c de la Ley 7092: quien también tiene salario o pensión resta del tramo exento de la
    // actividad la parte exenta que ya usó en el impuesto al salario (12 meses del tramo mensual exento).
    const [exentoFila, ...resto] = valores["cr.renta-independiente"];
    const exentoSalarioAnual = (valores["cr.impuesto-salario"][0]?.hasta ?? 0) * 12;
    const usadoEnSalario = Math.min(entrada.salarioAnual ?? 0, exentoSalarioAnual);
    const exento = Math.max(0, (exentoFila.hasta ?? 0) - usadoEnSalario);
    const escala = [{ ...exentoFila, hasta: exento }, { ...resto[0], desde: exento }, ...resto.slice(1)];
    const segunTramos = redondear(aplicarEscalaMarginal(escala, entrada.rentaNeta));
    const creditos = entrada.hijos * valores["cr.credito-hijo-anual"] + (entrada.conyuge ? valores["cr.credito-conyuge-anual"] : 0);
    const impuesto = Math.max(0, redondear(segunTramos - creditos));
    return {
      segunTramos,
      creditos: Math.min(creditos, segunTramos),
      impuesto,
      tasaEfectiva: entrada.rentaNeta > 0 ? redondear((impuesto / entrada.rentaNeta) * 100) : 0,
      tramoExento: exento,
      observaciones:
        usadoEnSalario > 0
          ? ["Como también tiene salario o pensión, el tramo exento de la actividad se reduce por la parte exenta que ya usó en su salario."]
          : [],
    };
  },
  resultado: [
    { clave: "tramoExento", etiqueta: "Renta exenta que le corresponde", formato: "moneda" },
    { clave: "segunTramos", etiqueta: "Impuesto según los tramos", formato: "moneda" },
    { clave: "creditos", etiqueta: "Créditos por hijos y cónyuge", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Impuesto sobre la renta del año", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre su renta neta", formato: "porcentaje" },
  ],
});
