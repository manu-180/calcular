import { after, type NextRequest } from "next/server";
import { marcarOrigen } from "@/lib/auth/perfil";
import { mercadoDeDesde } from "@/lib/auth/sitio";
import {
  COLUMNAS,
  camposValidos,
  conSesion,
  errorDb,
  fallar,
  leerJson,
  origenValido,
  pathValido,
  responder,
  sitioDe,
  textoLimpio,
  textosApi,
} from "./comun";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const t = textosApi(req);
  const s = await conSesion("calculos-leer", 60, t);
  if (!s.ok) return s.res;
  const { sb, usuario } = s.ctx;
  const { data, error } = await sb
    .from("ca_calculos")
    .select(COLUMNAS)
    .eq("user_id", usuario.id)
    .order("updated_at", { ascending: false })
    .limit(200);
  if (error) return errorDb(error, "traer tus cálculos", t);
  return responder({ ok: true, calculos: data ?? [] });
}

export async function POST(req: NextRequest) {
  const t = textosApi(req);
  if (!origenValido(req)) return fallar("origen", t.origen, 403);
  const s = await conSesion("calculos-escribir", 30, t);
  if (!s.ok) return s.res;

  const cuerpo = await leerJson(req);
  if (!cuerpo) return fallar("invalido", t.noLeido, 400);

  const path = cuerpo.path;
  const titulo = textoLimpio(cuerpo.titulo, 80);
  const campos = camposValidos(cuerpo.campos);
  const resumen = cuerpo.resumen == null || cuerpo.resumen === "" ? null : textoLimpio(cuerpo.resumen, 200);

  if (!pathValido(path)) return fallar("invalido", t.noAdmite, 400);
  if (!titulo) return fallar("invalido", t.ponele, 400);
  if (!campos || !Object.keys(campos.c).length) return fallar("invalido", t.sinValores, 400);
  if (cuerpo.resumen != null && cuerpo.resumen !== "" && resumen === null) return fallar("invalido", t.resumenLargo, 400);

  const { sb, usuario } = s.ctx;
  const { data, error } = await sb
    .from("ca_calculos")
    .insert({ user_id: usuario.id, path, titulo, campos, resumen })
    .select(COLUMNAS)
    .single();
  if (error) return errorDb(error, "guardar el cálculo", t);
  // La persona sólo puede escribir las columnas de siempre (grant por columna): el sitio y el país los
  // anota el servidor, según el Host y el path del cálculo.
  if (sitioDe(req) === "intl" && typeof data?.id === "string") {
    const id = data.id;
    after(() => marcarOrigen("ca_calculos", id, usuario.id, { sitio: "intl", mercado: mercadoDeDesde(path) }));
  }
  return responder({ ok: true, calculo: data }, 201);
}
