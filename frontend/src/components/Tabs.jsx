export default function Tabs({ active, setActive }) {

  const tabs = ["Notes", "Flashcards", "Transcript"]

  return (

    <div className="flex gap-2 border-b border-indigo-400/20 mb-6 overflow-x-auto\">

      {tabs.map(tab => (

        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap ${
            active === tab
              ? "border-b-2 border-indigo-400 text-indigo-300"
              : "text-gray-400 hover:text-indigo-300"
          }`}
        >
          {tab}
        </button>

      ))}

    </div>

  )
}
