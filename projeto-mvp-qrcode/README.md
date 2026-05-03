# 🚀 QRfly - Gerador de QR Codes Profissional

O **QRfly** é uma ferramenta profissional e altamente customizável para a criação de QR Codes, oferecendo preview em tempo real e exportação em múltiplos formatos.[cite: 6] Desenvolvido com uma stack moderna, o projeto foca em acessibilidade e flexibilidade para o usuário final.

---

## 📝 Descrição do Projeto

Diferente de geradores comuns, o QRfly permite um controle granular sobre a estética e funcionalidade do código gerado. O sistema integra inteligência artificial via Gemini API[cite: 1] para funcionalidades estendidas e utiliza o Firebase para persistência de dados e autenticação de perfis de usuário.[cite: 3, 4]

### Principais Diferenciais:
*   **Customização Avançada:** Ajuste cores, formas e logos com feedback instantâneo.[cite: 6]
*   **Filtros de Acessibilidade:** Inclui filtros SVG para simular daltonismo (protanopia, deuteranopia, tritanopia e acromatopsia), garantindo que os QR Codes sejam legíveis para todos.[cite: 5]
*   **Gestão de Perfis:** Sistema robusto de segurança via Firestore que permite aos usuários gerenciar seus próprios QR Codes de forma privada.[cite: 4]
*   **Exportação em Lote:** Suporte para geração e download de arquivos compactados em ZIP.[cite: 7]

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza o estado da arte do ecossistema JavaScript/TypeScript:

*   **Frontend:** React 19, Vite, Tailwind CSS 4.[cite: 7]
*   **Animações:** Motion (Framer Motion).[cite: 7]
*   **Backend & Segurança:** Firebase (Auth, Firestore), Express.[cite: 7, 4]
*   **Inteligência Artificial:** @google/genai (Gemini AI).[cite: 7]
*   **Internacionalização:** i18next com detecção automática de idioma.[cite: 7]
*   **Utilitários:** Lucide React (Ícones), QR Code Styling, JSZip, File-saver.[cite: 7]

---

## 🔧 Como Executar o Projeto

### Pré-requisitos
*   Node.js (versão recomendada >= 20).[cite: 8]
*   Uma conta no Google AI Studio para obter a `GEMINI_API_KEY`.[cite: 1]
*   Um projeto configurado no Firebase.[cite: 3]

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/tigrea021/qrfly.git](https://github.com/seu-usuario/qrfly.git)
    cd qrfly
    ```

2.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto (use o `.env.example` como base) e adicione suas chaves:[cite: 1, 2]
    ```env
    GEMINI_API_KEY="sua_chave_aqui"
    APP_URL="http://localhost:3000"
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:3000`.[cite: 7]

---

## 📊 Estrutura de Scripts

*   `npm run dev`: Inicia o ambiente de desenvolvimento com Vite.[cite: 7]
*   `npm run build`: Gera o build de produção otimizado.[cite: 7]
*   `npm run lint`: Executa a checagem de tipos com TypeScript.[cite: 7]
*   `npm run clean`: Remove a pasta de distribuição (`dist`).[cite: 7]

---

## 🔒 Segurança (Firestore Rules)

O projeto implementa regras rigorosas no Firestore para garantir que:
*   Apenas usuários autenticados possam criar ou visualizar seus próprios perfis.[cite: 4]
*   A edição e exclusão de QR Codes sejam restritas exclusivamente ao proprietário (`isOwner`).[cite: 4]
*   Validação de integridade de dados na entrada (`isValidQRCode`).[cite: 4]

---

[Voltar ao início](#-qrfly---gerador-de-qr-codes-profissional)
