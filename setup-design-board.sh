#!/bin/bash

# Design Board Feature Setup Script for SPNHAUS
# Run this to initialize and test the Convex backend

set -e

echo "🚀 Setting up Design Board Feature..."
echo ""

cd /Volumes/External/Desgnmate/DESGNMATE/SPNHAUS

echo "✓ Step 1: Installing dependencies..."
npm install

echo ""
echo "✓ Step 2: Starting Convex dev server..."
echo "   (This will generate the _generated files)"
npx convex dev --once

echo ""
echo "✓ Step 3: Checking generated files..."
if [ -f "convex/_generated/api.js" ]; then
    echo "   ✓ Convex API generated successfully"
else
    echo "   ✗ Convex API generation failed"
    exit 1
fi

echo ""
echo "✓ Step 4: Starting Next.js dev server..."
echo "   The app will be available at http://localhost:3000"
echo "   Design Board: http://localhost:3000/design-board"
echo "   Dashboard: http://localhost:3000/dashboard"
echo ""
echo "   Press Ctrl+C to stop"
echo ""

npm run dev
