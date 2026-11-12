# Registro dos experimentos — CriptoPrimos (UC5)

**Aluno:** Gabriel Silveira Lima  
**Data do registro:** 12/11/2026  
**Procedência:** valores comunicados pelo aluno após execuções locais no Windows PowerShell.

> **Importante:** este arquivo é uma **transcrição estruturada das informações fornecidas na conversa**, não um log bruto exportado pelo PowerShell nem captura de tela. Os tempos não foram reproduzidos independentemente.

| Campo | Teste 01 | Teste 02 |
|---|---:|---:|
| Limite | 100 | 100000 |
| Índice P | 4 | 50 |
| Índice Q | 7 | 100 |
| Quantidade de primos | 25 | 9592 |
| P | 11 | 233 |
| Q | 19 | 547 |
| N = P × Q | 209 | 127451 |
| Fatores recuperados | [11, 19] | [233, 547] |
| Tempo multiplicação (s) | 0.000000200 | 0.000000300 |
| Tempo fatoração (s) | 0.000001800 | 0.000002000 |

### Cálculos derivados (não medições adicionais)

- Teste 01: `0.000001800 / 0.000000200 = 9.00×`.
- Teste 02: `0.000002000 / 0.000000300 ≈ 6.67×`.

### Informações de integridade

- O usuário confirmou os produtos e os fatores recuperados em ambos os testes.
- Os arquivos `teste-01.txt`, `teste-02.txt` e as capturas de tela originais **não foram disponibilizados neste repositório**.
- O terceiro teste (limite 1.000.000) **não foi confirmado** e, portanto, não possui linha de resultados aqui.
- Os valores anteriormente informados na interface web como `11 ms/op` e `19 ms` não foram usados neste relatório, porque não constituem registro suficientemente claro do desempenho do navegador.

Veja a [análise e conclusão no relatório técnico final](../docs/RELATORIO_FINAL.md).
