import type { DiccionarioLegal } from "./tipos";

export const pt: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Quem somos | CalcularYa",
      description: "O CalcularYa faz calculadoras de trabalho, dinheiro e dia a dia para cada país, com os dados tirados da fonte oficial.",
      h1: "Quem somos",
      bajada: "Calculadoras para cada país, com o dado oficial de cada um.",
      bloques: [
        {
          parrafos: [
            "O CalcularYa é um site de calculadoras para as contas do dia a dia: salário, empréstimos, impostos, datas e muito mais.",
            "Quem faz é Manuel Navarro, que também mantém o calcular.ar, o site de calculadoras da Argentina.",
          ],
        },
        {
          titulo: "Como trabalhamos",
          parrafos: [
            "Quando uma conta depende de uma norma (um salário mínimo, uma alíquota de contribuição, um teto), conferimos o valor na fonte oficial do país: o diário oficial, o ministério, o banco central ou o órgão que arrecada os impostos.",
            "Guardamos o link e a data da conferência e mostramos os dois junto de cada calculadora.",
            "Se um valor não pôde ser confirmado na fonte oficial, a calculadora que o usa não é publicada.",
            "Quando uma norma muda, a calculadora muda junto e a mudança fica registrada nas novidades de cada país.",
          ],
        },
        { titulo: "Grátis", parrafos: ["As calculadoras são grátis e não pedem cadastro."] },
      ],
    },
    contacto: {
      title: "Contato | CalcularYa",
      description: "Escreva para nós se um dado estiver desatualizado, se uma conta não der o esperado ou se faltar uma calculadora ou um país.",
      h1: "Contato",
      bajada: `Nosso e-mail é ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Ajuda muito saber se um dado está desatualizado, se uma conta não deu o resultado esperado ou se falta uma calculadora ou um país.",
            "Se for sobre um dado, informe o país e a página onde ele aparece.",
            "Quem responde é uma pessoa. Pode levar alguns dias.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privacidade | CalcularYa",
      description: "Quais dados o CalcularYa usa: o que é digitado numa calculadora é processado no navegador e não fica guardado.",
      h1: "Privacidade",
      bajada: `Última atualização: ${actualizado}.`,
      bloques: [
        {
          titulo: "O que é digitado numa calculadora",
          parrafos: ["A conta é feita no navegador. O que é digitado não é enviado a nenhum servidor e não fica guardado."],
        },
        {
          titulo: "O país da visita",
          parrafos: [
            "Para sugerir as calculadoras do país certo, verificamos de que país vem a visita. Nosso provedor de hospedagem deduz isso a partir do endereço IP.",
            "Não guardamos o IP. A resposta fica no navegador enquanto dura a visita.",
          ],
        },
        {
          titulo: "O que o navegador guarda",
          parrafos: [
            "No armazenamento de sessão do navegador, que é apagado ao fechar a aba, lembramos o país da visita, se o aviso que o sugere foi fechado e, quando a visita chega por um link compartilhado, o código desse link.",
            "No armazenamento local, que fica até ser apagado pelo navegador, guardamos o país escolhido manualmente, um número aleatório para contar visitas e a versão de um teste de design que aparece, para que o site fique igual a cada visita. Nada disso diz quem é a pessoa.",
            "Não usamos cookies de publicidade nem de rastreamento.",
          ],
        },
        {
          titulo: "Hospedagem",
          parrafos: ["O site está hospedado na Vercel. Como qualquer servidor, ela registra dados técnicos de cada visita (o endereço IP e o navegador) para que o site funcione com segurança."],
        },
        {
          titulo: "Como contamos as visitas",
          parrafos: [
            "Medimos o uso do site com uma ferramenta própria: quais páginas são abertas e quanto são usadas, de qual site veio a visita, o tipo de aparelho e o país. O número aleatório guardado no navegador serve para distinguir uma visita nova de uma que volta. Não guardamos o IP nem o que é digitado numa calculadora.",
            "Os links compartilhados a partir do site levam um código aleatório, diferente a cada compartilhamento, para contar quantas visitas cada um traz. Esse código não identifica ninguém.",
            "Os valores digitados numa calculadora nunca saem do navegador dentro de um link.",
          ],
        },
        {
          titulo: "Mudanças e dúvidas",
          parrafos: [
            "Se algo disso mudar (por exemplo, se passarmos a ter publicidade), vamos avisar nesta página antes que a mudança comece a valer.",
            `Para qualquer dúvida sobre dados pessoais, nosso e-mail é ${mail}.`,
          ],
        },
        {
          titulo: "Os salários informados",
          parrafos: [
            "Em «Salários reais» é possível informar um salário de forma anônima e opcional, só com consentimento explícito. Guardamos o país, a profissão (de uma lista fechada), a faixa de anos de experiência, o salário bruto por mês arredondado a dois dígitos e o mês. Não guardamos IP, navegador, conta nem a data exata.",
            "Só publicamos a mediana e a faixa de grupos de 10 pessoas ou mais. Nenhum salário individual é mostrado.",
            "Para não repetir o mesmo país no mesmo mês, o navegador lembra no armazenamento local o país e o mês da contribuição, nunca o valor.",
            "Como a contribuição não fica ligada a ninguém, não há como encontrá-la depois para apagá-la.",
          ],
        },
      ],
    },
    terminos: {
      title: "Termos de uso | CalcularYa",
      description: "As calculadoras do CalcularYa dão uma estimativa com os dados oficiais em vigor. Servem de orientação e não substituem uma assessoria.",
      h1: "Termos de uso",
      bajada: `Última atualização: ${actualizado}.`,
      bloques: [
        {
          titulo: "Para que servem as calculadoras",
          parrafos: [
            "Os resultados são uma estimativa feita com os dados oficiais em vigor. Servem de orientação.",
            "Não substituem o cálculo de um empregador, de um contador ou de um advogado, nem o que diz o órgão oficial.",
          ],
        },
        {
          titulo: "De onde vêm os dados",
          parrafos: [
            "Cada calculadora mostra a fonte oficial dos seus valores e a data em que os conferimos.",
            "Fazemos o possível para mantê-los em dia, mas uma norma pode mudar antes de a incluirmos.",
          ],
        },
        {
          titulo: "Uso do site",
          parrafos: ["O site é grátis. É permitido usá-lo e compartilhar os links. Não é permitido copiar o conteúdo em massa nem se passar pelo CalcularYa."],
        },
        {
          titulo: "Responsabilidade",
          parrafos: ["Não respondemos por decisões tomadas só com base num resultado do site. Antes de assinar, pagar ou reclamar algo, vale confirmar a conta com quem for responsável."],
        },
        { titulo: "Contato", parrafos: [`Nosso e-mail é ${mail}.`] },
      ],
    },
  },
});
