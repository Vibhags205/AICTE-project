import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"

export default function UploadZone({ onUpload }) {

  const [drag, setDrag] = useState(false)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")

  const handleFile = async (file) => {

    if (!file) return
    
    setFileName(file.name)
    setError("")
    console.log("Uploading file:", file.name)

    try {
      await onUpload(file)

    } catch (error) {

      console.error("Upload error:", error)
      setError(error?.response?.data?.detail || error?.message || "Upload failed")

    }
  }

  return (

    <div className="w-full">

      {fileName && (
        <p className="text-sm text-gray-300 mb-4">📁 Selected: {fileName}</p>
      )}

      {error && (
        <p className="text-sm text-red-400 mb-4">❌ {error}</p>
      )}

      <div
        className={`
          w-full
          p-6
          sm:p-8
          md:p-10
          border-2
          rounded-xl
          transition-all duration-300
          backdrop-blur-sm
          ${drag ? "border-indigo-400 bg-indigo-500/10" : "border-indigo-400/30 bg-indigo-500/5"}
        `}
        style={{
          boxShadow: drag ? '0 0 30px rgba(99, 102, 241, 0.3)' : '0 0 15px rgba(99, 102, 241, 0.1)'
        }}

        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}

        onDragLeave={() => setDrag(false)}

        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          handleFile(e.dataTransfer.files[0])
        }}
      >

        <div className="flex flex-col items-center gap-4">

          <FaCloudUploadAlt className="text-3xl sm:text-4xl md:text-5xl text-indigo-400 drop-shadow-lg" style={{textShadow: '0 0 10px rgba(99, 102, 241, 0.5)'}} />

          <p className="text-base sm:text-lg md:text-xl font-medium bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Drag & Drop Lecture Audio
          </p>

          <p className="text-sm sm:text-base text-white">or click to browse</p>

          <label className="
            cursor-pointer
            px-4 sm:px-6 py-3
            text-xs sm:text-sm md:text-base
            border border-indigo-400/50
            text-white
            bg-indigo-500/10
            hover:bg-indigo-500/20
            hover:border-indigo-400
            transition-all duration-300
            rounded-lg
            font-medium
          ">

            Choose File

            <input
              type="file"
              hidden
              accept="audio/*"
              onChange={(e) => handleFile(e.target.files[0])}
            />

          </label>

        </div>

      </div>

    </div>

  )
}
