export default function Loader() {

  return (

    <div className="flex items-center justify-center py-12">

      <div className="text-center">

        <div className="inline-block">
          <div className="border-4 border-indigo-500/30 border-t-indigo-400 border-r-indigo-400 rounded-full w-12 h-12 animate-spin" style={{boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'}} />
        </div>

        <p className="text-indigo-200 mt-4 text-base sm:text-lg font-medium">Processing...</p>
        <p className="text-indigo-300/70 text-xs sm:text-sm mt-1">Generating notes</p>
      </div>

    </div>

  )
}
