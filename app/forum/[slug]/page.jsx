// app/forum/[slug]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Loader from "@components/Loader";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const renderContent = (content) => {
  const editor = new Editor({
    extensions: [StarterKit],
    content: content,
  });

  return <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />;
};

const Topic = ({ params }) => {
  const { slug } = params;
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Nombre de posts par page
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchTopicAndPosts = async () => {
      try {
        const topicRes = await fetch(`/api/topics/${slug}`);
        const topicData = await topicRes.json();
        setTopic(topicData);

        const postsRes = await fetch(`/api/posts?topicId=${topicData._id}`);
        const postsData = await postsRes.json();
        setPosts(postsData);

        // Fetch comments for each post
        const commentsData = {};
        for (const post of postsData) {
          const commentsRes = await fetch(`/api/comments?postId=${post._id}`);
          commentsData[post._id] = await commentsRes.json();
        }
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTopicAndPosts();
  }, [slug]);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (status === "loading" || !topic) {
    return <Loader />;
  }

  const handleCreatePostClick = () => {
    router.push(`/forum/${slug}/create-post`);
  };

  const handleCommentChange = (postId, event) => {
    setNewComment({ ...newComment, [postId]: event.target.value });
  };

  const handleCommentSubmit = async (postId, event) => {
    event.preventDefault();
    if (!newComment[postId]) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content: newComment[postId] }),
      });

      if (res.ok) {
        const newCommentData = await res.json();
        setComments({
          ...comments,
          [postId]: [newCommentData, ...comments[postId]],
        });
        setNewComment({ ...newComment, [postId]: "" });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <title>{topic.title}</title>
      <meta name="description" content={topic.description} />
      <meta name="keywords" content="forum, discussion, jardin urbain" />

      <Navbar />
      <div className="navbar-padding-protection"></div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 order-lg-last mb-4">
            <div className="card bg-dark text-white">
              <div className="card-header">
                <span>A propos</span>
              </div>
              <div className="card-body">
                <h5>{topic.title}</h5>
                <p>{topic.description}</p>
                <p>
                  Créé le : {new Date(topic.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8 order-lg-first">
            <div className="card card-body bg-dark d-flex flex-row justify-content-between mb-4">
              <button
                className="btn btn-success"
                onClick={() => router.push("/forum")}
              >
                Retour
              </button>
              {session && (
                <button
                  className="btn btn-success"
                  onClick={handleCreatePostClick}
                >
                  Nouveau post
                </button>
              )}
            </div>
            {currentPosts.length > 0 ? (
              <>
                {currentPosts.map((post) => {
                  const defaultImage = "/assets/icon-default-profile.svg";
                  const defaultUsername = "Créateur inconnu";
                  const creator = post.creator || {};

                  return (
                    <div className="card bg-dark text-white mb-3" key={post._id}>
                      <div className="card-header d-flex align-items-end gap-3">
                        <img
                          src={creator.profileImagePath || defaultImage}
                          alt={creator.username || defaultUsername}
                          className="rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        />
                        <a
                          href={`/forum/${topic.slug}`}
                          className="text-decoration-none link-success"
                        >
                          <span>{topic.title}</span>
                        </a>
                        <small>
                          • {" "}
                          {formatDistanceToNow(new Date(post.createdAt), {
                            locale: fr,
                          })}
                        </small>
                      </div>
                      <div className="card-body">
                        <h5>{post.title}</h5>
                        <div className="text-secondary">
                          {renderContent(post.content)}
                        </div>
                      </div>
                      <div className="card-footer">
                        <h6>Commentaires :</h6>
                        {comments[post._id] && comments[post._id].length > 0 ? (
                          comments[post._id].map((comment) => {
                            const commentCreator = comment.creator || {};
                            return (
                              <div className="mb-2" key={comment._id}>
                                <img
                                  src={commentCreator.profileImagePath || defaultImage}
                                  alt={commentCreator.username || defaultUsername}
                                  className="rounded-circle"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <small className="mx-2">
                                  {commentCreator.username || defaultUsername}
                                </small>
                                <p className="mx-4 px-3">{comment.content}</p>
                              </div>
                            );
                          })
                        ) : (
                          <p>Aucun commentaire</p>
                        )}
                        {session && (
                          <form
                            onSubmit={(event) =>
                              handleCommentSubmit(post._id, event)
                            }
                          >
                            <div className="mb-3">
                              <textarea
                                className="form-control"
                                value={newComment[post._id] || ""}
                                onChange={(event) =>
                                  handleCommentChange(post._id, event)
                                }
                                rows="3"
                                placeholder="Ajouter un commentaire"
                                required
                              />
                            </div>
                            <button type="submit" className="btn btn-success">
                              Commenter
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {/* Pagination Controls */}
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link link-success" onClick={() => handlePageChange(currentPage - 1)}>Précédent</button>
                      </li>
                      {[...Array(totalPages).keys()].map((pageNumber) => (
                        <li
                          key={pageNumber + 1}
                          className={`page-item ${currentPage === pageNumber + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pageNumber + 1)}
                          >
                            {pageNumber + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link link-success" onClick={() => handlePageChange(currentPage + 1)}>Suivant</button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            ) : (
              <p className="text-white">Soyez le premier à publier dans ce sujet !</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Topic;
