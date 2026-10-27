import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mz.calcular-sisa",
  mercado: "mz",
  concepto: "propio",
  slug: "calcular-sisa",
  estado: "publicado",
  requiere: {
    "mz.sisa": "numero",
    "mz.sisa-agravada": "numero",
  },
  campos: [
    { id: "preco", tipo: "moneda", etiqueta: "Preço declarado na compra", min: 0, porDefecto: 3000000 },
    { id: "patrimonial", tipo: "moneda", etiqueta: "Valor patrimonial do prédio", min: 0, requerido: false, ayuda: "O valor que consta da matriz. Deixe em branco se não souber." },
    { id: "paraiso", tipo: "si-no", etiqueta: "O comprador reside num território de regime fiscal mais favorável", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const base = Math.max(entrada.preco, entrada.patrimonial ?? 0);
    const taxa = entrada.paraiso ? valores["mz.sisa-agravada"] : valores["mz.sisa"];
    const observaciones = ["Algumas transmissões estão isentas de Sisa, por exemplo a favor do Estado e das autarquias. Confirme a sua situação antes da escritura."];
    if (entrada.patrimonial === null) observaciones.unshift("Sem o valor patrimonial a conta usa só o preço declarado. A Sisa incide sobre o maior dos dois.");
    return { sisa: redondear(porcentaje(base, taxa)), base, taxa, observaciones };
  },
  resultado: [
    { clave: "sisa", etiqueta: "Sisa a pagar", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Valor sobre o qual incide", formato: "moneda" },
    { clave: "taxa", etiqueta: "Taxa", formato: "porcentaje" },
  ],
});
