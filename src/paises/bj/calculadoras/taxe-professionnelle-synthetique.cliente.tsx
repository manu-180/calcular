"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import taxeProfessionnelleSynthetique from "./taxe-professionnelle-synthetique";
export default crearCalculadoraCliente(taxeProfessionnelleSynthetique);
