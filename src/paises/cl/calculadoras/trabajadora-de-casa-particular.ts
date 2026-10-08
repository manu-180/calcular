import { aplicarEscala, definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.trabajadora-de-casa-particular",
  mercado: "cl",
  concepto: "trabajo-domestico",
  slug: "trabajadora-de-casa-particular",
  estado: "publicado",
  requiere: {
    "cl.imm": "numero",
    "cl.cotizacion-afp": "numero",
    "cl.comision-afp": "mapa",
    "cl.salud": "numero",
    "cl.tope-imponible": "numero",
    "cl.tope-imponible-cesantia": "numero",
    "cl.impuesto-unico": "escala",
    "cl.cesantia-empleador": "mapa",
    "cl.indemnizacion-casa-particular": "numero",
    "cl.cotizacion-empleador-pensiones": "numero",
    "cl.accidentes-basica": "numero",
    "cl.sanna": "numero",
    "cl.uf": "serie",
    "cl.utm": "serie",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Sueldo bruto mensual",
      ayuda: "Lo que acordaron en el contrato, antes de descuentos. La comida y la habitación no se cuentan como sueldo.",
      min: 0,
    },
    { id: "afp", tipo: "opcion-dato", etiqueta: "AFP de la trabajadora", dato: "cl.comision-afp" },
    { id: "jornadaCompleta", tipo: "si-no", etiqueta: "Trabaja jornada completa", porDefecto: true },
    {
      id: "masDeOnceAnios",
      tipo: "si-no",
      etiqueta: "Lleva más de 11 años contigo",
      ayuda: "El aporte para la indemnización a todo evento se paga solo durante los primeros 11 años.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const uf = valores["cl.uf"].valor;
    const utm = valores["cl.utm"].valor;
    const tope = redondear(valores["cl.tope-imponible"] * uf);
    const topeCesantia = redondear(valores["cl.tope-imponible-cesantia"] * uf);
    const base = Math.min(entrada.sueldo, tope);

    const afp = redondear(porcentaje(base, valores["cl.cotizacion-afp"] + enMapa(valores["cl.comision-afp"], entrada.afp)));
    const salud = redondear(porcentaje(base, valores["cl.salud"]));
    const tributable = Math.max(0, entrada.sueldo - afp - salud);
    const impuesto = redondear(aplicarEscala(valores["cl.impuesto-unico"], tributable / utm) * utm);
    const descuentos = afp + salud + impuesto;

    const cesantia = redondear(porcentaje(Math.min(entrada.sueldo, topeCesantia), enMapa(valores["cl.cesantia-empleador"], "casa-particular")));
    const indemnizacion = entrada.masDeOnceAnios ? 0 : redondear(porcentaje(base, valores["cl.indemnizacion-casa-particular"]));
    const pensiones = redondear(porcentaje(base, valores["cl.cotizacion-empleador-pensiones"]));
    const accidentes = redondear(porcentaje(base, valores["cl.accidentes-basica"] + valores["cl.sanna"]));
    const aportesEmpleador = cesantia + indemnizacion + pensiones + accidentes;

    const observaciones: string[] = [];
    if (entrada.jornadaCompleta && entrada.sueldo < valores["cl.imm"]) {
      observaciones.push("Con jornada completa el sueldo no puede ser menor que el ingreso mínimo mensual. Si la jornada es parcial, el mínimo es proporcional a las horas.");
    }
    if (entrada.sueldo > tope) observaciones.push("El sueldo pasa el tope imponible: las cotizaciones se calculan solo hasta ese tope.");

    return {
      sueldo: entrada.sueldo,
      afp,
      salud,
      impuesto,
      liquido: entrada.sueldo - descuentos,
      cesantia,
      indemnizacion,
      pensiones,
      accidentes,
      aportesEmpleador,
      costoTotal: entrada.sueldo + aportesEmpleador,
      minimo: valores["cl.imm"],
      observaciones,
    };
  },
  resultado: [
    { clave: "liquido", etiqueta: "Sueldo líquido que recibe", formato: "moneda", destacada: true },
    { clave: "costoTotal", etiqueta: "Costo total para ti", formato: "moneda", destacada: true },
    { clave: "sueldo", etiqueta: "Sueldo bruto", formato: "moneda" },
    { clave: "afp", etiqueta: "Descuento AFP (cotización y comisión)", formato: "moneda" },
    { clave: "salud", etiqueta: "Descuento de salud", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto único", formato: "moneda", ocultarSiCero: true },
    { clave: "cesantia", etiqueta: "Seguro de cesantía (lo pagas tú)", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización a todo evento (lo pagas tú)", formato: "moneda", ocultarSiCero: true },
    { clave: "pensiones", etiqueta: "Cotización del empleador para pensiones", formato: "moneda" },
    { clave: "accidentes", etiqueta: "Seguro de accidentes y Ley SANNA", formato: "moneda" },
    { clave: "aportesEmpleador", etiqueta: "Total de aportes del empleador", formato: "moneda" },
    { clave: "minimo", etiqueta: "Ingreso mínimo mensual", formato: "moneda" },
  ],
});
