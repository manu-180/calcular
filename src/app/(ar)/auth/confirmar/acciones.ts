"use server";

import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { after } from "next/server";
import { redirect } from "next/navigation";
import type { EmailOtpType } from "@supabase/supabase-js";
import { clienteServidor } from "@/lib/supabase/servidor";
import { servicio } from "@/lib/supabase/servicio";
import { registrarEvento } from "@/lib/rastreo-servidor";
import { esAdminEmail } from "@/lib/auth/admin";
import { COOKIE_ALTA, OPCIONES_ALTA, ponerPista } from "@/lib/auth/cookies";
import { destinoSeguro, inicioTrasEntrar } from "@/lib/auth/destino";
import type { EstadoForm } from "@/lib/auth/estado";
import { huellaAlta, limitePorIp, origenAlta, sitioDelPedido } from "@/lib/auth/pedido";
import { asegurarPerfil, verificadoPrevio, vincularCompras } from "@/lib/auth/perfil";
import { TIPOS_ENLACE, TOKEN_RE } from "@/app/(ar)/auth/confirmar/tipos";

export async function confirmarEnlace(_prev: EstadoForm, fd: FormData): Promise<EstadoForm> {
  const tokenHash = String(fd.get("token_hash") ?? "");
  const tipo = String(fd.get("type") ?? "");
  const nextCrudo = String(fd.get("next") ?? "");
  if (!TOKEN_RE.test(tokenHash) || !(TIPOS_ENLACE as readonly string[]).includes(tipo)) {
    return { estado: "error", mensaje: "invalido" };
  }
  if (!(await limitePorIp("confirmar"))) return { estado: "error", mensaje: "limite" };

  const store = await cookies();
  const altaDeEsteNavegador = tipo === "signup" && store.get(COOKIE_ALTA)?.value === huellaAlta(tokenHash);

  const supabase = await clienteServidor();
  const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: tipo as EmailOtpType });
  if (error || !data.user?.email) {
    if (error && error.code !== "otp_expired") console.error("[auth] verifyOtp:", error.code ?? error.status, error.message);
    return { estado: "error", mensaje: error?.code === "otp_expired" ? "vencido" : "invalido" };
  }
  if (tipo === "signup") store.set(COOKIE_ALTA, "", { ...OPCIONES_ALTA, maxAge: 0 });

  const userId = data.user.id;
  const email = data.user.email.toLowerCase();

  // Toma de cuenta previa al registro: cualquiera puede dar de alta el mail de otro con SU clave.
  // Cuando el dueño del buzón toca después un enlace (alta, entrada, confirmación), el mail queda
  // probado pero la clave sigue siendo la del intruso. Por eso, en la PRIMERA prueba de buzón,
  // la clave se descarta salvo que el enlace sea el alta pedida en este mismo navegador (cookie
  // ca_alta): ahí quien escribió la clave y quien tiene el buzón son la misma persona.
  const primeraPrueba = !(await verificadoPrevio(userId, email));
  let claveDescartada = false;
  if (primeraPrueba) {
    if (!altaDeEsteNavegador) {
      const { error: eClave } = await servicio().auth.admin.updateUserById(userId, {
        password: randomBytes(32).toString("base64url"),
      });
      if (eClave) {
        console.error("[auth] no pude descartar la clave previa:", eClave.code ?? eClave.status, eClave.message);
        await supabase.auth.signOut({ scope: "local" });
        return { estado: "error", mensaje: "falla" };
      }
      claveDescartada = true;
    }
    const { error: eOtras } = await supabase.auth.signOut({ scope: "others" });
    if (eOtras) console.error("[auth] no pude cerrar las otras sesiones:", eOtras.code ?? eOtras.status, eOtras.message);
  }

  // El orden importa: ca_vincular_compras exige el perfil ya verificado.
  const sitio = await sitioDelPedido();
  const origen = origenAlta(sitio, nextCrudo);
  const verificado = await asegurarPerfil(userId, email, true, origen);
  if (verificado) await vincularCompras(supabase);
  ponerPista(store);
  after(() =>
    registrarEvento({
      tipo: tipo === "signup" ? "registro" : "login",
      path: "/auth/confirmar",
      userId,
      props: { via: tipo },
      origen,
    }),
  );

  if (tipo === "recovery") redirect("/cuenta/clave?desde=recuperar");
  if (claveDescartada) redirect("/cuenta/clave?desde=confirmar");
  redirect(destinoSeguro(nextCrudo, inicioTrasEntrar(sitio, verificado && esAdminEmail(email)), sitio));
}
