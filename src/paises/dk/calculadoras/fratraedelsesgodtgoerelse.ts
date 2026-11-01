import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { heleAar } from "../lib/datoer";

export default definirCalculadora({
  id: "dk.fratraedelsesgodtgoerelse",
  mercado: "dk",
  concepto: "indemnizacion-despido",
  slug: "fratraedelsesgodtgoerelse",
  estado: "publicado",
  requiere: { "dk.fratraedelsesgodtgoerelse": "mapa" },
  campos: [
    { id: "ansat", tipo: "fecha", etiqueta: "Ansat fra", min: "1950-01-01", porDefecto: "2010-03-01" },
    { id: "fratraeden", tipo: "fecha", etiqueta: "Fratrædelsesdato (sidste dag i jobbet)", min: "1950-01-01", porDefecto: "hoy" },
    { id: "loen", tipo: "moneda", etiqueta: "Månedsløn før skat", min: 0, porDefecto: 40000, ayuda: "Med faste tillæg og arbejdsgiverens pensionsbidrag, hvis du får det." },
  ],
  calcular(e, v, { redondear }) {
    if (e.fratraeden <= e.ansat) throw new ErrorEntrada("Fratrædelsesdatoen skal ligge efter ansættelsesdatoen.", "fratraeden");
    if (e.loen <= 0) throw new ErrorEntrada("Skriv en månedsløn, der er større end 0.", "loen");
    const aar = heleAar(e.ansat, e.fratraeden);
    const godtgoerelse = v["dk.fratraedelsesgodtgoerelse"];
    // Nøglerne er antal år ("12-aar"): godtgørelsen for det højeste trin, du har nået.
    const trin = Object.keys(godtgoerelse)
      .map((k) => ({ k, aar: Number.parseInt(k, 10) }))
      .sort((a, b) => a.aar - b.aar);
    const naaet = trin.filter((t) => aar >= t.aar).at(-1);
    const naeste = trin.find((t) => aar < t.aar);
    const maaneder = naaet ? enMapa(godtgoerelse, naaet.k) : 0;
    const observaciones: string[] = [];
    if (!naaet && naeste) observaciones.push(`Du har ${aar} års anciennitet. Godtgørelsen kræver mindst ${naeste.aar} års uafbrudt ansættelse.`);
    else if (naeste) observaciones.push(`Ved ${naeste.aar} års ansættelse stiger godtgørelsen. Du mangler ${naeste.aar - aar} år.`);
    observaciones.push("Godtgørelsen gælder, når arbejdsgiveren siger dig op eller bortviser dig uberettiget. Siger du selv op, får du den ikke.");
    return {
      beloeb: redondear(maaneder * e.loen),
      maaneder,
      aar,
      observaciones,
    };
  },
  resultado: [
    { clave: "beloeb", etiqueta: "Fratrædelsesgodtgørelse før skat", formato: "moneda", destacada: true },
    { clave: "maaneder", etiqueta: "Antal månedslønninger", formato: "meses" },
    { clave: "aar", etiqueta: "Anciennitet ved fratræden", formato: "anios" },
  ],
});
