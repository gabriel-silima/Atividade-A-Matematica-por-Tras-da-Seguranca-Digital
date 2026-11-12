# Atividade — A Matemática por Trás da Segurança Digital

**Curso Técnico em Defesa Cibernética — SENAC | UC5: Aplicar técnicas de criptografia**

Laboratório de **números primos**, **Crivo de Eratóstenes** e **fatoração** com duas formas de execução:

- **Página web interativa**: `index.html`, `style.css` e `app.js`, compatíveis com GitHub Pages; não exige instalação.
- **Simulador Python**: `CriptoPrimos.py`, com limite configurável, contagem de primos, seleção de índices P/Q, multiplicação, fatoração e tempos.
- **Testes automatizados**: `tests/test_criptoprimos.py`.

## Objetivo

1. Gerar números primos usando o Crivo de Eratóstenes.
2. Exibir os primeiros 80 primos em 8 colunas.
3. Escolher índices de P e Q (a partir de **zero**).
4. Calcular `N = P × Q`.
5. Fatorar `N` e recuperar P e Q.
6. Comparar os tempos registrados e interpretar a diferença.

## Página web (GitHub Pages)

Abra a página publicada do repositório (depois de habilitar Pages em **Settings → Pages → Deploy from a branch → main → /(root) → Save**).

A página usa limite máximo de **200.000** para permanecer responsiva no navegador. Já abre com o exemplo da aula, limite 100, índices 4 e 7.

## Executar no computador

Requisito: **Python 3.9+**, sem instalar bibliotecas de terceiros.

Windows PowerShell:

```powershell
py .\CriptoPrimos.py --limite 100 --p 4 --q 7
py .\CriptoPrimos.py --limite 100000 --p 50 --q 100
py -m unittest discover -s tests -v
```

Linux/macOS:

```bash
python3 CriptoPrimos.py --limite 100 --p 4 --q 7
python3 -m unittest discover -s tests -v
```

**Resultado matemático da primeira execução:** P = 11, Q = 19, N = 209, fatores = [11, 19]. Os tempos são medidos no computador onde o programa roda, não são valores fixos.

## Escalonamento do laboratório

Execute primeiro 100, depois 100.000, depois 1.000.000. O arquivo original da aula usava **1.000.000.000**, um limite que exige cerca de 1 GB apenas para o mapa de primos e pode consumir muito mais memória e tempo de CPU. Para 1 bilhão, planeje os recursos do computador antes de executar.

A implementação fornecida aqui evita o problema de criar uma lista com todos os ~50 milhões de primos de um limite de 1 bilhão só para mostrar os primeiros 80. Os índices são buscados diretamente no mapa, sem materializar a lista inteira.

## Registro de resultados

Preencha **somente com medidas realmente obtidas**:

| Teste | Limite | Índice P | Índice Q | P | Q | N | Tempo multiplicação (s) | Tempo fatoração (s) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 100 | 4 | 7 | 11 | 19 | 209 | a medir | a medir |
| 2 | 100000 | 50 | 100 | a medir | a medir | a medir | a medir | a medir |
| 3 | 1000000 | a escolher | a escolher | a medir | a medir | a medir | a medir | a medir |

### Perguntas para a análise final

- O resultado da fatoração corresponde aos primos P e Q?
- O que mudou quando os índices escolhidos aumentaram?
- Por que a multiplicação é, em geral, mais rápida que a fatoração por divisão de teste?
- Quais limites impedem este laboratório de representar a segurança de uma chave RSA real?

## Observações técnicas

Este é um **modelo pedagógico**, não um gerador de chaves RSA e não executa criptografia ou descriptografia. No RSA real, a chave pública inclui `(N, e)`, e a chave privada usa parâmetros derivados de P e Q. Um produto de primos pequenos não oferece segurança criptográfica. Os relógios têm resolução limitada: razões de tempos muito curtos são instáveis e não provam, isoladamente, a segurança de um algoritmo. O tempo da fatoração por divisão de teste depende do tamanho e dos fatores de N, não cresce monotonamente para qualquer par escolhido.

**Material de referência**: apresentação e roteiro *A Matemática por Trás da Segurança Digital*; vídeo [Crivo de Eratóstenes — Como encontrar números primos](https://www.youtube.com/watch?v=uJaPQGtYg6g).
