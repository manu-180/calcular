import type { Idioma, Trato } from "../tipos";
import { resolver, type Diccionario, type Diccionarios } from "./resolver";

// Textos del panel de compartir con imagen (src/motor/compartir/Redes.tsx): Instagram, Facebook y los
// formatos de la tarjeta. Texto plano, sin funciones, porque viaja a un Client Component. Impersonal a
// propósito (sin tú, vos ni usted): el mismo texto vale para todo trato y no hace falta parche.

export interface TextosRedes {
  grupo: string;
  instagramSub: string;
  copiar: string;
  mas: string;
  nuevaPestana: string;
  formato: string;
  historia: string;
  feed: string;
  descargar: string;
  copiado: string;
  compartido: string;
  enInstagram: string;
  descargado: string;
  error: string;
}

const ZH_HANT: TextosRedes = {
  grupo: "分享到",
  instagramSub: "限時動態",
  copiar: "複製連結",
  mas: "更多選項",
  nuevaPestana: "會在新分頁開啟",
  formato: "圖片格式",
  historia: "限時動態 9:16",
  feed: "貼文 1:1",
  descargar: "下載圖片",
  copiado: "已複製連結。",
  compartido: "已分享。",
  enInstagram: "已分享。連結也已複製，可用「連結」貼紙貼到限時動態。",
  descargado: "圖片已下載，連結也已複製。用手機上傳到限時動態，再用「連結」貼紙貼上連結。",
  error: "目前無法分享。",
};

const ZH_HANS: TextosRedes = {
  ...ZH_HANT,
  grupo: "分享到",
  instagramSub: "快拍",
  copiar: "复制链接",
  mas: "更多选项",
  nuevaPestana: "将在新标签页打开",
  formato: "图片格式",
  historia: "快拍 9:16",
  feed: "帖子 1:1",
  descargar: "下载图片",
  copiado: "已复制链接。",
  compartido: "已分享。",
  enInstagram: "已分享。链接也已复制，可用“链接”贴纸贴到快拍里。",
  descargado: "图片已下载，链接也已复制。用手机上传到快拍，再用“链接”贴纸贴上链接。",
  error: "暂时无法分享。",
};

const base = (t: TextosRedes): Diccionario<TextosRedes> => ({ base: t });

export const DICCIONARIOS_REDES: Diccionarios<TextosRedes> = {
  es: base({
    grupo: "Compartir en",
    instagramSub: "Historia",
    copiar: "Copiar link",
    mas: "Más opciones",
    nuevaPestana: "se abre en una pestaña nueva",
    formato: "Formato de la imagen",
    historia: "Historia 9:16",
    feed: "Publicación 1:1",
    descargar: "Descargar imagen",
    copiado: "Link copiado.",
    compartido: "Listo, compartida.",
    enInstagram: "Listo. El link también quedó copiado para pegarlo en la historia con el sticker «Enlace».",
    descargado: "La imagen se descargó y el link quedó copiado. Desde el celular se sube como historia y el link va con el sticker «Enlace».",
    error: "No se pudo compartir en este momento.",
  }),
  pt: base({
    grupo: "Compartilhar em",
    instagramSub: "Stories",
    copiar: "Copiar o link",
    mas: "Mais opções",
    nuevaPestana: "abre em uma nova aba",
    formato: "Formato da imagem",
    historia: "Stories 9:16",
    feed: "Feed 1:1",
    descargar: "Baixar imagem",
    copiado: "O link foi copiado.",
    compartido: "Pronto, compartilhada.",
    enInstagram: "Pronto. O link também ficou copiado para colar no story com o adesivo «Link».",
    descargado: "A imagem foi baixada e o link ficou copiado. Pelo celular, ela entra como story e o link vai com o adesivo «Link».",
    error: "Não foi possível compartilhar agora.",
  }),
  en: base({
    grupo: "Share on",
    instagramSub: "Story",
    copiar: "Copy link",
    mas: "More options",
    nuevaPestana: "opens in a new tab",
    formato: "Image format",
    historia: "Story 9:16",
    feed: "Post 1:1",
    descargar: "Download image",
    copiado: "Link copied.",
    compartido: "Done, shared.",
    enInstagram: "Done. The link is copied too, ready to paste into the story with the Link sticker.",
    descargado: "Image downloaded and link copied. Post it as a story from a phone and add the link with the Link sticker.",
    error: "Sharing isn't available right now.",
  }),
  fr: base({
    grupo: "Partager sur",
    instagramSub: "Story",
    copiar: "Copier le lien",
    mas: "Plus d’options",
    nuevaPestana: "s’ouvre dans un nouvel onglet",
    formato: "Format de l’image",
    historia: "Story 9:16",
    feed: "Publication 1:1",
    descargar: "Télécharger l’image",
    copiado: "Lien copié.",
    compartido: "C’est partagé.",
    enInstagram: "C’est fait. Le lien est aussi copié, prêt à coller dans la story avec le sticker « Lien ».",
    descargado: "Image téléchargée et lien copié. Depuis un téléphone, elle se publie en story et le lien s’ajoute avec le sticker « Lien ».",
    error: "Le partage n’est pas disponible pour le moment.",
  }),
  de: base({
    grupo: "Teilen auf",
    instagramSub: "Story",
    copiar: "Link kopieren",
    mas: "Weitere Optionen",
    nuevaPestana: "öffnet sich in einem neuen Tab",
    formato: "Bildformat",
    historia: "Story 9:16",
    feed: "Beitrag 1:1",
    descargar: "Bild herunterladen",
    copiado: "Link kopiert.",
    compartido: "Fertig, geteilt.",
    enInstagram: "Fertig. Der Link ist auch kopiert und lässt sich mit dem Link-Sticker in die Story einfügen.",
    descargado: "Bild heruntergeladen und Link kopiert. Vom Handy aus als Story posten und den Link mit dem Link-Sticker einfügen.",
    error: "Teilen ist gerade nicht möglich.",
  }),
  it: base({
    grupo: "Condividi su",
    instagramSub: "Storia",
    copiar: "Copia link",
    mas: "Altre opzioni",
    nuevaPestana: "si apre in una nuova scheda",
    formato: "Formato dell’immagine",
    historia: "Storia 9:16",
    feed: "Post 1:1",
    descargar: "Scarica immagine",
    copiado: "Link copiato.",
    compartido: "Fatto, condivisa.",
    enInstagram: "Fatto. Anche il link è copiato, pronto da incollare nella storia con lo sticker «Link».",
    descargado: "Immagine scaricata e link copiato. Dal telefono si pubblica come storia e il link si aggiunge con lo sticker «Link».",
    error: "Al momento non è possibile condividere.",
  }),
  nl: base({
    grupo: "Delen op",
    instagramSub: "Story",
    copiar: "Link kopiëren",
    mas: "Meer opties",
    nuevaPestana: "opent in een nieuw tabblad",
    formato: "Formaat van de afbeelding",
    historia: "Story 9:16",
    feed: "Bericht 1:1",
    descargar: "Afbeelding downloaden",
    copiado: "Link gekopieerd.",
    compartido: "Klaar, gedeeld.",
    enInstagram: "Klaar. De link is ook gekopieerd en kan met de linksticker in de story.",
    descargado: "Afbeelding gedownload en link gekopieerd. Vanaf een telefoon als story plaatsen en de link toevoegen met de linksticker.",
    error: "Delen lukt nu even niet.",
  }),
  ja: base({
    grupo: "共有先",
    instagramSub: "ストーリーズ",
    copiar: "リンクをコピー",
    mas: "その他の方法",
    nuevaPestana: "新しいタブで開きます",
    formato: "画像の形式",
    historia: "ストーリーズ 9:16",
    feed: "投稿 1:1",
    descargar: "画像をダウンロード",
    copiado: "リンクをコピーしました。",
    compartido: "共有しました。",
    enInstagram: "共有しました。リンクもコピー済みなので、リンクスタンプでストーリーズに貼れます。",
    descargado: "画像をダウンロードし、リンクをコピーしました。スマホからストーリーズに投稿し、リンクスタンプでリンクを貼れます。",
    error: "現在共有できません。",
  }),
  ko: base({
    grupo: "공유하기",
    instagramSub: "스토리",
    copiar: "링크 복사",
    mas: "다른 방법",
    nuevaPestana: "새 탭에서 열림",
    formato: "이미지 형식",
    historia: "스토리 9:16",
    feed: "게시물 1:1",
    descargar: "이미지 저장",
    copiado: "링크를 복사했어요.",
    compartido: "공유했어요.",
    enInstagram: "공유했어요. 링크도 복사돼 있어서 링크 스티커로 스토리에 붙일 수 있어요.",
    descargado: "이미지를 저장하고 링크를 복사했어요. 휴대폰에서 스토리로 올리고 링크 스티커로 링크를 붙이면 돼요.",
    error: "지금은 공유할 수 없어요.",
  }),
  zh: { base: ZH_HANT, regional: { "zh-CN": ZH_HANS, "zh-SG": ZH_HANS } },
};

export function textosRedes(idioma: Idioma, trato: Trato, locale?: string): TextosRedes {
  return resolver(DICCIONARIOS_REDES, idioma, trato, locale);
}
