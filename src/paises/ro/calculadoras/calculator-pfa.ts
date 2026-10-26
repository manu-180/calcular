import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { leu } from "../lib/fiscal";

export default definirCalculadora({
  id: "ro.calculator-pfa",
  mercado: "ro",
  concepto: "regimen-simplificado",
  slug: "calculator-pfa",
  estado: "publicado",
  requiere: {
    "ro.salariu-minim-1-ianuarie": "numero",
    "ro.cas": "numero",
    "ro.cass": "numero",
    "ro.impozit-venit": "numero",
    "ro.plafoane-cas": "mapa",
    "ro.plafoane-cass-pfa": "mapa",
  },
  campos: [
    {
      id: "sistem",
      tipo: "opcion",
      etiqueta: "Cum se stabilește venitul net",
      opciones: [
        { valor: "real", etiqueta: "Sistem real (venituri minus cheltuieli)" },
        { valor: "norma", etiqueta: "Normă de venit" },
      ],
      porDefecto: "real",
    },
    { id: "venituri", tipo: "moneda", etiqueta: "Venituri încasate în an", min: 0, porDefecto: 120000, visibleSi: { sistem: ["real"] } },
    { id: "cheltuieli", tipo: "moneda", etiqueta: "Cheltuieli deductibile în an", min: 0, porDefecto: 20000, visibleSi: { sistem: ["real"] } },
    { id: "norma", tipo: "moneda", etiqueta: "Norma anuală de venit (din lista județului)", min: 0, porDefecto: 50000, visibleSi: { sistem: ["norma"] }, ayuda: "Normele le publică direcția regională a finanțelor publice; folosiți norma ajustată, dacă este cazul." },
    { id: "pensionar", tipo: "si-no", etiqueta: "Sunteți pensionar", porDefecto: false },
    { id: "salariat", tipo: "si-no", etiqueta: "Aveți și salariu de cel puțin 6 salarii minime pe an", porDefecto: false },
    { id: "casOptional", tipo: "si-no", etiqueta: "Plătiți CAS opțional dacă venitul net este sub 12 salarii minime", porDefecto: false },
  ],
  calcular(e, v) {
    const sm = v["ro.salariu-minim-1-ianuarie"];
    const pc = v["ro.plafoane-cas"];
    const ps = v["ro.plafoane-cass-pfa"];
    let net: number;
    if (e.sistem === "real") {
      const venituri = e.venituri ?? 0;
      const cheltuieli = e.cheltuieli ?? 0;
      if (venituri <= 0) throw new ErrorEntrada("Introduceți veniturile din an.", "venituri");
      net = venituri - cheltuieli;
    } else {
      net = e.norma ?? 0;
      if (net <= 0) throw new ErrorEntrada("Introduceți norma anuală de venit.", "norma");
    }
    const prag12 = enMapa(pc, "minim") * sm;
    const prag24 = enMapa(pc, "maxim") * sm;
    let bazaCas = 0;
    if (!e.pensionar) {
      if (net >= prag24) bazaCas = prag24;
      else if (net >= prag12 || e.casOptional) bazaCas = prag12;
    }
    const cas = leu((bazaCas * v["ro.cas"]) / 100);
    const minimCass = enMapa(ps, "minim") * sm;
    const maximCass = enMapa(ps, "maxim") * sm;
    const bazaReala = Math.min(Math.max(0, net), maximCass);
    const bazaCass = net <= 0 ? 0 : e.salariat ? bazaReala : Math.max(bazaReala, minimCass);
    const cass = leu((bazaCass * v["ro.cass"]) / 100);
    const cassDeductibila = leu((bazaReala * v["ro.cass"]) / 100);
    const bazaImpozit = e.sistem === "real" ? leu(Math.max(0, net - cas - cassDeductibila)) : leu(net);
    const impozit = leu((bazaImpozit * v["ro.impozit-venit"]) / 100);
    const ramas = Number((net - cas - cass - impozit).toFixed(2));
    const observaciones: string[] = [];
    if (net < 0) observaciones.push("Ați avut pierdere: nu datorați impozit și nici CASS pe acest venit.");
    if (!e.pensionar && net > 0 && net < prag12 && !e.casOptional) observaciones.push("Sub 12 salarii minime CAS nu este obligatoriu. Îl puteți plăti opțional, la o bază de 12 salarii minime.");
    return {
      net,
      cas,
      cass,
      impozit,
      total: cas + cass + impozit,
      ramas,
      lunar: Number((ramas / 12).toFixed(2)),
      bazaCas,
      bazaCass,
      observaciones,
    };
  },
  resultado: [
    { clave: "ramas", etiqueta: "Vă rămân în an după taxe", formato: "moneda", destacada: true },
    { clave: "lunar", etiqueta: "Pe lună, în medie", formato: "moneda" },
    { clave: "net", etiqueta: "Venit net anual", formato: "moneda" },
    { clave: "cas", etiqueta: "CAS (pensie)", formato: "moneda" },
    { clave: "cass", etiqueta: "CASS (sănătate)", formato: "moneda" },
    { clave: "impozit", etiqueta: "Impozit pe venit", formato: "moneda" },
    { clave: "total", etiqueta: "Total de plată în Declarația unică", formato: "moneda" },
    { clave: "bazaCas", etiqueta: "Baza CAS", formato: "moneda" },
    { clave: "bazaCass", etiqueta: "Baza CASS", formato: "moneda" },
  ],
});
