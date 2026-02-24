import { useState } from "react"
import ReactMarkdown from "react-markdown"

export default function Result({ data }) {

  const [active, setActive] = useState("Notes")

  const tabs = ["Notes", "Transcript"]

  const getContent = () => {
    if (active === "Notes") return data.notes
    if (active === "Transcript") return data.transcript
  }

  return (

    <div className="w-full mt-8 sm:mt-10 md:mt-12">

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 border-b border-indigo-400/20 overflow-x-auto">

        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`
              px-3 sm:px-6 py-3 text-xs sm:text-sm md:text-base border-b-2 transition-all duration-300 font-medium whitespace-nowrap
              ${active === tab
                ? "border-indigo-400 text-indigo-300"
                : "border-transparent text-gray-400 hover:text-indigo-300"
              }
            `}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Content Container */}
      <div className="border border-indigo-400/30 rounded-lg p-4 sm:p-6 md:p-8 transition-all duration-300" style={{background: 'rgba(15, 15, 35, 0.6)', backdropFilter: 'blur(10px)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)'}}>

        <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base">

          <style>{`
            .prose-invert p {
              color: #d1d5db;
              margin-bottom: 1.5em;
              line-height: 1.8;
            }
            
            .prose-invert h1,
            .prose-invert h2,
            .prose-invert h3 {
              color: #e0e7ff;
              margin-top: 1.5em;
              margin-bottom: 0.8em;
            }
            
            .prose-invert ul {
              list-style: disc;
              padding-left: 1.5em;
              margin-bottom: 1.5em;
            }
            
            .prose-invert li {
              color: #d1d5db;
              margin-bottom: 0.5em;
            }
            
            .prose-invert strong {
              color: #c7d2fe;
            }
            
            .prose-invert code {
              background: rgba(240, 240, 245, 0.22);
              color: #a5b4fc;
              padding: 0.2em 0.5em;
              border-radius: 0.3em;
            }
            
            .prose-invert pre {
              background: rgba(30, 27, 75, 0.8);
              border: 1px solid rgba(99, 102, 241, 0.3);
              color: #c7d2fe;
            }
          `}</style>

          <ReactMarkdown>
            {getContent()}
          </ReactMarkdown>

        </div>

      </div>

    </div>

  )
}

        <div className="prose prose-invert max-w-none text-gray-200    }
            
            .prose-invert h1 {
              color: #fff;
              font-size: 2em;
              font-weight: 700;
              margin-top: 0.8em;
              margin-bottom: 0.5em;
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .prose-invert h2 {
              color: #e5e7eb;
              font-size: 1.5em;
              font-weight: 600;
              margin-top: 1.2em;
              margin-bottom: 0.6em;
              border-left: 4px solid #6366f1;
              padding-left: 1em;
            }
            
            .prose-invert h3 {
              color: #f3f4f6;
              font-size: 1.2em;
              font-weight: 600;
              margin-top: 1em;
              margin-bottom: 0.5em;
            }
            
            .prose-invert ul {
              list-style: none;
              padding-left: 0;
              margin-bottom: 1.5em;
            }
            
            .prose-invert li {
              color: #d1d5db;
              padding-left: 2em;
              margin-bottom: 0.8em;
              position: relative;
              line-height: 1.6;
            }
            
            .prose-invert li:before {
              content: "→";
              position: absolute;
              left: 0;
              color: #6366f1;
              font-weight: bold;
            }
            
            .prose-invert strong {
              color: #fff;
              font-weight: 600;
            }
            ,
            .prose-invert h2,
            .prose-invert h3 {
              color: #fff;
              margin-top: 1.5em;
              margin-bottom: 0.8em;
            }
            
            .prose-invert ul {
              list-style: disc;
              padding-left: 1.5em;
              margin-bottom: 1.5em;
            }
            
            .prose-invert li {
              color: #d1d5db;
              margin-bottom: 0.5em;
            }
            
            .prose-invert strong {
              color: #fff;
            }
            
            .prose-invert code {
              background: #333;
              color: #e5e7eb;
              padding: 0.2em 0.5em;
            }
            
            .prose-invert pre {
              background: #1f2937;
              border: 1px solid #374151;
              color: #e5e7eb