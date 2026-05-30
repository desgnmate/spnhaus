import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Boards - the main canvas containers
  boards: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("mindmap"),
      v.literal("roadmap"),
      v.literal("moodboard"),
      v.literal("mixed")
    ),
    searchQuery: v.string(),
    userId: v.optional(v.string()),
    isPublic: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_type", ["type"])
    .index("by_search_query", ["searchQuery"]),

  // Nodes - individual items on the canvas (notes, images, links, etc.)
  nodes: defineTable({
    boardId: v.id("boards"),
    type: v.union(
      v.literal("note"),
      v.literal("image"),
      v.literal("link"),
      v.literal("text"),
      v.literal("shape"),
      v.literal("connector")
    ),
    content: v.any(), // Flexible content based on node type
    position: v.object({
      x: v.number(),
      y: v.number(),
    }),
    size: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
    style: v.optional(v.any()), // Custom styling
    parentId: v.optional(v.id("nodes")), // For hierarchical nodes (mind maps)
    order: v.number(), // Z-index or rendering order
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_board", ["boardId"])
    .index("by_parent", ["parentId"]),

  // Search results cache - store external API results
  searchResults: defineTable({
    query: v.string(),
    source: v.string(), // e.g., "pinterest", "unsplash", "dribbble"
    data: v.any(), // The actual result data
    expiresAt: v.number(), // Cache expiration
    createdAt: v.number(),
  })
    .index("by_query", ["query"])
    .index("by_source", ["source"]),
});
