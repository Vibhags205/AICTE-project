import { useEffect, useState } from "react"
import Navbar from "./layout/Navbar"
import Sidebar from "./layout/Sidebar"
import Dashboard from "./pages/Dashboard"
import Background from "./components/Background"
import FloatingBalls from "./components/FloatingBalls"
import { fetchHistory, fetchSettings, saveSettings, uploadAudio } from "./api/notesApi"

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState("")
  const [settings, setSettings] = useState({
    model: "",
    maxChars: 800
  })

  const refreshHistory = async () => {
    setHistoryLoading(true)
    setHistoryError("")

    try {
      const data = await fetchHistory()
      setHistory(data)
    } catch (error) {
      setHistoryError(error?.message || "Failed to load history")
    } finally {
      setHistoryLoading(false)
    }
  }

  const loadSettings = async () => {
    try {
      const data = await fetchSettings()
      setSettings({
        model: data.model || "",
        maxChars: data.max_chars || 800
      })
    } catch (error) {
      // Keep defaults if backend is unavailable.
    }
  }

  const handleSaveSettings = async (nextSettings) => {
    const payload = {
      model: nextSettings.model || "",
      max_chars: Number(nextSettings.maxChars) || 800
    }

    const data = await saveSettings(payload)
    setSettings({
      model: data.model || "",
      maxChars: data.max_chars || 800
    })
  }

  const handleUpload = async (file, overrides = {}) => {
    setLoading(true)

    try {
      const data = await uploadAudio(file, {
        model: overrides.model ?? settings.model,
        maxChars: overrides.maxChars ?? settings.maxChars
      })
      setResult(data)
      await refreshHistory()
      return data
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
    refreshHistory()
  }, [])

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Floating background gradients */}
      <Background />

      {/* Floating glowing balls */}
      <FloatingBalls />

      {/* Navbar */}
      <Navbar setSidebarOpen={setSidebarOpen} />

      {/* Main container */}
      <div className="flex flex-col md:flex-row flex-1">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onUpload={handleUpload}
          result={result}
          setResult={setResult}
          loading={loading}
          settings={settings}
          onSaveSettings={handleSaveSettings}
          history={history}
          historyLoading={historyLoading}
          historyError={historyError}
          onRefreshHistory={refreshHistory}
        />

        {/* Main content */}
        <Dashboard
          setSidebarOpen={setSidebarOpen}
          result={result}
          loading={loading}
          onUpload={handleUpload}
        />

      </div>
    </div>

  )
}
