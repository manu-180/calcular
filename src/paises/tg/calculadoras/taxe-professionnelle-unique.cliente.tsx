"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import taxeProfessionnelleUnique from "./taxe-professionnelle-unique";
export default crearCalculadoraCliente(taxeProfessionnelleUnique);
