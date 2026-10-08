import { definirCalculadora, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "zz.bono",
  mercado: "zz",
  concepto: "bono-semestral",
  slug: "bono",
  estado: "publicado",
  requiere: {
    "zz.minimo": "numero-por-region",
    "zz.bonificacion": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual bruto", min: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Meses trabajados en el semestre", min: 1, max: 6, porDefecto: 6 },
    { id: "region", tipo: "region", etiqueta: "Zona donde trabajas" },
    {
      id: "regimen",
      tipo: "opcion",
      etiqueta: "Tamaño de la empresa",
      opciones: [
        { valor: "general", etiqueta: "Empresa mediana o grande" },
        { valor: "pequena", etiqueta: "Pequeña empresa" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses < 1 || entrada.meses > 6) throw new ErrorEntrada("Los meses van de 1 a 6.", "meses");
    const minimo = porRegion(valores["zz.minimo"], entrada.region);
    const base = Math.max(entrada.sueldo, minimo);
    const factor = entrada.regimen === "pequena" ? 0.5 : 1;
    const bono = redondear((base * entrada.meses * factor) / 6);
    const bonificacion = redondear(porcentaje(bono, valores["zz.bonificacion"]));
    return {
      base,
      bono,
      bonificacion,
      total: redondear(bono + bonificacion),
      observaciones: entrada.sueldo < minimo ? ["Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo."] : [],
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Sueldo que se usa para el cálculo", formato: "moneda" },
    { clave: "bono", etiqueta: "Bono", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
