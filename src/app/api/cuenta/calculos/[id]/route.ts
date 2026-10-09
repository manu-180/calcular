import type { NextRequest } from "next/server";
import { COLUMNAS, conSesion, errorDb, fallar, idValido, leerJson, origenValido, responder, textoLimpio, textosApi } from "../comun";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const t = textosApi(req);
  if (!origenValido(req)) return fallar("origen", t.origen, 403);
  const { id } = await params;
  if (!idValido(id)) return fallar("no_existe", t.noExiste, 404);

  const s = await conSesion("calculos-escribir", 30, t);
  if (!s.ok) return s.res;

  const cuerpo = await leerJson(req);
  const titulo = textoLimpio(cuerpo?.titulo, 80);
  if (!titulo) return fallar("invalido", t.ponele, 400);

  const { sb, usuario } = s.ctx;
  const { data, error } = await sb
    .from("ca_calculos")
    .update({ titulo })
    .eq("id", id)
    .eq("user_id", usuario.id)
    .select(COLUMNAS)
    .maybeSingle();
  if (error) return errorDb(error, "cambiarle el nombre", t);
  if (!data) return fallar("no_existe", t.noExiste, 404);
  return responder({ ok: true, calculo: data });
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const t = textosApi(req);
  if (!origenValido(req)) return fallar("origen", t.origen, 403);
  const { id } = await params;
  if (!idValido(id)) return fallar("no_existe", t.noExiste, 404);

  const s = await conSesion("calculos-escribir", 30, t);
  if (!s.ok) return s.res;

  const { sb, usuario } = s.ctx;
  const { data, error } = await sb
    .from("ca_calculos")
    .delete()
    .eq("id", id)
    .eq("user_id", usuario.id)
    .select("id");
  if (error) return errorDb(error, "borrarlo", t);
  if (!data?.length) return fallar("no_existe", t.noExiste, 404);
  return responder({ ok: true, id });
}
