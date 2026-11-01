import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.ettevotluskonto",
  mercado: "ee",
  concepto: "regimen-simplificado",
  slug: "ettevotluskonto",
  estado: "publicado",
  requiere: {
    "ee.ettevotluskonto": "mapa",
    "ee.ettevotluskonto-piir": "numero",
    "ee.ettevotluskonto-ravikindlustus": "numero",
  },
  campos: [
    { id: "kuus", tipo: "moneda", etiqueta: "Kontole laekuv summa kuus", min: 0, porDefecto: 2500 },
    { id: "sammas", tipo: "opcion-dato", dato: "ee.ettevotluskonto", etiqueta: "II samba valik", porDefecto: "0" },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.kuus, "kuus");
    const maar = enMapa(v["ee.ettevotluskonto"], e.sammas);
    const maks = redondear(porcentaje(e.kuus, maar));
    const aastas = redondear(e.kuus * 12);
    const observaciones: string[] = [];
    if (aastas > v["ee.ettevotluskonto-piir"]) observaciones.push("See summa ületab ettevõtluskonto aastase piiri. Pärast piiri ületamist tuleb tegutseda FIE või osaühinguna ja registreeruda käibemaksukohustuslaseks.");
    if (e.sammas === "0" && e.kuus < v["ee.ettevotluskonto-ravikindlustus"]) observaciones.push("Selle kuu laekumine jääb alla summa, mis annab ravikindlustuse.");
    return { jaab: redondear(e.kuus - maks), maks, maar, aastas, jaabAastas: redondear(aastas - porcentaje(aastas, maar)), observaciones };
  },
  resultado: [
    { clave: "jaab", etiqueta: "Sulle jääb kuus", formato: "moneda", destacada: true },
    { clave: "maks", etiqueta: "Ettevõtlustulu maks kuus", formato: "moneda" },
    { clave: "maar", etiqueta: "Maksumäär", formato: "porcentaje" },
    { clave: "aastas", etiqueta: "Laekumine aastas", formato: "moneda" },
    { clave: "jaabAastas", etiqueta: "Sulle jääb aastas", formato: "moneda" },
  ],
});
