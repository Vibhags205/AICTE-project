export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
        

      animation: {
        blob1: "blobMove1 18s infinite ease-in-out",
        blob2: "blobMove2 22s infinite ease-in-out",
        blob3: "blobMove3 20s infinite ease-in-out",
        float1: "float1 8s infinite ease-in-out",
        float2: "float2 10s infinite ease-in-out",
        float3: "float3 12s infinite ease-in-out",
        float4: "float4 9s infinite ease-in-out",
        "spin-slow": "spin 15s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {

        blobMove1: {
          "0%,100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(100px, 80px)" },
        },

        blobMove2: {
          "0%,100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(-120px, -60px)" },
        },

        blobMove3: {
          "0%,100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(60px, -100px)" },
        },

        float1: {
          "0%,100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-40px) translateX(-10px)" },
          "75%": { transform: "translateY(-20px) translateX(15px)" },
        },

        float2: {
          "0%,100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-30px) translateX(-15px)" },
          "66%": { transform: "translateY(-60px) translateX(20px)" },
        },

        float3: {
          "0%,100%": { transform: "translateY(0px) translateX(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-50px) translateX(30px) rotate(180deg)" },
        },

        float4: {
          "0%,100%": { transform: "translateY(0px) translateX(0px) scale(1)" },
          "25%": { transform: "translateY(-25px) translateX(25px) scale(1.1)" },
          "50%": { transform: "translateY(-50px) translateX(-25px) scale(0.9)" },
          "75%": { transform: "translateY(-25px) translateX(30px) scale(1.05)" },
        },

      },

    },
  },
  plugins: [],
}
