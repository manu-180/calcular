import { definirCalculadora } from "@/motor/calculo";
import { aportesTrabajador, recibeAuxilio, retencionMensual } from "../reglas";

export default definirCalculadora({
  id: "co.salario-neto",
  mercado: "co",
  concepto: "sueldo-neto",
  slug: "salario-neto",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.auxilio-transporte": "numero",
    "co.auxilio-tope": "numero",
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
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "auxilio", tipo: "si-no", etiqueta: "Recibes auxilio de transporte", porDefecto: true },
    {
      id: "dependiente",
      tipo: "si-no",
      etiqueta: "Tienes personas a cargo (dependientes)",
      ayuda: "Hijos, cónyuge o padres que dependen de ti. Baja la retención en la fuente.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const smmlv = valores["co.smmlv"];
    const aportes = aportesTrabajador(
      entrada.salario,
      {
        smmlv,
        saludTrabajador: valores["co.salud-trabajador"],
        pensionCotizacion: valores["co.pension-cotizacion"],
        pensionParteTrabajador: valores["co.pension-parte-trabajador"],
        fsp: valores["co.fsp"],
        topeIbc: valores["co.tope-ibc"],
      },
      redondear,
    );
    const ret = retencionMensual(
      entrada.salario,
      aportes.salud + aportes.pension + aportes.fsp,
      entrada.dependiente,
      0,
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
    const auxilio = entrada.auxilio && recibeAuxilio(entrada.salario, smmlv, valores["co.auxilio-tope"]) ? valores["co.auxilio-transporte"] : 0;
    const descuentos = redondear(aportes.salud + aportes.pension + aportes.fsp + ret.retencion);
    const observaciones: string[] = [];
    if (entrada.salario < smmlv) observaciones.push("Tu salario está por debajo del mínimo. Los aportes se calculan sobre un salario mínimo, que es la base más baja que permite la ley.");
    if (aportes.ibc < entrada.salario) observaciones.push("Tu salario pasa el tope de 25 salarios mínimos, así que los aportes se calculan sobre ese tope.");
    return {
      salario: entrada.salario,
      auxilio,
      salud: aportes.salud,
      pension: aportes.pension,
      fsp: aportes.fsp,
      retencion: ret.retencion,
      descuentos,
      neto: redondear(entrada.salario + auxilio - descuentos),
      observaciones,
    };
  },
  resultado: [
    { clave: "salario", etiqueta: "Salario", formato: "moneda", decimales: 0 },
    { clave: "auxilio", etiqueta: "Auxilio de transporte", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "salud", etiqueta: "Salud (EPS)", formato: "moneda", decimales: 0 },
    { clave: "pension", etiqueta: "Pensión", formato: "moneda", decimales: 0 },
    { clave: "fsp", etiqueta: "Fondo de Solidaridad Pensional", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "retencion", etiqueta: "Retención en la fuente", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "descuentos", etiqueta: "Total de descuentos", formato: "moneda", decimales: 0 },
    { clave: "neto", etiqueta: "Salario neto (lo que te consignan)", formato: "moneda", decimales: 0, destacada: true },
  ],
});
