import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aarsskat, REQ_SKAT, satser } from "../lib/skat";

export default definirCalculadora({
  id: "dk.topskat",
  mercado: "dk",
  concepto: "propio",
  slug: "topskat",
  estado: "publicado",
  requiere: {
    ...REQ_SKAT,
    "dk.kommuneskat": "mapa",
    "dk.atp-loenmodtager": "mapa",
  },
  campos: [
    { id: "loen", tipo: "moneda", etiqueta: "Månedsløn før skat", min: 0, porDefecto: 65000 },
    { id: "kommune", tipo: "opcion-dato", dato: "dk.kommuneskat", etiqueta: "Din kommune", porDefecto: "koebenhavn", ayuda: "Kommunen afgør, om skatteloftet sætter mellemskatten ned." },
    { id: "pension", tipo: "porcentaje", etiqueta: "Din egen pensionsindbetaling i procent af lønnen", min: 0, max: 50, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.loen <= 0) throw new ErrorEntrada("Skriv en månedsløn, der er større end 0.", "loen");
    const s = satser(v);
    const kommune = enMapa(v["dk.kommuneskat"], e.kommune);
    const atp = enMapa(v["dk.atp-loenmodtager"], "fuld") * 12;
    const loenAar = e.loen * 12;
    const pension = redondear(porcentaje(loenAar, e.pension));
    const r = aarsskat(loenAar, pension, atp, kommune, 0, s, redondear);
    // Månedsløn, hvor den personlige indkomst efter am-bidrag rammer en grænse.
    const loenVed = (graense: number) => redondear((graense / (1 - s.am / 100) + atp) / (1 - e.pension / 100) / 12);
    const observaciones: string[] = [];
    if (r.skatteloftsnedslag > 0) {
      observaciones.push(`Skatteloftet sætter mellemskatten ned med ${r.skatteloftsnedslag.toFixed(2).replace(".", ",")} procentpoint i din kommune.`);
    }
    if (r.mellemskat === 0) observaciones.push("Din personlige indkomst er under mellemskattegrænsen. Du betaler hverken mellemskat eller topskat.");
    return {
      ekstraSkat: redondear(r.mellemskat + r.topskat + r.toptopskat),
      personlig: r.personlig,
      mellemskat: r.mellemskat,
      topskat: r.topskat,
      toptopskat: r.toptopskat,
      overMellem: redondear(Math.max(0, r.personlig - s.mellemGraense)),
      overTop: redondear(Math.max(0, r.personlig - s.topGraense)),
      loenMellem: loenVed(s.mellemGraense),
      loenTop: loenVed(s.topGraense),
      loenToptop: loenVed(s.toptopGraense),
      marginal: r.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "ekstraSkat", etiqueta: "Mellemskat, topskat og toptopskat pr. år", formato: "moneda", destacada: true },
    { clave: "personlig", etiqueta: "Personlig indkomst efter am-bidrag", formato: "moneda" },
    { clave: "mellemskat", etiqueta: "Mellemskat", formato: "moneda" },
    { clave: "topskat", etiqueta: "Topskat", formato: "moneda" },
    { clave: "toptopskat", etiqueta: "Toptopskat", formato: "moneda", ocultarSiCero: true },
    { clave: "overMellem", etiqueta: "Indkomst over mellemskattegrænsen", formato: "moneda" },
    { clave: "overTop", etiqueta: "Indkomst over topskattegrænsen", formato: "moneda" },
    { clave: "loenMellem", etiqueta: "Månedsløn, hvor mellemskatten begynder", formato: "moneda" },
    { clave: "loenTop", etiqueta: "Månedsløn, hvor topskatten begynder", formato: "moneda" },
    { clave: "loenToptop", etiqueta: "Månedsløn, hvor toptopskatten begynder", formato: "moneda" },
    { clave: "marginal", etiqueta: "Marginalskat uden kirkeskat (af de næste 100 kr.)", formato: "porcentaje", decimales: 1 },
  ],
});
