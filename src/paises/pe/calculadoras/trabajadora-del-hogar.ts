import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.trabajadora-del-hogar",
  mercado: "pe",
  concepto: "trabajo-domestico",
  slug: "trabajadora-del-hogar",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.aporte-essalud": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
    "pe.aporte-onp": "numero",
    "pe.aporte-afp": "numero",
    "pe.prima-seguro-afp": "numero",
    "pe.comision-afp": "mapa",
    "pe.comision-mixta-flujo": "numero",
    "pe.rma-afp": "numero",
    "pe.vacaciones-hogar": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Remuneración mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Horas de trabajo por semana",
      ayuda: "24 horas a la semana equivalen a 4 horas diarias en promedio.",
      opciones: [
        { valor: "completo", etiqueta: "24 horas o más (tiempo completo)" },
        { valor: "parcial", etiqueta: "Menos de 24 horas (tiempo parcial)" },
      ],
      porDefecto: "completo",
    },
    { id: "seguro", tipo: "opcion-dato", etiqueta: "Seguro de salud", dato: "pe.bonificacion-extraordinaria", porDefecto: "essalud" },
    {
      id: "sistema",
      tipo: "opcion",
      etiqueta: "Sistema de pensiones",
      opciones: [
        { valor: "onp", etiqueta: "ONP (sistema nacional)" },
        { valor: "afp", etiqueta: "AFP (sistema privado)" },
      ],
      porDefecto: "onp",
    },
    { id: "afp", tipo: "opcion-dato", etiqueta: "AFP", dato: "pe.comision-afp", porDefecto: "habitat", ayuda: "Solo si está en una AFP." },
    {
      id: "esquema",
      tipo: "opcion",
      etiqueta: "Tipo de comisión de la AFP",
      opciones: [
        { valor: "saldo", etiqueta: "Sobre el saldo (mixta)" },
        { valor: "flujo", etiqueta: "Sobre el sueldo (flujo)" },
      ],
      porDefecto: "saldo",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "sueldo");
    const completo = entrada.jornada === "completo";
    const sueldo = entrada.sueldo;

    const esAfp = entrada.sistema === "afp";
    const onp = esAfp ? 0 : redondear(porcentaje(sueldo, valores["pe.aporte-onp"]));
    const aporteAfp = esAfp ? redondear(porcentaje(sueldo, valores["pe.aporte-afp"])) : 0;
    const primaSeguro = esAfp ? redondear(porcentaje(Math.min(sueldo, valores["pe.rma-afp"]), valores["pe.prima-seguro-afp"])) : 0;
    const tasaComision = entrada.esquema === "flujo" ? enMapa(valores["pe.comision-afp"], entrada.afp) : valores["pe.comision-mixta-flujo"];
    const comision = esAfp ? redondear(porcentaje(sueldo, tasaComision)) : 0;
    const pension = redondear(onp + aporteAfp + primaSeguro + comision);

    const essalud = redondear(porcentaje(Math.max(sueldo, valores["pe.rmv"]), valores["pe.aporte-essalud"]));
    const gratificacion = sueldo;
    const bonificacion = redondear(porcentaje(gratificacion, enMapa(valores["pe.bonificacion-extraordinaria"], entrada.seguro)));
    const remuneracionComputable = sueldo + gratificacion / 6;
    const cts = completo ? redondear((remuneracionComputable * 6) / 12) : 0;
    const costoAnual = redondear(sueldo * 12 + essalud * 12 + (gratificacion + bonificacion) * 2 + cts * 2);

    const observaciones: string[] = [];
    if (completo && sueldo < valores["pe.rmv"]) {
      observaciones.push("Con jornada completa (8 horas diarias o 48 semanales) la remuneración no puede ser menor que la remuneración mínima vital. Si trabaja menos horas, el mínimo es proporcional.");
    }
    if (!completo) observaciones.push("Con menos de 24 horas a la semana no corresponde CTS.");
    if (sueldo < valores["pe.rmv"]) observaciones.push("Si la remuneración es igual o menor que la mínima vital, EsSalud se paga sobre la remuneración mínima vital.");
    if (esAfp && entrada.esquema === "saldo") observaciones.push("Con comisión sobre el saldo, la AFP no descuenta comisión de la remuneración.");

    return {
      sueldo,
      pension,
      neto: redondear(sueldo - pension),
      essalud,
      gratificacion,
      bonificacion,
      cts,
      vacaciones: enMapa(valores["pe.vacaciones-hogar"], entrada.jornada),
      costoMensual: redondear(costoAnual / 12),
      costoAnual,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Remuneración neta que recibe al mes", formato: "moneda", destacada: true },
    { clave: "costoMensual", etiqueta: "Costo mensual promedio para ti (con beneficios)", formato: "moneda", destacada: true },
    { clave: "pension", etiqueta: "Descuento de ONP o AFP", formato: "moneda" },
    { clave: "essalud", etiqueta: "Aporte mensual a EsSalud (lo pagas tú)", formato: "moneda" },
    { clave: "gratificacion", etiqueta: "Gratificación de julio y de diciembre (cada una)", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación extraordinaria (con cada gratificación)", formato: "moneda" },
    { clave: "cts", etiqueta: "CTS de mayo y de noviembre (cada depósito)", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Vacaciones pagadas al año", formato: "dias" },
    { clave: "costoAnual", etiqueta: "Costo total al año", formato: "moneda" },
  ],
});
