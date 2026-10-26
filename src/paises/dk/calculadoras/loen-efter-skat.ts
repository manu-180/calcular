import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aarsskat, REQ_SKAT, satser } from "../lib/skat";

export default definirCalculadora({
  id: "dk.loen-efter-skat",
  mercado: "dk",
  concepto: "sueldo-neto",
  slug: "loen-efter-skat",
  estado: "publicado",
  requiere: {
    ...REQ_SKAT,
    "dk.kommuneskat": "mapa",
    "dk.kirkeskat": "mapa",
    "dk.atp-loenmodtager": "mapa",
  },
  campos: [
    { id: "loen", tipo: "moneda", etiqueta: "Månedsløn før skat", min: 0, porDefecto: 40000 },
    { id: "kommune", tipo: "opcion-dato", dato: "dk.kommuneskat", etiqueta: "Din kommune", porDefecto: "koebenhavn" },
    { id: "kirkeskat", tipo: "si-no", etiqueta: "Medlem af folkekirken (betaler kirkeskat)", porDefecto: true },
    {
      id: "pension",
      tipo: "porcentaje",
      etiqueta: "Din egen pensionsindbetaling i procent af lønnen",
      ayuda: "Den del af pensionen, der trækkes i din løn. Arbejdsgiverens andel lægges oven i lønnen og påvirker ikke beregningen.",
      min: 0,
      max: 50,
      porDefecto: 0,
    },
    { id: "atp", tipo: "si-no", etiqueta: "Fuldt ATP-bidrag (mindst 117 timer om måneden)", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.loen <= 0) throw new ErrorEntrada("Skriv en månedsløn, der er større end 0.", "loen");
    const kommune = enMapa(v["dk.kommuneskat"], e.kommune);
    const kirke = e.kirkeskat ? enMapa(v["dk.kirkeskat"], e.kommune) : 0;
    const loenAar = e.loen * 12;
    const pensionAar = redondear(porcentaje(loenAar, e.pension));
    const atpAar = e.atp ? enMapa(v["dk.atp-loenmodtager"], "fuld") * 12 : 0;
    const s = aarsskat(loenAar, pensionAar, atpAar, kommune, kirke, satser(v), redondear);
    const observaciones = [
      "Tallene er et gennemsnit over året. Din lønseddel kan svinge lidt fra måned til måned, fordi skattekortet bruger trækprocent og fradrag pr. måned.",
    ];
    if (s.mellemskat + s.topskat + s.toptopskat > 0) {
      observaciones.push("Du betaler mellemskat (og eventuelt topskat) af den del af din personlige indkomst, der ligger over grænsen.");
    }
    return {
      nettoMaaned: redondear(s.netto / 12),
      nettoAar: s.netto,
      amMaaned: redondear(s.am / 12),
      skatMaaned: redondear(s.skat / 12),
      pensionMaaned: redondear(pensionAar / 12),
      atpMaaned: redondear(atpAar / 12),
      loenAar: redondear(loenAar),
      am: s.am,
      besk: s.besk,
      job: s.job,
      kommuneskat: s.kommuneskat,
      kirkeskat: s.kirkeskat,
      bundskat: s.bundskat,
      mellemskat: s.mellemskat,
      topskat: s.topskat,
      toptopskat: s.toptopskat,
      skatAar: s.skat,
      skatteprocent: (100 * (s.am + s.skat)) / loenAar,
      marginal: s.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "nettoMaaned", etiqueta: "Løn efter skat pr. måned", formato: "moneda", destacada: true },
    { clave: "nettoAar", etiqueta: "Løn efter skat pr. år", formato: "moneda" },
    { clave: "amMaaned", etiqueta: "Am-bidrag pr. måned", formato: "moneda" },
    { clave: "skatMaaned", etiqueta: "A-skat pr. måned", formato: "moneda" },
    { clave: "pensionMaaned", etiqueta: "Egen pension pr. måned", formato: "moneda", ocultarSiCero: true },
    { clave: "atpMaaned", etiqueta: "ATP pr. måned", formato: "moneda", ocultarSiCero: true },
    { clave: "loenAar", etiqueta: "Løn før skat pr. år", formato: "moneda" },
    { clave: "am", etiqueta: "Am-bidrag pr. år", formato: "moneda" },
    { clave: "besk", etiqueta: "Beskæftigelsesfradrag", formato: "moneda" },
    { clave: "job", etiqueta: "Jobfradrag", formato: "moneda", ocultarSiCero: true },
    { clave: "kommuneskat", etiqueta: "Kommuneskat pr. år", formato: "moneda" },
    { clave: "kirkeskat", etiqueta: "Kirkeskat pr. år", formato: "moneda", ocultarSiCero: true },
    { clave: "bundskat", etiqueta: "Bundskat pr. år", formato: "moneda" },
    { clave: "mellemskat", etiqueta: "Mellemskat pr. år", formato: "moneda", ocultarSiCero: true },
    { clave: "topskat", etiqueta: "Topskat pr. år", formato: "moneda", ocultarSiCero: true },
    { clave: "toptopskat", etiqueta: "Toptopskat pr. år", formato: "moneda", ocultarSiCero: true },
    { clave: "skatAar", etiqueta: "Skat i alt pr. år (uden am-bidrag)", formato: "moneda" },
    { clave: "skatteprocent", etiqueta: "Am-bidrag og skat i procent af lønnen", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Marginalskat (af de næste 100 kr.)", formato: "porcentaje", decimales: 1 },
  ],
  mundo: {
    bruto: "loen",
    periodoBruto: "mes",
    neto: "nettoMaaned",
    periodoNeto: "mes",
    entrada: { kommune: "koebenhavn", kirkeskat: false, pension: 0, atp: true },
  },
});
