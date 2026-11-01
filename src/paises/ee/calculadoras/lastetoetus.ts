import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ee.lastetoetus",
  mercado: "ee",
  concepto: "propio",
  slug: "lastetoetus",
  estado: "publicado",
  requiere: {
    "ee.lapsetoetus-esimesed": "numero",
    "ee.lapsetoetus-jargmised": "numero",
    "ee.lasterikas-kuni6": "numero",
    "ee.lasterikas-7": "numero",
    "ee.sunnitoetus": "numero",
    "ee.sunnitoetus-mitmikud": "numero",
  },
  campos: [
    { id: "lapsed", tipo: "entero", etiqueta: "Lapsed, kellele lapsetoetus on ette nähtud", ayuda: "Sünnist kuni 19-aastaseks saamiseni; keskhariduseta õppijal kuni õppeaasta lõpuni.", min: 0, max: 20, porDefecto: 2 },
    { id: "vastsundinud", tipo: "entero", etiqueta: "Korraga sündinud lapsed, kelle eest küsid sünnitoetust", min: 0, max: 8, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.lapsed < 0 || e.vastsundinud < 0) throw new ErrorEntrada("Laste arv ei saa olla negatiivne.", "lapsed");
    const esimesed = Math.min(e.lapsed, 2);
    const jargmised = Math.max(0, e.lapsed - 2);
    const lapsetoetus = esimesed * v["ee.lapsetoetus-esimesed"] + jargmised * v["ee.lapsetoetus-jargmised"];
    const lasterikas = e.lapsed >= 7 ? v["ee.lasterikas-7"] : e.lapsed >= 3 ? v["ee.lasterikas-kuni6"] : 0;
    const kuus = lapsetoetus + lasterikas;
    const sunnitoetus = e.vastsundinud * (e.vastsundinud >= 3 ? v["ee.sunnitoetus-mitmikud"] : v["ee.sunnitoetus"]);
    return { kuus: redondear(kuus), lapsetoetus: redondear(lapsetoetus), lasterikas, aastas: redondear(kuus * 12), sunnitoetus };
  },
  resultado: [
    { clave: "kuus", etiqueta: "Peretoetused kuus", formato: "moneda", destacada: true },
    { clave: "lapsetoetus", etiqueta: "Lapsetoetus", formato: "moneda" },
    { clave: "lasterikas", etiqueta: "Lasterikka pere toetus", formato: "moneda", ocultarSiCero: true },
    { clave: "aastas", etiqueta: "Toetused aastas", formato: "moneda" },
    { clave: "sunnitoetus", etiqueta: "Ühekordne sünnitoetus", formato: "moneda", ocultarSiCero: true },
  ],
});
