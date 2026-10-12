import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { aportesTrabajador, retencionMensual } from "../reglas";

export default definirCalculadora({
  id: "co.salario-integral",
  mercado: "co",
  concepto: "propio",
  slug: "salario-integral",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.salario-integral-minimo": "numero",
    "co.salario-integral-factor": "numero",
    "co.salario-integral-base": "numero",
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
    { id: "salario", tipo: "moneda", etiqueta: "Salario integral mensual", min: 0 },
    { id: "dependiente", tipo: "si-no", etiqueta: "Tienes personas a cargo (dependientes)", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const smmlv = valores["co.smmlv"];
    const factor = valores["co.salario-integral-factor"];
    const minimo = redondear(valores["co.salario-integral-minimo"] * smmlv * (1 + factor / 100));
    const parteSalarial = redondear(entrada.salario / (1 + factor / 100));
    const factorPrestacional = redondear(entrada.salario - parteSalarial);
    const baseAportes = redondear(porcentaje(entrada.salario, valores["co.salario-integral-base"]));
    const aportes = aportesTrabajador(
      baseAportes,
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
    const descuentos = redondear(aportes.salud + aportes.pension + aportes.fsp + ret.retencion);
    const cumple = entrada.salario >= minimo;
    const observaciones: string[] = [];
    if (!cumple) observaciones.push("Ese valor no alcanza el mínimo legal del salario integral. Por debajo de ese monto el contrato tiene que pagar salario ordinario con todas las prestaciones.");
    if (aportes.ibc < baseAportes) observaciones.push("La base de aportes pasa el tope de 25 salarios mínimos, así que se cotiza sobre ese tope.");
    return {
      minimo,
      cumple: cumple ? "Sí, cumple el mínimo legal" : "No, está por debajo del mínimo legal",
      parteSalarial,
      factorPrestacional,
      baseAportes: aportes.ibc,
      salud: aportes.salud,
      pension: aportes.pension,
      fsp: aportes.fsp,
      retencion: ret.retencion,
      neto: redondear(entrada.salario - descuentos),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Salario integral mínimo hoy", formato: "moneda", decimales: 0 },
    { clave: "cumple", etiqueta: "¿Tu salario cumple el mínimo?", formato: "texto" },
    { clave: "parteSalarial", etiqueta: "Parte que retribuye el trabajo", formato: "moneda", decimales: 0 },
    { clave: "factorPrestacional", etiqueta: "Factor prestacional incluido", formato: "moneda", decimales: 0 },
    { clave: "baseAportes", etiqueta: "Base para salud y pensión", formato: "moneda", decimales: 0 },
    { clave: "salud", etiqueta: "Salud", formato: "moneda", decimales: 0 },
    { clave: "pension", etiqueta: "Pensión", formato: "moneda", decimales: 0 },
    { clave: "fsp", etiqueta: "Fondo de Solidaridad Pensional", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "retencion", etiqueta: "Retención en la fuente", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "neto", etiqueta: "Salario neto aproximado", formato: "moneda", decimales: 0, destacada: true },
  ],
});
