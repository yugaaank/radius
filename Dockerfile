# Multi-stage Dockerfile for Radius (Frontend + Backend)
FROM oven/bun:latest AS base
WORKDIR /app

# --- Backend Builder ---
FROM base AS backend-builder
COPY radius-backend/package.json radius-backend/bun.lock ./backend/
RUN cd backend && bun install
COPY radius-backend ./backend

# --- Frontend Builder ---
FROM base AS frontend-builder
COPY radius-frontend/package.json radius-frontend/bun.lock ./frontend/
RUN cd frontend && bun install
COPY radius-frontend ./frontend
# Set a build-time variable for the API URL (can be overridden at runtime via env)
ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN cd frontend && bun run build

# --- Final Runner ---
FROM base AS runner
COPY --from=backend-builder /app/backend ./backend
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package.json ./frontend/package.json
COPY --from=frontend-builder /app/frontend/node_modules ./frontend/node_modules

# Install Coral CLI (Conceptual - you would need the actual binary or install script)
# RUN curl -fsSL https://coral.cli/install.sh | bash

EXPOSE 3000 3001

# Script to run both
RUN echo '#!/bin/bash\ncd /app/backend && bun run src/index.ts & \ncd /app/frontend && bun run start' > /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
