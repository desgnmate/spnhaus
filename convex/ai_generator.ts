import { v } from "convex/values";
import { action, query } from "./_generated/server";
import { internal } from "./_generated/api";

// This action generates content based on a search query
// It will be called when user clicks "Curate Board"
export const generateBoardContent = action({
  args: {
    query: v.string(),
    type: v.union(
      v.literal("mindmap"),
      v.literal("roadmap"),
      v.literal("moodboard")
    ),
  },
  handler: async (ctx, args) => {
    // This would call an external AI API to generate structured content
    // For now, we'll return a template structure
    
    const timestamp = Date.now();
    
    if (args.type === "mindmap") {
      // Generate a mind map structure
      return {
        centralNode: {
          type: "note" as const,
          content: { text: args.query, isTitle: true },
          position: { x: 0, y: 0 },
          style: { 
            backgroundColor: "#F4C542", 
            color: "#000",
            fontSize: "24px",
            fontWeight: "bold",
            padding: "20px",
            borderRadius: "12px"
          },
        },
        childNodes: [
          {
            type: "note" as const,
            content: { text: "Key Concepts", isTitle: false },
            position: { x: -300, y: -200 },
            style: { 
              backgroundColor: "rgba(255,255,255,0.1)", 
              color: "#fff",
              padding: "15px",
              borderRadius: "8px"
            },
          },
          {
            type: "note" as const,
            content: { text: "Visual Style", isTitle: false },
            position: { x: 300, y: -200 },
            style: { 
              backgroundColor: "rgba(255,255,255,0.1)", 
              color: "#fff",
              padding: "15px",
              borderRadius: "8px"
            },
          },
          {
            type: "note" as const,
            content: { text: "Color Palette", isTitle: false },
            position: { x: -300, y: 200 },
            style: { 
              backgroundColor: "rgba(255,255,255,0.1)", 
              color: "#fff",
              padding: "15px",
              borderRadius: "8px"
            },
          },
          {
            type: "note" as const,
            content: { text: "References", isTitle: false },
            position: { x: 300, y: 200 },
            style: { 
              backgroundColor: "rgba(255,255,255,0.1)", 
              color: "#fff",
              padding: "15px",
              borderRadius: "8px"
            },
          },
        ],
        connectors: [
          { from: "central", to: "child0" },
          { from: "central", to: "child1" },
          { from: "central", to: "child2" },
          { from: "central", to: "child3" },
        ],
      };
    }
    
    if (args.type === "roadmap") {
      // Generate a roadmap structure
      return {
        phases: [
          {
            title: "Phase 1: Research",
            position: { x: -400, y: 0 },
            items: [
              "Market analysis",
              "Competitor research",
              "User interviews",
            ],
          },
          {
            title: "Phase 2: Design",
            position: { x: -100, y: 0 },
            items: [
              "Wireframing",
              "Visual design",
              "Prototyping",
            ],
          },
          {
            title: "Phase 3: Development",
            position: { x: 200, y: 0 },
            items: [
              "Frontend implementation",
              "Backend integration",
              "Testing",
            ],
          },
          {
            title: "Phase 4: Launch",
            position: { x: 500, y: 0 },
            items: [
              "Deploy to production",
              "Marketing campaign",
              "User feedback",
            ],
          },
        ],
      };
    }
    
    if (args.type === "moodboard") {
      // Generate a moodboard structure
      return {
        layout: "grid",
        items: [
          {
            type: "image" as const,
            content: { 
              url: "placeholder://color-1", 
              alt: "Primary color inspiration" 
            },
            position: { x: 0, y: 0 },
            size: { width: 300, height: 300 },
          },
          {
            type: "image" as const,
            content: { 
              url: "placeholder://color-2", 
              alt: "Secondary color inspiration" 
            },
            position: { x: 320, y: 0 },
            size: { width: 300, height: 300 },
          },
          {
            type: "note" as const,
            content: { text: "Color Palette Notes" },
            position: { x: 640, y: 0 },
            size: { width: 280, height: 300 },
          },
          {
            type: "image" as const,
            content: { 
              url: "placeholder://typography-1", 
              alt: "Typography example" 
            },
            position: { x: 0, y: 320 },
            size: { width: 400, height: 280 },
          },
          {
            type: "note" as const,
            content: { text: "Typography & Fonts" },
            position: { x: 420, y: 320 },
            size: { width: 500, height: 280 },
          },
        ],
      };
    }
    
    return {};
  },
});

// Query to get AI-generated suggestions for a topic
export const getSuggestionsForTopic = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    // This would integrate with an AI service to get real suggestions
    // For now, return mock data based on the query
    return {
      relatedTopics: [
        `${args.query} trends 2026`,
        `${args.query} best practices`,
        `${args.query} case studies`,
        `${args.query} tools and resources`,
      ],
      colorPalettes: [
        { name: "Monochrome", colors: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC"] },
        { name: "Warm", colors: ["#F4C542", "#E08E4E", "#C96E4E", "#A85454", "#8A3E3E"] },
        { name: "Cool", colors: ["#4A90A4", "#5BA3B5", "#6FB6C6", "#83C9D7", "#97DCE8"] },
      ],
      keywords: [
        args.query,
        "minimalist",
        "modern",
        "clean",
        "professional",
        "elegant",
      ],
    };
  },
});
