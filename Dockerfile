# Use Ubuntu as base image (needed for Ollama)
FROM ubuntu:22.04

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3-pip \
    curl \
    wget \
    git \
    && rm -rf /var/lib/apt/lists/*

# Download and install Ollama
RUN curl -fsSL https://ollama.ai/install.sh | sh

# Set working directory
WORKDIR /app

# Copy requirements
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Set environment variables
ENV OLLAMA_HOST=http://127.0.0.1:11434
ENV OLLAMA_MODEL=mistral
ENV NOTES_MAX_CHARS=800

# Expose ports
EXPOSE 11434 8000

# Create startup script
RUN echo '#!/bin/bash\n\
echo "Starting Ollama service..."\n\
ollama serve &\n\
echo "Waiting for Ollama to be ready..."\n\
sleep 10\n\
echo "Pulling Ollama model: $OLLAMA_MODEL"\n\
ollama pull $OLLAMA_MODEL\n\
echo "Starting FastAPI backend..."\n\
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000\n\
' > /app/start.sh && chmod +x /app/start.sh

# Run the startup script
CMD ["/app/start.sh"]
