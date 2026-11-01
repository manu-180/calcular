import { definirCalculadora } from "@/motor/calculo";
import { diasEntre, somarDias, somarMeses } from "../lib/datas";

export default definirCalculadora({
  id: "cv.aviso-previo",
  mercado: "cv",
  concepto: "preaviso",
  slug: "aviso-previo",
  estado: "publicado",
  requiere: {
    "cv.aviso-rescisao-dias-ano": "numero",
    "cv.aviso-rescisao-maximo": "numero",
    "cv.aviso-objetiva-comunicacao": "numero",
    "cv.aviso-objetiva-decisao": "numero",
    "cv.aviso-coletivo": "numero",
  },
  campos: [
    {
      id: "situacao",
      tipo: "opcion",
      etiqueta: "Situação",
      porDefecto: "rescisao",
      opciones: [
        { valor: "rescisao", etiqueta: "O trabalhador pede a rescisão do contrato" },
        { valor: "objetiva", etiqueta: "Despedimento por justa causa objetiva" },
        { valor: "coletiva", etiqueta: "Despedimento coletivo" },
      ],
    },
    {
      id: "anos",
      tipo: "entero",
      etiqueta: "Anos de serviço",
      min: 0,
      max: 60,
      porDefecto: 3,
      visibleSi: { situacao: ["rescisao"] },
    },
    { id: "data", tipo: "fecha", etiqueta: "Data da comunicação", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    const observaciones: string[] = [];
    let cessacao: string;
    let regra: string;
    if (entrada.situacao === "rescisao") {
      const anos = entrada.anos ?? 0;
      const porAnos = somarDias(entrada.data, valores["cv.aviso-rescisao-dias-ano"] * anos);
      const limite = somarMeses(entrada.data, valores["cv.aviso-rescisao-maximo"]);
      cessacao = porAnos < limite ? porAnos : limite;
      regra = `${valores["cv.aviso-rescisao-dias-ano"]} dias por ano de serviço, até ao máximo de ${valores["cv.aviso-rescisao-maximo"]} meses`;
      observaciones.push("Vale quando o contrato não fixa o aviso prévio. Se o contrato fixar outro prazo, é esse que conta.");
      observaciones.push("Quem não cumprir o aviso paga à empresa a retribuição do período em falta.");
      if (anos === 0) observaciones.push("Sem anos de serviço completos o cálculo supletivo dá zero dias. Veja o prazo no contrato.");
    } else if (entrada.situacao === "objetiva") {
      cessacao = somarDias(entrada.data, valores["cv.aviso-objetiva-comunicacao"]);
      regra = `comunicação com ${valores["cv.aviso-objetiva-comunicacao"]} dias de antecedência e decisão final com ${valores["cv.aviso-objetiva-decisao"]} dias`;
      observaciones.push("A data é a mais cedo possível. A decisão final tem de ser comunicada por escrito com a antecedência indicada, depois da resposta do trabalhador.");
    } else {
      cessacao = somarDias(entrada.data, valores["cv.aviso-coletivo"]);
      regra = `comunicação da decisão com ${valores["cv.aviso-coletivo"]} dias de antecedência`;
      observaciones.push("Sem esse aviso, o contrato só cessa depois de decorrido o período em falta, e o empregador paga a retribuição desse período.");
    }
    return { dias: diasEntre(entrada.data, cessacao), cessacao, regra, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Dias de aviso prévio", formato: "dias", destacada: true },
    { clave: "cessacao", etiqueta: "Data mais cedo de fim do contrato", formato: "fecha" },
    { clave: "regra", etiqueta: "Regra aplicada", formato: "texto" },
  ],
});
