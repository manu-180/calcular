import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "es.iva",
  mercado: "es",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "es.iva-tipos": "mapa",
    "es.recargo-equivalencia": "mapa",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Importe", min: 0, porDefecto: 100 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "Qué quieres hacer",
      opciones: [
        { valor: "sumar", etiqueta: "Añadir el IVA a un precio sin IVA" },
        { valor: "quitar", etiqueta: "Quitar el IVA a un precio con IVA" },
      ],
      porDefecto: "sumar",
    },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Tipo de IVA", dato: "es.iva-tipos", porDefecto: "general" },
    {
      id: "recargo",
      tipo: "si-no",
      etiqueta: "Sumar recargo de equivalencia",
      porDefecto: false,
      ayuda: "Solo si vendes a un comerciante minorista acogido a este régimen.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["es.iva-tipos"], entrada.tipo);
    const tasaRecargo = entrada.recargo ? enMapa(valores["es.recargo-equivalencia"], entrada.tipo) : 0;
    const factor = 1 + (tasa + tasaRecargo) / 100;
    const base = entrada.modo === "sumar" ? redondear(entrada.importe) : redondear(entrada.importe / factor);
    const cuota = redondear(porcentaje(base, tasa));
    const recargo = redondear(porcentaje(base, tasaRecargo));
    const total = entrada.modo === "sumar" ? redondear(base + cuota + recargo) : redondear(entrada.importe);
    return {
      base,
      tasa,
      cuota,
      recargo,
      total,
      observaciones: ["En Canarias no hay IVA sino IGIC, y en Ceuta y Melilla se aplica el IPSI. Esta calculadora usa los tipos del IVA de la península y Baleares."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Precio sin IVA (base imponible)", formato: "moneda" },
    { clave: "cuota", etiqueta: "IVA", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo de equivalencia", formato: "moneda", ocultarSiCero: true },
    { clave: "tasa", etiqueta: "Tipo aplicado", formato: "porcentaje" },
  ],
});
