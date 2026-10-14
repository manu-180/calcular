"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import taxaSocialUnica from "./taxa-social-unica";
export default crearCalculadoraCliente(taxaSocialUnica);
