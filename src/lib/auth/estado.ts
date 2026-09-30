export type CampoForm = "email" | "clave" | "clave2" | "terminos" | "nombre" | "perfil";

export type EstadoForm = {
  estado: "inicial" | "error" | "enviado" | "ok";
  mensaje?: string;
  errores?: Partial<Record<CampoForm, string>>;
  email?: string;
  sinConfirmar?: boolean;
  valores?: Record<string, string | boolean | null>;
};

export const ESTADO_INICIAL: EstadoForm = { estado: "inicial" };

export const MIN_CLAVE = 8;
// bcrypt ignora lo que pasa de 72 bytes: más largo daría una falsa sensación de seguridad.
export const MAX_CLAVE = 72;
