import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: durata minimă din Codul muncii nu a putut fi citită în textul consolidat (legis.md).
export default definirCalculadora({
  id: "md.calculator-concediu-de-odihna",
  mercado: "md",
  concepto: "vacaciones",
  slug: "calculator-concediu-de-odihna",
  estado: "borrador",
  requiere: { "md.concediu-odihna": "numero" },
  campos: [
    { id: "venit", tipo: "moneda", etiqueta: "Salariul brut din ultimele 3 luni, în total", min: 0, porDefecto: 45000 },
    { id: "zileLucrate", tipo: "entero", etiqueta: "Zile lucrate în ultimele 3 luni", min: 1, max: 92, porDefecto: 63 },
    { id: "zile", tipo: "entero", etiqueta: "Zile de concediu", min: 1, max: 60, requerido: false, ayuda: "Gol: durata minimă a concediului anual." },
  ],
  calcular(e, v, { redondear }) {
    if (e.venit <= 0) throw new ErrorEntrada("Introduceți un venit mai mare decât zero.", "venit");
    const zile = e.zile ?? v["md.concediu-odihna"];
    const zilnic = redondear(e.venit / e.zileLucrate);
    return { indemnizatie: redondear(zilnic * zile), zilnic, zile };
  },
  resultado: [
    { clave: "indemnizatie", etiqueta: "Indemnizația de concediu (brut)", formato: "moneda", destacada: true },
    { clave: "zilnic", etiqueta: "Salariul mediu pe o zi", formato: "moneda" },
    { clave: "zile", etiqueta: "Zile de concediu", formato: "dias" },
  ],
});
