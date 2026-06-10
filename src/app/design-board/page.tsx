"use client";

import React, { useState } from "react";
import DesignCanvas from "@/components/DesignCanvas";

export default function DesignBoardPage() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <main className="min-h-screen bg-black">
      {!showCanvas ? (
        // Search View
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Design Inspiration Board
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Generate beautiful mind maps, roadmaps, and moodboards from any topic. 
                Powered by AI.
              </p>
            </div>

            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Inspiration
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="e.g., UI design, minimal architecture, nature palette..."
                      className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 focus:border-gray-900 outline-none bg-transparent placeholder-gray-400 transition-colors"
                    />
                  </div>
                  <button
                    onClick={() => setShowCanvas(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#2D3A1E] text-white rounded-full hover:bg-[#1F2915] transition-all font-medium"
                  >
                    Open Canvas
                  </button>
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#F4C542]/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#F4C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Mind Maps</h3>
                <p className="text-sm text-gray-400">
                  Visualize ideas and concepts with AI-generated hierarchical structures
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#F4C542]/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#F4C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Roadmaps</h3>
                <p className="text-sm text-gray-400">
                  Plan projects and timelines with structured phase-based layouts
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#F4C542]/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#F4C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Moodboards</h3>
                <p className="text-sm text-gray-400">
                  Collect visual inspiration with grid-based collage layouts
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Canvas View
        <div className="relative">
          {/* Back button */}
          <button
            onClick={() => setShowCanvas(false)}
            className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </button>

          <DesignCanvas 
            board={null}
            onCreateBoard={async () => {}}
            onSaveNode={async () => {}}
            onUpdateNode={async () => {}}
          />
        </div>
      )}
    </main>
  );
}
