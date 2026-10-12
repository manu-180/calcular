import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.afp-o-onp",
  mercado: "pe",
  concepto: "aportes-seguridad-social",
  slug: "afp-o-onp",
  estado: "publicado",
  requiere: {
    "pe.aporte-onp": "numero",
    "pe.aporte-afp": "numero",
    "pe.prima-seguro-afp": "numero",
    "pe.comision-afp": "mapa",
    "pe.comision-mixta-flujo": "numero",
    "pe.rma-afp": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual bruto", ayuda: "Con la asignación familiar si la cobras.", min: 0 },
    { id: "afp", tipo: "opcion-dato", etiqueta: "AFP que quieres comparar", dato: "pe.comision-afp", porDefecto: "habitat" },
    {
      id: "esquema",
      tipo: "opcion",
      etiqueta: "Tipo de comisión de la AFP",
      ayuda: "Si entraste a la AFP desde 2013 o no elegiste nada, tienes comisión sobre el saldo.",
      opciones: [
        { valor: "saldo", etiqueta: "Sobre el saldo (mixta)" },
        { valor: "flujo", etiqueta: "Sobre el sueldo (flujo)" },
      ],
      porDefecto: "saldo",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const sueldo = entrada.sueldo;
    const onp = redondear(porcentaje(sueldo, valores["pe.aporte-onp"]));
    const aporteFondo = redondear(porcentaje(sueldo, valores["pe.aporte-afp"]));
    const prima = redondear(porcentaje(Math.min(sueldo, valores["pe.rma-afp"]), valores["pe.prima-seguro-afp"]));
    const tasaComision = entrada.esquema === "flujo" ? enMapa(valores["pe.comision-afp"], entrada.afp) : valores["pe.comision-mixta-flujo"];
    const comision = redondear(porcentaje(sueldo, tasaComision));
    const afp = redondear(aporteFondo + prima + comision);
    const diferencia = redondear(onp - afp);
    const observaciones: string[] = [];
    if (sueldo > valores["pe.rma-afp"]) observaciones.push("La prima de seguro de la AFP se cobra solo hasta la remuneración máxima asegurable.");
    if (entrada.esquema === "saldo") observaciones.push("Con comisión sobre el saldo, la AFP no descuenta comisión del sueldo: la cobra cada año sobre lo que tienes en tu fondo.");
    observaciones.push("En la AFP el aporte va a una cuenta a tu nombre. En la ONP va a un fondo común y para jubilarte necesitas un mínimo de años de aportes.");
    return {
      onp,
      aporteFondo,
      prima,
      comision,
      afp,
      diferencia,
      conviene: diferencia > 0 ? "Este mes la AFP te descuenta menos" : diferencia < 0 ? "Este mes la ONP te descuenta menos" : "Te descuentan lo mismo",
      observaciones,
    };
  },
  resultado: [
    { clave: "onp", etiqueta: "Descuento en la ONP", formato: "moneda" },
    { clave: "afp", etiqueta: "Descuento total en la AFP", formato: "moneda" },
    { clave: "aporteFondo", etiqueta: "De eso, aporte a tu fondo AFP", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima de seguro AFP", formato: "moneda" },
    { clave: "comision", etiqueta: "Comisión AFP sobre el sueldo", formato: "moneda", ocultarSiCero: true },
    { clave: "diferencia", etiqueta: "Diferencia mensual (ONP menos AFP)", formato: "moneda" },
    { clave: "conviene", etiqueta: "En el descuento del mes", formato: "texto", destacada: true },
  ],
});
