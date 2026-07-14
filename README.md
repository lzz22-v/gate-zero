<div align="center">

# ✈️ Gate Zero

### Flight Information Display System — Rio Galeão (GIG)

*Transformando dados brutos de aviação em uma experiência de terminal aeroportuário real, direto no navegador.*

[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6%20Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Grid%20%26%20Flexbox-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![AeroDataBox](https://img.shields.io/badge/API-AeroDataBox-00B4D8?style=for-the-badge&logo=airplane&logoColor=white)](https://rapidapi.com/aedbx-aedbx/api/aerodatabox)
[![License](https://img.shields.io/badge/License-Portfolio%20Project-lightgrey?style=for-the-badge)](#)

</div>

---

## 🛫 Sobre o Projeto

**Gate Zero** é um painel de informações de voos (FIDS) que replica, em tempo real, a experiência visual e funcional dos monitores encontrados nos saguões do **Aeroporto Internacional do Rio de Janeiro–Galeão (GIG)**.

O objetivo foi ir além de um simples consumo de API: o projeto simula o comportamento de um sistema de missão crítica, tratando estados inconsistentes, dados incompletos e falhas de forma elegante — assim como um sistema real de aeroporto precisaria fazer.

Todo o front-end foi construído **sem frameworks**, priorizando o domínio profundo de JavaScript puro, manipulação de DOM performática e arquitetura modular com ES Modules.

---

## 🚀 Features

- 🛬 **Consumo de dados reais de aviação** via API AeroDataBox, com voos, companhias, destinos e horários atualizados
- 🎨 **Logos vetoriais dinâmicas das companhias aéreas**, renderizadas conforme o código IATA/ICAO de cada voo
- 🔄 **Mapeamento de status bilíngue** (PT-BR/EN), convertendo códigos técnicos da API em status legíveis como *Previsto*, *Check-in*, *Embarque*, *Decolado*
- ⏱️ **Cálculo inteligente de atrasos**, comparando horário programado x horário estimado/real e sinalizando visualmente o desvio
- 🖼️ **Fallback de imagens de companhias aéreas**, garantindo que a interface nunca quebre visualmente quando uma logo não está disponível
- 🕳️ **Tratativa de UX para dados vazios ou ausentes da API**, evitando telas quebradas ou campos "undefined"
- 📱 **Design 100% responsivo**, construído com CSS Grid e Flexbox para se adaptar de monitores de terminal a telas mobile
- ⚙️ **Arquitetura modular em ES6**, separando lógica de API, renderização e regras de negócio em módulos independentes
- ⚡ **Build ultrarrápido com Vite**, com hot reload durante o desenvolvimento

---

## 🧰 Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Linguagem | JavaScript (Vanilla, ES6 Modules) |
| Build Tool | Vite |
| Estilização | CSS3 (Grid, Flexbox, Custom Properties) |
| Marcação | HTML5 Semântico |
| Dados | API AeroDataBox (RapidAPI) |

---

## 🖥️ Como Rodar Localmente

**Pré-requisitos:** Node.js instalado e uma chave de API válida do [AeroDataBox](https://rapidapi.com/aedbx-aedbx/api/aerodatabox) (via RapidAPI).

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/gate-zero.git

# 2. Acesse a pasta do projeto
cd gate-zero

# 3. Instale as dependências
npm install
```

Em seguida, crie um arquivo `.env` na raiz do projeto com a sua chave da API:

```env
VITE_AERODATABOX_API_KEY=sua_chave_aqui
```

Por fim, inicie o servidor de desenvolvimento:

```bash
# 4. Rode o projeto
npm run dev
```

O projeto estará disponível em `http://localhost:5173` 🎉

---

## 📌 Aviso

> Este é um **projeto pessoal de portfólio**, desenvolvido com fins de estudo e demonstração técnica. Não possui vínculo oficial com o Aeroporto do Galeão, companhias aéreas ou a API AeroDataBox, e não deve ser utilizado como fonte oficial de informações de voo.

---

<div align="center">

**Feito com ☕, JavaScript puro e paixão por aviação.**

</div>
