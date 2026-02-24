import axios from "axios"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000"

export async function uploadAudio(file, settings = {}) {
  const formData = new FormData()
  formData.append("file", file)

  if (settings.model) {
    formData.append("model", settings.model)
  }

  if (settings.maxChars) {
    formData.append("max_chars", String(settings.maxChars))
  }

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    timeout: 600000
  })

  return res.data
}

export async function fetchHistory() {
  const res = await axios.get(`${API_BASE}/history`)
  return res.data
}

export async function fetchSettings() {
  const res = await axios.get(`${API_BASE}/settings`)
  return res.data
}

export async function saveSettings(settings) {
  const res = await axios.post(`${API_BASE}/settings`, settings)
  return res.data
}
