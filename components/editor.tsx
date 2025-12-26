"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo } from "react";
import LZString from "lz-string";

export default function Editor() {
  // Load initial content from URL on mount
  const initialMarkdown = useMemo(() => {
    if (typeof window === "undefined") return "";
    
    const params = new URLSearchParams(window.location.search);
    const compressed = params.get("data");
    
    if (compressed) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
        return decompressed || "";
      } catch (error) {
        console.error("Failed to decompress data:", error);
        return "";
      }
    }
    return "";
  }, []);

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
      
      const url = new URL(window.location.href);
      url.searchParams.set("data", compressed);
      
      // Update browser URL without reload
      window.history.replaceState({}, "", url.toString());
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

  return <BlockNoteView editor={editor} />;
}