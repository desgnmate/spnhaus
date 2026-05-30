import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============ BOARD MUTATIONS ============

export const createBoard = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const boardId = await ctx.db.insert("boards", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return boardId;
  },
});

export const updateBoard = mutation({
  args: {
    boardId: v.id("boards"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { boardId, ...updates } = args;
    await ctx.db.patch(boardId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteBoard = mutation({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    // Delete all nodes first
    const nodes = await ctx.db
      .query("nodes")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .collect();
    
    for (const node of nodes) {
      await ctx.db.delete(node._id);
    }
    
    // Then delete the board
    await ctx.db.delete(args.boardId);
  },
});

// ============ NODE MUTATIONS ============

export const createNode = mutation({
  args: {
    boardId: v.id("boards"),
    type: v.union(
      v.literal("note"),
      v.literal("image"),
      v.literal("link"),
      v.literal("text"),
      v.literal("shape"),
      v.literal("connector")
    ),
    content: v.any(),
    position: v.object({
      x: v.number(),
      y: v.number(),
    }),
    size: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
    style: v.optional(v.any()),
    parentId: v.optional(v.id("nodes")),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const nodeId = await ctx.db.insert("nodes", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return nodeId;
  },
});

export const updateNode = mutation({
  args: {
    nodeId: v.id("nodes"),
    content: v.optional(v.any()),
    position: v.optional(v.object({
      x: v.number(),
      y: v.number(),
    })),
    size: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
    style: v.optional(v.any()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { nodeId, ...updates } = args;
    await ctx.db.patch(nodeId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteNode = mutation({
  args: {
    nodeId: v.id("nodes"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.nodeId);
  },
});

export const updateNodePosition = mutation({
  args: {
    nodeId: v.id("nodes"),
    x: v.number(),
    y: v.number(),
  },
  handler: async (ctx, args) => {
    const { nodeId, x, y } = args;
    await ctx.db.patch(nodeId, {
      position: { x, y },
      updatedAt: Date.now(),
    });
  },
});

// ============ SEARCH RESULTS MUTATIONS ============

export const cacheSearchResult = mutation({
  args: {
    query: v.string(),
    source: v.string(),
    data: v.any(),
    ttlSeconds: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.insert("searchResults", {
      query: args.query,
      source: args.source,
      data: args.data,
      expiresAt: now + (args.ttlSeconds * 1000),
      createdAt: now,
    });
  },
});

// ============ BOARD QUERIES ============

export const getBoard = query({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.boardId);
    if (!board) return null;
    
    // Get all nodes for this board
    const nodes = await ctx.db
      .query("nodes")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .collect();
    
    return {
      ...board,
      nodes,
    };
  },
});

export const getUserBoards = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.userId) {
      // Return public boards
      const boards = await ctx.db.query("boards").collect();
      return boards.filter(b => b.isPublic);
    }
    
    return await ctx.db
      .query("boards")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getBoardsByType = query({
  args: {
    type: v.union(
      v.literal("mindmap"),
      v.literal("roadmap"),
      v.literal("moodboard"),
      v.literal("mixed")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("boards")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect();
  },
});

export const searchBoards = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const boards = await ctx.db.query("boards").collect();
    return boards.filter(b => 
      b.searchQuery.toLowerCase().includes(args.query.toLowerCase()) ||
      b.title.toLowerCase().includes(args.query.toLowerCase())
    );
  },
});

// ============ SEARCH RESULTS QUERIES ============

export const getCachedSearchResult = query({
  args: {
    query: v.string(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("searchResults")
      .withIndex("by_query", (q) => q.eq("query", args.query))
      .filter((q) => q.eq(q.field("source"), args.source))
      .collect();
    
    // Return only non-expired results
    const now = Date.now();
    const validResults = results.filter(r => r.expiresAt > now);
    
    return validResults.length > 0 ? validResults[0] : null;
  },
});
