"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/lib/convex-api";
import type { Id } from "../../convex/_generated/dataModel";

interface SearchInspirationProps {
  onBoardCreated?: (boardId: Id<"boards">) => void;
}

export default function SearchInspiration({ onBoardCreated }: SearchInspirationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [boardType, setBoardType] = useState<"mindmap" | "roadmap" | "moodboard" | "mixed">("mixed");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBoard = useMutation(api.boards.createBoard);
  const generateContent = useMutation(api.ai_generator.generateBoardContent);
  const createNode = useMutation(api.boards.createNode);

  const handleCurateBoard = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search topic");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Step 1: Create the board
      const boardId = await createBoard({
        title: `${searchQuery} Inspiration`,
        description: `AI-generated ${boardType} for "${searchQuery}"`,
        type: boardType,
        searchQuery: searchQuery.trim(),
        isPublic: true,
      });

      // Step 2: Generate AI content
      const generatedContent = await generateContent({
        query: searchQuery.trim(),
        type: boardType,
      });

      // Step 3: Create nodes based on generated content
      if (boardType === "mindmap" && generatedContent.centralNode) {
        // Create central node
        await createNode({
          boardId,
          type: generatedContent.centralNode.type,
          content: generatedContent.centralNode.content,
          position: generatedContent.centralNode.position,
          style: generatedContent.centralNode.style,
          order: 0,
        });

        // Create child nodes
        generatedContent.childNodes?.forEach(async (child: any, index: number) => {
          await createNode({
            boardId,
            type: child.type,
            content: child.content,
            position: child.position,
            style: child.style,
            parentId: undefined, // Would need to reference central node ID
            order: index + 1,
          });
        });
      } else if (boardType === "roadmap" && generatedContent.phases) {
        // Create roadmap phase nodes
        generatedContent.phases.forEach(async (phase: any, index: number) => {
          await createNode({
            boardId,
            type: "note" as const,
            content: {
              title: phase.title,
              items: phase.items,
            },
            position: phase.position,
            style: {
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",
              padding: "20px",
              borderRadius: "12px",
              minWidth: "250px",
            },
            order: index,
          });
        });
      } else if (boardType === "moodboard" && generatedContent.items) {
        // Create moodboard items
        generatedContent.items.forEach(async (item: any, index: number) => {
          await createNode({
            boardId,
            type: item.type,
            content: item.content,
            position: item.position,
            size: item.size,
            style: item.style,
            order: index,
          });
        });
      }

      // Notify parent component
      onBoardCreated?.(boardId);

      // Clear search
      setSearchQuery("");
    } catch (err) {
      console.error("Error creating board:", err);
      setError("Failed to create board. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCurateBoard();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Inspiration
        </label>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., UI design, minimal architecture, nature palette..."
              className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 focus:border-gray-900 outline-none bg-transparent placeholder-gray-400 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* Board Type Selector */}
            <select
              value={boardType}
              onChange={(e) => setBoardType(e.target.value as any)}
              className="px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 bg-white"
            >
              <option value="mindmap">Mind Map</option>
              <option value="roadmap">Roadmap</option>
              <option value="moodboard">Moodboard</option>
              <option value="mixed">Mixed</option>
            </select>

            <button
              onClick={handleCurateBoard}
              disabled={isGenerating || !searchQuery.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-[#2D3A1E] text-white rounded-full hover:bg-[#1F2915] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Curate Board
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}

        {/* Quick suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500">Try:</span>
          {["Minimalist web design", "Brand identity", "Color theory", "Typography trends"].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setSearchQuery(suggestion)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
