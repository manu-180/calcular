import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

const DIAS_DEL_MES = 30;
const DIAS_POR_SEMANA = 7;

// Art. 309 del Código: el patrono debe el 75 % del salario básico durante la licencia y puede restar lo
// que pague el ISSS. Cuando el salario pasa el techo del ISSS, el subsidio del Seguro no llega a ese 75 %
// y el patrono completa la diferencia.
export default definirCalculadora({
  id: "sv.licencia-por-maternidad",
  mercado: "sv",
  concepto: "propio",
  slug: "licencia-por-maternidad",
  estado: "publicado",
  requiere: {
    "sv.maternidad-dias": "numero",
    "sv.maternidad-semanas-posparto": "numero",
    "sv.maternidad-subsidio-isss": "numero",
    "sv.maternidad-patrono-porcentaje": "numero",
    "sv.isss-salario-maximo": "numero",
    "sv.afp-trabajador": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Fecha probable del parto" },
    {
      id: "semanasAntes",
      tipo: "entero",
      etiqueta: "Semanas de licencia antes del parto",
      ayuda: "Las semanas que no use antes se suman después del parto.",
      min: 0,
      max: 6,
      porDefecto: 4,
    },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "cotizaIsss", tipo: "si-no", etiqueta: "Cotiza al ISSS", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const dias = valores["sv.maternidad-dias"];
    const maximoAntes = dias / DIAS_POR_SEMANA - valores["sv.maternidad-semanas-posparto"];
    if (entrada.semanasAntes > maximoAntes) {
      throw new ErrorEntrada(`Puede tomar como máximo ${maximoAntes} semanas antes del parto.`, "semanasAntes");
    }
    const inicio = sumarDias(entrada.parto, -entrada.semanasAntes * DIAS_POR_SEMANA);
    const fin = sumarDias(inicio, dias - 1);
    const diario = entrada.salario / DIAS_DEL_MES;
    const obligacionPatrono = porcentaje(diario * dias, valores["sv.maternidad-patrono-porcentaje"]);
    const isss = entrada.cotizaIsss
      ? redondear(porcentaje((Math.min(entrada.salario, valores["sv.isss-salario-maximo"]) / DIAS_DEL_MES) * dias, valores["sv.maternidad-subsidio-isss"]))
      : 0;
    const patrono = redondear(Math.max(0, obligacionPatrono - isss));
    const afp = redondear(porcentaje(isss, valores["sv.afp-trabajador"]));
    const observaciones: string[] = [];
    if (!entrada.cotizaIsss) observaciones.push("Sin ISSS, su patrono le paga la prestación por adelantado, antes de que empiece la licencia.");
    if (patrono > 0 && entrada.cotizaIsss) observaciones.push("Como su salario pasa el techo del ISSS, su patrono completa la diferencia hasta el 75 % de su salario.");
    if (afp > 0) observaciones.push("Del subsidio del ISSS se descuenta su cotización a la AFP.");
    return {
      inicio,
      fin,
      regreso: sumarDias(fin, 1),
      isss,
      patrono,
      afp,
      total: redondear(isss + patrono - afp),
      observaciones,
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Empieza la licencia", formato: "fecha" },
    { clave: "fin", etiqueta: "Último día de licencia", formato: "fecha" },
    { clave: "regreso", etiqueta: "Vuelve a trabajar", formato: "fecha" },
    { clave: "isss", etiqueta: "Subsidio del ISSS", formato: "moneda", ocultarSiCero: true },
    { clave: "patrono", etiqueta: "Pago de su patrono", formato: "moneda", ocultarSiCero: true },
    { clave: "afp", etiqueta: "Descuento de AFP", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total que recibe en la licencia", formato: "moneda", destacada: true },
  ],
});
