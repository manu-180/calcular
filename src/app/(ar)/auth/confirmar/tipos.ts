export const TIPOS_ENLACE = ["signup", "magiclink", "recovery"] as const;
export type TipoEnlaceConfirmar = (typeof TIPOS_ENLACE)[number];

// hashed_token de GoTrue: hex (sha224 = 56 caracteres); se deja margen por si cambia el hash.
export const TOKEN_RE = /^[0-9a-f]{20,128}$/i;
