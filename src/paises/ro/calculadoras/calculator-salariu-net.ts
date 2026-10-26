import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { fluturas } from "../lib/fiscal";
import { OPTIUNI_PERSOANE, parametriSalariu, REQ_SALARIU } from "../lib/parametri";

export default definirCalculadora({
  id: "ro.calculator-salariu-net",
  mercado: "ro",
  concepto: "sueldo-neto",
  slug: "calculator-salariu-net",
  estado: "publicado",
  requiere: REQ_SALARIU,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salariul brut lunar", min: 0, porDefecto: 6000 },
    { id: "persoane", tipo: "opcion", etiqueta: "Persoane în întreținere", opciones: OPTIUNI_PERSOANE, porDefecto: "0", ayuda: "Copiii sub 18 ani și membrii familiei cu venituri mici pe care îi aveți în întreținere." },
    { id: "sub26", tipo: "si-no", etiqueta: "Aveți sub 26 de ani", porDefecto: false },
    { id: "copii", tipo: "entero", etiqueta: "Copii sub 18 ani înscriși la școală (deducere de 100 de lei)", min: 0, max: 10, porDefecto: 0, ayuda: "Deducerea se acordă unui singur părinte pentru fiecare copil." },
    { id: "minim", tipo: "si-no", etiqueta: "Salariul de bază din contract este egal cu salariul minim", porDefecto: false, ayuda: "Pentru suma neimpozabilă din 2026, cu normă întreagă." },
  ],
  calcular(e, v) {
    if (e.brut <= 0) throw new ErrorEntrada("Introduceți un salariu brut mai mare decât zero.", "brut");
    const p = parametriSalariu(v);
    const f = fluturas(e.brut, { persoane: Number(e.persoane), sub26: e.sub26, copiiScoala: e.copii, laSalariulMinim: e.minim }, p);
    const observaciones: string[] = [];
    if (e.minim && f.sumaNeimpozabila === 0 && p.facilitate.suma > 0) {
      observaciones.push("Suma neimpozabilă nu se aplică: venitul brut depășește plafonul legal sau este sub salariul minim.");
    }
    if (e.brut < p.salariuMinim) {
      observaciones.push("Brutul este sub salariul minim. La normă parțială, CAS și CASS se pot datora la nivelul salariului minim, cu excepțiile din lege.");
    }
    return {
      net: f.net,
      cas: f.cas,
      cass: f.cass,
      impozit: f.impozit,
      deducere: f.deducere,
      bazaImpozit: f.bazaImpozit,
      sumaNeimpozabila: f.sumaNeimpozabila,
      totalRetineri: Number((f.cas + f.cass + f.impozit).toFixed(2)),
      netAnual: Number((f.net * 12).toFixed(2)),
      observaciones,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salariul net (în mână)", formato: "moneda", destacada: true },
    { clave: "cas", etiqueta: "CAS (pensie)", formato: "moneda" },
    { clave: "cass", etiqueta: "CASS (sănătate)", formato: "moneda" },
    { clave: "impozit", etiqueta: "Impozit pe venit", formato: "moneda" },
    { clave: "deducere", etiqueta: "Deducere personală", formato: "moneda", ocultarSiCero: true },
    { clave: "bazaImpozit", etiqueta: "Baza de calcul a impozitului", formato: "moneda" },
    { clave: "sumaNeimpozabila", etiqueta: "Suma neimpozabilă la salariul minim", formato: "moneda", ocultarSiCero: true },
    { clave: "totalRetineri", etiqueta: "Total rețineri", formato: "moneda" },
    { clave: "netAnual", etiqueta: "Net pe an (12 luni)", formato: "moneda" },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes", entrada: { persoane: "0", sub26: false, copii: 0, minim: false } },
});
