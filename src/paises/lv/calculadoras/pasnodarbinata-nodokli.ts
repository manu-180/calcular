import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.pasnodarbinata-nodokli",
  mercado: "lv",
  concepto: "retencion-honorarios",
  slug: "pasnodarbinata-nodokli",
  estado: "publicado",
  requiere: {
    "lv.pasnodarbinata-likme": "mapa",
    "lv.pasnodarbinata-pensija": "numero",
    "lv.pasnodarbinata-objekts": "numero",
    "lv.iin-gada": "escala",
    "lv.neapliekamais-minimums": "numero",
    "lv.mikro-likme": "numero",
  },
  campos: [
    { id: "pelna", tipo: "moneda", etiqueta: "Ieņēmumi mīnus izdevumi mēnesī", min: 0, porDefecto: 1500 },
    { id: "kategorija", tipo: "opcion-dato", dato: "lv.pasnodarbinata-likme", etiqueta: "VSAOI kategorija", porDefecto: "vispariga" },
    { id: "minimums", tipo: "si-no", etiqueta: "Piemērot neapliekamo minimumu šim ienākumam", porDefecto: true, ayuda: "Ja minimumu jau izmantojat algai citā darbavietā, atzīmējiet „Nē“." },
  ],
  calcular(e, v, { redondear }) {
    if (e.pelna <= 0) throw new ErrorEntrada("Ievadiet mēneša ienākumu, kas lielāks par nulli.", "pelna");
    const objekts = v["lv.pasnodarbinata-objekts"];
    const pamata = e.pelna >= objekts ? redondear(porcentaje(objekts, enMapa(v["lv.pasnodarbinata-likme"], e.kategorija))) : 0;
    const atlikums = e.pelna >= objekts ? e.pelna - objekts : e.pelna;
    const pensijai = redondear(porcentaje(atlikums, v["lv.pasnodarbinata-pensija"]));
    const vsaoi = redondear(pamata + pensijai);
    const apliekams = Math.max(0, (e.pelna - vsaoi - (e.minimums ? v["lv.neapliekamais-minimums"] : 0)) * 12);
    const iin = redondear(aplicarEscalaMarginal(v["lv.iin-gada"], apliekams) / 12);
    return { paliek: redondear(e.pelna - vsaoi - iin), pamata, pensijai, vsaoi, iin };
  },
  resultado: [
    { clave: "paliek", etiqueta: "Paliek mēnesī pēc nodokļiem", formato: "moneda", destacada: true },
    { clave: "pamata", etiqueta: "VSAOI no obligātā objekta", formato: "moneda", ocultarSiCero: true },
    { clave: "pensijai", etiqueta: "Pensiju apdrošināšana no pārējā ienākuma", formato: "moneda", ocultarSiCero: true },
    { clave: "vsaoi", etiqueta: "VSAOI kopā", formato: "moneda" },
    { clave: "iin", etiqueta: "IIN (mēneša vidējais)", formato: "moneda" },
  ],
});
