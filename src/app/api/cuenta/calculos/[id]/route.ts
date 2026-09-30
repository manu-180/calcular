import type { NextRequest } from "next/server";
import { COLUMNAS, conSesion, errorDb, fallar, idValido, leerJson, origenValido, responder, textoLimpio } from "../comun";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const NO_EXISTE = "Ese cálculo ya no está en tu cuenta.";

export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!origenValido(req)) return fallar("origen", "Pedido no permitido.", 403);
  const { id } = await params;
  if (!idValido(id)) return fallar("no_existe", NO_EXISTE, 404);

  const s = await conSesion("calculos-escribir", 30);
  if (!s.ok) return s.res;

  const cuerpo = await leerJson(req);
  const titulo = textoLimpio(cuerpo?.titulo, 80);
  if (!titulo) return fallar("invalido", "Ponele un nombre de hasta 80 letras.", 400);

  const { sb, usuario } = s.ctx;
  const { data, error } = await sb
    .from("ca_calculos")
    .update({ titulo })
    .eq("id", id)
    .eq("user_id", usuario.id)
    .select(COLUMNAS)
    .maybeSingle();
  if (error) return errorDb(error, "cambiarle el nombre");
  if (!data) return fallar("no_existe", NO_EXISTE, 404);
  return responder({ ok: true, calculo: data });
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  if (!origenValido(req)) return fallar("origen", "Pedido no permitido.", 403);
  const { id } = await params;
  if (!idValido(id)) return fallar("no_existe", NO_EXISTE, 404);

  const s = await conSesion("calculos-escribir", 30);
  if (!s.ok) return s.res;

  const { sb, usuario } = s.ctx;
  const { data, error } = await sb
    .from("ca_calculos")
    .delete()
    .eq("id", id)
    .eq("user_id", usuario.id)
    .select("id");
  if (error) return errorDb(error, "borrarlo");
  if (!data?.length) return fallar("no_existe", NO_EXISTE, 404);
  return responder({ ok: true, id });
}
