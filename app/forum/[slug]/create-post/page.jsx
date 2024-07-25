// app/forum/[slug]/create-post/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import TiptapEditor from "@components/Editor";
import Loader from "@components/Loader";

const CreatePost = ({ params }) => {
    const { slug } = params;
    const [topic, setTopic] = useState(null);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [errors, setErrors] = useState({});
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchTopic = async () => {
            const topicRes = await fetch(`/api/topics/${slug}`);
            const topicData = await topicRes.json();
            setTopic(topicData);
        };
        fetchTopic();
    }, [slug]);

    if (status === "loading" || !topic) {
        return <Loader />;
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!newPostTitle.trim()) {
            formErrors.title = "Le titre est requis.";
        }
        if (!newPostContent || !newPostContent.content) {
            formErrors.content = "Le contenu est requis.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const res = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topicId: topic._id,
                title: newPostTitle,
                content: newPostContent,
            }),
        });

        if (res.ok) {
            router.push(`/forum/${slug}`);
        }
    };

    return (
        <>
            <title>Créer un nouveau post</title>
            <meta
                name="description"
                content={`Créer un nouveau post pour le sujet ${topic?.title}`}
            />
            <meta
                name="keywords"
                content="forum, discussion, création de post, jardin urbain"
            />

            <Navbar />
            <div className="navbar-padding-protection"></div>

            <div className="container text-white">
                <button className="btn btn-success" onClick={() => router.back()}>
                    Retour
                </button>

                <p className="my-4">
                    Créer un nouveau post pour le sujet :
                    <a href={`/forum/${slug}`} className="link-success mx-2">
                        {topic?.title}
                    </a>
                </p>

                <form
                    onSubmit={handlePostSubmit}
                    className="card bg-dark text-white mb-4"
                >
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="postTitle" className="form-label">
                                Titre du post
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Entrez le titre du post"
                                id="postTitle"
                                value={newPostTitle}
                                onChange={(e) => {
                                    setNewPostTitle(e.target.value);
                                    setErrors({ ...errors, title: "" });
                                }}
                            />
                            {errors.title && (
                                <small className="text-danger">{errors.title}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contenu du post</label>
                            <TiptapEditor
                                content={newPostContent}
                                setContent={setNewPostContent}

                            />
                            {errors.content && (
                                <small className="text-danger">{errors.content}</small>
                            )}
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success">
                                Publier
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default CreatePost;
