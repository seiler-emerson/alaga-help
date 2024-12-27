# Usando a imagem oficial do Node.js como base
FROM node:22-alpine

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install --legacy-peer-deps

# Copiando todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Executar prisma
RUN npx prisma generate

# Construindo o aplicativo Next.js
RUN npm run build

# Expondo a porta na qual o aplicativo irá rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start"]