# Deploy — VPS + EasyPanel (Docker Compose)

Site **estático** (React + Vite) servido por **Nginx**. Sem backend, sem banco, sem variáveis de ambiente.

## Arquivos de infraestrutura

| Arquivo              | Função                                                            |
| -------------------- | ----------------------------------------------------------------- |
| `Dockerfile`         | Build multi-stage: Node 22 (`npm run build`) → Nginx 1.27 (alpine) |
| `nginx.conf`         | Fallback de SPA (React Router), gzip e cache de assets            |
| `docker-compose.yml` | Serviço `frontend` na rede externa `easypanel`, porta interna 80  |
| `.dockerignore`      | Reduz o contexto de build (sem `node_modules`, `dist`, etc.)      |

## Passo a passo no EasyPanel

1. **Commit + push** destes arquivos para o GitHub (o EasyPanel faz deploy a partir do repositório):
   ```bash
   git add Dockerfile nginx.conf docker-compose.yml .dockerignore DEPLOY.md
   git commit -m "Infra: deploy via Docker Compose (Nginx) no EasyPanel"
   git push
   ```

2. No painel do EasyPanel: **Create Service → Compose**.

3. Aponte o serviço para o repositório `Renzo26/KG_imoveis` (branch principal). O EasyPanel detecta o `docker-compose.yml` na raiz.

4. A rede `easypanel` (`external: true`) já existe no painel — é a rede do proxy interno. Não precisa criar.

5. Em **Domains**, adicione o domínio desejado apontando para o serviço `frontend`, **porta 80**. O EasyPanel cuida do proxy reverso e do certificado HTTPS (Let's Encrypt).

6. **Deploy**. O EasyPanel builda a imagem e sobe o container. O `healthcheck` confirma que o Nginx respondeu.

## Atualizações

A cada novo `git push`, basta **Deploy/Rebuild** no EasyPanel para publicar a versão nova. O `index.html` é servido com `no-cache`, então o navegador sempre pega o build mais recente (os assets têm hash no nome e usam cache longo).

## Observações

- Os imóveis são **dados mockados** (`src/data/properties.ts`). Quando houver integração com uma API real, adicionar `VITE_API_URL` como `build-arg` no `Dockerfile`/`docker-compose.yml`.
- O chunk `ParticleField` (Three.js) passa de 500 kB — é apenas um aviso de build, já vem **code-split** (carregado só no hero da home).
