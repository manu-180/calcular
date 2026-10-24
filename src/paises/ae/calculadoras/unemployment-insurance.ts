import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { categoriaIloe, compensacionIloe, primaIloe } from "../lib/aportes";

export default definirCalculadora({
  id: "ae.unemployment-insurance",
  mercado: "ae",
  concepto: "propio",
  slug: "unemployment-insurance",
  estado: "publicado",
  requiere: {
    "ae.iloe": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 12000 },
    { id: "meses", tipo: "entero", etiqueta: "Months you've been subscribed without a break", min: 0, max: 600, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your basic salary.", "basico");
    const t = v["ae.iloe"];
    const prima = primaIloe(entrada.basico, t);
    const mensual = redondear(compensacionIloe(entrada.basico, t));
    const meses = enMapa(t, "months");
    const minimo = enMapa(t, "minimum-months");
    const observaciones: string[] = [];
    const califica = entrada.meses >= minimo;
    if (!califica) observaciones.push(`You can claim after ${minimo} months of continuous subscription.`);
    observaciones.push("Compensation isn't paid if you resign or are dismissed for disciplinary reasons, and it stops if you find a new job.");
    return {
      mensual: califica ? mensual : 0,
      total: califica ? redondear(mensual * meses) : 0,
      prima,
      primaAnual: prima * 12,
      categoria: categoriaIloe(entrada.basico, t) === "low" ? "First category" : "Second category",
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly compensation if you lose your job", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Compensation over 3 months", formato: "moneda" },
    { clave: "prima", etiqueta: "Monthly premium (maximum)", formato: "moneda" },
    { clave: "primaAnual", etiqueta: "Premiums over a year", formato: "moneda" },
    { clave: "categoria", etiqueta: "Category", formato: "texto" },
  ],
});
