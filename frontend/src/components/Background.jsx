export default function Background() {

  return (

    <div className="absolute inset-0 -z-10 overflow-hidden bg-black">

      <style>{`
        @keyframes blob-move-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes blob-move-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 40px); }
        }
        @keyframes blob-move-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(15px); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(-8px); }
        }
        .blob1 { animation: blob-move-1 8s ease-in-out infinite; }
        .blob2 { animation: blob-move-2 10s ease-in-out infinite; }
        .blob3 { animation: blob-move-3 12s ease-in-out infinite; }
        .float1 { animation: float-1 6s ease-in-out infinite; }
        .float2 { animation: float-2 7s ease-in-out infinite; }
        .float3 { animation: float-3 8s ease-in-out infinite; }
        .float4 { animation: float-4 9s ease-in-out infinite; }
        .float5 { animation: float-5 7.5s ease-in-out infinite; }
      `}</style>

      {/* White Blob 1 */}
      <div className="
        absolute
        w-[500px]
        h-[500px]
        bg-white
        rounded-full
        blur-[140px]
        opacity-25
        blob1
        top-[-100px]
        left-[-100px]
      " />

      {/* White Blob 2 */}
      <div className="
        absolute
        w-[400px]
        h-[400px]
        bg-white
        rounded-full
        blur-[140px]
        opacity-25
        blob2
        bottom-[-100px]
        right-[-100px]
      " />

      {/* White Blob 3 */}
      <div className="
        absolute
        w-[350px]
        h-[350px]
        bg-white
        rounded-full
        blur-[140px]
        opacity-25
        blob3
        top-[40%]
        left-[40%]
      " />
     
    </div>

  )
}
