"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";

export default function Blog() {
    const [content, setContent] = useState();
    const { slug } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: response } = await axios.get(
                    `http://localhost:4000/blog/${slug}`
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
