# 🎨 Neumorphism CSS Generator

> Clone funcional do [neumorphism.io](https://neumorphism.io) — gerador de CSS para design Neumórfico (Soft UI) construído com HTML, CSS e JavaScript puro.

![Preview do Neumorphism Generator](https://img.shields.io/badge/status-funcionando-brightgreen) ![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![License](https://img.shields.io/badge/licença-MIT-blue)

---

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como parte de uma atividade de **Engenharia Reversa Assistida por IA**, na qual o objetivo era reconstruir um aplicativo funcional a partir da observação de sua interface, sem acesso ao código-fonte original.

A ferramenta permite gerar código CSS para elementos com estética **Neumórfica (Soft UI)** — um estilo de design que usa sombras duplas (clara e escura) para criar a ilusão de profundidade e relevo sobre uma superfície monocromática.

---

## ✨ Funcionalidades

- 🎨 **Seletor de cor** com input HEX sincronizado
- 📏 **Sliders interativos** para ajuste em tempo real de:
  - Tamanho do elemento
  - Border-radius (arredondamento)
  - Distância das sombras
  - Intensidade (opacidade das sombras)
  - Blur (desfoque)
- 🔷 **4 tipos de forma:**
  - **Flat** — superfície plana elevada (sombras externas)
  - **Concave** — superfície côncava (gradiente + sombras externas)
  - **Convex** — superfície convexa (gradiente invertido + sombras externas)
  - **Pressed** — elemento pressionado (sombras internas / inset)
- 👁️ **Preview em tempo real** com fundo dinâmico
- 📋 **Cópia do CSS gerado** com um clique
- 📱 **Layout responsivo** para desktop e mobile

---

## 🚀 Como usar

### Opção 1 — Direto no navegador (sem instalação)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/neumorphism-generator.git

# Abra o arquivo no navegador
cd neumorphism-generator
open index.html   # macOS
start index.html  # Windows
xdg-open index.html  # Linux
```

### Opção 2 — GitHub Pages

Acesse a versão online em:  
**`https://seu-usuario.github.io/neumorphism-generator`**

### Opção 3 — Netlify Drop

1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta do projeto
3. Obtenha um link público instantaneamente

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura da aplicação |
| CSS3 | Estilização e layout responsivo |
| JavaScript (ES6+) | Lógica de cálculo das sombras e interatividade |
| Google Fonts | Tipografia (DM Sans + DM Mono) |

Sem frameworks, sem dependências, sem build step — **um único arquivo `.html`**.

---

## 🧮 Como funciona o algoritmo

O núcleo do gerador interpola duas cores derivadas da cor de fundo escolhida:

```javascript
function shadowColor(hex, intensity, lighten) {
  const { r, g, b } = hexToRgb(hex);
  const target = lighten ? 255 : 0;  // branco ou preto
  return toHex(
    r + (target - r) * intensity,    // interpolação linear
    g + (target - g) * intensity,
    b + (target - b) * intensity
  );
}
```

O CSS gerado segue o padrão:

```css
/* Exemplo — Flat */
border-radius: 50px;
background: #e0e5ec;
box-shadow: 20px 20px 60px #bec3c9, -20px -20px 60px #ffffff;

/* Exemplo — Pressed */
border-radius: 50px;
background: #e0e5ec;
box-shadow: inset 20px 20px 60px #bec3c9, inset -20px -20px 60px #ffffff;
```

---

## 📁 Estrutura do projeto

```
neumorphism-generator/
│
└── index.html        # Aplicação completa (HTML + CSS + JS em um único arquivo)
```

---

## 🎓 Contexto acadêmico

Este projeto foi criado como entrega de atividade prática da disciplina de **Desenvolvimento Assistido por IA**, com os seguintes objetivos de aprendizado:

1. Praticar **engenharia reversa** de interfaces
2. Utilizar **IA generativa** (Google AI Studio / Gemini + Claude) como assistente de desenvolvimento
3. Compreender os limites éticos e técnicos do desenvolvimento assistido por IA
4. Refletir sobre o impacto dessas ferramentas na formação do engenheiro de software

### Reflexões do projeto

**Competências indispensáveis ao engenheiro júnior na era da IA:**
- **Raciocínio sistêmico** — saber decompor um sistema em camadas e descrever sua lógica com precisão
- **Leitura crítica de código gerado** — auditar, testar e refatorar outputs da IA com responsabilidade

**Sobre ética e originalidade:**
> A engenharia reversa assistida por IA se torna problemática quando deixa de ser uma ferramenta de aprendizado e passa a reproduzir, com fins comerciais, os elementos de expressão originais de um produto — sem transformação substantiva. A proteção mais eficaz não é jurídica, mas econômica: inovar mais rápido do que é possível copiar.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🙏 Referências

- [neumorphism.io](https://neumorphism.io) — projeto de referência original (Adam Giebl)
- [Soft UI / Neumorphism — CSS-Tricks](https://css-tricks.com)
- [Google AI Studio](https://aistudio.google.com)
- [Anthropic Claude](https://claude.ai)

---

<p align="center">Feito com ☁️ e muitas sombras CSS</p>
