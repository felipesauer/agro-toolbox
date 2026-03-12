FROM node:20-alpine AS base
WORKDIR /app

# --- API ---
FROM base AS api
COPY api/package*.json ./api/
RUN cd api && npm ci --omit=dev
COPY api/ ./api/

# --- Web build ---
FROM base AS web-build
COPY web/package*.json ./web/
RUN cd web && npm ci
COPY web/ ./web/
COPY patches/ ./patches/
RUN cd web && npx vite build

# --- Production ---
FROM base AS production
COPY --from=api /app/api ./api
COPY --from=web-build /app/web/dist ./web/dist

WORKDIR /app/api
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD ["node", "src/server.js"]
