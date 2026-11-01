import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.izracun-otpremnine",
  mercado: "hr",
  concepto: "indemnizacion-despido",
  slug: "izracun-otpremnine",
  estado: "publicado",
  requiere: {
    "hr.otpremnina-nazivnik": "numero",
    "hr.otpremnina-uvjet": "numero",
    "hr.otpremnina-najvise": "numero",
    "hr.otpremnina-neoporezivo": "numero",
    "hr.otpremnina-mirovina": "numero",
    "hr.otpremnina-ozljeda": "numero",
  },
  campos: [
    { id: "placa", tipo: "moneda", etiqueta: "Prosječna mjesečna plaća u zadnja tri mjeseca", min: 0, porDefecto: 1800 },
    { id: "godine", tipo: "entero", etiqueta: "Navršene godine rada kod poslodavca", min: 0, max: 60, porDefecto: 8 },
    { id: "skrivljeno", tipo: "si-no", etiqueta: "Otkaz zbog vašeg ponašanja", ayuda: "Tada zakonska otpremnina ne pripada.", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.placa <= 0) throw new ErrorEntrada("Unesite plaću veću od nule.", "placa");
    const imaPravo = !e.skrivljeno && e.godine >= v["hr.otpremnina-uvjet"];
    const izracun = imaPravo ? (e.placa * e.godine) / v["hr.otpremnina-nazivnik"] : 0;
    const najvise = e.placa * v["hr.otpremnina-najvise"];
    const otpremnina = redondear(Math.min(izracun, najvise));
    const neoporezivo = redondear(Math.min(otpremnina, v["hr.otpremnina-neoporezivo"] * e.godine));
    const observaciones: string[] = [];
    if (!imaPravo) observaciones.push(e.skrivljeno ? "Kod otkaza zbog ponašanja radnika zakonska otpremnina ne pripada." : "Pravo nastaje nakon dvije godine neprekidnog rada.");
    if (izracun > najvise) observaciones.push("Primijenjena je zakonska gornja granica od šest prosječnih plaća.");
    return { otpremnina, neoporezivo, oporezivo: redondear(otpremnina - neoporezivo), observaciones };
  },
  resultado: [
    { clave: "otpremnina", etiqueta: "Najmanja zakonska otpremnina", formato: "moneda", destacada: true },
    { clave: "neoporezivo", etiqueta: "Neoporezivi dio", formato: "moneda" },
    { clave: "oporezivo", etiqueta: "Dio iznad neoporezive svote", formato: "moneda", ocultarSiCero: true },
  ],
});
