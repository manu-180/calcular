import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPTIUNI_SCUTIRE, parametri, REQ_SALARIU, salariu } from "../lib/fiscal";

export default definirCalculadora({
  id: "md.calculator-salariu-net",
  mercado: "md",
  concepto: "sueldo-neto",
  slug: "calculator-salariu-net",
  estado: "publicado",
  requiere: REQ_SALARIU,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salariul brut lunar", min: 0, porDefecto: 15000 },
    { id: "scutire", tipo: "opcion", etiqueta: "Scutirea personală", opciones: OPTIUNI_SCUTIRE, porDefecto: "personala", ayuda: "Se aplică la un singur loc de muncă, de regulă la cel de bază. Alegeți „Fără scutire personală” dacă o folosiți la alt angajator." },
    { id: "intretinuti", tipo: "entero", etiqueta: "Persoane întreținute", min: 0, max: 10, porDefecto: 0, ayuda: "Copii sau alți membri ai familiei pentru care beneficiați de scutire." },
    { id: "intretinutiDizabilitate", tipo: "entero", etiqueta: "Din care persoane întreținute cu dizabilitate", min: 0, max: 10, porDefecto: 0, ayuda: "Pentru ele scutirea este mai mare. Nu le numărați și în rândul de mai sus." },
  ],
  calcular(e, v) {
    if (e.brut <= 0) throw new ErrorEntrada("Introduceți un salariu brut mai mare decât zero.", "brut");
    const p = parametri(v);
    const s = salariu(e.brut, { scutire: e.scutire, intretinuti: e.intretinuti, intretinutiDizabilitate: e.intretinutiDizabilitate }, p);
    const observaciones: string[] = [];
    if (s.pestePlafon) {
      observaciones.push("Cu acest salariu venitul pe an trece de plafonul scutirii personale, așa că ea nu se mai aplică.");
    }
    return {
      net: s.net,
      prima: s.prima,
      impozit: s.impozit,
      scutireLunara: s.scutireLunara,
      bazaImpozit: s.bazaImpozit,
      totalRetineri: Number((s.prima + s.impozit).toFixed(2)),
      netAnual: Number((s.net * 12).toFixed(2)),
      cas: s.cas,
      observaciones,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salariul net (în mână)", formato: "moneda", destacada: true },
    { clave: "prima", etiqueta: "Prima de asigurare medicală (CNAM)", formato: "moneda" },
    { clave: "impozit", etiqueta: "Impozitul pe venit", formato: "moneda" },
    { clave: "scutireLunara", etiqueta: "Scutiri scăzute în luna aceasta", formato: "moneda", ocultarSiCero: true },
    { clave: "bazaImpozit", etiqueta: "Venitul impozabil al lunii", formato: "moneda" },
    { clave: "totalRetineri", etiqueta: "Total rețineri din salariu", formato: "moneda" },
    { clave: "netAnual", etiqueta: "Net pe an (12 luni)", formato: "moneda" },
    { clave: "cas", etiqueta: "Contribuția CNAS plătită de angajator, peste brut", formato: "moneda" },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes", entrada: { scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 } },
});
