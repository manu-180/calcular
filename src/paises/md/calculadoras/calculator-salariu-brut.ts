import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutDinNet, OPTIUNI_SCUTIRE, parametri, REQ_SALARIU } from "../lib/fiscal";

export default definirCalculadora({
  id: "md.calculator-salariu-brut",
  mercado: "md",
  concepto: "propio",
  slug: "calculator-salariu-brut",
  estado: "publicado",
  requiere: REQ_SALARIU,
  campos: [
    { id: "net", tipo: "moneda", etiqueta: "Salariul net dorit pe lună", min: 0, porDefecto: 12000 },
    { id: "scutire", tipo: "opcion", etiqueta: "Scutirea personală", opciones: OPTIUNI_SCUTIRE, porDefecto: "personala" },
    { id: "intretinuti", tipo: "entero", etiqueta: "Persoane întreținute", min: 0, max: 10, porDefecto: 0 },
    { id: "intretinutiDizabilitate", tipo: "entero", etiqueta: "Din care persoane întreținute cu dizabilitate", min: 0, max: 10, porDefecto: 0, ayuda: "Nu le numărați și în rândul de mai sus." },
  ],
  calcular(e, v) {
    if (e.net <= 0) throw new ErrorEntrada("Introduceți un salariu net mai mare decât zero.", "net");
    const s = brutDinNet(e.net, { scutire: e.scutire, intretinuti: e.intretinuti, intretinutiDizabilitate: e.intretinutiDizabilitate }, parametri(v));
    const observaciones: string[] = [];
    if (s.net > e.net) observaciones.push("Brutul este rotunjit la ban, așa că netul iese cu cel mult câțiva bani peste suma cerută.");
    if (s.pestePlafon) observaciones.push("La acest brut venitul pe an trece de plafonul scutirii personale, așa că ea nu se aplică.");
    return { brut: s.brut, net: s.net, prima: s.prima, impozit: s.impozit, cas: s.cas, cost: s.cost, observaciones };
  },
  resultado: [
    { clave: "brut", etiqueta: "Salariul brut necesar", formato: "moneda", destacada: true },
    { clave: "net", etiqueta: "Salariul net rezultat", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima de asigurare medicală (CNAM)", formato: "moneda" },
    { clave: "impozit", etiqueta: "Impozitul pe venit", formato: "moneda" },
    { clave: "cas", etiqueta: "Contribuția CNAS plătită de angajator", formato: "moneda" },
    { clave: "cost", etiqueta: "Costul total pentru angajator", formato: "moneda" },
  ],
});
