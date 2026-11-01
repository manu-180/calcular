import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.irt-grupo-c",
  mercado: "ao",
  concepto: "regimen-simplificado",
  slug: "irt-grupo-c",
  estado: "publicado",
  requiere: {
    "ao.irt-grupo-c-taxa": "numero",
    "ao.irt-grupo-c-limite": "numero",
    "ao.irt-grupo-c-agricola": "numero",
  },
  campos: [
    { id: "facturacao", tipo: "moneda", etiqueta: "Volume de facturação de 2025", min: 0, porDefecto: 6000000 },
    { id: "vendas", tipo: "moneda", etiqueta: "Vendas e serviços a declarar (sem os sujeitos a retenção na fonte)", min: 0, porDefecto: 6000000 },
    { id: "agricola", tipo: "si-no", etiqueta: "Actividade agrícola, silvícola, pecuária ou piscatória", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const limite = valores["ao.irt-grupo-c-limite"];
    let taxa: number;
    if (entrada.facturacao <= limite) {
      taxa = valores["ao.irt-grupo-c-taxa"];
    } else if (entrada.agricola) {
      taxa = valores["ao.irt-grupo-c-agricola"];
    } else {
      throw new ErrorEntrada(
        "Acima deste volume de facturação, o Grupo C não paga a taxa sobre as vendas: o rendimento apura-se pela tabela de lucros mínimos ou pela contabilidade.",
        "facturacao",
      );
    }
    return {
      imposto: redondear(porcentaje(entrada.vendas, taxa)),
      taxa,
      depois: redondear(entrada.vendas - porcentaje(entrada.vendas, taxa)),
      observaciones: ["Quem tem contabilidade organizada segue as regras do Imposto Industrial, seja qual for o volume de facturação."],
    };
  },
  resultado: [
    { clave: "imposto", etiqueta: "IRT a pagar", formato: "moneda", destacada: true },
    { clave: "taxa", etiqueta: "Taxa aplicada", formato: "porcentaje", decimales: 1 },
    { clave: "depois", etiqueta: "Vendas depois do imposto", formato: "moneda" },
  ],
});
