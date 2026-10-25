import type { Idioma, Trato } from "../tipos";
import { GRAMATICA } from "./gramatica";
import { resolver, type Diccionario, type Diccionarios } from "./resolver";

// Textos de la calculadora embebible (src/motor/embed) y del generador del código. Va aparte del
// diccionario del sitio: solo lo cargan la página del generador, el pie del embed y el link «Insertar
// en tu sitio» de cada calculadora. Un idioma nuevo entra con su entrada en DICCIONARIOS_EMBED
// (el Record lo obliga), igual que en calculadora.ts.

export interface TextosEmbed {
  // Ancla del link de marca al pie del embed y del link de crédito. Siempre el nombre, nunca una palabra clave.
  marca: string;
  marcaNuevaPestana: string;
  noDisponible: { titulo: string; texto: string };
  // Link discreto al pie de cada calculadora.
  insertar: string;
  pagina: {
    // Candidatos de título en orden de preferencia; el primero que entra en 60 caracteres (elegirTitulo).
    titulo: (pais: string) => readonly string[];
    descripcion: (pais: string) => string;
    h1: string;
    bajada: string;
    calculadora: string;
    buscar: string;
    sinResultados: string;
    tema: string;
    claro: string;
    oscuro: string;
    ancho: string;
    anchoCompleto: string;
    acento: string;
    // Verde (el de la marca), azul, naranja, rosa y pizarra, en ese orden.
    colores: readonly [string, string, string, string, string];
    credito: string;
    vistaPrevia: string;
    codigo: string;
    copiar: string;
    copiado: string;
    ayudaScript: string;
    ventajas: readonly [string, string, string];
    nota: string;
    verTodas: (pais: string) => string;
    tituloIframe: (nombre: string) => string;
  };
}

const es: Diccionario<TextosEmbed> = {
  base: {
    marca: "Calculadora de CalcularYa",
    marcaNuevaPestana: "(se abre en una pestaña nueva)",
    noDisponible: { titulo: "Esta calculadora no está disponible", texto: "Puede que haya cambiado de dirección." },
    insertar: "Insertar en tu sitio",
    pagina: {
      titulo: (pais) => [`Calculadoras gratis para tu sitio web | ${pais}`, "Calculadoras gratis para tu sitio web"],
      descripcion: (pais) => `Elige una calculadora de ${pais}, copia el código y pégalo en tu blog o web. Gratis, con datos oficiales siempre al día.`,
      h1: "Pon una calculadora en tu sitio",
      bajada: "Elige la calculadora, copia el código y pégalo donde quieras. Es gratis y los datos se actualizan solos.",
      calculadora: "Calculadora",
      buscar: "Buscar calculadora",
      sinResultados: "No encontramos esa calculadora.",
      tema: "Tema",
      claro: "Claro",
      oscuro: "Oscuro",
      ancho: "Ancho",
      anchoCompleto: "Todo el ancho",
      acento: "Color de acento",
      colores: ["Verde", "Azul", "Naranja", "Rosa", "Pizarra"],
      credito: "Agregar un enlace de crédito debajo de la calculadora",
      vistaPrevia: "Vista previa",
      codigo: "Código para pegar",
      copiar: "Copiar código",
      copiado: "Código copiado",
      ayudaScript: "El script es opcional: ajusta solo el alto de la calculadora.",
      ventajas: ["Gratis y sin registro", "Datos oficiales al día", "Se adapta a cualquier ancho"],
      nota: "La calculadora lleva un enlace a CalcularYa al pie. Te pedimos que no lo quites.",
      verTodas: (pais) => `Ver todas las calculadoras de ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Calculadora de CalcularYa`,
    },
  },
  vos: {
    pagina: {
      descripcion: (pais) => `Elegí una calculadora de ${pais}, copiá el código y pegalo en tu blog o web. Gratis, con datos oficiales siempre al día.`,
      h1: "Poné una calculadora en tu sitio",
      bajada: "Elegí la calculadora, copiá el código y pegalo donde quieras. Es gratis y los datos se actualizan solos.",
    },
  },
  usted: {
    insertar: "Insertar en su sitio",
    pagina: {
      titulo: (pais) => [`Calculadoras gratis para su sitio web | ${pais}`, "Calculadoras gratis para su sitio web"],
      descripcion: (pais) => `Elija una calculadora de ${pais}, copie el código y péguelo en su blog o web. Gratis, con datos oficiales siempre al día.`,
      h1: "Ponga una calculadora en su sitio",
      bajada: "Elija la calculadora, copie el código y péguelo donde quiera. Es gratis y los datos se actualizan solos.",
      nota: "La calculadora lleva un enlace a CalcularYa al pie. Le pedimos que no lo quite.",
    },
  },
};

const pt: Diccionario<TextosEmbed> = {
  base: {
    marca: "Calculadora do CalcularYa",
    marcaNuevaPestana: "(abre em uma nova aba)",
    noDisponible: { titulo: "Esta calculadora não está disponível", texto: "O endereço pode ter mudado." },
    insertar: "Inserir no seu site",
    pagina: {
      titulo: (pais) => [`Calculadoras grátis para o seu site | ${pais}`, "Calculadoras grátis para o seu site"],
      descripcion: (pais) => `Escolha uma calculadora de ${pais}, copie o código e cole no seu blog ou site. Grátis, com dados oficiais sempre atualizados.`,
      h1: "Coloque uma calculadora no seu site",
      bajada: "Escolha a calculadora, copie o código e cole onde quiser. É grátis e os dados se atualizam sozinhos.",
      calculadora: "Calculadora",
      buscar: "Buscar calculadora",
      sinResultados: "Nenhuma calculadora encontrada.",
      tema: "Tema",
      claro: "Claro",
      oscuro: "Escuro",
      ancho: "Largura",
      anchoCompleto: "Largura total",
      acento: "Cor de destaque",
      colores: ["Verde", "Azul", "Laranja", "Rosa", "Ardósia"],
      credito: "Adicionar um link de crédito abaixo da calculadora",
      vistaPrevia: "Pré-visualização",
      codigo: "Código para colar",
      copiar: "Copiar código",
      copiado: "Código copiado",
      ayudaScript: "O script é opcional: ele ajusta sozinho a altura da calculadora.",
      ventajas: ["Grátis e sem cadastro", "Dados oficiais atualizados", "Se adapta a qualquer largura"],
      nota: "A calculadora traz um link para o CalcularYa no rodapé. Pedimos que você não o remova.",
      verTodas: (pais) => `Ver todas as calculadoras: ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Calculadora do CalcularYa`,
    },
  },
  usted: { pagina: { nota: "A calculadora traz um link para o CalcularYa no rodapé. Pedimos que não o remova." } },
};

const en: Diccionario<TextosEmbed> = {
  base: {
    marca: "Calculator by CalcularYa",
    marcaNuevaPestana: "(opens in a new tab)",
    noDisponible: { titulo: "This calculator isn't available", texto: "Its address may have changed." },
    insertar: "Embed on your site",
    pagina: {
      titulo: (pais) => [`Free calculators for your website | ${pais}`, "Free calculators for your website"],
      descripcion: (pais) => `Pick a calculator for ${pais}, copy the code and paste it into your blog or website. Free, with official data that stays current.`,
      h1: "Put a calculator on your site",
      bajada: "Pick a calculator, copy the code and paste it anywhere you like. It's free, and the data updates itself.",
      calculadora: "Calculator",
      buscar: "Search calculators",
      sinResultados: "No calculators match your search.",
      tema: "Theme",
      claro: "Light",
      oscuro: "Dark",
      ancho: "Width",
      anchoCompleto: "Full width",
      acento: "Accent color",
      colores: ["Green", "Blue", "Orange", "Pink", "Slate"],
      credito: "Add a credit link below the calculator",
      vistaPrevia: "Preview",
      codigo: "Code to paste",
      copiar: "Copy code",
      copiado: "Code copied",
      ayudaScript: "The script is optional: it resizes the calculator to fit its content.",
      ventajas: ["Free, no sign-up", "Official data, kept current", "Fits any width"],
      nota: "The calculator links back to CalcularYa at the bottom. Please leave that link in place.",
      verTodas: (pais) => `See all calculators for ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Calculator by CalcularYa`,
    },
  },
};

const fr: Diccionario<TextosEmbed> = {
  base: {
    marca: "Calculateur de CalcularYa",
    marcaNuevaPestana: "(s'ouvre dans un nouvel onglet)",
    noDisponible: { titulo: "Ce calculateur n'est pas disponible", texto: "Son adresse a peut-être changé." },
    insertar: "Intégrer sur ton site",
    pagina: {
      titulo: (pais) => [`Calculateurs gratuits pour ton site | ${pais}`, "Calculateurs gratuits pour ton site"],
      descripcion: (pais) => `Choisis un calculateur (${pais}), copie le code et colle-le dans ton blog ou ton site. Gratuit, avec des données officielles à jour.`,
      h1: "Mets un calculateur sur ton site",
      bajada: "Choisis le calculateur, copie le code et colle-le où tu veux. C'est gratuit et les données se mettent à jour toutes seules.",
      calculadora: "Calculateur",
      buscar: "Rechercher un calculateur",
      sinResultados: "Aucun calculateur trouvé.",
      tema: "Thème",
      claro: "Clair",
      oscuro: "Sombre",
      ancho: "Largeur",
      anchoCompleto: "Pleine largeur",
      acento: "Couleur d'accent",
      colores: ["Vert", "Bleu", "Orange", "Rose", "Ardoise"],
      credito: "Ajouter un lien de crédit sous le calculateur",
      vistaPrevia: "Aperçu",
      codigo: "Code à coller",
      copiar: "Copier le code",
      copiado: "Code copié",
      ayudaScript: "Le script est facultatif : il ajuste tout seul la hauteur du calculateur.",
      ventajas: ["Gratuit, sans inscription", "Données officielles à jour", "S'adapte à toutes les largeurs"],
      nota: "Le calculateur contient un lien vers CalcularYa en bas. Merci de le laisser en place.",
      verTodas: (pais) => `Voir tous les calculateurs : ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Calculateur de CalcularYa`,
    },
  },
  usted: {
    insertar: "Intégrer sur votre site",
    pagina: {
      titulo: (pais) => [`Calculateurs gratuits pour votre site | ${pais}`, "Calculateurs gratuits pour votre site"],
      descripcion: (pais) => `Choisissez un calculateur (${pais}), copiez le code et collez-le dans votre blog ou votre site. Gratuit, avec des données officielles à jour.`,
      h1: "Mettez un calculateur sur votre site",
      bajada: "Choisissez le calculateur, copiez le code et collez-le où vous voulez. C'est gratuit et les données se mettent à jour toutes seules.",
    },
  },
};

const de: Diccionario<TextosEmbed> = {
  base: {
    marca: "Rechner von CalcularYa",
    marcaNuevaPestana: "(öffnet in einem neuen Tab)",
    noDisponible: { titulo: "Dieser Rechner ist nicht verfügbar", texto: "Möglicherweise hat sich die Adresse geändert." },
    insertar: "Auf deiner Website einbinden",
    pagina: {
      titulo: (pais) => [`Kostenlose Rechner für deine Website | ${pais}`, "Kostenlose Rechner für deine Website"],
      descripcion: (pais) => `Wähle einen Rechner für ${pais}, kopiere den Code und füge ihn in deine Website ein. Kostenlos, mit stets aktuellen amtlichen Daten.`,
      h1: "Bring einen Rechner auf deine Website",
      bajada: "Wähle den Rechner, kopiere den Code und füge ihn ein, wo du willst. Kostenlos, und die Daten aktualisieren sich von selbst.",
      calculadora: "Rechner",
      buscar: "Rechner suchen",
      sinResultados: "Kein Rechner gefunden.",
      tema: "Darstellung",
      claro: "Hell",
      oscuro: "Dunkel",
      ancho: "Breite",
      anchoCompleto: "Volle Breite",
      acento: "Akzentfarbe",
      colores: ["Grün", "Blau", "Orange", "Rosa", "Schiefer"],
      credito: "Quellenlink unter dem Rechner hinzufügen",
      vistaPrevia: "Vorschau",
      codigo: "Code zum Einfügen",
      copiar: "Code kopieren",
      copiado: "Code kopiert",
      ayudaScript: "Das Skript ist optional: Es passt die Höhe des Rechners automatisch an.",
      ventajas: ["Kostenlos, ohne Anmeldung", "Amtliche Daten, stets aktuell", "Passt sich jeder Breite an"],
      nota: "Der Rechner enthält unten einen Link zu CalcularYa. Bitte lass ihn stehen.",
      verTodas: (pais) => `Alle Rechner ansehen: ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Rechner von CalcularYa`,
    },
  },
  usted: {
    insertar: "Auf Ihrer Website einbinden",
    pagina: {
      titulo: (pais) => [`Kostenlose Rechner für Ihre Website | ${pais}`, "Kostenlose Rechner für Ihre Website"],
      descripcion: (pais) => `Wählen Sie einen Rechner für ${pais}, kopieren Sie den Code und fügen Sie ihn in Ihre Website ein. Kostenlos, mit stets aktuellen amtlichen Daten.`,
      h1: "Bringen Sie einen Rechner auf Ihre Website",
      bajada: "Wählen Sie den Rechner, kopieren Sie den Code und fügen Sie ihn ein, wo Sie möchten. Kostenlos, und die Daten aktualisieren sich von selbst.",
      nota: "Der Rechner enthält unten einen Link zu CalcularYa. Bitte lassen Sie ihn stehen.",
    },
  },
};

const it: Diccionario<TextosEmbed> = {
  base: {
    marca: "Calcolatore di CalcularYa",
    marcaNuevaPestana: "(si apre in una nuova scheda)",
    noDisponible: { titulo: "Questo calcolatore non è disponibile", texto: "L'indirizzo potrebbe essere cambiato." },
    insertar: "Inserisci nel tuo sito",
    pagina: {
      titulo: (pais) => [`Calcolatori gratuiti per il tuo sito | ${pais}`, "Calcolatori gratuiti per il tuo sito"],
      descripcion: (pais) => `Scegli un calcolatore (${pais}), copia il codice e incollalo nel tuo blog o sito. Gratis, con dati ufficiali sempre aggiornati.`,
      h1: "Metti un calcolatore sul tuo sito",
      bajada: "Scegli il calcolatore, copia il codice e incollalo dove vuoi. È gratis e i dati si aggiornano da soli.",
      calculadora: "Calcolatore",
      buscar: "Cerca calcolatore",
      sinResultados: "Nessun calcolatore trovato.",
      tema: "Tema",
      claro: "Chiaro",
      oscuro: "Scuro",
      ancho: "Larghezza",
      anchoCompleto: "Larghezza piena",
      acento: "Colore d'accento",
      colores: ["Verde", "Blu", "Arancione", "Rosa", "Ardesia"],
      credito: "Aggiungi un link di credito sotto il calcolatore",
      vistaPrevia: "Anteprima",
      codigo: "Codice da incollare",
      copiar: "Copia codice",
      copiado: "Codice copiato",
      ayudaScript: "Lo script è facoltativo: regola da solo l'altezza del calcolatore.",
      ventajas: ["Gratis e senza registrazione", "Dati ufficiali aggiornati", "Si adatta a ogni larghezza"],
      nota: "Il calcolatore ha in fondo un link a CalcularYa. Ti chiediamo di non toglierlo.",
      verTodas: (pais) => `Tutti i calcolatori: ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Calcolatore di CalcularYa`,
    },
  },
  usted: {
    insertar: "Inserisca nel Suo sito",
    pagina: {
      titulo: (pais) => [`Calcolatori gratuiti per il Suo sito | ${pais}`, "Calcolatori gratuiti per il Suo sito"],
      descripcion: (pais) => `Scelga un calcolatore (${pais}), copi il codice e lo incolli nel Suo blog o sito. Gratis, con dati ufficiali sempre aggiornati.`,
      h1: "Metta un calcolatore sul Suo sito",
      bajada: "Scelga il calcolatore, copi il codice e lo incolli dove preferisce. È gratis e i dati si aggiornano da soli.",
      credito: "Aggiunga un link di credito sotto il calcolatore",
      nota: "Il calcolatore ha in fondo un link a CalcularYa. Le chiediamo di non toglierlo.",
    },
  },
};

const nl: Diccionario<TextosEmbed> = {
  base: {
    marca: "Rekenhulp van CalcularYa",
    marcaNuevaPestana: "(opent in een nieuw tabblad)",
    noDisponible: { titulo: "Deze rekenhulp is niet beschikbaar", texto: "Het adres is mogelijk veranderd." },
    insertar: "Op je site plaatsen",
    pagina: {
      titulo: (pais) => [`Gratis rekenhulpen voor je website | ${pais}`, "Gratis rekenhulpen voor je website"],
      descripcion: (pais) => `Kies een rekenhulp voor ${pais}, kopieer de code en plak hem in je blog of website. Gratis, met officiële gegevens die altijd actueel zijn.`,
      h1: "Zet een rekenhulp op je site",
      bajada: "Kies de rekenhulp, kopieer de code en plak hem waar je wilt. Gratis, en de gegevens werken zichzelf bij.",
      calculadora: "Rekenhulp",
      buscar: "Rekenhulp zoeken",
      sinResultados: "Geen rekenhulp gevonden.",
      tema: "Thema",
      claro: "Licht",
      oscuro: "Donker",
      ancho: "Breedte",
      anchoCompleto: "Volledige breedte",
      acento: "Accentkleur",
      colores: ["Groen", "Blauw", "Oranje", "Roze", "Leisteen"],
      credito: "Een bronlink onder de rekenhulp toevoegen",
      vistaPrevia: "Voorbeeld",
      codigo: "Code om te plakken",
      copiar: "Code kopiëren",
      copiado: "Code gekopieerd",
      ayudaScript: "Het script is optioneel: het past de hoogte van de rekenhulp zelf aan.",
      ventajas: ["Gratis, zonder account", "Officiële gegevens, altijd actueel", "Past zich aan elke breedte aan"],
      nota: "De rekenhulp bevat onderaan een link naar CalcularYa. Laat die link alsjeblieft staan.",
      verTodas: (pais) => `Alle rekenhulpen bekijken: ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Rekenhulp van CalcularYa`,
    },
  },
  usted: {
    insertar: "Op uw site plaatsen",
    pagina: {
      titulo: (pais) => [`Gratis rekenhulpen voor uw website | ${pais}`, "Gratis rekenhulpen voor uw website"],
      descripcion: (pais) => `Kies een rekenhulp voor ${pais}, kopieer de code en plak hem in uw blog of website. Gratis, met officiële gegevens die altijd actueel zijn.`,
      h1: "Zet een rekenhulp op uw site",
      bajada: "Kies de rekenhulp, kopieer de code en plak hem waar u wilt. Gratis, en de gegevens werken zichzelf bij.",
      nota: "De rekenhulp bevat onderaan een link naar CalcularYa. Laat die link alstublieft staan.",
    },
  },
};

const ja: Diccionario<TextosEmbed> = {
  base: {
    marca: "CalcularYaの計算ツール",
    marcaNuevaPestana: "（新しいタブで開きます）",
    noDisponible: { titulo: "この計算ツールは利用できません", texto: "アドレスが変更された可能性があります。" },
    insertar: "自分のサイトに埋め込む",
    pagina: {
      titulo: (pais) => [`サイトに置ける無料の計算ツール | ${pais}`, "サイトに置ける無料の計算ツール"],
      descripcion: (pais) => `${pais}の計算ツールを選んでコードをコピーし、ブログやサイトに貼り付けるだけ。無料で、公的データは常に最新です。`,
      h1: "計算ツールをサイトに設置する",
      bajada: "計算ツールを選んでコードをコピーし、好きな場所に貼り付けてください。無料で、データは自動で更新されます。",
      calculadora: "計算ツール",
      buscar: "計算ツールを検索",
      sinResultados: "該当する計算ツールが見つかりません。",
      tema: "テーマ",
      claro: "ライト",
      oscuro: "ダーク",
      ancho: "幅",
      anchoCompleto: "全幅",
      acento: "アクセントカラー",
      colores: ["グリーン", "ブルー", "オレンジ", "ピンク", "スレート"],
      credito: "計算ツールの下にクレジットリンクを追加する",
      vistaPrevia: "プレビュー",
      codigo: "貼り付け用コード",
      copiar: "コードをコピー",
      copiado: "コピーしました",
      ayudaScript: "スクリプトは任意です。計算ツールの高さを自動で調整します。",
      ventajas: ["無料・登録不要", "公的データを常に最新に", "どんな幅にもなじむ"],
      nota: "計算ツールの下部にはCalcularYaへのリンクが入ります。削除せず、そのままにしてください。",
      verTodas: (pais) => `${pais}の計算ツールをすべて見る`,
      tituloIframe: (nombre) => `${nombre} | CalcularYaの計算ツール`,
    },
  },
};

const ko: Diccionario<TextosEmbed> = {
  base: {
    marca: "CalcularYa 계산기",
    marcaNuevaPestana: "(새 탭에서 열려요)",
    noDisponible: { titulo: "이 계산기를 사용할 수 없어요", texto: "주소가 바뀌었을 수 있어요." },
    insertar: "내 사이트에 넣기",
    pagina: {
      titulo: (pais) => [`내 사이트에 넣는 무료 계산기 | ${pais}`, "내 사이트에 넣는 무료 계산기"],
      descripcion: (pais) => `${pais} 계산기를 고르고 코드를 복사해서 블로그나 웹사이트에 붙여 넣으세요. 무료이고, 공식 데이터는 항상 최신이에요.`,
      h1: "내 사이트에 계산기를 넣어 보세요",
      bajada: "계산기를 고르고 코드를 복사해서 원하는 곳에 붙여 넣으세요. 무료이고, 데이터는 저절로 업데이트돼요.",
      calculadora: "계산기",
      buscar: "계산기 검색",
      sinResultados: "찾는 계산기가 없어요.",
      tema: "테마",
      claro: "라이트",
      oscuro: "다크",
      ancho: "너비",
      anchoCompleto: "전체 너비",
      acento: "강조 색상",
      colores: ["초록", "파랑", "주황", "분홍", "슬레이트"],
      credito: "계산기 아래에 출처 링크 넣기",
      vistaPrevia: "미리 보기",
      codigo: "붙여 넣을 코드",
      copiar: "코드 복사",
      copiado: "복사했어요",
      ayudaScript: "스크립트는 선택 사항이에요. 계산기 높이를 자동으로 맞춰 줘요.",
      ventajas: ["무료, 가입 없이", "공식 데이터를 항상 최신으로", "어떤 너비에도 맞아요"],
      nota: "계산기 맨 아래에 CalcularYa 링크가 들어 있어요. 그대로 두어 주세요.",
      verTodas: (pais) => `${pais} 계산기 모두 보기`,
      tituloIframe: (nombre) => `${nombre} | CalcularYa 계산기`,
    },
  },
};

// Chino tradicional de base (Taiwán, Hong Kong) y simplificado a mano para zh-CN y zh-SG.
const zhHans: TextosEmbed = {
  marca: "CalcularYa 计算工具",
  marcaNuevaPestana: "（在新标签页打开）",
  noDisponible: { titulo: "这个计算工具暂时无法使用", texto: "网址可能已经变更。" },
  insertar: "嵌入到您的网站",
  pagina: {
    titulo: (pais) => [`免费计算工具，嵌入您的网站 | ${pais}`, "免费计算工具，嵌入您的网站"],
    descripcion: (pais) => `选择${pais}的计算工具，复制代码，粘贴到您的博客或网站。免费使用，官方数据实时更新。`,
    h1: "把计算工具放到您的网站",
    bajada: "选好计算工具，复制代码，粘贴到想放的位置即可。免费使用，数据会自动更新。",
    calculadora: "计算工具",
    buscar: "搜索计算工具",
    sinResultados: "没有找到匹配的计算工具。",
    tema: "主题",
    claro: "浅色",
    oscuro: "深色",
    ancho: "宽度",
    anchoCompleto: "满宽",
    acento: "强调色",
    colores: ["绿", "蓝", "橙", "粉红", "石板灰"],
    credito: "在计算工具下方加入出处链接",
    vistaPrevia: "预览",
    codigo: "要粘贴的代码",
    copiar: "复制代码",
    copiado: "已复制",
    ayudaScript: "这段脚本是可选的，会自动调整计算工具的高度。",
    ventajas: ["免费，无需注册", "官方数据实时更新", "自动适应任何宽度"],
    nota: "计算工具底部附有 CalcularYa 的链接，请保留。",
    verTodas: (pais) => `查看${pais}的所有计算工具`,
    tituloIframe: (nombre) => `${nombre} | CalcularYa 计算工具`,
  },
};

const zh: Diccionario<TextosEmbed> = {
  base: {
    marca: "CalcularYa 計算工具",
    marcaNuevaPestana: "（在新分頁開啟）",
    noDisponible: { titulo: "這個計算工具目前無法使用", texto: "網址可能已經變更。" },
    insertar: "嵌入到您的網站",
    pagina: {
      titulo: (pais) => [`免費計算工具，嵌入您的網站 | ${pais}`, "免費計算工具，嵌入您的網站"],
      descripcion: (pais) => `選擇${pais}的計算工具，複製程式碼，貼到您的部落格或網站。免費使用，官方數據隨時更新。`,
      h1: "把計算工具放到您的網站",
      bajada: "選好計算工具，複製程式碼，貼到想放的位置即可。免費使用，數據會自動更新。",
      calculadora: "計算工具",
      buscar: "搜尋計算工具",
      sinResultados: "找不到符合的計算工具。",
      tema: "主題",
      claro: "淺色",
      oscuro: "深色",
      ancho: "寬度",
      anchoCompleto: "滿版寬度",
      acento: "強調色",
      colores: ["綠", "藍", "橘", "粉紅", "石板灰"],
      credito: "在計算工具下方加入出處連結",
      vistaPrevia: "預覽",
      codigo: "要貼上的程式碼",
      copiar: "複製程式碼",
      copiado: "已複製",
      ayudaScript: "這段腳本是選用的，會自動調整計算工具的高度。",
      ventajas: ["免費，免註冊", "官方數據隨時更新", "自動配合任何寬度"],
      nota: "計算工具底部附有 CalcularYa 的連結，請保留。",
      verTodas: (pais) => `查看${pais}的所有計算工具`,
      tituloIframe: (nombre) => `${nombre} | CalcularYa 計算工具`,
    },
  },
  regional: { "zh-CN": zhHans, "zh-SG": zhHans },
};

// pl, sv, da, nb y fi: un solo registro informal (ADR 0002, D9), sin parche de usted.
const gPl = GRAMATICA.pl;
const gFi = GRAMATICA.fi;

const pl: Diccionario<TextosEmbed> = {
  base: {
    marca: "Kalkulator CalcularYa",
    marcaNuevaPestana: "(otwiera się w nowej karcie)",
    noDisponible: { titulo: "Ten kalkulator jest niedostępny", texto: "Możliwe, że zmienił adres." },
    insertar: "Wstaw na swoją stronę",
    pagina: {
      titulo: (pais) => [`Darmowe kalkulatory na twoją stronę | ${pais}`, "Darmowe kalkulatory na twoją stronę"],
      descripcion: (pais) => `Wybierz kalkulator ${gPl.para(pais)}, skopiuj kod i wklej go na bloga lub stronę. Za darmo, z oficjalnymi danymi zawsze aktualnymi.`,
      h1: "Wstaw kalkulator na swoją stronę",
      bajada: "Wybierz kalkulator, skopiuj kod i wklej go, gdzie chcesz. Za darmo, a dane aktualizują się same.",
      calculadora: "Kalkulator",
      buscar: "Szukaj kalkulatora",
      sinResultados: "Nie ma takiego kalkulatora.",
      tema: "Motyw",
      claro: "Jasny",
      oscuro: "Ciemny",
      ancho: "Szerokość",
      anchoCompleto: "Pełna szerokość",
      acento: "Kolor akcentu",
      colores: ["Zielony", "Niebieski", "Pomarańczowy", "Różowy", "Grafitowy"],
      credito: "Dodaj pod kalkulatorem link do źródła",
      vistaPrevia: "Podgląd",
      codigo: "Kod do wklejenia",
      copiar: "Kopiuj kod",
      copiado: "Kod skopiowany",
      ayudaScript: "Skrypt jest opcjonalny: sam dopasowuje wysokość kalkulatora.",
      ventajas: ["Za darmo, bez konta", "Oficjalne dane, zawsze aktualne", "Pasuje do każdej szerokości"],
      nota: "Na dole kalkulatora jest link do CalcularYa. Prosimy, zostaw go.",
      verTodas: (pais) => `Zobacz wszystkie kalkulatory ${gPl.para(pais)}`,
      tituloIframe: (nombre) => `${nombre} | Kalkulator CalcularYa`,
    },
  },
};

const sv: Diccionario<TextosEmbed> = {
  base: {
    marca: "Kalkylator från CalcularYa",
    marcaNuevaPestana: "(öppnas i en ny flik)",
    noDisponible: { titulo: "Den här kalkylatorn är inte tillgänglig", texto: "Adressen kan ha ändrats." },
    insertar: "Lägg in på din webbplats",
    pagina: {
      titulo: (pais) => [`Gratis kalkylatorer till din webbplats | ${pais}`, "Gratis kalkylatorer till din webbplats"],
      descripcion: (pais) => `Välj en kalkylator för ${pais}, kopiera koden och klistra in den i din blogg eller på din webbplats. Gratis, med officiella uppgifter som alltid är aktuella.`,
      h1: "Lägg in en kalkylator på din webbplats",
      bajada: "Välj kalkylatorn, kopiera koden och klistra in den där du vill. Gratis, och uppgifterna uppdateras av sig själva.",
      calculadora: "Kalkylator",
      buscar: "Sök kalkylator",
      sinResultados: "Vi hittade ingen sådan kalkylator.",
      tema: "Tema",
      claro: "Ljust",
      oscuro: "Mörkt",
      ancho: "Bredd",
      anchoCompleto: "Full bredd",
      acento: "Accentfärg",
      colores: ["Grön", "Blå", "Orange", "Rosa", "Skiffer"],
      credito: "Lägg till en källänk under kalkylatorn",
      vistaPrevia: "Förhandsvisning",
      codigo: "Kod att klistra in",
      copiar: "Kopiera koden",
      copiado: "Koden är kopierad",
      ayudaScript: "Skriptet är valfritt: det anpassar kalkylatorns höjd automatiskt.",
      ventajas: ["Gratis, utan konto", "Officiella uppgifter, alltid aktuella", "Passar alla bredder"],
      nota: "Längst ner i kalkylatorn finns en länk till CalcularYa. Låt den gärna vara kvar.",
      verTodas: (pais) => `Se alla kalkylatorer för ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Kalkylator från CalcularYa`,
    },
  },
};

const da: Diccionario<TextosEmbed> = {
  base: {
    marca: "Beregner fra CalcularYa",
    marcaNuevaPestana: "(åbner i en ny fane)",
    noDisponible: { titulo: "Denne beregner er ikke tilgængelig", texto: "Adressen kan være ændret." },
    insertar: "Indsæt på dit site",
    pagina: {
      titulo: (pais) => [`Gratis beregnere til dit website | ${pais}`, "Gratis beregnere til dit website"],
      descripcion: (pais) => `Vælg en beregner for ${pais}, kopiér koden, og indsæt den på din blog eller dit website. Gratis, med officielle tal, der altid er opdaterede.`,
      h1: "Sæt en beregner på dit website",
      bajada: "Vælg beregneren, kopiér koden, og indsæt den, hvor du vil. Gratis, og tallene opdaterer sig selv.",
      calculadora: "Beregner",
      buscar: "Søg efter beregner",
      sinResultados: "Vi fandt ingen beregner med det navn.",
      tema: "Tema",
      claro: "Lyst",
      oscuro: "Mørkt",
      ancho: "Bredde",
      anchoCompleto: "Fuld bredde",
      acento: "Accentfarve",
      colores: ["Grøn", "Blå", "Orange", "Pink", "Skifer"],
      credito: "Tilføj et kildelink under beregneren",
      vistaPrevia: "Forhåndsvisning",
      codigo: "Kode til at indsætte",
      copiar: "Kopiér koden",
      copiado: "Koden er kopieret",
      ayudaScript: "Scriptet er valgfrit: det tilpasser selv beregnerens højde.",
      ventajas: ["Gratis, uden konto", "Officielle tal, altid opdaterede", "Passer til enhver bredde"],
      nota: "Nederst i beregneren er der et link til CalcularYa. Lad det gerne blive.",
      verTodas: (pais) => `Se alle beregnere for ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Beregner fra CalcularYa`,
    },
  },
};

const nb: Diccionario<TextosEmbed> = {
  base: {
    marca: "Kalkulator fra CalcularYa",
    marcaNuevaPestana: "(åpnes i en ny fane)",
    noDisponible: { titulo: "Denne kalkulatoren er ikke tilgjengelig", texto: "Adressen kan ha endret seg." },
    insertar: "Legg inn på nettstedet ditt",
    pagina: {
      titulo: (pais) => [`Gratis kalkulatorer til nettstedet ditt | ${pais}`, "Gratis kalkulatorer til nettstedet ditt"],
      descripcion: (pais) => `Velg en kalkulator for ${pais}, kopier koden og lim den inn i bloggen eller på nettstedet ditt. Gratis, med offisielle tall som alltid er oppdatert.`,
      h1: "Legg en kalkulator på nettstedet ditt",
      bajada: "Velg kalkulatoren, kopier koden og lim den inn der du vil. Gratis, og tallene oppdateres av seg selv.",
      calculadora: "Kalkulator",
      buscar: "Søk etter kalkulator",
      sinResultados: "Vi fant ingen slik kalkulator.",
      tema: "Tema",
      claro: "Lyst",
      oscuro: "Mørkt",
      ancho: "Bredde",
      anchoCompleto: "Full bredde",
      acento: "Aksentfarge",
      colores: ["Grønn", "Blå", "Oransje", "Rosa", "Skifer"],
      credito: "Legg til en kildelenke under kalkulatoren",
      vistaPrevia: "Forhåndsvisning",
      codigo: "Kode til å lime inn",
      copiar: "Kopier koden",
      copiado: "Koden er kopiert",
      ayudaScript: "Skriptet er valgfritt: det tilpasser høyden på kalkulatoren selv.",
      ventajas: ["Gratis, uten konto", "Offisielle tall, alltid oppdatert", "Passer til alle bredder"],
      nota: "Nederst i kalkulatoren er det en lenke til CalcularYa. La den gjerne stå.",
      verTodas: (pais) => `Se alle kalkulatorene for ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Kalkulator fra CalcularYa`,
    },
  },
};

const fi: Diccionario<TextosEmbed> = {
  base: {
    marca: "CalcularYa-laskuri",
    marcaNuevaPestana: "(avautuu uuteen välilehteen)",
    noDisponible: { titulo: "Tämä laskuri ei ole käytettävissä", texto: "Sen osoite on ehkä muuttunut." },
    insertar: "Lisää omalle sivustollesi",
    pagina: {
      titulo: (pais) => [`Maksuttomat laskurit omalle sivustollesi | ${pais}`, "Maksuttomat laskurit omalle sivustollesi"],
      descripcion: (pais) => `Valitse ${gFi.de(pais)} laskuri, kopioi koodi ja liitä se blogiisi tai sivustollesi. Maksuton, ja viralliset tiedot pysyvät aina ajan tasalla.`,
      h1: "Lisää laskuri omalle sivustollesi",
      bajada: "Valitse laskuri, kopioi koodi ja liitä se haluamaasi paikkaan. Maksuton, ja tiedot päivittyvät itsestään.",
      calculadora: "Laskuri",
      buscar: "Hae laskuria",
      sinResultados: "Laskuria ei löytynyt.",
      tema: "Teema",
      claro: "Vaalea",
      oscuro: "Tumma",
      ancho: "Leveys",
      anchoCompleto: "Koko leveys",
      acento: "Korostusväri",
      colores: ["Vihreä", "Sininen", "Oranssi", "Pinkki", "Liuskeenharmaa"],
      credito: "Lisää lähdelinkki laskurin alle",
      vistaPrevia: "Esikatselu",
      codigo: "Liitettävä koodi",
      copiar: "Kopioi koodi",
      copiado: "Koodi kopioitu",
      ayudaScript: "Skripti on vapaaehtoinen: se sovittaa laskurin korkeuden itse.",
      ventajas: ["Maksuton, ei tiliä", "Viralliset tiedot aina ajan tasalla", "Sopii mihin tahansa leveyteen"],
      nota: "Laskurin alareunassa on linkki CalcularYaan. Jätäthän linkin paikalleen.",
      verTodas: (pais) => `Katso kaikki ${gFi.de(pais)} laskurit`,
      tituloIframe: (nombre) => `${nombre} | CalcularYa-laskuri`,
    },
  },
};

// Árabe: «حاسبات مصر» va por idafa (GRAMATICA.ar.de) y «في مصر» con en.
const gAr = GRAMATICA.ar;
const ar: Diccionario<TextosEmbed> = {
  base: {
    marca: "حاسبة من CalcularYa",
    marcaNuevaPestana: "(يُفتح في علامة تبويب جديدة)",
    noDisponible: { titulo: "هذه الحاسبة غير متاحة", texto: "ربما تغيّر عنوانها." },
    insertar: "أضفها إلى موقعك",
    pagina: {
      titulo: (pais) => [`حاسبات مجانية لموقعك | ${pais}`, "حاسبات مجانية لموقعك"],
      descripcion: (pais) => `اختر حاسبة ${gAr.en(pais)} وانسخ الشيفرة والصقها في مدونتك أو موقعك. مجانية، وبياناتها الرسمية محدّثة دائمًا.`,
      h1: "أضف حاسبة إلى موقعك",
      bajada: "اختر الحاسبة وانسخ الشيفرة والصقها حيث تريد. مجانية، وتتحدّث بياناتها تلقائيًا.",
      calculadora: "الحاسبة",
      buscar: "ابحث عن حاسبة",
      sinResultados: "لا توجد حاسبة بهذا الاسم.",
      tema: "المظهر",
      claro: "فاتح",
      oscuro: "داكن",
      ancho: "العرض",
      anchoCompleto: "العرض الكامل",
      acento: "لون التمييز",
      colores: ["أخضر", "أزرق", "برتقالي", "وردي", "رمادي داكن"],
      credito: "إضافة رابط الإشارة إلى المصدر أسفل الحاسبة",
      vistaPrevia: "معاينة",
      codigo: "الشيفرة للّصق",
      copiar: "نسخ الشيفرة",
      copiado: "تم النسخ",
      ayudaScript: "السكربت اختياري، ويضبط ارتفاع الحاسبة تلقائيًا.",
      ventajas: ["مجانية وبلا تسجيل", "بيانات رسمية محدّثة دائمًا", "تناسب أي عرض"],
      nota: "أسفل الحاسبة رابط إلى CalcularYa. نرجو إبقاءه كما هو.",
      verTodas: (pais) => `عرض كل حاسبات ${gAr.de(pais)}`,
      tituloIframe: (nombre) => `${nombre} | حاسبة من CalcularYa`,
    },
  },
};

// Indonesio (ADR 0002, D11): «Anda» con mayúscula, como en la web de los bancos y servicios del país.
const idn: Diccionario<TextosEmbed> = {
  base: {
    marca: "Kalkulator dari CalcularYa",
    marcaNuevaPestana: "(terbuka di tab baru)",
    noDisponible: { titulo: "Kalkulator ini tidak tersedia", texto: "Alamatnya mungkin sudah berubah." },
    insertar: "Pasang di situs Anda",
    pagina: {
      titulo: (pais) => [`Kalkulator gratis untuk situs Anda | ${pais}`, "Kalkulator gratis untuk situs Anda"],
      descripcion: (pais) => `Pilih kalkulator untuk ${pais}, salin kodenya, lalu tempel di blog atau situs Anda. Gratis, dengan data resmi yang selalu diperbarui.`,
      h1: "Pasang kalkulator di situs Anda",
      bajada: "Pilih kalkulator, salin kodenya, lalu tempel di mana saja. Gratis, dan datanya diperbarui sendiri.",
      calculadora: "Kalkulator",
      buscar: "Cari kalkulator",
      sinResultados: "Tidak ada kalkulator yang cocok dengan pencarian Anda.",
      tema: "Tampilan",
      claro: "Terang",
      oscuro: "Gelap",
      ancho: "Lebar",
      anchoCompleto: "Lebar penuh",
      acento: "Warna aksen",
      colores: ["Hijau", "Biru", "Oranye", "Merah muda", "Abu-abu batu"],
      credito: "Tambahkan tautan sumber di bawah kalkulator",
      vistaPrevia: "Pratinjau",
      codigo: "Kode untuk ditempel",
      copiar: "Salin kode",
      copiado: "Kode disalin",
      ayudaScript: "Skrip ini opsional: tinggi kalkulator akan menyesuaikan isinya.",
      ventajas: ["Gratis, tanpa daftar", "Data resmi yang selalu terbaru", "Pas di lebar berapa pun"],
      nota: "Di bagian bawah kalkulator ada tautan ke CalcularYa. Mohon jangan dihapus.",
      verTodas: (pais) => `Lihat semua kalkulator untuk ${pais}`,
      tituloIframe: (nombre) => `${nombre} | Kalkulator dari CalcularYa`,
    },
  },
};

// Turco (ADR 0002, D12): «siz» con las formas corteses, como en los bancos y en e-Devlet.
const tr: Diccionario<TextosEmbed> = {
  base: {
    marca: "CalcularYa hesaplama aracı",
    marcaNuevaPestana: "(yeni sekmede açılır)",
    noDisponible: { titulo: "Bu hesaplama aracı kullanılamıyor", texto: "Adresi değişmiş olabilir." },
    insertar: "Sitenize ekleyin",
    pagina: {
      titulo: (pais) => [`Siteniz için ücretsiz hesaplama araçları | ${pais}`, "Siteniz için ücretsiz hesaplama araçları"],
      descripcion: (pais) => `${GRAMATICA.tr.para(pais)} bir hesaplama aracı seçin, kodunu kopyalayın ve blogunuza ya da sitenize yapıştırın. Ücretsiz, resmî verileri hep güncel.`,
      h1: "Sitenize hesaplama aracı ekleyin",
      bajada: "Bir hesaplama aracı seçin, kodunu kopyalayın ve istediğiniz yere yapıştırın. Ücretsiz ve verileri kendiliğinden güncellenir.",
      calculadora: "Hesaplama aracı",
      buscar: "Hesaplama aracı arayın",
      sinResultados: "Aramanızla eşleşen bir hesaplama aracı yok.",
      tema: "Görünüm",
      claro: "Açık",
      oscuro: "Koyu",
      ancho: "Genişlik",
      anchoCompleto: "Tam genişlik",
      acento: "Vurgu rengi",
      colores: ["Yeşil", "Mavi", "Turuncu", "Pembe", "Taş grisi"],
      credito: "Hesaplama aracının altına kaynak bağlantısı ekle",
      vistaPrevia: "Önizleme",
      codigo: "Yapıştırılacak kod",
      copiar: "Kodu kopyala",
      copiado: "Kod kopyalandı",
      ayudaScript: "Bu betik isteğe bağlıdır: hesaplama aracının yüksekliği içeriğine göre ayarlanır.",
      ventajas: ["Ücretsiz, üyelik gerekmez", "Her zaman güncel resmî veriler", "Her genişliğe uyum sağlar"],
      nota: "Hesaplama aracının altında CalcularYa'ya giden bir bağlantı bulunur. Lütfen kaldırmayın.",
      verTodas: (pais) => `${GRAMATICA.tr.para(pais)} tüm hesaplama araçlarını görün`,
      tituloIframe: (nombre) => `${nombre} | CalcularYa hesaplama aracı`,
    },
  },
};

// Bengalí (ADR 0002, D14): «আপনি» con las formas corteses, como en la web de los bancos del país.
const gBn = GRAMATICA.bn;
const bn: Diccionario<TextosEmbed> = {
  base: {
    marca: "CalcularYa-র ক্যালকুলেটর",
    marcaNuevaPestana: "(নতুন ট্যাবে খুলবে)",
    noDisponible: { titulo: "এই ক্যালকুলেটরটি পাওয়া যাচ্ছে না", texto: "এর ঠিকানা হয়তো বদলে গেছে।" },
    insertar: "আপনার সাইটে বসান",
    pagina: {
      titulo: (pais) => [`আপনার সাইটের জন্য ফ্রি ক্যালকুলেটর | ${pais}`, "আপনার সাইটের জন্য ফ্রি ক্যালকুলেটর"],
      descripcion: (pais) => `${gBn.para(pais)} একটি ক্যালকুলেটর বেছে নিন, কোড কপি করে আপনার ব্লগ বা সাইটে বসিয়ে দিন। বিনা মূল্যে, সরকারি তথ্য সবসময় হালনাগাদ।`,
      h1: "আপনার সাইটে ক্যালকুলেটর বসান",
      bajada: "ক্যালকুলেটর বেছে নিন, কোড কপি করুন, তারপর যেখানে চান সেখানে বসিয়ে দিন। বিনা মূল্যে, তথ্য নিজে থেকেই হালনাগাদ হয়।",
      calculadora: "ক্যালকুলেটর",
      buscar: "ক্যালকুলেটর খুঁজুন",
      sinResultados: "আপনার খোঁজার সঙ্গে মেলে এমন কোনো ক্যালকুলেটর নেই।",
      tema: "থিম",
      claro: "হালকা",
      oscuro: "গাঢ়",
      ancho: "প্রস্থ",
      anchoCompleto: "পুরো প্রস্থ",
      acento: "মূল রং",
      colores: ["সবুজ", "নীল", "কমলা", "গোলাপি", "ধূসর"],
      credito: "ক্যালকুলেটরের নিচে সূত্রের লিংক রাখুন",
      vistaPrevia: "প্রিভিউ",
      codigo: "বসানোর কোড",
      copiar: "কোড কপি করুন",
      copiado: "কোড কপি হয়েছে",
      ayudaScript: "এই স্ক্রিপ্ট ঐচ্ছিক: এতে ক্যালকুলেটরের উচ্চতা নিজে থেকে কনটেন্টের মাপে বদলায়।",
      ventajas: ["বিনা মূল্যে, নিবন্ধন ছাড়া", "সরকারি তথ্য, সবসময় হালনাগাদ", "যেকোনো প্রস্থে মানিয়ে যায়"],
      nota: "ক্যালকুলেটরের নিচে CalcularYa-র একটি লিংক থাকে। দয়া করে সেটি মুছবেন না।",
      verTodas: (pais) => `${gBn.de(pais)} সব ক্যালকুলেটর দেখুন`,
      tituloIframe: (nombre) => `${nombre} | CalcularYa-র ক্যালকুলেটর`,
    },
  },
};

// Tailandés (ADR 0002, D13): cortés y neutro, sin pronombre ni ครับ/ค่ะ.
const th: Diccionario<TextosEmbed> = {
  base: {
    marca: "เครื่องคำนวณจาก CalcularYa",
    marcaNuevaPestana: "(เปิดในแท็บใหม่)",
    noDisponible: { titulo: "เครื่องคำนวณนี้ไม่พร้อมใช้งาน", texto: "ที่อยู่อาจมีการเปลี่ยนแปลง" },
    insertar: "ติดตั้งบนเว็บไซต์",
    pagina: {
      titulo: (pais) => [`เครื่องคำนวณฟรีสำหรับเว็บไซต์ | ${pais}`, "เครื่องคำนวณฟรีสำหรับเว็บไซต์"],
      descripcion: (pais) => `เลือกเครื่องคำนวณสำหรับ${pais} คัดลอกโค้ด แล้ววางในบล็อกหรือเว็บไซต์ ใช้ฟรี พร้อมข้อมูลทางการที่อัปเดตอยู่เสมอ`,
      h1: "ติดตั้งเครื่องคำนวณบนเว็บไซต์",
      bajada: "เลือกเครื่องคำนวณ คัดลอกโค้ด แล้ววางได้ทุกที่ ใช้ฟรี และข้อมูลอัปเดตเอง",
      calculadora: "เครื่องคำนวณ",
      buscar: "ค้นหาเครื่องคำนวณ",
      sinResultados: "ไม่มีเครื่องคำนวณที่ตรงกับคำค้นหา",
      tema: "ธีม",
      claro: "สว่าง",
      oscuro: "มืด",
      ancho: "ความกว้าง",
      anchoCompleto: "เต็มความกว้าง",
      acento: "สีเน้น",
      colores: ["เขียว", "น้ำเงิน", "ส้ม", "ชมพู", "เทาหิน"],
      credito: "เพิ่มลิงก์แหล่งที่มาใต้เครื่องคำนวณ",
      vistaPrevia: "ตัวอย่าง",
      codigo: "โค้ดสำหรับวาง",
      copiar: "คัดลอกโค้ด",
      copiado: "คัดลอกโค้ดแล้ว",
      ayudaScript: "สคริปต์นี้ไม่บังคับ ใช้เพื่อให้ความสูงของเครื่องคำนวณปรับตามเนื้อหา",
      ventajas: ["ใช้ฟรี ไม่ต้องสมัคร", "ข้อมูลทางการล่าสุดเสมอ", "แสดงผลได้ทุกความกว้าง"],
      nota: "ด้านล่างเครื่องคำนวณมีลิงก์ไปยัง CalcularYa กรุณาอย่าลบออก",
      verTodas: (pais) => `ดูเครื่องคำนวณทั้งหมดสำหรับ${pais}`,
      tituloIframe: (nombre) => `${nombre} | เครื่องคำนวณจาก CalcularYa`,
    },
  },
};

// Ucraniano (ADR 0002, D15): «ви» con minúscula y las formas corteses, como en Дія y los bancos.
const uk: Diccionario<TextosEmbed> = {
  base: {
    marca: "Калькулятор CalcularYa",
    marcaNuevaPestana: "(відкривається в новій вкладці)",
    noDisponible: { titulo: "Цей калькулятор недоступний", texto: "Можливо, змінилася його адреса." },
    insertar: "Додайте на свій сайт",
    pagina: {
      titulo: (pais) => [`Безкоштовні калькулятори для вашого сайту | ${pais}`, "Безкоштовні калькулятори для вашого сайту"],
      descripcion: (pais) => `Оберіть калькулятор ${GRAMATICA.uk.para(pais)}, скопіюйте код і вставте його у свій блог чи на сайт. Безкоштовно, з офіційними даними, які завжди актуальні.`,
      h1: "Додайте калькулятор на свій сайт",
      bajada: "Оберіть калькулятор, скопіюйте код і вставте його куди потрібно. Безкоштовно, а дані оновлюються самі.",
      calculadora: "Калькулятор",
      buscar: "Знайдіть калькулятор",
      sinResultados: "Немає калькулятора, що відповідає вашому запиту.",
      tema: "Оформлення",
      claro: "Світле",
      oscuro: "Темне",
      ancho: "Ширина",
      anchoCompleto: "На всю ширину",
      acento: "Колір акценту",
      colores: ["Зелений", "Синій", "Помаранчевий", "Рожевий", "Графітовий"],
      credito: "Показувати посилання на джерело під калькулятором",
      vistaPrevia: "Попередній перегляд",
      codigo: "Код для вставлення",
      copiar: "Скопіювати код",
      copiado: "Код скопійовано",
      ayudaScript: "Скрипт необовʼязковий: він підлаштовує висоту калькулятора під його вміст.",
      ventajas: ["Безкоштовно, без реєстрації", "Завжди актуальні офіційні дані", "Підлаштовується під будь-яку ширину"],
      nota: "Під калькулятором є посилання на CalcularYa. Будь ласка, не видаляйте його.",
      verTodas: (pais) => `Переглянути всі калькулятори ${GRAMATICA.uk.para(pais)}`,
      tituloIframe: (nombre) => `${nombre} | Калькулятор CalcularYa`,
    },
  },
};

// Uzbeko latino (ADR 0002, D16): «Siz» con las formas corteses, como en soliq.uz y los bancos.
const uz: Diccionario<TextosEmbed> = {
  base: {
    marca: "CalcularYa kalkulyatori",
    marcaNuevaPestana: "(yangi varaqda ochiladi)",
    noDisponible: { titulo: "Bu kalkulyator mavjud emas", texto: "Uning manzili oʻzgargan boʻlishi mumkin." },
    insertar: "Saytingizga joylang",
    pagina: {
      titulo: (pais) => [`Saytingiz uchun bepul kalkulyatorlar | ${pais}`, "Saytingiz uchun bepul kalkulyatorlar"],
      descripcion: (pais) => `${GRAMATICA.uz.para(pais)} kalkulyatorni tanlang, kodini nusxalang va blogingiz yoki saytingizga joylang. Bepul, rasmiy maʼlumotlar doim dolzarb.`,
      h1: "Saytingizga kalkulyator joylang",
      bajada: "Kalkulyatorni tanlang, kodini nusxalang va kerakli joyga qoʻying. Bepul, maʼlumotlar oʻzi yangilanadi.",
      calculadora: "Kalkulyator",
      buscar: "Kalkulyatorni qidiring",
      sinResultados: "Qidiruvingizga mos kalkulyator topilmadi.",
      tema: "Koʻrinish",
      claro: "Yorugʻ",
      oscuro: "Qorongʻi",
      ancho: "Kenglik",
      anchoCompleto: "Toʻliq kenglik",
      acento: "Asosiy rang",
      colores: ["Yashil", "Koʻk", "Toʻq sariq", "Pushti", "Kulrang"],
      credito: "Kalkulyator ostiga manba havolasini qoʻshish",
      vistaPrevia: "Oldindan koʻrish",
      codigo: "Joylash uchun kod",
      copiar: "Kodni nusxalash",
      copiado: "Kod nusxalandi",
      ayudaScript: "Skript ixtiyoriy: u kalkulyator balandligini mazmuniga qarab moslaydi.",
      ventajas: ["Bepul, roʻyxatdan oʻtmasdan", "Doim dolzarb rasmiy maʼlumotlar", "Har qanday kenglikka moslashadi"],
      nota: "Kalkulyator ostida CalcularYa saytiga havola boʻladi. Iltimos, uni olib tashlamang.",
      verTodas: (pais) => `${GRAMATICA.uz.para(pais)} barcha kalkulyatorlarni koʻring`,
      tituloIframe: (nombre) => `${nombre} | CalcularYa kalkulyatori`,
    },
  },
};

// Ruso (ADR 0002, D17): «вы» con minúscula y el imperativo cortés, como en Kaspi y egov.kz.
const ru: Diccionario<TextosEmbed> = {
  base: {
    marca: "Калькулятор CalcularYa",
    marcaNuevaPestana: "(откроется в новой вкладке)",
    noDisponible: { titulo: "Этот калькулятор недоступен", texto: "Возможно, изменился его адрес." },
    insertar: "Добавьте на свой сайт",
    pagina: {
      titulo: (pais) => [`Бесплатные калькуляторы для вашего сайта | ${pais}`, "Бесплатные калькуляторы для вашего сайта"],
      descripcion: (pais) => `Выберите калькулятор ${GRAMATICA.ru.para(pais)}, скопируйте код и вставьте его в свой блог или на сайт. Бесплатно, с официальными данными, которые всегда актуальны.`,
      h1: "Добавьте калькулятор на свой сайт",
      bajada: "Выберите калькулятор, скопируйте код и вставьте его куда нужно. Бесплатно, а данные обновляются сами.",
      calculadora: "Калькулятор",
      buscar: "Найдите калькулятор",
      sinResultados: "Нет калькулятора, который подходит под ваш запрос.",
      tema: "Оформление",
      claro: "Светлое",
      oscuro: "Темное",
      ancho: "Ширина",
      anchoCompleto: "На всю ширину",
      acento: "Цвет акцента",
      colores: ["Зеленый", "Синий", "Оранжевый", "Розовый", "Графитовый"],
      credito: "Показывать ссылку на источник под калькулятором",
      vistaPrevia: "Предпросмотр",
      codigo: "Код для вставки",
      copiar: "Скопировать код",
      copiado: "Код скопирован",
      ayudaScript: "Скрипт необязателен: он подстраивает высоту калькулятора под его содержимое.",
      ventajas: ["Бесплатно, без регистрации", "Всегда актуальные официальные данные", "Подстраивается под любую ширину"],
      nota: "Под калькулятором есть ссылка на CalcularYa. Пожалуйста, не удаляйте ее.",
      verTodas: (pais) => `Посмотреть все калькуляторы ${GRAMATICA.ru.para(pais)}`,
      tituloIframe: (nombre) => `${nombre} | Калькулятор CalcularYa`,
    },
  },
};

// Rumano (ADR 0002, D18): «dumneavoastră» implícito y 2.ª del plural; el país con «pentru».
const ro: Diccionario<TextosEmbed> = {
  base: {
    marca: "Calculator CalcularYa",
    marcaNuevaPestana: "(se deschide într-o filă nouă)",
    noDisponible: { titulo: "Acest calculator nu este disponibil", texto: "Este posibil să i se fi schimbat adresa." },
    insertar: "Adăugați-l pe site-ul dumneavoastră",
    pagina: {
      titulo: (pais) => [`Calculatoare gratuite pentru site-ul dumneavoastră | ${pais}`, "Calculatoare gratuite pentru site-ul dumneavoastră"],
      descripcion: (pais) => `Alegeți un calculator ${GRAMATICA.ro.para(pais)}, copiați codul și lipiți-l în blogul sau pe site-ul dumneavoastră. Gratuit, cu date oficiale mereu la zi.`,
      h1: "Adăugați un calculator pe site-ul dumneavoastră",
      bajada: "Alegeți calculatorul, copiați codul și lipiți-l unde doriți. Gratuit, iar datele se actualizează singure.",
      calculadora: "Calculator",
      buscar: "Căutați un calculator",
      sinResultados: "Niciun calculator nu corespunde căutării.",
      tema: "Aspect",
      claro: "Luminos",
      oscuro: "Întunecat",
      ancho: "Lățime",
      anchoCompleto: "Pe toată lățimea",
      acento: "Culoare de accent",
      colores: ["Verde", "Albastru", "Portocaliu", "Roz", "Gri ardezie"],
      credito: "Afișați linkul către sursă sub calculator",
      vistaPrevia: "Previzualizare",
      codigo: "Codul de inserat",
      copiar: "Copiați codul",
      copiado: "Codul a fost copiat",
      ayudaScript: "Scriptul este opțional: potrivește înălțimea calculatorului după conținut.",
      ventajas: ["Gratuit, fără înregistrare", "Date oficiale mereu la zi", "Se potrivește la orice lățime"],
      nota: "Sub calculator apare un link către CalcularYa. Vă rugăm să nu îl ștergeți.",
      verTodas: (pais) => `Vedeți toate calculatoarele ${GRAMATICA.ro.para(pais)}`,
      tituloIframe: (nombre) => `${nombre} | Calculator CalcularYa`,
    },
  },
};

// Checo (ADR 0002, D19): vykání con «vy» en minúscula, como Finanční správa y los bancos; el país va
// con «pro» y acusativo (GRAMATICA.cs: «pro Česko»).
const cs: Diccionario<TextosEmbed> = {
  base: {
    marca: "Kalkulačka CalcularYa",
    marcaNuevaPestana: "(otevře se v nové záložce)",
    noDisponible: { titulo: "Tato kalkulačka není k dispozici", texto: "Možná se změnila její adresa." },
    insertar: "Vložte na svůj web",
    pagina: {
      titulo: (pais) => [`Kalkulačky zdarma pro váš web | ${pais}`, "Kalkulačky zdarma pro váš web"],
      descripcion: (pais) => `Vyberte kalkulačku ${GRAMATICA.cs.para(pais)}, zkopírujte kód a vložte ho na svůj blog nebo web. Zdarma, s oficiálními údaji, které jsou vždy aktuální.`,
      h1: "Vložte kalkulačku na svůj web",
      bajada: "Vyberte kalkulačku, zkopírujte kód a vložte ho, kam potřebujete. Zdarma a údaje se aktualizují samy.",
      calculadora: "Kalkulačka",
      buscar: "Najděte kalkulačku",
      sinResultados: "Vašemu hledání neodpovídá žádná kalkulačka.",
      tema: "Vzhled",
      claro: "Světlý",
      oscuro: "Tmavý",
      ancho: "Šířka",
      anchoCompleto: "Na celou šířku",
      acento: "Barva zvýraznění",
      colores: ["Zelená", "Modrá", "Oranžová", "Růžová", "Grafitová"],
      credito: "Zobrazit pod kalkulačkou odkaz na zdroj",
      vistaPrevia: "Náhled",
      codigo: "Kód pro vložení",
      copiar: "Zkopírovat kód",
      copiado: "Kód zkopírován",
      ayudaScript: "Skript je volitelný: přizpůsobuje výšku kalkulačky jejímu obsahu.",
      ventajas: ["Zdarma a bez registrace", "Vždy aktuální oficiální údaje", "Přizpůsobí se jakékoli šířce"],
      nota: "Pod kalkulačkou je odkaz na CalcularYa. Prosíme, neodstraňujte ho.",
      verTodas: (pais) => `Zobrazit všechny kalkulačky ${GRAMATICA.cs.para(pais)}`,
      tituloIframe: (nombre) => `${nombre} | Kalkulačka CalcularYa`,
    },
  },
};

// Griego (ADR 0002, D20): πληθυντικός ευγενείας como gov.gr y los bancos; el país va con «για» y
// acusativo con artículo (GRAMATICA.el: «για την Ελλάδα»).
const el: Diccionario<TextosEmbed> = {
  base: {
    marca: "Υπολογιστής CalcularYa",
    marcaNuevaPestana: "(ανοίγει σε νέα καρτέλα)",
    noDisponible: { titulo: "Αυτός ο υπολογιστής δεν είναι διαθέσιμος", texto: "Ίσως η διεύθυνσή του έχει αλλάξει." },
    insertar: "Ενσωμάτωση στον ιστότοπό σας",
    pagina: {
      titulo: (pais) => [`Δωρεάν υπολογιστές για τον ιστότοπό σας | ${pais}`, "Δωρεάν υπολογιστές για τον ιστότοπό σας"],
      descripcion: (pais) =>
        `Επιλέξτε έναν υπολογιστή ${GRAMATICA.el.para(pais)}, αντιγράψτε τον κώδικα και επικολλήστε τον στον ιστότοπό σας. Δωρεάν, με επίσημα στοιχεία πάντα ενημερωμένα.`,
      h1: "Ενσωματώστε έναν υπολογιστή στον ιστότοπό σας",
      bajada: "Επιλέξτε έναν υπολογιστή, αντιγράψτε τον κώδικα και επικολλήστε τον όπου θέλετε. Δωρεάν, και τα στοιχεία ενημερώνονται μόνα τους.",
      calculadora: "Υπολογιστής",
      buscar: "Βρείτε έναν υπολογιστή",
      sinResultados: "Κανένας υπολογιστής δεν αντιστοιχεί στην αναζήτησή σας.",
      tema: "Εμφάνιση",
      claro: "Ανοιχτόχρωμη",
      oscuro: "Σκουρόχρωμη",
      ancho: "Πλάτος",
      anchoCompleto: "Σε όλο το πλάτος",
      acento: "Χρώμα έμφασης",
      colores: ["Πράσινο", "Μπλε", "Πορτοκαλί", "Ροζ", "Γραφίτης"],
      credito: "Εμφάνιση συνδέσμου προς την πηγή κάτω από τον υπολογιστή",
      vistaPrevia: "Προεπισκόπηση",
      codigo: "Κώδικας για επικόλληση",
      copiar: "Αντιγραφή κώδικα",
      copiado: "Ο κώδικας αντιγράφηκε",
      ayudaScript: "Το script είναι προαιρετικό: προσαρμόζει το ύψος του υπολογιστή στο περιεχόμενό του.",
      ventajas: ["Δωρεάν και χωρίς εγγραφή", "Επίσημα στοιχεία πάντα ενημερωμένα", "Προσαρμόζεται σε κάθε πλάτος"],
      nota: "Κάτω από τον υπολογιστή υπάρχει σύνδεσμος προς το CalcularYa. Σας παρακαλούμε να μην τον αφαιρέσετε.",
      verTodas: (pais) => `Δείτε όλους τους υπολογιστές ${GRAMATICA.el.para(pais)}`,
      tituloIframe: (nombre) => `${nombre} | Υπολογιστής CalcularYa`,
    },
  },
};

export const DICCIONARIOS_EMBED: Diccionarios<TextosEmbed> = { es, pt, en, fr, de, it, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id: idn, tr, bn, th, uk, uz, ru, ro, cs, el };

export function textosEmbed(idioma: Idioma, trato: Trato, locale?: string): TextosEmbed {
  return resolver(DICCIONARIOS_EMBED, idioma, trato, locale);
}
