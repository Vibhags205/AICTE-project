import { useEffect, useRef, useState } from "react"
import { FaCog, FaHistory, FaMicrophone, FaPlay, FaSave, FaStop, FaSyncAlt, FaTimes } from "react-icons/fa"

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  onUpload,
  result,
  setResult,
  loading,
  settings,
  onSaveSettings,
  history,
  historyLoading,
  historyError,
  onRefreshHistory
}) {
  const [recording, setRecording] = useState(false)
  const [recordingError, setRecordingError] = useState("")
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [settingsSaving, setSettingsSaving] = useState(false)
  const [settingsError, setSettingsError] = useState("")
  const [localSettings, setLocalSettings] = useState({
    model: "",
    maxChars: 800
  })

  const recorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])
  const timerRef = useRef(null)

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startTimer = () => {
    setRecordingSeconds(0)
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remaining = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`
  }

  const startCapture = async () => {
    if (recording) return
    setRecordingError("")

    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        setRecordingError("Microphone capture is not supported in this browser.")
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      recorder.onstop = async () => {
        stopTimer()
        setRecording(false)
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const file = new File([blob], `mic-audio-${Date.now()}.webm`, {
          type: "audio/webm"
        })

        try {
          await onUpload(file)
        } catch (error) {
          setRecordingError(error?.message || "Failed to upload microphone audio")
        }
      }

      recorder.start()
      recorderRef.current = recorder
      setRecording(true)
      startTimer()

      const [audioTrack] = stream.getAudioTracks()
      if (audioTrack) {
        audioTrack.addEventListener("ended", stopCapture)
      }
    } catch (error) {
      setRecordingError("Microphone permission is required to record audio.")
    }
  }

  const stopCapture = () => {
    if (!recording) return

    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop()
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const handleSaveSettings = async () => {
    setSettingsError("")
    setSettingsSaving(true)

    try {
      await onSaveSettings(localSettings)
    } catch (error) {
      setSettingsError(error?.message || "Failed to save settings")
    } finally {
      setSettingsSaving(false)
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:relative w-64 h-screen md:h-auto p-6 border-r border-indigo-400/20 transition-transform duration-300 z-40 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } md:translate-x-0`} style={{background: 'rgba(15, 15, 35, 0.8)', backdropFilter: 'blur(10px)'}}>
        
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>

        <h1 className="text-2xl font-bold mb-8 text-center bg-gradient-to-b from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent" style={{filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))'}}>
          Lecture To Notes Generator
        </h1>



      <div className="space-y-6 mt-10">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <FaMicrophone className="text-indigo-400" />
            Microphone Notes
          </div>

          <p className="text-xs text-indigo-200/70 mt-2">
            Record live speech and generate notes after you stop.
          </p>

          {recordingError && (
            <p className="text-xs text-red-300 mt-2">{recordingError}</p>
          )}

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={startCapture}
              disabled={recording}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-100 border border-indigo-400/40 hover:bg-indigo-500/30 disabled:opacity-50"
            >
              <FaPlay />
              Start
            </button>
            <button
              onClick={stopCapture}
              disabled={!recording}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-red-500/20 text-red-100 border border-red-400/40 hover:bg-red-500/30 disabled:opacity-50"
            >
              <FaStop />
              Stop
            </button>
          </div>

          <div className="mt-3 text-xs text-indigo-100/70 flex items-center justify-between">
            <span>{recording ? "Recording" : "Idle"}</span>
            <span>{formatTime(recordingSeconds)}</span>
          </div>

          {loading && (
            <p className="text-xs text-indigo-200 mt-3">Generating notes...</p>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <FaHistory className="text-purple-400" />
              History
            </div>
            <button
              onClick={onRefreshHistory}
              className="text-xs text-indigo-200 hover:text-white flex items-center gap-1"
            >
              <FaSyncAlt />
              Refresh
            </button>
          </div>

          {historyLoading && (
            <p className="text-xs text-indigo-200 mt-2">Loading history...</p>
          )}

          {historyError && (
            <p className="text-xs text-red-300 mt-2">{historyError}</p>
          )}

          {!historyLoading && history.length === 0 && (
            <p className="text-xs text-indigo-200/70 mt-2">No history yet.</p>
          )}

          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => setResult({ notes: item.notes, transcript: item.transcript })}
                className={`w-full text-left text-xs rounded-lg border px-3 py-2 transition-all duration-200 ${
                  result?.notes === item.notes
                    ? "border-indigo-400 text-white bg-indigo-500/20"
                    : "border-white/10 text-indigo-100/80 hover:border-indigo-300/60 hover:text-white"
                }`}
              >
                <div className="font-semibold truncate">{item.filename || "Untitled audio"}</div>
                <div className="text-[10px] text-indigo-200/70 mt-1">
                  {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <FaCog className="text-blue-400" />
            Settings
          </div>

          <div className="mt-3 space-y-3 text-xs text-indigo-100">
            <label className="flex flex-col gap-1">
              Model name
              <input
                value={localSettings.model}
                onChange={(event) => setLocalSettings((prev) => ({
                  ...prev,
                  model: event.target.value
                }))}
                placeholder="mistral"
                className="rounded-md bg-black/40 border border-white/10 px-3 py-2 text-xs text-white"
              />
            </label>

            <label className="flex flex-col gap-1">
              Max transcript chars
              <input
                type="number"
                value={localSettings.maxChars}
                onChange={(event) => setLocalSettings((prev) => ({
                  ...prev,
                  maxChars: event.target.value
                }))}
                className="rounded-md bg-black/40 border border-white/10 px-3 py-2 text-xs text-white"
              />
            </label>
          </div>

          {settingsError && (
            <p className="text-xs text-red-300 mt-2">{settingsError}</p>
          )}

          <button
            onClick={handleSaveSettings}
            disabled={settingsSaving}
            className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-500/20 text-blue-100 border border-blue-400/40 hover:bg-blue-500/30 disabled:opacity-50"
          >
            <FaSave />
            {settingsSaving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </div>

      </div>
    </>
  )
}
