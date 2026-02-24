export default function FloatingBalls() {
  return (
    <>
      <style>{`
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
        .float1 { animation: float-1 4s ease-in-out infinite; }
        .float2 { animation: float-2 4.5s ease-in-out infinite; }
        .float3 { animation: float-3 5s ease-in-out infinite; }
        .float4 { animation: float-4 5.5s ease-in-out infinite; }
        .float5 { animation: float-5 4.8s ease-in-out infinite; }
      `}</style>

      {/* Glassy Floating White Balls - Layer on top */}
      <div className="fixed w-8 h-8 rounded-full float1 top-[20%] left-[10%] pointer-events-none" style={{background: 'rgba(255,255,255,0.15)', boxShadow: '0 0 12px rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.2)', zIndex: 50}} />
      <div className="fixed w-6 h-6 rounded-full float2 top-[60%] right-[15%] pointer-events-none" style={{background: 'rgba(255,255,255,0.12)', boxShadow: '0 0 10px rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.15)', zIndex: 50}} />
      <div className="fixed w-10 h-10 rounded-full float3 bottom-[20%] left-[20%] pointer-events-none" style={{background: 'rgba(255,255,255,0.15)', boxShadow: '0 0 13px rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.2)', zIndex: 50}} />
      <div className="fixed w-7 h-7 rounded-full float4 top-[70%] right-[10%] pointer-events-none" style={{background: 'rgba(255,255,255,0.12)', boxShadow: '0 0 11px rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.15)', zIndex: 50}} />
      <div className="fixed w-6 h-6 rounded-full float5 bottom-[30%] right-[30%] pointer-events-none" style={{background: 'rgba(255,255,255,0.14)', boxShadow: '0 0 11px rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.18)', zIndex: 50}} />
      <div className="fixed w-5 h-5 rounded-full float1 top-[45%] left-[50%] pointer-events-none" style={{background: 'rgba(255,255,255,0.13)', boxShadow: '0 0 9px rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.16)', zIndex: 50}} />
      <div className="fixed w-7 h-7 rounded-full float2 top-[15%] right-[30%] pointer-events-none" style={{background: 'rgba(255,255,255,0.12)', boxShadow: '0 0 10px rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.15)', zIndex: 50}} />
      <div className="fixed w-6 h-6 rounded-full float3 top-[80%] left-[70%] pointer-events-none" style={{background: 'rgba(255,255,255,0.14)', boxShadow: '0 0 10px rgba(255,255,255,0.23)', border: '1px solid rgba(255,255,255,0.18)', zIndex: 50}} />
    </>
  )
}
