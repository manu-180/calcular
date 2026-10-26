import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutDinNet } from "../lib/fiscal";
import { OPTIUNI_PERSOANE, parametriSalariu, REQ_SALARIU } from "../lib/parametri";

export default definirCalculadora({
  id: "ro.calculator-salariu-brut",
  mercado: "ro",
  concepto: "propio",
  slug: "calculator-salariu-brut",
  estado: "publicado",
  requiere: { ...REQ_SALARIU, "ro.cam": "numero" },
  campos: [
    { id: "net", tipo: "moneda", etiqueta: "Salariul net dorit pe lună", min: 0, porDefecto: 4000 },
    { id: "persoane", tipo: "opcion", etiqueta: "Persoane în întreținere", opciones: OPTIUNI_PERSOANE, porDefecto: "0" },
    { id: "sub26", tipo: "si-no", etiqueta: "Angajatul are sub 26 de ani", porDefecto: false },
    { id: "copii", tipo: "entero", etiqueta: "Copii sub 18 ani înscriși la școală", min: 0, max: 10, porDefecto: 0 },
    { id: "minim", tipo: "si-no", etiqueta: "Salariul de bază va fi egal cu salariul minim", porDefecto: false },
  ],
  calcular(e, v) {
    if (e.net <= 0) throw new ErrorEntrada("Introduceți un salariu net mai mare decât zero.", "net");
    const p = parametriSalariu(v);
    const f = brutDinNet(e.net, { persoane: Number(e.persoane), sub26: e.sub26, copiiScoala: e.copii, laSalariulMinim: e.minim }, p);
    const observaciones: string[] = [];
    if (f.net > e.net) observaciones.push("Brutul este rotunjit la leu, așa că netul obținut poate fi cu puțin peste cel cerut.");
    return {
      brut: f.brut,
      cas: f.cas,
      cass: f.cass,
      impozit: f.impozit,
      deducere: f.deducere,
      netObtinut: f.net,
      observaciones,
    };
  },
  resultado: [
    { clave: "brut", etiqueta: "Salariul brut necesar", formato: "moneda", destacada: true },
    { clave: "cas", etiqueta: "CAS (pensie)", formato: "moneda" },
    { clave: "cass", etiqueta: "CASS (sănătate)", formato: "moneda" },
    { clave: "impozit", etiqueta: "Impozit pe venit", formato: "moneda" },
    { clave: "deducere", etiqueta: "Deducere personală", formato: "moneda", ocultarSiCero: true },
    { clave: "netObtinut", etiqueta: "Salariul net rezultat", formato: "moneda" },
  ],
});
