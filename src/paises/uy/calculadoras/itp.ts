import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.itp",
  mercado: "uy",
  concepto: "propio",
  slug: "itp",
  estado: "publicado",
  requiere: {
    "uy.itp": "mapa",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Operación",
      opciones: [
        { valor: "compraventa", etiqueta: "Compraventa (o promesa de compraventa)" },
        { valor: "herencia-directa", etiqueta: "Herencia de padres, hijos, abuelos o nietos" },
        { valor: "herencia-otros", etiqueta: "Herencia o legado de otras personas" },
      ],
      porDefecto: "compraventa",
    },
    {
      id: "valorReal",
      tipo: "moneda",
      etiqueta: "Valor real del inmueble (Catastro), actualizado",
      ayuda: "Figura en la cédula catastral. Se actualiza por IPC desde que se fijó.",
      min: 0,
    },
    { id: "precio", tipo: "moneda", etiqueta: "Precio de la compraventa (opcional)", ayuda: "Si el precio es menor que el valor real, el impuesto se calcula sobre el precio.", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.valorReal <= 0) throw new ErrorEntrada("Escribí el valor real del inmueble.", "valorReal");
    const tasas = valores["uy.itp"];
    const observaciones: string[] = [];
    if (entrada.operacion === "compraventa") {
      const base = entrada.precio !== null && entrada.precio > 0 ? Math.min(entrada.precio, entrada.valorReal) : entrada.valorReal;
      if (entrada.precio !== null && entrada.precio > 0 && entrada.precio < entrada.valorReal) observaciones.push("El precio es menor que el valor real: el impuesto se calcula sobre el precio.");
      const vendedor = redondear(porcentaje(base, enMapa(tasas, "enajenante")));
      const comprador = redondear(porcentaje(base, enMapa(tasas, "adquirente")));
      observaciones.push("Si la venta cumple una promesa que ya pagó el ITP, no se paga de nuevo.");
      return { base, vendedor, comprador, herederos: null, total: redondear(vendedor + comprador), observaciones };
    }
    const tasa = enMapa(tasas, entrada.operacion === "herencia-directa" ? "herederos" : "otros");
    const herederos = redondear(porcentaje(entrada.valorReal, tasa));
    observaciones.push("En las herencias el impuesto se calcula sobre el valor real.");
    return { base: entrada.valorReal, vendedor: null, comprador: null, herederos, total: herederos, observaciones };
  },
  resultado: [
    { clave: "base", etiqueta: "Monto sobre el que se calcula", formato: "moneda" },
    { clave: "vendedor", etiqueta: "ITP del vendedor", formato: "moneda" },
    { clave: "comprador", etiqueta: "ITP del comprador", formato: "moneda" },
    { clave: "herederos", etiqueta: "ITP de los herederos", formato: "moneda" },
    { clave: "total", etiqueta: "ITP total", formato: "moneda", destacada: true },
  ],
});
