import Hero from "../components/Hero"
import UploadZone from "../components/UploadZone"
import NotesViewer from "../components/NotesViewer"
import Loader from "../components/Loader"

export default function Dashboard({ result, loading, onUpload }) {

  return (

    <div className="
      flex-1
      flex
      flex-col
      items-center
      justify-center
      px-4
      sm:px-6
      py-8
      sm:py-12
      md:py-16
      bg-gradient-to-br from-black via-black to-indigo-950/20
    ">

      {/* Main centered container */}
      <div className="
        w-full
        max-w-4xl
        flex
        flex-col
        items-center
        text-center
      ">

        {/* Hero Section */}
        <Hero />

        {/* Upload Box */}
        <div className="w-full mt-8 sm:mt-10 md:mt-12">

          <UploadZone onUpload={onUpload} />

        </div>

        {/* Loader */}
        {loading && (
          <div className="mt-6 sm:mt-8">
            <Loader />
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="w-full mt-8 sm:mt-10 md:mt-12">
            <NotesViewer data={result} />
          </div>
        )}

      </div>

    </div>

  )
}
