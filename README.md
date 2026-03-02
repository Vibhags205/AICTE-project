# Lecture Notes Generator

An AI-powered application that transforms audio lectures into structured notes using speech-to-text transcription and intelligent summarization.

## Features

- **Audio Transcription**: Upload audio files and get accurate transcriptions using Faster-Whisper
- **AI-Powered Summarization**: Generate concise, structured notes from transcripts using Ollama LLM
- **History Tracking**: View and manage previously processed lectures
- **Customizable Settings**: Configure AI model and note length preferences
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Real-time Processing**: Upload and process audio files seamlessly

## Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **Faster-Whisper**: Efficient speech-to-text transcription
- **Ollama**: Local LLM for note generation
- **Uvicorn**: ASGI server

### Frontend
- **React**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Markdown**: Render formatted notes

## Prerequisites

- **Python 3.8+**
- **Node.js 16+** and npm
- **Ollama** installed and running locally ([Installation Guide](https://ollama.ai))
- A compatible LLM model downloaded in Ollama (e.g., `mistral`, `llama2`)

