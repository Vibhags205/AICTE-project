export default function Hero() {

  return (

    <div className="flex flex-col items-center text-center">

      <h1 className="
        text-3xl
        sm:text-4xl
        md:text-5xl
        lg:text-6xl
        xl:text-7xl
        font-bold
        mb-4
        px-4
        bg-gradient-to-b from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent
      " style={{filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))'}}>
       speech.refine.learn.
      </h1>

      <p className="
        text-white
        text-sm
        sm:text-base
        md:text-lg
        max-w-2xl
        leading-relaxed
        px-4
      ">
        Transform lecture audio into structured notes using AI.
        Highlight key concepts, generate summaries, and reinforce learning instantly.
      </p>

    </div>

  )
}
