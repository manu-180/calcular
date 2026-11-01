import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ee.tootuskindlustushuvitis",
  mercado: "ee",
  concepto: "propio",
  slug: "tootuskindlustushuvitis",
  estado: "publicado",
  requiere: {
    "ee.tkh-maar-algus": "numero",
    "ee.tkh-maar-hiljem": "numero",
    "ee.tkh-paevad": "mapa",
    "ee.tkh-baasmaar": "numero",
    "ee.tkh-baaspaevad": "numero",
    "ee.tkh-max-algus": "numero",
    "ee.tkh-max-hiljem": "numero",
    "ee.tkh-staaz": "numero",
    "ee.tkh-baasstaaz": "numero",
  },
  campos: [
    { id: "tasu", tipo: "moneda", etiqueta: "Üheksa kuu tasu kokku", ayuda: "Viimasele kolmele töötamise kuule eelnenud üheksa kuu bruto.", min: 0, porDefecto: 18000 },
    { id: "staaz36", tipo: "entero", etiqueta: "Kindlustusstaaž viimase 36 kuu jooksul (kuud)", min: 0, max: 36, porDefecto: 36 },
    { id: "staazAastad", tipo: "numero", etiqueta: "Kogu kindlustusstaaž (aastad)", min: 0, max: 60, porDefecto: 6 },
    { id: "omaSoov", tipo: "si-no", etiqueta: "Lõpetasid töösuhte omal algatusel", ayuda: "Siis on õigus ainult baasmääras hüvitisele (seaduse erandid jätame kõrvale).", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.tasu < 0) throw new ErrorEntrada("Tasu ei saa olla negatiivne.", "tasu");
    if (e.staaz36 < v["ee.tkh-baasstaaz"]) throw new ErrorEntrada(`Hüvitise saamiseks on vaja vähemalt ${v["ee.tkh-baasstaaz"]} kuud staaži viimase 36 kuu jooksul.`, "staaz36");
    const baas = e.omaSoov || e.staaz36 < v["ee.tkh-staaz"];
    if (baas) {
      const p = v["ee.tkh-baaspaevad"];
      const maar = v["ee.tkh-baasmaar"];
      return { kokku: redondear(p * maar), liik: "baasmäär", paevad: p, algus: maar, hiljem: maar, kuuAlgus: redondear(maar * 30), kuuHiljem: redondear(maar * 30), paevaTasu: null };
    }
    const paevaTasu = e.tasu / 270;
    const miin = v["ee.tkh-baasmaar"];
    const algus = Math.max(Math.min(porcentaje(paevaTasu, v["ee.tkh-maar-algus"]), v["ee.tkh-max-algus"]), miin);
    const hiljem = Math.max(Math.min(porcentaje(paevaTasu, v["ee.tkh-maar-hiljem"]), v["ee.tkh-max-hiljem"]), miin);
    const klass = e.staazAastad < 5 ? "alla5" : e.staazAastad < 10 ? "kuni10" : "ule10";
    const paevad = enMapa(v["ee.tkh-paevad"], klass);
    return {
      kokku: redondear(algus * 100 + hiljem * (paevad - 100)),
      liik: "sissetulekupõhine",
      paevad,
      algus: redondear(algus),
      hiljem: redondear(hiljem),
      kuuAlgus: redondear(algus * 30),
      kuuHiljem: redondear(hiljem * 30),
      paevaTasu: redondear(paevaTasu),
    };
  },
  resultado: [
    { clave: "kokku", etiqueta: "Hüvitis kogu perioodi eest bruto", formato: "moneda", destacada: true },
    { clave: "liik", etiqueta: "Hüvitise liik", formato: "texto" },
    { clave: "paevad", etiqueta: "Hüvitise periood", formato: "dias" },
    { clave: "algus", etiqueta: "1. kuni 100. päeval kalendripäevas", formato: "moneda" },
    { clave: "hiljem", etiqueta: "Alates 101. päevast kalendripäevas", formato: "moneda" },
    { clave: "kuuAlgus", etiqueta: "30 päeva eest alguses", formato: "moneda" },
    { clave: "kuuHiljem", etiqueta: "30 päeva eest hiljem", formato: "moneda" },
    { clave: "paevaTasu", etiqueta: "Keskmine kalendripäeva töötasu", formato: "moneda" },
  ],
});
