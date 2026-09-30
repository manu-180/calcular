import type { NextRequest } from "next/server";
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
  textoLimpio,
} from "./comun";

export const dynamic = "force-dynamic";

export async function GET() {
  const s = await conSesion("calculos-leer", 60);
  if (!s.ok) return s.res;
  const { sb, usuario } = s.ctx;
  const { data, error } = await sb
    .from("ca_calculos")
    .select(COLUMNAS)
    .eq("user_id", usuario.id)
    .order("updated_at", { ascending: false })
    .limit(200);
  if (error) return errorDb(error, "traer tus cálculos");
  return responder({ ok: true, calculos: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!origenValido(req)) return fallar("origen", "Pedido no permitido.", 403);
  const s = await conSesion("calculos-escribir", 30);
  if (!s.ok) return s.res;

  const cuerpo = await leerJson(req);
  if (!cuerpo) return fallar("invalido", "No pudimos leer el cálculo. Probá de nuevo.", 400);

  const path = cuerpo.path;
  const titulo = textoLimpio(cuerpo.titulo, 80);
  const campos = camposValidos(cuerpo.campos);
  const resumen = cuerpo.resumen == null || cuerpo.resumen === "" ? null : textoLimpio(cuerpo.resumen, 200);

  if (!pathValido(path)) return fallar("invalido", "Esta página no admite guardar cálculos.", 400);
  if (!titulo) return fallar("invalido", "Ponele un nombre de hasta 80 letras.", 400);
  if (!campos || !Object.keys(campos.c).length)
    return fallar("invalido", "No encontramos valores para guardar en este cálculo.", 400);
  if (cuerpo.resumen != null && cuerpo.resumen !== "" && resumen === null)
    return fallar("invalido", "El resumen del cálculo es demasiado largo.", 400);

  const { sb, usuario } = s.ctx;
  const { data, error } = await sb
    .from("ca_calculos")
    .insert({ user_id: usuario.id, path, titulo, campos, resumen })
    .select(COLUMNAS)
    .single();
  if (error) return errorDb(error, "guardar el cálculo");
  return responder({ ok: true, calculo: data }, 201);
}
