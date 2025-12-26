"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";
import LZString from "lz-string";

export default function Editor() {
  // Load initial content from URL hash on mount (lazy initialization)
  const [initialMarkdown] = useState(() => {
    // This function only runs once on the client side
    if (typeof window === "undefined") return "";
    
    const hash = window.location.hash.slice(1); // Remove the #
    
    if (hash) {
      try {
        return LZString.decompressFromEncodedURIComponent(hash) || "";
      } catch (error) {
        console.error("Failed to decompress data:", error);
        return "";
      }
    }
    return "";
  });

  const editor = useCreateBlockNote();

  // Load markdown into editor when available
  useEffect(() => {
    if (initialMarkdown && editor) {
      async function loadContent() {
        try {
          const blocks = await editor.tryParseMarkdownToBlocks(initialMarkdown);
          editor.replaceBlocks(editor.document, blocks);
        } catch (error) {
          console.error("Failed to load markdown:", error);
        }
      }
      loadContent();
    }
  }, [initialMarkdown, editor]);

  // Update URL whenever content changes
  useEffect(() => {
    if (!editor) return;

    const updateUrl = async () => {
      const markdown = await editor.blocksToMarkdownLossy(editor.document);
      const compressed = LZString.compressToEncodedURIComponent(markdown);
      
      // Update browser URL hash without reload
      window.history.replaceState({}, "", `#${compressed}`);
    };

    // Listen to editor changes
    const unsubscribe = editor.onChange(() => {
      updateUrl();
    });

    // Initial URL update
    updateUrl();

    return () => {
      unsubscribe();
    };
  }, [editor]);

  return (
    <div className="brutalist-editor min-h-[400px]">
      <BlockNoteView editor={editor} theme="light" />
    </div>
  );
}