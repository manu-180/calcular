import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesTrabajador, retencionMensual } from "../reglas";

export default definirCalculadora({
  id: "co.retencion-en-la-fuente",
  mercado: "co",
  concepto: "impuesto-renta",
  slug: "retencion-en-la-fuente",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.salud-trabajador": "numero",
    "co.pension-cotizacion": "numero",
    "co.pension-parte-trabajador": "numero",
    "co.fsp": "escala",
    "co.tope-ibc": "numero",
    "co.uvt": "numero",
    "co.retencion-tabla": "escala",
    "co.renta-exenta-trabajo": "numero",
    "co.renta-exenta-trabajo-tope": "numero",
    "co.limite-beneficios": "numero",
    "co.limite-beneficios-tope": "numero",
    "co.deduccion-dependientes": "numero",
    "co.deduccion-dependientes-tope": "numero",
    "co.deduccion-salud-tope": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Pagos laborales del mes", ayuda: "Salario, horas extra, comisiones y bonificaciones del mes.", min: 0 },
    {
      id: "dependiente",
      tipo: "si-no",
      etiqueta: "Tienes personas a cargo (dependientes)",
      porDefecto: false,
    },
    {
      id: "salud",
      tipo: "moneda",
      etiqueta: "Pago mensual de medicina prepagada o seguro de salud",
      min: 0,
      porDefecto: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    const aportes = aportesTrabajador(
      entrada.salario,
      {
        smmlv: valores["co.smmlv"],
        saludTrabajador: valores["co.salud-trabajador"],
        pensionCotizacion: valores["co.pension-cotizacion"],
        pensionParteTrabajador: valores["co.pension-parte-trabajador"],
        fsp: valores["co.fsp"],
        topeIbc: valores["co.tope-ibc"],
      },
      redondear,
    );
    const noConstitutivos = redondear(aportes.salud + aportes.pension + aportes.fsp);
    const ret = retencionMensual(
      entrada.salario,
      noConstitutivos,
      entrada.dependiente,
      entrada.salud ?? 0,
      {
        uvt: valores["co.uvt"],
        tabla: valores["co.retencion-tabla"],
        rentaExenta: valores["co.renta-exenta-trabajo"],
        rentaExentaTopeAnual: valores["co.renta-exenta-trabajo-tope"],
        limiteBeneficios: valores["co.limite-beneficios"],
        limiteBeneficiosTopeAnual: valores["co.limite-beneficios-tope"],
        dependientes: valores["co.deduccion-dependientes"],
        dependientesTope: valores["co.deduccion-dependientes-tope"],
        saludTope: valores["co.deduccion-salud-tope"],
      },
      redondear,
    );
    const observaciones: string[] = [];
    if (ret.beneficios < ret.deducciones + ret.rentaExenta) observaciones.push("Tus deducciones y rentas exentas pasan el límite que fija la ley, así que solo se resta hasta ese límite.");
    return {
      noConstitutivos,
      deducciones: ret.deducciones,
      rentaExenta: ret.rentaExenta,
      beneficios: ret.beneficios,
      base: redondear(ret.base),
      baseUvt: ret.baseUvt,
      retencion: ret.retencion,
      observaciones,
    };
  },
  resultado: [
    { clave: "noConstitutivos", etiqueta: "Aportes obligatorios a salud y pensión (no pagan impuesto)", formato: "moneda", decimales: 0 },
    { clave: "deducciones", etiqueta: "Deducciones", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "rentaExenta", etiqueta: "Renta exenta de trabajo", formato: "moneda", decimales: 0 },
    { clave: "beneficios", etiqueta: "Total que se resta (con el límite legal)", formato: "moneda", decimales: 0 },
    { clave: "base", etiqueta: "Base de retención", formato: "moneda", decimales: 0 },
    { clave: "baseUvt", etiqueta: "Base de retención en UVT", formato: "numero", decimales: 2 },
    { clave: "retencion", etiqueta: "Retención en la fuente del mes", formato: "moneda", decimales: 0, destacada: true },
  ],
});
