import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { anoDe, anosCompletos, avosDoAno, avosDoPeriodoAquisitivo, mesesCompletos } from "../lib/datas";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.calculo-rescisao",
  mercado: "br",
  concepto: "liquidacion-final",
  slug: "calculo-rescisao",
  estado: "publicado",
  requiere: {
    "br.fracao-mes": "numero",
    "br.aviso-previo-base": "numero",
    "br.aviso-previo-por-ano": "numero",
    "br.aviso-previo-maximo": "numero",
    "br.fgts-aliquota": "numero",
    "br.fgts-multa": "numero",
    "br.fgts-multa-acordo": "numero",
    "br.fgts-saque-acordo": "numero",
  },
  campos: [
    { id: "admissao", tipo: "fecha", etiqueta: "Data de admissão" },
    { id: "saida", tipo: "fecha", etiqueta: "Último dia trabalhado", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Último salário bruto", min: 0, porDefecto: 3000 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Motivo da saída",
      opciones: [
        { valor: "sem-justa-causa", etiqueta: "Demissão sem justa causa" },
        { valor: "pedido", etiqueta: "Pedido de demissão" },
        { valor: "acordo", etiqueta: "Acordo entre as partes" },
        { valor: "justa-causa", etiqueta: "Demissão por justa causa" },
      ],
      porDefecto: "sem-justa-causa",
    },
    {
      id: "aviso",
      tipo: "opcion",
      etiqueta: "Aviso prévio",
      opciones: [
        { valor: "indenizado", etiqueta: "Indenizado (não trabalhado)" },
        { valor: "trabalhado", etiqueta: "Trabalhado" },
      ],
      porDefecto: "indenizado",
      ayuda: "No pedido de demissão, aviso não trabalhado vira desconto.",
    },
    { id: "feriasVencidas", tipo: "si-no", etiqueta: "Tenho um período de férias vencidas sem gozar", porDefecto: false },
    { id: "saldoFgts", tipo: "moneda", etiqueta: "Saldo do FGTS deste emprego", min: 0, requerido: false, ayuda: "Veja no app FGTS. Se deixar em branco, estimamos pelos depósitos de 8 % sem rendimento." },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    if (entrada.saida < entrada.admissao) throw new ErrorEntrada("O último dia tem que ser depois da admissão.", "saida");
    const { motivo, salario } = entrada;
    const diaria = salario / 30;
    const fracao = valores["br.fracao-mes"];
    const observaciones: string[] = [];

    const diaDoMes = Math.min(30, Number(entrada.saida.slice(8, 10)));
    const saldoSalario = redondear(diaria * diaDoMes);

    const anos = anosCompletos(entrada.admissao, entrada.saida);
    const diasProporcionais = Math.min(valores["br.aviso-previo-maximo"], valores["br.aviso-previo-base"] + valores["br.aviso-previo-por-ano"] * anos);
    let diasAviso = 0;
    let descontoAviso = 0;
    if (entrada.aviso === "indenizado") {
      if (motivo === "sem-justa-causa") diasAviso = diasProporcionais;
      else if (motivo === "acordo") diasAviso = Math.floor(diasProporcionais / 2);
      else if (motivo === "pedido") descontoAviso = redondear(diaria * valores["br.aviso-previo-base"]);
    }
    const avisoIndenizado = redondear(diaria * diasAviso);
    const fim = sumarDias(entrada.saida, diasAviso);

    const temProporcionais = motivo !== "justa-causa";
    const avos13 = temProporcionais ? avosDoAno(entrada.admissao, fim, anoDe(fim), fracao) : 0;
    const decimo = redondear((salario * avos13) / 12);
    const aquisitivo = avosDoPeriodoAquisitivo(entrada.admissao, fim, fracao);
    const avosFerias = temProporcionais ? aquisitivo.avos : 0;
    const feriasProporcionais = redondear((salario * avosFerias) / 12);
    const tercoProporcionais = redondear(feriasProporcionais / 3);
    const feriasVencidas = entrada.feriasVencidas ? salario : 0;
    const tercoVencidas = redondear(feriasVencidas / 3);

    const verbas = redondear(saldoSalario + avisoIndenizado + decimo + feriasProporcionais + tercoProporcionais + feriasVencidas + tercoVencidas - descontoAviso);

    const aliquota = valores["br.fgts-aliquota"];
    const depositoRescisao = redondear(porcentaje(saldoSalario + avisoIndenizado + decimo, aliquota));
    let saldo = entrada.saldoFgts;
    if (saldo === null) {
      const mesesContrato = mesesCompletos(entrada.admissao, sumarDias(entrada.saida, 1));
      saldo = redondear(porcentaje(salario, aliquota) * mesesContrato);
      observaciones.push("O saldo do FGTS foi estimado pelos depósitos de 8 % do salário atual, sem rendimento. Para a multa exata, informe o saldo do app FGTS.");
    }
    const percentualMulta = motivo === "sem-justa-causa" ? valores["br.fgts-multa"] : motivo === "acordo" ? valores["br.fgts-multa-acordo"] : 0;
    const multaFgts = redondear(porcentaje(saldo + depositoRescisao, percentualMulta));

    if (motivo === "sem-justa-causa") observaciones.push("Você pode sacar todo o FGTS e pedir o seguro-desemprego, se cumprir as carências.");
    if (motivo === "acordo") observaciones.push(`No acordo você saca até ${valores["br.fgts-saque-acordo"]} % do FGTS e não tem direito ao seguro-desemprego.`);
    if (motivo === "pedido") observaciones.push("No pedido de demissão não há multa do FGTS, saque do saldo nem seguro-desemprego.");
    if (motivo === "justa-causa") observaciones.push("Na justa causa ficam só o saldo de salário e as férias vencidas com o terço.");
    if (diasAviso > 0) observaciones.push(`Os ${diasAviso} dias do aviso indenizado contam como tempo de serviço: o contrato termina em ${fim.split("-").reverse().join("/")} para o 13º e as férias.`);
    observaciones.push("Os valores são brutos. Saldo de salário, aviso e 13º têm INSS e imposto de renda; férias indenizadas e a multa do FGTS, não.");

    return {
      saldoSalario,
      diasAviso,
      avisoIndenizado,
      descontoAviso,
      avos13,
      decimo,
      avosFerias,
      feriasProporcionais,
      tercoProporcionais,
      feriasVencidas,
      tercoVencidas,
      verbas,
      depositoRescisao,
      multaFgts,
      total: redondear(verbas + multaFgts),
      observaciones,
    };
  },
  resultado: [
    { clave: "saldoSalario", etiqueta: "Saldo de salário", formato: "moneda" },
    { clave: "diasAviso", etiqueta: "Dias de aviso indenizado", formato: "dias", ocultarSiCero: true },
    { clave: "avisoIndenizado", etiqueta: "Aviso prévio indenizado", formato: "moneda", ocultarSiCero: true },
    { clave: "descontoAviso", etiqueta: "Desconto do aviso não cumprido", formato: "moneda", ocultarSiCero: true },
    { clave: "avos13", etiqueta: "Meses de 13º", formato: "meses", ocultarSiCero: true },
    { clave: "decimo", etiqueta: "13º proporcional", formato: "moneda", ocultarSiCero: true },
    { clave: "avosFerias", etiqueta: "Meses de férias proporcionais", formato: "meses", ocultarSiCero: true },
    { clave: "feriasProporcionais", etiqueta: "Férias proporcionais", formato: "moneda", ocultarSiCero: true },
    { clave: "tercoProporcionais", etiqueta: "1/3 sobre férias proporcionais", formato: "moneda", ocultarSiCero: true },
    { clave: "feriasVencidas", etiqueta: "Férias vencidas", formato: "moneda", ocultarSiCero: true },
    { clave: "tercoVencidas", etiqueta: "1/3 sobre férias vencidas", formato: "moneda", ocultarSiCero: true },
    { clave: "verbas", etiqueta: "Total das verbas rescisórias", formato: "moneda", destacada: true },
    { clave: "depositoRescisao", etiqueta: "FGTS do mês da rescisão", formato: "moneda", ocultarSiCero: true },
    { clave: "multaFgts", etiqueta: "Multa do FGTS (vai para a conta do FGTS)", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total com a multa do FGTS", formato: "moneda" },
  ],
});
