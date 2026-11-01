import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { poistne } from "../lib/mzda";
import { nadol } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.odvody-szco",
  mercado: "sk",
  concepto: "aportes-seguridad-social",
  slug: "odvody-szco",
  estado: "publicado",
  requiere: {
    "sk.odvody-szco": "mapa",
    "sk.zdravotne-odvody": "mapa",
    "sk.max-vymeriavaci-zaklad": "numero",
    "sk.min-vz-szco": "numero",
    "sk.osobitny-vz-szco": "numero",
    "sk.hranica-prijmu-szco": "numero",
    "sk.koeficient-szco": "numero",
    "sk.min-preddavok-szco": "numero",
  },
  campos: [
    { id: "prijem", tipo: "moneda", etiqueta: "Príjem z podnikania za rok (bez výdavkov)", min: 0, porDefecto: 30000 },
    { id: "zaklad", tipo: "moneda", etiqueta: "Základ dane za rok pred odpočítaním odvodov", min: 0, porDefecto: 12000, ayuda: "Príjmy mínus výdavky, bez zaplateného poistného." },
  ],
  calcular(e, v, { redondear }) {
    if (e.zaklad > e.prijem) throw new ErrorEntrada("Základ dane nemôže byť vyšší ako príjem.", "zaklad");
    const koef = v["sk.koeficient-szco"];
    const zMesacneho = nadol(e.zaklad / 12 / koef);
    const osobitny = e.prijem <= v["sk.hranica-prijmu-szco"];
    const vz = osobitny ? v["sk.osobitny-vz-szco"] : Math.min(Math.max(zMesacneho, v["sk.min-vz-szco"]), v["sk.max-vymeriavaci-zaklad"]);
    const socialne = poistne(vz, v["sk.odvody-szco"], v["sk.max-vymeriavaci-zaklad"]);
    const zdravotne = Math.max(nadol((zMesacneho * v["sk.zdravotne-odvody"].szco) / 100), v["sk.min-preddavok-szco"]);
    const observaciones: string[] = [];
    if (osobitny) observaciones.push("Pri tomto príjme platíte sociálne poistenie z osobitného vymeriavacieho základu.");
    observaciones.push("Nová SZČO má povinné sociálne poistenie od prvého dňa šiesteho mesiaca po mesiaci, od ktorého je oprávnená podnikať. Zdravotné preddavky platí od začiatku.");
    return { spolu: redondear(socialne + zdravotne), vz, socialne, zdravotne, rocne: redondear((socialne + zdravotne) * 12), observaciones };
  },
  resultado: [
    { clave: "spolu", etiqueta: "Odvody spolu za mesiac", formato: "moneda", destacada: true },
    { clave: "vz", etiqueta: "Vymeriavací základ do Sociálnej poisťovne", formato: "moneda" },
    { clave: "socialne", etiqueta: "Sociálne poistenie", formato: "moneda" },
    { clave: "zdravotne", etiqueta: "Preddavok na zdravotné poistenie", formato: "moneda" },
    { clave: "rocne", etiqueta: "Odvody za rok", formato: "moneda" },
  ],
});
