"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import saveContent from "@/lib/SaveContent";
import { useRef } from "react";

function MenuBar({ editor }) {
    if (!editor) {
        return null;
    }
    return (
        <div className="control-group mb-10 pb-5">
            <div className="button-group [&_button]:border [&_button]:px-3 [&_button]:m-1 [&_button]:py-1 [&_button]:rounded-sm [&_button]:text-sm [&_button]:shadow-md">
                {/* Bold */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active" : ""}
                >
                    Bold
                </button>
                {/* Italic */}
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is-active" : ""}
                >
                    Italic
                </button>
                {/* Strike */}
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "is-active" : ""}
                >
                    Strike
                </button>
                {/* Code */}
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive("code") ? "is-active" : ""}
                >
                    Code
                </button>
                {/* Clear marks */}
                <button
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                >
                    Clear marks
                </button>
                {/* Clear nodes */}
                <button
                    onClick={() => editor.chain().focus().clearNodes().run()}
                >
                    Clear nodes
                </button>
                {/* Paragraph */}
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive("paragraph") ? "is-active" : ""}
                >
                    Paragraph
                </button>
                {/* H1 */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 1 })
                            ? "is-active"
                            : ""
                    }
                >
                    H1
                </button>
                {/* H2 */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "is-active"
                            : ""
                    }
                >
                    H2
                </button>
                {/* H3 */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "is-active"
                            : ""
                    }
                >
                    H3
                </button>
                {/* H4 */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 4 })
                            ? "is-active"
                            : ""
                    }
                >
                    H4
                </button>
                {/* H5 */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 5 })
                            ? "is-active"
                            : ""
                    }
                >
                    H5
                </button>
                {/* H6 */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 6 })
                            ? "is-active"
                            : ""
                    }
                >
                    H6
                </button>
                {/* Bullet list */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    Bullet list
                </button>
                {/* Ordered list */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    Ordered list
                </button>
                {/* Code block */}
                <button
                    onClick={() => {
                        editor.chain().focus().toggleCodeBlock().run();
                    }}
                    className={editor.isActive("codeBlock") ? "is-active" : ""}
                >
                    Code block
                </button>
                {/* Blockquote */}
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={editor.isActive("blockquote") ? "is-active" : ""}
                >
                    Blockquote
                </button>
                {/* Horizontal rule */}
                <button
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    Horizontal rule
                </button>
                {/* Hardbreak */}
                <button
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                >
                    Hard break
                </button>
                {/* Undo */}
                <button onClick={() => editor.chain().focus().undo().run()}>
                    Undo
                </button>
                {/* Redo */}
                <button onClick={() => editor.chain().focus().redo().run()}>
                    Redo
                </button>
            </div>
        </div>
    );
}

export default function Tiptap() {
    const myInput = useRef(null);
    //const [Editing, setEditing] = useState(true);

    /* setEditing((prev) => {
        return !prev;
    }); */

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Type something crazy...",
            }),
        ],

        editorProps: {
            attributes: {
                class: "focus:outline-none border-b-2",
            },
        },
        immediatelyRender: false,
    });

    return (
        <>
            <div>
                <input
                    ref={myInput}
                    placeholder="Enter your title here"
                    className="text-2xl focus:outline-none mb-5 rounded-xl font-bold w-full"
                />
                <MenuBar editor={editor} />
                <div className="[&_.data-placeholder]:placeholder:text-black">
                    <EditorContent editor={editor} />
                </div>
            </div>
            <div className="mt-10">
                <button
                    onClick={() => {
                        if (myInput.current) {
                            saveContent(
                                myInput.current.value,
                                editor.getHTML()
                            );
                        }
                    }}
                    className="font-bold px-4 py-1 bg-blue-600 rounded-sm text-white"
                >
                    Publish
                </button>
            </div>
        </>
    );
}
