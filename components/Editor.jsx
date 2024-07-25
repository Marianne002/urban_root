// components/Editor.jsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="d-flex flex-wrap gap-4">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`btn btn-outline-success ${editor.isActive("bold") ? "is-active" : ""}`}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`btn btn-outline-success ${editor.isActive("italic") ? "is-active" : ""}`}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`btn btn-outline-success ${editor.isActive("strike") ? "is-active" : ""}`}
      >
        Strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn btn-outline-success ${editor.isActive("heading", { level: 1 }) ? "is-active" : ""}`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn btn-outline-success ${editor.isActive("heading", { level: 2 }) ? "is-active" : ""}`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`btn btn-outline-success ${editor.isActive("heading", { level: 3 }) ? "is-active" : ""}`}
      >
        H3
      </button>
    </div>
  );
};

const TiptapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: content || '<p>Insérez votre texte ici...</p>',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setContent(json);
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="mt-4 bg-light text-black rounded" />
    </div>
  );
};

export default TiptapEditor;
