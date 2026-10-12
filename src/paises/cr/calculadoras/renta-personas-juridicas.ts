import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.renta-personas-juridicas",
  mercado: "cr",
  concepto: "propio",
  slug: "renta-personas-juridicas",
  estado: "publicado",
  requiere: {
    "cr.renta-pyme": "escala",
    "cr.renta-pyme-tope-bruto": "numero",
    "cr.renta-personas-juridicas": "numero",
  },
  campos: [
    { id: "rentaBruta", tipo: "moneda", etiqueta: "Ingresos brutos del período fiscal", min: 0 },
    { id: "rentaNeta", tipo: "moneda", etiqueta: "Renta neta (utilidad antes del impuesto)", ayuda: "Ingresos menos costos y gastos deducibles.", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.rentaNeta > entrada.rentaBruta) throw new ErrorEntrada("La renta neta no puede ser mayor que los ingresos brutos.", "rentaNeta");
    const esPyme = entrada.rentaBruta <= valores["cr.renta-pyme-tope-bruto"];
    const impuesto = redondear(
      esPyme ? aplicarEscalaMarginal(valores["cr.renta-pyme"], entrada.rentaNeta) : porcentaje(entrada.rentaNeta, valores["cr.renta-personas-juridicas"]),
    );
    return {
      regimen: esPyme ? "Tarifa reducida por tramos (pyme)" : "Tarifa general",
      impuesto,
      tasaEfectiva: entrada.rentaNeta > 0 ? redondear((impuesto / entrada.rentaNeta) * 100) : 0,
      utilidadNeta: redondear(entrada.rentaNeta - impuesto),
      observaciones: [
        "Las micro y pequeñas empresas nuevas inscritas en el MEIC o el MAG pueden tener una rebaja adicional sus primeros seis años. No la incluimos.",
      ],
    };
  },
  resultado: [
    { clave: "regimen", etiqueta: "Tarifa que se aplica", formato: "texto" },
    { clave: "impuesto", etiqueta: "Impuesto sobre las utilidades", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva", formato: "porcentaje" },
    { clave: "utilidadNeta", etiqueta: "Utilidad después del impuesto", formato: "moneda" },
  ],
});
