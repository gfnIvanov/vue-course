FROM python:3.11.3-slim-buster
WORKDIR /app
COPY poetry.lock pyproject.toml ./
RUN python -m pip install --no-cache-dir poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi
COPY . .