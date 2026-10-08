import { aplicarEscalaMarginal, definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.sueldo-neto",
  mercado: "pe",
  concepto: "sueldo-neto",
  slug: "sueldo-neto",
  estado: "publicado",
  requiere: {
    "pe.uit": "numero",
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
    "pe.escala-renta-trabajo": "escala",
    "pe.deduccion-renta-trabajo": "numero",
    "pe.aporte-onp": "numero",
    "pe.aporte-afp": "numero",
    "pe.prima-seguro-afp": "numero",
    "pe.comision-afp": "mapa",
    "pe.comision-mixta-flujo": "numero",
    "pe.rma-afp": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual bruto", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "sistema",
      tipo: "opcion",
      etiqueta: "Sistema de pensiones",
      opciones: [
        { valor: "afp", etiqueta: "AFP (sistema privado)" },
        { valor: "onp", etiqueta: "ONP (sistema nacional)" },
      ],
      porDefecto: "afp",
    },
    { id: "afp", tipo: "opcion-dato", etiqueta: "Tu AFP", dato: "pe.comision-afp", porDefecto: "habitat" },
    {
      id: "esquema",
      tipo: "opcion",
      etiqueta: "Tipo de comisión de tu AFP",
      ayuda: "Si entraste a la AFP desde 2013 o no elegiste nada, tienes comisión sobre el saldo.",
      opciones: [
        { valor: "saldo", etiqueta: "Sobre el saldo (mixta)" },
        { valor: "flujo", etiqueta: "Sobre el sueldo (flujo)" },
      ],
      porDefecto: "saldo",
    },
    {
      id: "gratificaciones",
      tipo: "opcion",
      etiqueta: "Gratificaciones de julio y diciembre",
      opciones: [
        { valor: "completas", etiqueta: "Sí, un sueldo cada una" },
        { valor: "medias", etiqueta: "Sí, medio sueldo cada una (pequeña empresa)" },
        { valor: "ninguna", etiqueta: "No recibo gratificaciones" },
      ],
      porDefecto: "completas",
    },
    { id: "seguro", tipo: "opcion-dato", etiqueta: "Tu seguro de salud", dato: "pe.bonificacion-extraordinaria", porDefecto: "essalud" },
  ],
  calcular(entrada, valores, { redondear }) {
    const uit = valores["pe.uit"];
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const bruto = redondear(entrada.sueldo + asignacion);
    const esAfp = entrada.sistema === "afp";
    const onp = esAfp ? 0 : redondear(porcentaje(bruto, valores["pe.aporte-onp"]));
    const aporteAfp = esAfp ? redondear(porcentaje(bruto, valores["pe.aporte-afp"])) : 0;
    const primaSeguro = esAfp ? redondear(porcentaje(Math.min(bruto, valores["pe.rma-afp"]), valores["pe.prima-seguro-afp"])) : 0;
    const tasaComision = entrada.esquema === "flujo" ? enMapa(valores["pe.comision-afp"], entrada.afp) : valores["pe.comision-mixta-flujo"];
    const comision = esAfp ? redondear(porcentaje(bruto, tasaComision)) : 0;
    const pension = redondear(onp + aporteAfp + primaSeguro + comision);

    const sueldosPorGrati = entrada.gratificaciones === "completas" ? 2 : entrada.gratificaciones === "medias" ? 1 : 0;
    const gratificaciones = redondear(bruto * sueldosPorGrati);
    const bonificacion = redondear(porcentaje(gratificaciones, enMapa(valores["pe.bonificacion-extraordinaria"], entrada.seguro)));
    const anual = redondear(bruto * 12 + gratificaciones + bonificacion);
    const neta = Math.max(0, redondear(anual - valores["pe.deduccion-renta-trabajo"] * uit));
    const escala = valores["pe.escala-renta-trabajo"].map((f) => ({ ...f, desde: f.desde * uit, hasta: f.hasta === null ? null : f.hasta * uit }));
    const quinta = redondear(redondear(aplicarEscalaMarginal(escala, neta)) / 12);

    const observaciones: string[] = [];
    if (esAfp && bruto > valores["pe.rma-afp"]) observaciones.push("La prima de seguro de la AFP se cobra solo hasta la remuneración máxima asegurable.");
    if (esAfp && entrada.esquema === "saldo") observaciones.push("Con comisión sobre el saldo, la AFP no te descuenta comisión del sueldo: la cobra una vez al año sobre tu fondo.");
    observaciones.push("La retención de quinta es un promedio mensual: la empresa la ajusta en el año si cambian tus ingresos.");
    return { bruto, onp, aporteAfp, primaSeguro, comision, pension, quinta, neto: redondear(bruto - pension - quinta), observaciones };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Sueldo bruto", formato: "moneda" },
    { clave: "onp", etiqueta: "Aporte a la ONP", formato: "moneda", ocultarSiCero: true },
    { clave: "aporteAfp", etiqueta: "Aporte a tu fondo AFP", formato: "moneda", ocultarSiCero: true },
    { clave: "primaSeguro", etiqueta: "Prima de seguro AFP", formato: "moneda", ocultarSiCero: true },
    { clave: "comision", etiqueta: "Comisión de la AFP", formato: "moneda", ocultarSiCero: true },
    { clave: "pension", etiqueta: "Total de descuento de pensión", formato: "moneda" },
    { clave: "quinta", etiqueta: "Retención de quinta categoría", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Sueldo neto", formato: "moneda", destacada: true },
  ],
});
