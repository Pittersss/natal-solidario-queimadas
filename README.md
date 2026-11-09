# 🎄 Natal Solidário de Queimadas - PB

Website institucional e de divulgação do movimento comunitário **Natal Solidário**, realizado anualmente no município de Queimadas (Paraíba), com foco nas famílias em vulnerabilidade social do bairro do Castanho e de mais de 10 comunidades rurais vizinhas.

---

## 🌟 Sobre o Movimento

- **Origens**: Em 2006, o Conselho de Desenvolvimento Rural e o Sindicato de Trabalhadores Rurais iniciaram a atividade com o nome de *Natal sem Fome*, mas não deram continuidade.
- **Continuidade & Liderança**: O Sr. **José Joaquim Vieira** (ex-servidor da Emater) manteve viva a chama da solidariedade e, ao ver a filha crescer, incentivou **Mércia Ramos** a retomar e liderar o movimento.
- **Início Oficial**: Em **2009**, focando na comunidade carente do Castanho.
- **Expansão Comunitária**: Em **2011**, expandiu para as comunidades vizinhas.
- **Comunidades Atendidas**:
  - Castanho (Cima e Baixo)
  - Cássio
  - Guritiba
  - Zé Velho
  - Vila
  - Zumbi
  - Baixa Verde
  - Pedra do Sino
  - Sítio Lutador
  - Sítio Malhada
- **Metodologia & Transparência**:
  - Cadastro prévio via formulário com nome e telefone dos beneficiados.
  - Avaliação humanizada e presencial: escuta atenta, visita às moradias e contagem de filhos.
  - Alimentos arrecadados viram 100% cestas básicas fartas para as famílias.
  - Recursos financeiros (rifas, doações comunitárias e recursos próprios dos organizadores) são usados no lazer das crianças (brinquedos infláveis, pula-pula, escorregadores, piscina de bolinhas, algodão doce) e compra de presentes para sorteio infantil com o Papai Noel.
  - Quando a arrecadação monetária atinge superávit expressivo, são sorteados eletrodomésticos essenciais (como fogões novos e geladeiras) para as famílias carentes.
  - Cobertura jornalística histórica documentada pelo canal comunitário **Queimadas Acontece**.

---

## 🎨 Funcionalidades do Site

1. **Design 100% Responsivo & Mobile-First**:
   - Totalmente adaptado para smartphones (incluindo telas menores como iPhone SE de 320px–375px), tablets e computadores.
   - Menu mobile deslizante com fundo desfocado (*backdrop*), animação do botão hambúrguer para "X", fechamento inteligente (clique fora e tecla `Esc`) e atalho direto de doação.
   - Prevenção de auto-zoom no iOS Safari através de tipografia padronizada em campos de texto.
2. **Temática Natalina Atraente & Acolhedora**:
   - Paleta festiva em tons de Vermelho Bordô Natalino (`#A3081D`), Verde Esmeralda/Pinheiro (`#155D40`), Dourado Nobre (`#D4AF37`) e Branco Neve.
   - Efeito suave de queda de neve em tempo real via Canvas 2D a 60fps, com botão de ligar/desligar no cabeçalho.
3. **História Emocionante com Linha do Tempo Interativa**:
   - Resgate histórico de 2006, renascimento em 2009, expansão de 2011 e presença contínua até hoje.
   - Homenagem com fotos de alta qualidade ao idealizador **José Joaquim Vieira** e à líder **Mércia Ramos**.
4. **Mapeamento das 10+ Comunidades**:
   - Cards informativos apresentando cada uma das regiões rurais e vilas atendidas em Queimadas.
5. **Galeria de Fotos com Filtros & Lightbox Touch**:
   - Fotos reais das edições integradas e categorizadas (Edições 2024, 2022, 2015, Cestas Básicas, Lazer Infantil & Papai Noel, Sorteio de Eletrodomésticos).
   - Modal Lightbox em tela cheia com suporte a **gestos de toque (swipe)** no celular e navegação por teclado (setas e `Esc`) no desktop.
   - *Sem dependência de vídeos pesados*, garantindo carregamento instantâneo mesmo no 3G/4G rural.
6. **Calculadora de Impacto Solidário (Simulador)**:
   - Permite que o doador clique em valores (R$ 30, R$ 60, R$ 100, R$ 200, R$ 500) ou digite um valor personalizado para ver em tempo real o que sua doação viabiliza em brinquedos, alimentos e lazer.
7. **Canais de Doação & PIX Copia e Cola Oficial**:
   - **Chave PIX**: `83993744640` (Telefone / Celular - Titular: Mércia Ramos).
   - Sistema prático de **Copie e Cole**: botão que copia a chave com 1 toque e exibe confirmação visual animada via Toast.
   - Orientações claras para doação de alimentos não perecíveis e voluntariado.
8. **Formulário de Apoio & Voluntariado**:
   - Formulário completo para doadores e voluntários, com persistência local no navegador (`localStorage`).
9. **Perguntas Frequentes (FAQ)**:
   - Sanfona expansível respondendo às principais dúvidas sobre seleção, transparência, doações à distância e sorteios.

---

## 💻 Como Visualizar Localmente no Computador

Por ser uma aplicação web puramente estática (HTML5, CSS3 e JavaScript Vanilla), não é necessário instalar Node.js, PHP, banco de dados ou fazer compilação/build.

### Opção 1: Servidor Local (Recomendado)
Abra o terminal na pasta do projeto e execute:

```bash
# Com Python 3:
python3 -m http.server 8000
```

Em seguida, acesse no navegador:
👉 **[http://localhost:8000](http://localhost:8000)**

### Opção 2: Abertura Direta
Abra o arquivo `index.html` diretamente com duplo clique no seu navegador (Chrome, Firefox, Edge, Safari).

---

## 🌐 Como Fazer o Deploy de Graça (Colocar o Site no Ar)

Como este projeto é um **site estático** (apenas arquivos HTML, CSS, JavaScript e imagens locais), você pode hospedá-lo **100% de graça**, com certificado de segurança HTTPS/SSL vitalício e alta velocidade de carregamento.

Abaixo estão as 4 melhores opções gratuitas, com passo a passo detalhado:

---

### Método 1: GitHub Pages (Mais Popular & Recomendado)

O **GitHub Pages** é a forma padrão e mais estável da comunidade para hospedar sites estáticos gratuitamente por tempo ilimitado.

#### Passo a Passo:

1. **Crie uma conta gratuita** no [GitHub](https://github.com) se ainda não tiver.
2. **Crie um novo repositório**:
   - Acesse [github.com/new](https://github.com/new).
   - Nome do repositório: `natal-solidario-queimadas` (ou qualquer nome de sua preferência).
   - Deixe como **Public** (Público).
   - Não marque para inicializar com README (já temos o projeto pronto).
   - Clique em **Create repository**.
3. **Envie os arquivos do projeto pelo terminal**:
   Abra o terminal na pasta deste projeto e rode:

   ```bash
   # Inicialize o repositório git local
   git init

   # Adicione todos os arquivos do projeto
   git add .

   # Faça o primeiro commit
   git commit -m "Deploy inicial: Site Natal Solidário de Queimadas"

   # Renomeie a branch principal para main
   git branch -M main

   # Conecte ao seu repositório remoto (substitua SEU-USUARIO pelo seu username do GitHub)
   git remote add origin https://github.com/SEU-USUARIO/natal-solidario-queimadas.git

   # Envie os arquivos para o GitHub
   git push -u origin main
   ```

4. **Ative o GitHub Pages**:
   - No seu repositório no GitHub, clique na aba **Settings** (Configurações).
   - No menu lateral esquerdo, clique em **Pages**.
   - Na seção **Build and deployment** > **Branch**:
     - Selecione a branch: `main`
     - Selecione a pasta: `/ (root)`
     - Clique em **Save**.
5. **Pronto!** Em cerca de 1 a 2 minutos, o GitHub exibirá o link público do site no topo da página:
   - Exemplo: `https://SEU-USUARIO.github.io/natal-solidario-queimadas/`

---

### Método 2: Netlify Drop (O Mais Fácil: Arrastar e Soltar sem Terminal)

Se você não quiser usar linha de comando ou Git, o **Netlify** permite colocar o site no ar em menos de 30 segundos apenas arrastando a pasta do projeto.

#### Passo a Passo:

1. Acesse: **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Crie uma conta gratuita (ou faça login com Google/GitHub/Email).
3. Na área pontilhada com a mensagem *"Drag and drop your site output folder here"*:
   - Arraste a pasta inteira `natal-solidario-queimadas` diretamente para a janela do navegador.
4. O Netlify fará o upload dos arquivos e gerará um link público imediatamente com HTTPS seguro ativo!
   - Exemplo: `https://natal-solidario-queimadas.netlify.app`
5. **(Opcional) Mudar o nome do link**:
   - Vá em **Site configuration** > **Change site name** e defina um nome amigável, como `natal-solidario-queimadas`.

---

### Método 3: Vercel (CDN Global Ultrarrápida)

A **Vercel** oferece uma infraestrutura de alta velocidade e é 100% gratuita para projetos comunitários.

#### Opção A — Conectando via GitHub:
1. Acesse [vercel.com](https://vercel.com) e crie uma conta com seu GitHub.
2. Clique no botão **Add New...** > **Project**.
3. Selecione o repositório `natal-solidario-queimadas`.
4. Deixe todas as configurações no padrão (como o projeto é estático, não precisa de comando de build).
5. Clique em **Deploy**. Em menos de 20 segundos seu site estará no ar com link `https://natal-solidario-queimadas.vercel.app`.

#### Opção B — Direto pelo Terminal via Vercel CLI:
```bash
# Execute na pasta do projeto:
npx vercel

# Siga as instruções rápidas na tela (faça login e confirme com Enter)
# Para publicar em produção definitiva:
npx vercel --prod
```

---

### Método 4: Cloudflare Pages (Largura de Banda Ilimitada)

A **Cloudflare** oferece proteção DDoS de nível empresarial e tráfego ilimitado de graça.

#### Passo a Passo:
1. Acesse o painel da [Cloudflare](https://dash.cloudflare.com) e entre em **Workers & Pages**.
2. Clique em **Create application** > aba **Pages** > **Connect to Git**.
3. Selecione o repositório do projeto no GitHub.
4. Em **Build settings**, selecione o preset: `None` (Framework preset: Nenhum).
5. Clique em **Save and Deploy**. O site receberá um endereço `*.pages.dev`.

---

## 🔒 Domínio Personalizado Gratuito

Se no futuro a coordenação do projeto registrar um domínio próprio (ex: `natalsolidarioqueimadas.com.br` ou `.org`):
- Todas as plataformas acima (GitHub Pages, Netlify, Vercel e Cloudflare) oferecem suporte nativo a domínios personalizados com certificado SSL gratuito e renovação automática.
- Basta adicionar o domínio nas configurações da plataforma e criar os registros DNS apontando para o serviço escolhido.

---

## 📁 Estrutura de Arquivos

```text
natal-solidario-queimadas/
├── docs/                     # Imagens históricas das edições (2015, 2022, 2024, perfil e logo)
├── index.html                # Estrutura HTML5 semântica e acessível (com PIX Copia e Cola)
├── styles.css                # Folha de estilos natalina responsiva (Mobile, Tablet, Desktop)
├── script.js                 # Comportamentos interativos, menu mobile, neve, lightbox com swipe e calculadora
└── README.md                 # Documentação completa e guia de deploy gratuito
```

---

## ❤️ Contribuições e Apoio

O **Natal Solidário de Queimadas - PB** é feito de pessoas para pessoas. Toda ajuda com divulgação, doação de alimentos, apoio com rifas ou brinquedos é sempre muito bem-vinda!

Para apoiar via PIX:
- **Chave PIX (Telefone)**: `83993744640`
- **Titular**: Mércia Ramos
- **Município**: Queimadas - Paraíba 🎄✨
