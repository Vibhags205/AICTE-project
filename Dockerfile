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

# Expose ports
EXPOSE 11434 8000

# Create startup script
RUN echo '#!/bin/bash\n\
ollama serve &\n\
sleep 5\n\
ollama pull mistral\n\
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000\n\
' > /app/start.sh && chmod +x /app/start.sh

# Run the startup script
CMD ["/app/start.sh"]
