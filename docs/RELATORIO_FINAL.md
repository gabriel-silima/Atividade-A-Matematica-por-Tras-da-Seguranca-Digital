# Relatório técnico final — A Matemática por Trás da Segurança Digital

> **Aluno do Curso de Defesa Cibernética: Gabriel Silveira Lima**  
> **Instituição:** SENAC Goiás  
> **Unidade Curricular:** UC5 — Aplicar técnicas de criptografia para proteger dados  
> **Data do relatório:** 12/11/2026  
> **Natureza:** laboratório didático de números primos e fatoração

## 1. Objetivo

Aplicar o Crivo de Eratóstenes para encontrar números primos, selecionar dois primos por índice, calcular o produto `N = P × Q`, recuperar seus fatores por divisão de teste e comparar os tempos de multiplicação e fatoração. A atividade ilustra a diferença entre a operação direta e sua inversão no contexto introdutório do RSA.

## 2. Materiais e ambiente

- Roteiro fornecido: **Atividade — A Matemática por Trás da Segurança Digital** (PDF, 3 páginas), especialmente a seção **4 — Laboratório Prático: Simulador CriptoPrimos**.
- Apresentação fornecida: **A Matemática por Trás da Segurança Digital — Números Primos, Criptografia RSA e o Crivo de Eratóstenes**, Fabiana Harami (PDF, 7 páginas).
- Vídeo de apoio: [Crivo de Eratóstenes — Como encontrar números primos](https://www.youtube.com/watch?v=uJaPQGtYg6g).
- Programa utilizado: [`CriptoPrimos.py`](../CriptoPrimos.py), versão adaptada do laboratório, disponível neste repositório.
- Ambiente relatado: Windows, terminal PowerShell e Python. A versão exata do Python e as especificações de hardware **não foram registradas nesta atividade**.

O roteiro original propõe limite de até 1.000.000.000; nesta entrega foram executados e informados **dois experimentos de menor escala**. Não é declarado que o teste de 1 bilhão ou o terceiro experimento tenham sido realizados.

## 3. Fundamentação

Um número primo é um natural maior que 1 com exatamente dois divisores positivos: 1 e ele mesmo. Pelo Teorema Fundamental da Aritmética, todo inteiro maior que 1 admite uma decomposição em fatores primos única, a menos da ordem.

O **Crivo de Eratóstenes** identifica primos em um intervalo: inicia a marcação em 2 e elimina múltiplos dos primos encontrados; basta processar divisores primos até a raiz quadrada do limite. A multiplicação de dois primos fornece um produto `N`; a fatoração busca recuperar esses fatores a partir de `N`.

No **RSA real**, `N` é apenas parte da chave pública: esta contém o par `(N, e)`. Este laboratório **não implementa geração segura de chaves RSA, criptografia ou descriptografia**.

## 4. Metodologia

1. Executar o simulador em Python com um limite definido para o crivo.
2. Conferir a quantidade de primos gerada.
3. Selecionar os índices `P` e `Q` — a indexação começa em **zero**.
4. Multiplicar os primos selecionados, obtendo `N = P × Q`.
5. Fatorar `N` por divisão de teste e conferir se os fatores recuperados correspondem a `P` e `Q`.
6. Registrar os tempos informados pelo programa e comparar os resultados.

Configurações correspondentes às execuções relatadas:

```powershell
py .\CriptoPrimos.py --limite 100 --p 4 --q 7
py .\CriptoPrimos.py --limite 100000 --p 50 --q 100
```

Esses comandos representam os parâmetros confirmados para cada execução, não uma transcrição literal do histórico do terminal.

## 5. Resultados experimentais

**Origem dos resultados:** valores informados pelo aluno na conversa após executar o script Python no Windows. Os tempos abaixo **não foram medidos novamente pelo autor deste relatório**; os arquivos completos de log do PowerShell ainda não estão anexados ao repositório.

| Indicador | Experimento 1 | Experimento 2 |
|---|---:|---:|
| Limite do Crivo | 100 | 100.000 |
| Índice de P | 4 | 50 |
| Índice de Q | 7 | 100 |
| Total de primos | 25 | 9.592 |
| Primo P | 11 | 233 |
| Primo Q | 19 | 547 |
| Produto N | 209 | 127.451 |
| Fatores encontrados | [11, 19] | [233, 547] |
| Tempo de multiplicação (s) | 0,000000200 | 0,000000300 |
| Tempo de fatoração (s) | 0,000001800 | 0,000002000 |
| Razão fatoração / multiplicação | **9,00×** | **6,67×** |

**Verificação matemática:**
- Experimento 1: `11 × 19 = 209`.
- Experimento 2: `233 × 547 = 127451`.
- Os fatores recuperados correspondem aos primos escolhidos, conforme informado pelo aluno.
- A razão dos tempos é um **cálculo derivado** dos tempos informados, e não uma medição separada.

**Dados não registrados:** tempos de execução do crivo, versão exata do Python, logs íntegros do terminal e capturas de tela originais. Os valores dessas lacunas não foram estimados.

## 6. Análise comparativa

- **Experimento 1:** `0,000001800 / 0,000000200 = 9,00`. A fatoração teve duração informada equivalente a nove vezes a multiplicação.
- **Experimento 2:** `0,000002000 / 0,000000300 ≈ 6,67`. A fatoração teve duração informada aproximadamente 6,67 vezes maior.
- Entre os experimentos, o tempo relatado de fatoração aumentou de 1,8 para 2,0 microssegundos. A razão relativa caiu de 9× para aproximadamente 6,67× porque a multiplicação também variou.

Essas medições são extremamente curtas e podem ser afetadas pela resolução do relógio, pelo agendamento do sistema operacional e por outras tarefas em execução. Por isso, **não é correto afirmar que os dois resultados, isoladamente, demonstram crescimento exponencial** nem usá-los para estimar a resistência de chaves RSA reais. O tempo da divisão de teste depende também dos fatores escolhidos.

## 7. Conclusão

A execução dos dois experimentos confirmou, conforme o registro relatado, o funcionamento do Crivo de Eratóstenes, a seleção de números primos por índices, o cálculo do produto `N` e a recuperação correta dos fatores por divisão de teste. Em ambas as medições relatadas, a fatoração demorou mais que a multiplicação.

A atividade permitiu compreender a ideia central de assimetria de dificuldade usada no estudo introdutório do RSA: multiplicar fatores primos é computacionalmente simples, ao passo que recuperar fatores de números **muito grandes e adequadamente escolhidos** pode ser difícil. O programa é um demonstrador educacional e **não prova a segurança do RSA nem constitui sua implementação completa**.

**Situação da atividade:** experimento matemático essencial concluído com dois testes relatados; documentação publicada neste repositório. A incorporação dos logs integrais e das capturas originais é uma pendência documental facultativa para complementar a rastreabilidade, não evidência já existente no GitHub.

## 8. Referências e rastreabilidade

1. **HARAMI, Fabiana.** *A Matemática por Trás da Segurança Digital: Números Primos, Criptografia RSA e o Crivo de Eratóstenes*. Apresentação didática fornecida na UC5, 7 páginas, sem data informada no material.
2. **SENAC — material da atividade.** *Atividade: A Matemática por Trás da Segurança Digital*. Roteiro de laboratório fornecido na UC5, 3 páginas, sem autoria ou data explicitamente identificadas no arquivo.
3. **Vídeo de apoio.** *Crivo de Eratóstenes — Como encontrar números primos*. YouTube, [assistir](https://www.youtube.com/watch?v=uJaPQGtYg6g). Canal e data de publicação não confirmados.
4. **SILVEIRA LIMA, Gabriel.** [`CriptoPrimos.py`](../CriptoPrimos.py). Código utilizado no repositório da atividade, consultado em 12/11/2026.

**Registros complementares:** [Resultados declarados](../resultados/registro-experimentos.md) · [Situação das evidências](../evidencias/README.md).
