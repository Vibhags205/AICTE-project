import { useState } from "react"
import ReactMarkdown from "react-markdown"

export default function NotesViewer({ data }) {

  const [tab, setTab] = useState("notes")

  const tabs = ["notes", "transcript"]

  return (

    <div className="w-full mt-10">

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 border-b border-indigo-400/20 overflow-x-auto">

        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
              capitalize px-3 sm:px-6 py-3 border-b-2 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap
              ${tab === t
                ? "border-indigo-400 text-indigo-300"
                : "border-transparent text-gray-400 hover:text-indigo-300"
              }
            `}
          >
            {t}
          </button>
        ))}

      </div>

      {/* Content Container */}
      <div className="border border-indigo-400/30 rounded-lg p-4 sm:p-6 md:p-8 transition-all duration-300" style={{background: 'rgba(15, 15, 35, 0.6)', backdropFilter: 'blur(10px)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)'}}>        <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base">



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
              background: rgba(99, 102, 241, 0.2);
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
            {data[tab]}
          </ReactMarkdown>

        </div>

      </div>

    </div>

  )
}