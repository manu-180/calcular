import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.izracun-regresa",
  mercado: "si",
  concepto: "bono-semestral",
  slug: "izracun-regresa",
  estado: "publicado",
  requiere: { "si.minimalna-placa": "numero", "si.regres-najmanj": "numero", "si.povprecna-placa": "serie" },
  campos: [
    { id: "meseci", tipo: "entero", etiqueta: "Meseci zaposlitve v letu", min: 1, max: 12, porDefecto: 12 },
    { id: "delez", tipo: "porcentaje", etiqueta: "Delež polnega delovnega časa", min: 1, max: 100, porDefecto: 100 },
    { id: "izplacan", tipo: "moneda", etiqueta: "Regres, ki ga dobite ali načrtujete", min: 0, requerido: false, ayuda: "Če polje pustite prazno, računamo z zakonskim minimumom." },
  ],
  calcular(e, v, { redondear }) {
    if (e.meseci < 1 || e.meseci > 12) throw new ErrorEntrada("Vnesite od 1 do 12 mesecev.", "meseci");
    const najmanj = redondear(((v["si.minimalna-placa"] * v["si.regres-najmanj"]) / 100) * (e.delez / 100) * (e.meseci / 12));
    const znesek = e.izplacan ?? najmanj;
    const meja = v["si.povprecna-placa"].valor;
    const obdavcen = redondear(Math.max(0, znesek - meja));
    const opombe: string[] = [];
    if (e.izplacan !== null && e.izplacan < najmanj) opombe.push("Ta znesek je nižji od zakonskega minimuma.");
    return { najmanj, znesek, meja, neobdavcen: redondear(znesek - obdavcen), obdavcen, observaciones: opombe };
  },
  resultado: [
    { clave: "najmanj", etiqueta: "Najnižji regres, ki vam pripada", formato: "moneda", destacada: true },
    { clave: "znesek", etiqueta: "Upoštevani regres", formato: "moneda" },
    { clave: "meja", etiqueta: "Zadnja znana povprečna mesečna plača", formato: "moneda" },
    { clave: "neobdavcen", etiqueta: "Del brez dohodnine in prispevkov", formato: "moneda" },
    { clave: "obdavcen", etiqueta: "Del z dohodnino in prispevki", formato: "moneda", ocultarSiCero: true },
  ],
});
