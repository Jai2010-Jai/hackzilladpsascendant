FROM python:3.11-bookworm

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=3000 \
    PYTHON_ORIGIN=http://127.0.0.1:8000

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y --no-install-recommends nodejs \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY web/package.json web/
WORKDIR /app/web
RUN npm install

WORKDIR /app
COPY . .
WORKDIR /app/web
RUN npm run build

WORKDIR /app
EXPOSE 3000
CMD ["bash", "start.sh"]
