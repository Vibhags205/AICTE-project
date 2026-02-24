import { FaBars } from "react-icons/fa"

export default function Navbar({ setSidebarOpen }) {

  return (

    <div className="bg-gray-800 p-3 sm:p-4 shadow flex items-center justify-between">

      {/* Hamburger Menu Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className="md:hidden text-white hover:text-indigo-400 transition-colors"
      >
        <FaBars className="text-2xl" />
      </button>

      <h1 className="md:hidden text-lg sm:text-xl font-bold text-center flex-1">
        Lecture Voice-to-Notes Generator
      </h1>

      {/* Spacer for desktop alignment */}
      <div className="md:hidden w-10" />

    </div>

  )
}
