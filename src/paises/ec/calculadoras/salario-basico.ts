import { definirCalculadora, porcentaje } from "@/motor/calculo";

// El sueldo mensual paga treinta días, descanso semanal incluido (Código del Trabajo, art. 53): por
// eso el día es la treintava parte y la hora sale de dividir el día para la jornada diaria (art. 47).
const DIAS_DEL_MES = 30;

export default definirCalculadora({
  id: "ec.salario-basico",
  mercado: "ec",
  concepto: "salario-minimo",
  slug: "salario-basico",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.aporte-personal-iess": "numero",
    "ec.jornada-diaria": "numero",
  },
  campos: [
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días trabajados en el mes",
      ayuda: "Si trabajaste el mes completo, deja 30.",
      min: 1,
      max: 30,
      porDefecto: 30,
    },
    {
      id: "decimos",
      tipo: "si-no",
      etiqueta: "Cobras los décimos cada mes",
      porDefecto: true,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const sbu = valores["ec.sbu"];
    const sueldo = redondear((sbu * entrada.dias) / DIAS_DEL_MES);
    const aporte = redondear(porcentaje(sueldo, valores["ec.aporte-personal-iess"]));
    const decimoTercero = entrada.decimos ? redondear(sueldo / 12) : 0;
    const decimoCuarto = entrada.decimos ? redondear((sbu / 12) * (entrada.dias / DIAS_DEL_MES)) : 0;
    return {
      sbu,
      sueldo,
      dia: redondear(sbu / DIAS_DEL_MES),
      hora: redondear(sbu / DIAS_DEL_MES / valores["ec.jornada-diaria"]),
      aporte,
      decimoTercero,
      decimoCuarto,
      neto: redondear(sueldo - aporte + decimoTercero + decimoCuarto),
    };
  },
  resultado: [
    { clave: "sbu", etiqueta: "Salario básico mensual", formato: "moneda" },
    { clave: "dia", etiqueta: "Valor del día", formato: "moneda" },
    { clave: "hora", etiqueta: "Valor de la hora", formato: "moneda" },
    { clave: "sueldo", etiqueta: "Sueldo del mes", formato: "moneda" },
    { clave: "aporte", etiqueta: "Aporte personal al IESS", formato: "moneda" },
    { clave: "decimoTercero", etiqueta: "Décimo tercero mensual", formato: "moneda", ocultarSiCero: true },
    { clave: "decimoCuarto", etiqueta: "Décimo cuarto mensual", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Lo que recibes en el mes", formato: "moneda", destacada: true },
  ],
});
