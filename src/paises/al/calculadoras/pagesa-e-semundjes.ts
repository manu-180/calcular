import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

const DITE_MUAJ = 30;

export default definirCalculadora({
  id: "al.pagesa-e-semundjes",
  mercado: "al",
  concepto: "propio",
  slug: "pagesa-e-semundjes",
  estado: "publicado",
  requiere: { "al.semundje": "mapa", "al.semundje-dite-punedhenes": "numero" },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Paga neto mesatare e 6 muajve të fundit", min: 0, porDefecto: 70000 },
    { id: "dite", tipo: "entero", etiqueta: "Ditë në raport mjekësor", min: 1, max: 270, porDefecto: 20 },
    {
      id: "rasti",
      tipo: "opcion",
      etiqueta: "Rasti juaj",
      opciones: [
        { valor: "deri-10", etiqueta: "Deri në 10 vjet sigurim" },
        { valor: "mbi-10", etiqueta: "Mbi 10 vjet sigurim" },
        { valor: "spital", etiqueta: "Në spital, pa njeri në ngarkim" },
      ],
      porDefecto: "mbi-10",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Vendosni pagën neto mesatare.", "neto");
    const norma = enMapa(v["al.semundje"], e.rasti);
    const ditore = (e.neto / DITE_MUAJ) * (norma / 100);
    const ditePun = Math.min(e.dite, v["al.semundje-dite-punedhenes"]);
    const punedhenesi = redondear(ditore * ditePun);
    const issh = redondear(ditore * (e.dite - ditePun));
    return {
      gjithsej: redondear(punedhenesi + issh),
      punedhenesi,
      issh,
      ditore: redondear(ditore),
      norma,
      observaciones: ["Mesatarja ditore llogaritet këtu me 30 ditë në muaj. Punëdhënësi nuk mund të paguajë më pak për ditët e tij, por kontrata mund të japë më shumë."],
    };
  },
  resultado: [
    { clave: "gjithsej", etiqueta: "E ardhura për sëmundje", formato: "moneda", destacada: true },
    { clave: "punedhenesi", etiqueta: "Pjesa e punëdhënësit", formato: "moneda" },
    { clave: "issh", etiqueta: "Pjesa e ISSH-së", formato: "moneda", ocultarSiCero: true },
    { clave: "ditore", etiqueta: "Pagesa për një ditë", formato: "moneda" },
    { clave: "norma", etiqueta: "Norma e zbatuar", formato: "porcentaje" },
  ],
});
