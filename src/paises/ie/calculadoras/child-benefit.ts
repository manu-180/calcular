import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.child-benefit",
  mercado: "ie",
  concepto: "propio",
  slug: "child-benefit",
  estado: "publicado",
  requiere: {
    "ie.child-benefit-monthly": "mapa",
  },
  campos: [
    { id: "hijos", tipo: "entero", etiqueta: "Children (not twins or multiple births)", min: 0, max: 20, porDefecto: 2 },
    { id: "gemelos", tipo: "entero", etiqueta: "Children who are twins", min: 0, max: 20, porDefecto: 0, ayuda: "Count each child, so a pair of twins is 2." },
    { id: "multiples", tipo: "entero", etiqueta: "Children from triplets or more", min: 0, max: 20, porDefecto: 0, ayuda: "Count each child, so triplets are 3." },
  ],
  calcular(entrada, v, { redondear }) {
    const total = entrada.hijos + entrada.gemelos + entrada.multiples;
    if (total <= 0) throw new ErrorEntrada("Enter at least one child.", "hijos");
    const t = v["ie.child-benefit-monthly"];
    const mensual = redondear(entrada.hijos * t.single + entrada.gemelos * t.twins + entrada.multiples * t.multiple);
    const observaciones: string[] = [];
    if (entrada.gemelos % 2 !== 0) observaciones.push("Twins usually come in pairs. Check the number of twin children you entered.");
    return { mensual, anual: redondear(mensual * 12), ninos: total, observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Child Benefit a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Child Benefit a year", formato: "moneda" },
    { clave: "ninos", etiqueta: "Children counted", formato: "numero", decimales: 0 },
  ],
});
