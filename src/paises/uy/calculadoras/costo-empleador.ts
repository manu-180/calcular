import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { diasDeLicenciaAnual } from "../lib/licencia";

export default definirCalculadora({
  id: "uy.costo-empleador",
  mercado: "uy",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "publicado",
  requiere: {
    "uy.patronal-jubilatorio": "numero",
    "uy.patronal-fonasa": "numero",
    "uy.patronal-frl": "numero",
    "uy.fgcl": "numero",
    "uy.tope-aportes": "numero",
    "uy.licencia-dias": "numero",
  },
  campos: [
    { id: "nominal", tipo: "moneda", etiqueta: "Sueldo nominal mensual", min: 0 },
    {
      id: "provisiones",
      tipo: "si-no",
      etiqueta: "Sumar la parte mensual de aguinaldo y licencia",
      ayuda: "Para saber el costo real por mes: se reparte el aguinaldo y la licencia del año en 12.",
      porDefecto: true,
    },
    { id: "antiguedad", tipo: "entero", etiqueta: "Años de antigüedad del trabajador", ayuda: "Cambia los días de licencia.", min: 0, max: 60, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaSinTope = valores["uy.patronal-fonasa"] + valores["uy.patronal-frl"] + valores["uy.fgcl"];
    const cargas = (monto: number, yaAportado: number) => {
      const baseJubilatoria = Math.max(0, Math.min(monto, valores["uy.tope-aportes"] - yaAportado));
      return porcentaje(baseJubilatoria, valores["uy.patronal-jubilatorio"]) + porcentaje(monto, tasaSinTope);
    };
    const jubilatorio = redondear(porcentaje(Math.min(entrada.nominal, valores["uy.tope-aportes"]), valores["uy.patronal-jubilatorio"]));
    const fonasa = redondear(porcentaje(entrada.nominal, valores["uy.patronal-fonasa"]));
    const frl = redondear(porcentaje(entrada.nominal, valores["uy.patronal-frl"]));
    const fgcl = redondear(porcentaje(entrada.nominal, valores["uy.fgcl"]));
    const cargasSueldo = redondear(jubilatorio + fonasa + frl + fgcl);
    let aguinaldo: number | null = null;
    let licencia: number | null = null;
    let cargasProvisiones: number | null = null;
    if (entrada.provisiones) {
      aguinaldo = redondear(entrada.nominal / 12);
      licencia = redondear(((entrada.nominal / 30) * diasDeLicenciaAnual(valores["uy.licencia-dias"], entrada.antiguedad)) / 12);
      cargasProvisiones = redondear(cargas(aguinaldo + licencia, Math.min(entrada.nominal, valores["uy.tope-aportes"])));
    }
    const costo = redondear(entrada.nominal + cargasSueldo + (aguinaldo ?? 0) + (licencia ?? 0) + (cargasProvisiones ?? 0));
    return {
      jubilatorio,
      fonasa,
      frl,
      fgcl,
      cargasSueldo,
      aguinaldo,
      licencia,
      cargasProvisiones,
      costo,
      sobreNominal: entrada.nominal > 0 ? (costo / entrada.nominal - 1) * 100 : 0,
      observaciones: [
        "No incluye el seguro de accidentes del BSE (depende de la actividad), el complemento de cuota mutual ni el salario vacacional.",
        "El aporte jubilatorio patronal se paga hasta el mismo tope que el personal.",
      ],
    };
  },
  resultado: [
    { clave: "jubilatorio", etiqueta: "Aporte jubilatorio patronal", formato: "moneda" },
    { clave: "fonasa", etiqueta: "Fonasa patronal", formato: "moneda" },
    { clave: "frl", etiqueta: "Fondo de Reconversión Laboral", formato: "moneda" },
    { clave: "fgcl", etiqueta: "Fondo de Garantía de Créditos Laborales", formato: "moneda" },
    { clave: "cargasSueldo", etiqueta: "Aportes patronales del mes", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Parte mensual del aguinaldo", formato: "moneda" },
    { clave: "licencia", etiqueta: "Parte mensual de la licencia", formato: "moneda" },
    { clave: "cargasProvisiones", etiqueta: "Aportes sobre aguinaldo y licencia", formato: "moneda" },
    { clave: "costo", etiqueta: "Costo total por mes", formato: "moneda", destacada: true },
    { clave: "sobreNominal", etiqueta: "Cuánto más que el nominal", formato: "porcentaje" },
  ],
});
