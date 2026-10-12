import { aplicarEscala, definirCalculadora } from "@/motor/calculo";
import { deduccionEducativa } from "../lib/isr";
import { aportesTrabajador } from "../lib/tss";

export default definirCalculadora({
  id: "do.gastos-educativos",
  mercado: "do",
  concepto: "propio",
  slug: "gastos-educativos",
  estado: "publicado",
  requiere: {
    "do.sfs-trabajador": "numero",
    "do.afp-trabajador": "numero",
    "do.tope-sfs": "numero",
    "do.tope-afp": "numero",
    "do.isr-asalariados": "escala",
    "do.gastos-educativos-tope-ingreso": "numero",
    "do.gastos-educativos-tope-exento": "numero",
    "do.gastos-educativos-tope-discapacidad": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    {
      id: "gastos",
      tipo: "moneda",
      etiqueta: "Gastos educativos del año",
      ayuda: "Lo que pagaste a colegios, universidades u otros centros educativos, facturado con comprobante fiscal válido para crédito fiscal.",
      min: 0,
    },
    { id: "discapacidad", tipo: "si-no", etiqueta: "Los gastos son de una persona con discapacidad o trastorno del neurodesarrollo", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const escala = valores["do.isr-asalariados"];
    const { sfs, afp } = aportesTrabajador(
      entrada.salario,
      { sfs: valores["do.sfs-trabajador"], afp: valores["do.afp-trabajador"], topeSfs: valores["do.tope-sfs"], topeAfp: valores["do.tope-afp"] },
      redondear,
    );
    const ingresoAnual = redondear((entrada.salario - sfs - afp) * 12);
    const deduccion = redondear(
      deduccionEducativa(entrada.gastos, ingresoAnual, entrada.discapacidad, escala, {
        topeIngreso: valores["do.gastos-educativos-tope-ingreso"],
        topeExento: valores["do.gastos-educativos-tope-exento"],
        topeDiscapacidad: valores["do.gastos-educativos-tope-discapacidad"],
      }),
    );
    const isrSin = redondear(aplicarEscala(escala, ingresoAnual));
    const isrCon = redondear(aplicarEscala(escala, ingresoAnual - deduccion));
    const observaciones: string[] = [];
    if (isrSin === 0) observaciones.push("Tu salario queda dentro del monto exento: no pagas ISR, así que no hay nada que devolver.");
    else if (deduccion < entrada.gastos) observaciones.push("Tus gastos pasan el tope de la deducción: solo se descuenta hasta el tope.");
    observaciones.push("La devolución se pide en la declaración del año. Si eres asalariado, tu empleador te la compensa en los meses siguientes.");
    return { ingresoAnual, deduccion, isrSin, isrCon, ahorro: redondear(isrSin - isrCon), observaciones };
  },
  resultado: [
    { clave: "ingresoAnual", etiqueta: "Ingreso anual sujeto a ISR", formato: "moneda" },
    { clave: "deduccion", etiqueta: "Gastos educativos que puedes deducir", formato: "moneda" },
    { clave: "isrSin", etiqueta: "ISR del año sin la deducción", formato: "moneda" },
    { clave: "isrCon", etiqueta: "ISR del año con la deducción", formato: "moneda" },
    { clave: "ahorro", etiqueta: "Lo que te devuelven o te ahorras", formato: "moneda", destacada: true },
  ],
});
