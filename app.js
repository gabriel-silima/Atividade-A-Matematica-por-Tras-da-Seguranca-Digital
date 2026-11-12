"use strict";

// O navegador trabalha com limites modestos. A versão Python cobre limites maiores.
const $ = (id) => document.getElementById(id);
const fmt = (n) => Number(n).toLocaleString("pt-BR");
let primos = [];
let relatorio = "";

function crivoEratostenes(limite) {
  const marcado = new Uint8Array(limite + 1);
  marcado.fill(1, 2);
  for (let p = 2; p * p <= limite; p++) {
    if (marcado[p]) {
      for (let j = p * p; j <= limite; j += p) marcado[j] = 0;
    }
  }
  const encontrados = [];
  for (let n = 2; n <= limite; n++) if (marcado[n]) encontrados.push(n);
  return { marcado, encontrados };
}

function fatorar(n) {
  // Busca simples por divisores; não implementa o RSA.
  const fatores = [];
  let restante = n;
  while (restante % 2 === 0) { fatores.push(2); restante /= 2; }
  for (let d = 3; d * d <= restante; d += 2) {
    while (restante % d === 0) { fatores.push(d); restante /= d; }
  }
  if (restante > 1) fatores.push(restante);
  return fatores;
}

function gerar() {
  const limite = Number($("limite").value);
  if (!Number.isInteger(limite) || limite < 20 || limite > 200000) {
    $("erro").textContent = "Informe um limite inteiro entre 20 e 200.000.";
    return;
  }
  $("erro").textContent = "";
  const inicio = performance.now();
  const { marcado, encontrados } = crivoEratostenes(limite);
  const tempo = performance.now() - inicio;
  primos = encontrados;

  $("total").textContent = fmt(primos.length);
  $("tempoCrivo").textContent = tempo.toFixed(3).replace(".", ",") + " ms";
  $("faixa").textContent = "Índices permitidos: 0 até " + fmt(primos.length - 1) + ".";
  $("indiceP").max = String(primos.length - 1);
  $("indiceQ").max = String(primos.length - 1);

  const grid = $("crivoGrid");
  grid.replaceChildren();
  const frag = document.createDocumentFragment();
  for (let n = 2; n <= Math.min(limite, 100); n++) {
    const span = document.createElement("span");
    span.className = "cell " + (marcado[n] ? "primo" : "composto");
    span.textContent = String(n);
    span.title = n + (marcado[n] ? " é primo" : " é composto");
    frag.appendChild(span);
  }
  grid.appendChild(frag);

  const amostra = $("amostra");
  amostra.replaceChildren();
  const amostraFrag = document.createDocumentFragment();
  for (const n of primos.slice(0, 80)) {
    const span = document.createElement("span");
    span.textContent = String(n);
    amostraFrag.appendChild(span);
  }
  amostra.appendChild(amostraFrag);
  relatorio = "";
  $("baixar").disabled = true;
  for (const id of ["primoP", "primoQ", "produtoN", "tempoMultiplicar", "tempoFatorar"]) $(id).textContent = "—";
  $("fatores").textContent = "Fatores recuperados: —";
  $("comparacao").textContent = "Tempos dependem do navegador e do computador. Comparação didática.";
  $("barraMul").style.width = "0%";
  $("barraFact").style.width = "0%";
}

function executar() {
  $("erro").textContent = "";
  if (primos.length === 0) { $("erro").textContent = "Execute o crivo antes de escolher os números."; return; }
  const ip = Number($("indiceP").value);
  const iq = Number($("indiceQ").value);
  if ($("indiceP").value.trim() === "" || $("indiceQ").value.trim() === "" ||
      !Number.isInteger(ip) || !Number.isInteger(iq) || ip < 0 || iq < 0 ||
      ip >= primos.length || iq >= primos.length) {
    $("erro").textContent = "Selecione índices inteiros dentro do intervalo informado.";
    return;
  }
  if (ip === iq) {
    $("erro").textContent = "Escolha dois índices diferentes para este experimento.";
    return;
  }
  const p = primos[ip], q = primos[iq], n = p * q;
  // Como p, q <= 200.000, o produto está dentro de Number.MAX_SAFE_INTEGER.
  const repeticoes = 100000;
  let acumulado = 0;
  const tMul0 = performance.now();
  for (let i = 0; i < repeticoes; i++) acumulado += p * q;
  const msMul = (performance.now() - tMul0) / repeticoes;
  if (!Number.isFinite(acumulado)) throw new Error("Falha na medição da multiplicação.");

  const tFat0 = performance.now();
  const fatores = fatorar(n);
  const msFat = performance.now() - tFat0;
  const produtoFatores = fatores.reduce((acc, x) => acc * x, 1);
  if (produtoFatores !== n) { $("erro").textContent = "Erro de verificação da fatoração."; return; }

  $("primoP").textContent = fmt(p);
  $("primoQ").textContent = fmt(q);
  $("produtoN").textContent = fmt(n);
  $("fatores").textContent = "Fatores recuperados: [" + fatores.join(", ") + "]";
  $("tempoMultiplicar").textContent = msMul.toFixed(6).replace(".", ",") + " ms/op";
  $("tempoFatorar").textContent = msFat.toFixed(4).replace(".", ",") + " ms";
  const maior = Math.max(msMul, msFat, 0.000001);
  $("barraMul").style.width = Math.max(1, (msMul / maior) * 100).toFixed(2) + "%";
  $("barraFact").style.width = Math.max(1, (msFat / maior) * 100).toFixed(2) + "%";
  const proporcao = msMul > 0 ? (msFat / msMul).toFixed(1).replace(".", ",") : "indeterminada";
  $("comparacao").textContent = "Razão observada ≈ " + proporcao +
    " vezes. Medidas com metodologias diferentes (média de multiplicações vs. fatoração única); não são benchmark criptográfico confiável.";

  relatorio = [
    "ATIVIDADE - A MATEMÁTICA POR TRÁS DA SEGURANÇA DIGITAL",
    "UC5 - Laboratório CriptoPrimos | Resultados medidos no navegador",
    "Data: " + new Date().toLocaleString("pt-BR"),
    "Limite do crivo: " + $("limite").value,
    "Total de primos: " + primos.length,
    "Índice de P: " + ip + " | P = " + p,
    "Índice de Q: " + iq + " | Q = " + q,
    "N = P × Q = " + n,
    "Fatores recuperados: " + fatores.join(" × "),
    "Multiplicação: " + msMul.toFixed(8) + " ms/op (média de " + repeticoes + " operações)",
    "Fatoração: " + msFat.toFixed(6) + " ms (execução única)",
    "Razão aproximada: " + proporcao + " (medida ilustrativa)",
    "Observação: este experimento não implementa RSA nem estima a segurança real de uma chave RSA."
  ].join("\n");
  $("baixar").disabled = false;
  $("resultadoCard").scrollIntoView({behavior:"smooth",block:"nearest"});
}

function baixar() {
  if (!relatorio) return;
  const url = URL.createObjectURL(new Blob([relatorio + "\n"], {type:"text/plain;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = "resultado-criptoprimos.txt";
  link.click();
  URL.revokeObjectURL(url);
}
$("gerar").addEventListener("click", gerar);
$("executar").addEventListener("click", executar);
$("baixar").addEventListener("click", baixar);
gerar();
