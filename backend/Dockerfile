FROM python:3.12-slim

WORKDIR /app
COPY . .
RUN chmod +x docker-entrypoint.sh && \
    pip install .