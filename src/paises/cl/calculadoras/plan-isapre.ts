import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.plan-isapre",
  mercado: "cl",
  concepto: "propio",
  slug: "plan-isapre",
  estado: "publicado",
  requiere: {
    "cl.salud": "numero",
    "cl.tope-imponible": "numero",
    "cl.uf": "serie",
  },
  campos: [
    { id: "planUf", tipo: "numero", etiqueta: "Precio de tu plan en UF", ayuda: "El precio total que dice tu contrato con la Isapre, con GES incluido.", min: 0 },
    { id: "imponible", tipo: "moneda", etiqueta: "Tu sueldo imponible", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const uf = valores["cl.uf"].valor;
    const tope = redondear(valores["cl.tope-imponible"] * uf);
    const plan = redondear(entrada.planUf * uf);
    const legal = redondear(porcentaje(Math.min(entrada.imponible, tope), valores["cl.salud"]));
    const adicional = Math.max(0, plan - legal);
    const observaciones: string[] = [];
    if (plan < legal) observaciones.push("Tu plan cuesta menos que la cotización legal: igual se descuenta la cotización legal y la diferencia queda como excedente en tu Isapre.");
    return {
      plan,
      legal,
      adicional,
      descuento: Math.max(plan, legal),
      excedente: Math.max(0, legal - plan),
      porcentajeDelSueldo: entrada.imponible > 0 ? (Math.max(plan, legal) / entrada.imponible) * 100 : 0,
      valorUf: uf,
      observaciones,
    };
  },
  resultado: [
    { clave: "descuento", etiqueta: "Descuento total de salud al mes", formato: "moneda", destacada: true },
    { clave: "plan", etiqueta: "Precio del plan en pesos", formato: "moneda" },
    { clave: "legal", etiqueta: "Cotización legal de salud", formato: "moneda" },
    { clave: "adicional", etiqueta: "Lo que pagas por sobre la cotización legal", formato: "moneda", ocultarSiCero: true },
    { clave: "excedente", etiqueta: "Excedente a tu favor", formato: "moneda", ocultarSiCero: true },
    { clave: "porcentajeDelSueldo", etiqueta: "Salud como porcentaje de tu sueldo", formato: "porcentaje", decimales: 2 },
    { clave: "valorUf", etiqueta: "UF usada", formato: "moneda", decimales: 2 },
  ],
});
