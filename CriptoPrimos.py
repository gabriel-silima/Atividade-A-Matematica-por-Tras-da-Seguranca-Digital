#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Atividade UC5: Crivo de Eratóstenes, multiplicação e fatoração.
Sem dependências externas. Não implementa criptografia RSA completa.
"""
import argparse
from itertools import islice
from math import isqrt
from time import perf_counter


def crivo_eratostenes(limite: int) -> bytearray:
    """Retorna um mapa: 1 para primo e 0 para não primo."""
    if limite < 2:
        raise ValueError("O limite deve ser pelo menos 2.")
    primos = bytearray(b"\x01") * (limite + 1)
    primos[0:2] = b"\x00\x00"
    for p in range(2, isqrt(limite) + 1):
        if primos[p]:
            inicio = p * p
            quantidade = ((limite - inicio) // p) + 1
            primos[inicio:limite + 1:p] = b"\x00" * quantidade
    return primos


def indice_para_primo(mapa: bytearray, indice: int) -> int:
    """Busca o primo de índice zero-based sem materializar todos os primos."""
    if indice < 0:
        raise IndexError("O índice não pode ser negativo.")
    # .find executa a busca em código nativo; cada iteração avança ao próximo primo.
    posicao = 1
    for _ in range(indice + 1):
        posicao = mapa.find(1, posicao + 1)
        if posicao == -1:
            raise IndexError("Índice além da quantidade de primos do crivo.")
    return posicao


def fatorar(n: int) -> list[int]:
    """Fatoração ingênua por divisão de teste, para uso didático."""
    if n < 2:
        raise ValueError("N precisa ser maior que 1.")
    fatores = []
    while n % 2 == 0:
        fatores.append(2)
        n //= 2
    divisor = 3
    while divisor * divisor <= n:
        while n % divisor == 0:
            fatores.append(divisor)
            n //= divisor
        divisor += 2
    if n > 1:
        fatores.append(n)
    return fatores


def executar(limite: int, indice_p: int, indice_q: int) -> dict:
    if limite > 1_000_000_000:
        raise ValueError("Máximo didático: 1.000.000.000.")
    if limite < 20:
        raise ValueError("O limite deve ser no mínimo 20.")
    if indice_p == indice_q:
        raise ValueError("Escolha índices diferentes para P e Q.")

    print(f"Gerando crivo até {limite:,} ...")
    inicio = perf_counter()
    mapa = crivo_eratostenes(limite)
    tempo_crivo = perf_counter() - inicio
    total = mapa.count(1)
    print(f"Primos encontrados: {total:,}; crivo: {tempo_crivo:.6f} s")
    print("Primeiros primos (8 colunas):")
    amostra = list(islice((i for i, sim in enumerate(mapa) if sim), 80))
    for pos in range(0, len(amostra), 8):
        print("".join(f"{n:10}" for n in amostra[pos:pos + 8]))

    if not (0 <= indice_p < total and 0 <= indice_q < total):
        raise IndexError(f"Índices permitidos: 0 a {total - 1}.")
    p = indice_para_primo(mapa, indice_p)
    q = indice_para_primo(mapa, indice_q)
    inicio = perf_counter()
    n = p * q
    tempo_mul = perf_counter() - inicio
    inicio = perf_counter()
    fatores = fatorar(n)
    tempo_fatoracao = perf_counter() - inicio
    assert fatores == sorted([p, q]), "Os fatores não conferem com P e Q."
    print(f"\nÍndices: P={indice_p}; Q={indice_q}")
    print(f"Primos: P={p}; Q={q}")
    print(f"N = P × Q = {n}")
    print(f"Fatores recuperados: {fatores}")
    print(f"Multiplicação: {tempo_mul:.9f} s")
    print(f"Fatoração: {tempo_fatoracao:.9f} s")
    if tempo_mul > 0:
        print(f"Razão fatoração/multiplicação: {tempo_fatoracao / tempo_mul:.2f}×")
    print("Aviso: tempos muito curtos sofrem ruído de medição.")
    return {"limite": limite, "quantidade": total, "p": p, "q": q, "n": n,
            "fatores": fatores, "tempo_crivo": tempo_crivo,
            "tempo_multiplicacao": tempo_mul, "tempo_fatoracao": tempo_fatoracao}


def main() -> None:
    parser = argparse.ArgumentParser(description="Laboratório de fatoração de números primos.")
    parser.add_argument("--limite", type=int, default=100, help="Limite do crivo (padrão: 100).")
    parser.add_argument("--p", type=int, default=4, help="Índice zero-based de P (padrão: 4).")
    parser.add_argument("--q", type=int, default=7, help="Índice zero-based de Q (padrão: 7).")
    args = parser.parse_args()
    try:
        executar(args.limite, args.p, args.q)
    except (ValueError, IndexError, MemoryError) as erro:
        parser.exit(2, f"Erro: {erro}\n")


if __name__ == "__main__":
    main()
