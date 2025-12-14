
# ⚛️ Tabela Periódica Interativa — Front-end

Front-end de uma **Tabela Periódica Interativa**, desenvolvido em **HTML, CSS e JavaScript puro**, com foco educacional e integração com uma **API REST em Flask**.

O projeto permite explorar os 118 elementos químicos por meio de:
- Visualização em tabela SVG
- Carrossel interativo de elementos
- Modal com detalhes do elemento
- Consulta e inclusão de **informações adicionais** via API

---

## 🎯 Objetivo do Projeto

Este front-end faz parte de um **MVP full-stack**, realizado como atividade avaliativa em pós-graduação em engenharia de software da PUC-Rio, tendo como objetivos principais:

- Demonstrar integração entre front-end estático e back-end REST
- Servir como ferramenta didática para estudo da Tabela Periódica
- Implementar boas práticas de UX/UI sem frameworks
- Funcionar mesmo **sem back-end**, usando dados *fallback*

---

## 🧩 Funcionalidades

### ✅ Tabela SVG Interativa
- Exibição da tabela periódica completa em SVG
- Clique em um elemento do SVG abre o modal correspondente

### ✅ Carrossel de Elementos
- Carrossel horizontal com scroll suave
- Navegação por botões e teclas ← →
- Scroll alinhado via `scroll-snap`

### ✅ Modal de Detalhes
- Símbolo, nome, número atômico, massa e categoria
- Cores dinâmicas por categoria química
- Fechamento por botão, clique externo ou tecla `ESC`

### ✅ Informações Adicionais
- Busca de informações extras via API
- Exibição no modal
- Inclusão de novas informações (POST)

### ✅ Modo Fallback
- Caso a API não esteja disponível, o sistema carrega:
  - Todos os **118 elementos** a partir de dados embutidos
- Nenhuma dependência externa obrigatória

---

## 🖼️ Tecnologias Utilizadas

- **HTML5**
- **CSS3 moderno**
- **JavaScript (ES6+)**
- **Sem frameworks**
- **Sem dependências externas**

---

## 🔌 Integração com Back-end

O front-end espera que a API Flask esteja rodando em:

```

[http://127.0.0.1:5000](http://127.0.0.1:5000)

````

### Endpoints consumidos:

| Método | Rota | Descrição |
|------|------|-----------|
| GET | `/elementos` | Lista todos os elementos |
| GET | `/elementos/<numero>` | Detalhe de um elemento |
| GET | `/elementos/<numero>/info_adicional` | Informações adicionais |
| POST | `/elementos/<numero>/info_adicional` | Adicionar informação |

---

## ▶️ Como Executar

### Opção 1 — Apenas Front-end (modo offline)

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/frontend-tabela-periodica.git
````

2. Abra o arquivo:

   ```text
   tabela_periodica.html
   ```

   diretamente no navegador.

➡️ O carrossel e os modais funcionarão parcialmente, com dados locais.

---

### Opção 2 — Front-end + Back-end (modo completo)

1. Inicie o back-end Flask (em outro repositório):

   ```bash
   python app.py
   ```
2. Abra o arquivo `tabela_periodica.html` no navegador.
3. O front-end irá consumir a API automaticamente.

---

## 📁 Estrutura do Projeto

```text
/
├── tabela_periodica.html
├── Periodic_table_pt.svg
└── README.md
```

---

## 🎨 Design e UX

* Tipografia **monoespaçada segura do sistema**
* Cores por categoria química
* Animações suaves e não intrusivas
* Interface responsiva (desktop e mobile)
* Modal acessível (ESC, clique externo)

---

## 🧠 Observações Técnicas

* O projeto **não usa Google Fonts** por padrão
* Todo o CSS está embutido no HTML (ideal para MVP)
* O JavaScript foi escrito de forma modular e legível
* Pensado para fácil migração futura para SPA ou framework

---

## 🚀 Possíveis Extensões Futuras

* Busca por nome/símbolo
* Filtros por categoria
* Internacionalização (i18n)
* Persistência offline (IndexedDB)
* Separação em arquivos `.css` e `.js`
* Versão React / Vue

---

## 👤 Autor

Projeto desenvolvido como **MVP educacional full-stack**, integrando front-end moderno com API em Python/Flask.

---

## 📜 Licença

Uso educacional e acadêmico.
Sinta-se livre para estudar, adaptar e evoluir o projeto.