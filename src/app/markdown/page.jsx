"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Markdown() {
    const [content, setContent] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: response } = await axios.get(
                    "http://localhost:4000/markdown"
                );
                setContent(response);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
