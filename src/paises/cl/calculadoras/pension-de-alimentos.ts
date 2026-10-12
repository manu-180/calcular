import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.pension-de-alimentos",
  mercado: "cl",
  concepto: "pension-alimentos",
  slug: "pension-de-alimentos",
  estado: "publicado",
  requiere: {
    "cl.imm": "numero",
    "cl.imm-menores-mayores": "numero",
    "cl.alimentos-minimo-un-hijo": "numero",
    "cl.alimentos-minimo-varios": "numero",
    "cl.alimentos-maximo": "numero",
  },
  campos: [
    { id: "hijos", tipo: "entero", etiqueta: "Hijos e hijas que reciben la pensión", min: 1, max: 15, porDefecto: 1 },
    {
      id: "edad",
      tipo: "opcion",
      etiqueta: "Edad de quien paga la pensión",
      opciones: [
        { valor: "general", etiqueta: "De 18 a 65 años" },
        { valor: "especial", etiqueta: "Menor de 18 o mayor de 65 años" },
      ],
      porDefecto: "general",
    },
    {
      id: "rentas",
      tipo: "moneda",
      etiqueta: "Ingresos mensuales de quien paga (opcional)",
      ayuda: "Sirve para calcular el máximo legal. Si no lo sabes, deja 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const imm = entrada.edad === "general" ? valores["cl.imm"] : valores["cl.imm-menores-mayores"];
    const tasa = entrada.hijos === 1 ? valores["cl.alimentos-minimo-un-hijo"] : valores["cl.alimentos-minimo-varios"];
    const porHijo = redondear(porcentaje(imm, tasa));
    const minimoTotal = porHijo * entrada.hijos;
    const maximo = entrada.rentas > 0 ? redondear(porcentaje(entrada.rentas, valores["cl.alimentos-maximo"])) : null;
    const observaciones: string[] = [];
    if (maximo !== null && minimoTotal > maximo) observaciones.push("El mínimo legal pasa la mitad de los ingresos. En ese caso el juez puede rebajarlo si se prueba que no hay medios para pagarlo.");
    return { imm, porHijo, minimoTotal, maximo, observaciones };
  },
  resultado: [
    { clave: "minimoTotal", etiqueta: "Pensión mínima legal al mes", formato: "moneda", destacada: true },
    { clave: "porHijo", etiqueta: "Mínimo por cada hijo o hija", formato: "moneda" },
    { clave: "maximo", etiqueta: "Máximo general (la mitad de los ingresos)", formato: "moneda" },
    { clave: "imm", etiqueta: "Ingreso mínimo usado", formato: "moneda" },
  ],
});
