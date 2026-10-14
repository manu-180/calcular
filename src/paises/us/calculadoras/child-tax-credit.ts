import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { claveConjunta, estadoValido, OPCIONES_ESTADO_CIVIL } from "../lib/impuestos";

export default definirCalculadora({
  id: "us.child-tax-credit",
  mercado: "us",
  concepto: "propio",
  slug: "child-tax-credit",
  estado: "publicado",
  requiere: {
    "us.ctc-amount": "numero",
    "us.actc-max": "numero",
    "us.odc-amount": "numero",
    "us.ctc-threshold": "mapa",
    "us.ctc-phaseout-rate": "numero",
    "us.actc-earned-income-floor": "numero",
    "us.actc-rate": "numero",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "mfj" },
    { id: "ninos", tipo: "entero", etiqueta: "Qualifying children under 17", min: 0, max: 20, porDefecto: 2 },
    { id: "otros", tipo: "entero", etiqueta: "Other dependents", min: 0, max: 20, porDefecto: 0, ayuda: "Children 17 or older and other relatives you support." },
    { id: "magi", tipo: "moneda", etiqueta: "Modified adjusted gross income (MAGI)", min: 0, porDefecto: 80000 },
    { id: "impuesto", tipo: "moneda", etiqueta: "Federal income tax before credits", min: 0, porDefecto: 3000, ayuda: "Our federal income tax calculator gives you this number." },
    { id: "ganado", tipo: "moneda", etiqueta: "Earned income (wages and self-employment)", min: 0, porDefecto: 80000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const maximo = entrada.ninos * valores["us.ctc-amount"] + entrada.otros * valores["us.odc-amount"];
    // Schedule 8812, línea 10: el exceso sobre el umbral sube al múltiplo de 1000 siguiente.
    const exceso = Math.ceil(Math.max(0, entrada.magi - enMapa(valores["us.ctc-threshold"], claveConjunta(estado))) / 1000) * 1000;
    const reduccion = porcentaje(exceso, valores["us.ctc-phaseout-rate"]);
    const credito = Math.max(0, maximo - reduccion);
    const noReembolsable = Math.min(credito, entrada.impuesto);
    const porIngreso = Math.max(0, porcentaje(entrada.ganado - valores["us.actc-earned-income-floor"], valores["us.actc-rate"]));
    const reembolsable = Math.min(credito - noReembolsable, entrada.ninos * valores["us.actc-max"], porIngreso);
    return {
      maximo,
      reduccion: redondear(reduccion),
      credito: redondear(credito),
      noReembolsable: redondear(noReembolsable),
      reembolsable: redondear(reembolsable),
      total: redondear(noReembolsable + reembolsable),
      observaciones: [
        "Each child needs a Social Security number valid for work, and you or your spouse need one too.",
        "With three or more children, a second method based on Social Security taxes can raise the refundable part. Schedule 8812 walks you through it.",
      ],
    };
  },
  resultado: [
    { clave: "maximo", etiqueta: "Credit before the income limit", formato: "moneda" },
    { clave: "reduccion", etiqueta: "Reduction for income over the threshold", formato: "moneda", ocultarSiCero: true },
    { clave: "credito", etiqueta: "Credit after the income limit", formato: "moneda" },
    { clave: "noReembolsable", etiqueta: "Used to cut your tax", formato: "moneda" },
    { clave: "reembolsable", etiqueta: "Refundable additional child tax credit", formato: "moneda" },
    { clave: "total", etiqueta: "Total benefit from the credit", formato: "moneda", destacada: true },
  ],
});
