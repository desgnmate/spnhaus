# Design Inspiration Board Feature

A Milanote-style infinite canvas that generates mind maps, roadmaps, and moodboards from text prompts. Powered by Convex backend and AI.

## Features

✨ **Three Board Types:**
- **Mind Maps** - Hierarchical idea visualization with central topics and branches
- **Roadmaps** - Phase-based project planning with timeline layouts
- **Moodboards** - Grid-based visual inspiration collages

🎨 **Infinite Canvas:**
- Pan and zoom navigation
- Drag-and-drop nodes
- Keyboard shortcuts (Delete, +/-, etc.)
- Selection and editing

💾 **Convex Backend:**
- Real-time database sync
- Automatic board/node persistence
- AI-powered content generation
- Search result caching

## Setup Instructions

### 1. Prerequisites

Make sure you have:
- Node.js 18+ installed
- A Convex account (free tier available at https://convex.dev)

### 2. Install Dependencies

```bash
cd /Volumes/External/Desgnmate/DESGNMATE/SPNHAUS
npm install
```

Already installed:
- `convex` - Backend database
- `framer-motion` - Animations
- `react-draggable` - Drag-and-drop nodes

### 3. Configure Convex

The Convex backend is already initialized with:
- Schema for boards, nodes, and search results
- Backend functions for CRUD operations
- AI content generator actions

To deploy to Convex cloud:

```bash
npx convex login
npx convex deploy
```

For local development:

```bash
npx convex dev
```

### 4. Access the Feature

**From Dashboard:**
1. Navigate to `/dashboard`
2. Click the "Design Board" button (top right, yellow)
3. You'll be taken to `/design-board`

**Direct URL:**
```
http://localhost:3000/design-board
```

## Usage

### Creating a Board

1. Enter a search topic (e.g., "UI design", "minimal architecture", "nature palette")
2. Select board type:
   - Mind Map
   - Roadmap
   - Moodboard
   - Mixed
3. Click "Curate Board"
4. AI generates structured content
5. Canvas opens with your generated board

### Canvas Controls

| Action | Control |
|--------|---------|
| Pan | Click and drag empty space |
| Zoom | +/- buttons or keyboard |
| Move Node | Drag any node |
| Select Node | Click on node |
| Delete Node | Select + Delete/Backspace |
| Reset View | Click "Reset" button |
| Add Note | Click "+ Note" button |
| Add Image | Click "+ Image" button |

### Quick Suggestions

Click any suggestion to auto-fill:
- Minimalist web design
- Brand identity
- Color theory
- Typography trends

## Project Structure

```
SPNHAUS/
├── convex/
│   ├── schema.ts              # Database schema
│   ├── boards.ts              # Board/node CRUD functions
│   ├── ai_generator.ts        # AI content generation
│   └── _generated/            # Auto-generated Convex types
├── src/
│   ├── components/
│   │   ├── DesignCanvas.tsx   # Infinite canvas component
│   │   ├── SearchInspiration.tsx  # Search input + Curate button
│   │   └── ConvexClientProvider.tsx  # Convex React provider
│   └── app/
│       ├── design-board/
│       │   └── page.tsx       # Design board page
│       └── dashboard/
│           └── page.tsx       # Updated with Design Board button
```

## Database Schema

### Boards Table
- `title` - Board title
- `type` - mindmap | roadmap | moodboard | mixed
- `searchQuery` - Original search term
- `userId` - Optional user ownership
- `isPublic` - Public/private flag
- `createdAt`, `updatedAt` - Timestamps

### Nodes Table
- `boardId` - Parent board reference
- `type` - note | image | link | text | shape | connector
- `content` - Flexible content (JSON)
- `position` - { x, y } coordinates
- `size` - Optional { width, height }
- `style` - Custom styling (JSON)
- `parentId` - For hierarchical nodes

### Search Results Table
- `query` - Search term
- `source` - Data source identifier
- `data` - Cached result data
- `expiresAt` - Cache expiration

## Customization

### Adding New Board Types

1. Update schema in `convex/schema.ts`:
```typescript
type: v.union(
  v.literal("mindmap"),
  v.literal("roadmap"),
  v.literal("moodboard"),
  v.literal("mixed"),
  v.literal("your_new_type") // Add here
)
```

2. Add generation logic in `convex/ai_generator.ts`:
```typescript
if (args.type === "your_new_type") {
  return {
    // Your structure
  };
}
```

3. Update UI in `src/components/SearchInspiration.tsx`:
```tsx
<option value="your_new_type">Your New Type</option>
```

### Styling

The canvas uses your existing design system:
- Primary color: `#F4C542` (yellow accent)
- Background: `#0A0A0A` (dark)
- Nodes: Semi-transparent white with blur

Modify in `src/components/DesignCanvas.tsx`:
```typescript
const defaultStyles = {
  note: {
    backgroundColor: "rgba(255,255,255,0.1)",
    // Add your styles
  }
};
```

## Future Enhancements

- [ ] Real AI integration (OpenAI, Anthropic, etc.)
- [ ] Image search from Unsplash/Pinterest APIs
- [ ] Collaborative editing (Convex supports this!)
- [ ] Export to PDF/PNG
- [ ] Template library
- [ ] Node connectors/relationships
- [ ] Rich text editing
- [ ] Color picker for nodes
- [ ] Drag-and-drop image upload

## Troubleshooting

### Convex Not Connecting

```bash
# Check .env.local has CONVEX_DEPLOYMENT
cat .env.local

# Re-initialize Convex
npx convex dev --once
```

### TypeScript Errors

```bash
# Regenerate Convex types
npx convex dev
```

### Canvas Not Rendering

1. Check browser console for errors
2. Verify Convex provider is in layout
3. Ensure `NEXT_PUBLIC_CONVEX_URL` is set

## API Reference

### Convex Mutations

```typescript
// Create a board
const boardId = await createBoard({
  title: "My Board",
  type: "mindmap",
  searchQuery: "design trends",
  isPublic: true,
});

// Create a node
const nodeId = await createNode({
  boardId,
  type: "note",
  content: { text: "Hello" },
  position: { x: 100, y: 200 },
  order: 0,
});
```

### Convex Queries

```typescript
// Get board with nodes
const board = await getBoard({ boardId });

// Get user's boards
const boards = await getUserBoards({ userId });

// Search boards
const results = await searchBoards({ query: "design" });
```

## Credits

Built for DESGNMATE's design inspiration workflow. 

**Tech Stack:**
- Next.js 16
- React 19
- Convex (backend)
- Framer Motion (animations)
- React Draggable (drag-and-drop)

---

For questions or issues, reach out in the DESGNMATE Discord #web-development channel.
