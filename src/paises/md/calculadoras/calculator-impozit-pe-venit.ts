import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bani, OPTIUNI_SCUTIRE, parametri, REQ_SALARIU, scutiriAnuale } from "../lib/fiscal";

export default definirCalculadora({
  id: "md.calculator-impozit-pe-venit",
  mercado: "md",
  concepto: "impuesto-renta",
  slug: "calculator-impozit-pe-venit",
  estado: "publicado",
  requiere: REQ_SALARIU,
  campos: [
    { id: "venit", tipo: "moneda", etiqueta: "Venitul brut pe an", min: 0, porDefecto: 180000, ayuda: "Salarii și alte venituri impozabile din anul fiscal." },
    { id: "salariu", tipo: "si-no", etiqueta: "Venitul este salariu (se reține prima medicală)", porDefecto: true },
    { id: "scutire", tipo: "opcion", etiqueta: "Scutirea personală", opciones: OPTIUNI_SCUTIRE, porDefecto: "personala" },
    { id: "intretinuti", tipo: "entero", etiqueta: "Persoane întreținute", min: 0, max: 10, porDefecto: 0 },
    { id: "intretinutiDizabilitate", tipo: "entero", etiqueta: "Din care persoane întreținute cu dizabilitate", min: 0, max: 10, porDefecto: 0, ayuda: "Nu le numărați și în rândul de mai sus." },
  ],
  calcular(e, v) {
    if (e.venit <= 0) throw new ErrorEntrada("Introduceți un venit mai mare decât zero.", "venit");
    const p = parametri(v);
    const s = scutiriAnuale(e.venit, { scutire: e.scutire, intretinuti: e.intretinuti, intretinutiDizabilitate: e.intretinutiDizabilitate }, p);
    const prima = e.salariu ? bani((e.venit * p.prima) / 100) : 0;
    const scutiri = s.personala + s.intretinuti;
    const impozabil = bani(Math.max(0, e.venit - prima - scutiri));
    const impozit = bani((impozabil * p.impozit) / 100);
    const observaciones: string[] = [];
    if (s.pestePlafon) observaciones.push("Venitul anual trece de plafonul scutirii personale, așa că ea nu se aplică.");
    return {
      impozit,
      impozabil,
      prima,
      scutiri,
      lunar: bani(impozit / 12),
      cotaEfectiva: Number(((impozit / e.venit) * 100).toFixed(2)),
      observaciones,
    };
  },
  resultado: [
    { clave: "impozit", etiqueta: "Impozitul pe venit pe an", formato: "moneda", destacada: true },
    { clave: "impozabil", etiqueta: "Venitul impozabil", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima medicală scăzută din venit", formato: "moneda", ocultarSiCero: true },
    { clave: "scutiri", etiqueta: "Scutiri pe an", formato: "moneda", ocultarSiCero: true },
    { clave: "lunar", etiqueta: "Impozit în medie pe lună", formato: "moneda" },
    { clave: "cotaEfectiva", etiqueta: "Cota efectivă din venitul brut", formato: "porcentaje", decimales: 2 },
  ],
});
