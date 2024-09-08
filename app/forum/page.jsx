// app/forum/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
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
    editable: false,
  });

  return <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />;
};

const extractTextFromHtml = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const Forum = () => {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Nombre de posts par page
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchTopicsAndPosts = async () => {
      try {
        const topicRes = await fetch("/api/topics");
        const topicData = await topicRes.json();
        setTopics(topicData);

        const postsRes = await fetch("/api/posts");
        const postsData = await postsRes.json();

        // Validation des données
        const validatedPosts = postsData.map(post => ({
          ...post,
          title: post.title || "",
          content: post.content || "",
        }));

        setPosts(validatedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTopicsAndPosts();
  }, []);

  const copyLink = (topicSlug, postSlug) => {
    const postUrl = `${window.location.origin}/forum/${topicSlug}/post/${postSlug}`;
    navigator.clipboard.writeText(postUrl).then(
      () => {
        alert("Lien copié dans le presse-papier !");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredPosts = posts.filter((post) => {
    const title = post.title || "";
    const contentHtml = post.content || "";  // Assuming content is HTML
    const contentText = extractTextFromHtml(contentHtml);
    const query = searchQuery.toLowerCase();

    return title.toLowerCase().includes(query) || contentText.toLowerCase().includes(query);
  });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <title>Forum - Urban Root</title>
      <meta name="description" content="Forum de discussion sur les jardins urbains." />
      <meta name="keywords" content="forum, discussion, jardin urbain" />

      <Navbar />
      <div className="navbar-padding-protection"></div>

      <section className="container">
        <h1>Forum</h1>
        <div className="row">
          <div className="col-12 col-lg-4 order-lg-last">
            <div>
              <div className="card bg-dark mb-4">
                {session ? (
                  <div className="card-body">
                    <Link href="/forum/create">
                      <button className="btn btn-success w-100">Créer un sujet de discussion</button>
                    </Link>
                  </div>
                ) : (
                  <div className="card-body">
                    <a className="btn btn-success w-100" href="#" onClick={() => signIn()}>
                      Veuillez vous connecter pour publier
                    </a>
                  </div>
                )}
              </div>

              {/* carte des sujet de discussion */}
              <div className="card bg-dark text-white mb-4">
                <div className="card-header">
                  <span>Sujets de discussion</span>
                </div>
                <div className="card-body">
                  <ul>
                    {topics.map((topic) => (
                      <li key={topic._id}>
                        <a href={`/forum/${topic.slug}`} className="text-decoration-none link-success">
                          {topic.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8 order-lg-first">
            {/* <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher dans les posts..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div> */}
            {currentPosts.length > 0 ? (
              <>
                <ul className="d-flex flex-column gap-3">
                  {currentPosts.map((post) => {
                    const defaultImage = "/assets/icon-default-profile.svg";
                    const defaultUsername = "Créateur inconnu";
                    const creator = post.creator || {};

                    return (
                      <li className="card bg-dark" key={post._id}>
                        <div className="card-header d-flex align-items-end gap-3">
                          <img
                            src={creator.profileImagePath || defaultImage}
                            alt={creator.username || defaultUsername}
                            className="rounded-circle"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <a
                            className="text-decoration-none link-success"
                            href={`/forum/${
                              topics.find((topic) => topic._id === post.topic)?.slug || ""
                            }`}
                          >
                            <span>
                              {topics.find((topic) => topic._id === post.topic)?.title || "Sujet inconnu"}
                            </span>
                          </a>
                          <small>
                            • il y a{" "}
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
                        {/* <div className="card-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={() =>
                              copyLink(
                                `${topics.find((topic) => topic._id === post.topic)?.slug}`,
                                post.slug
                              )
                            }
                          >
                            <img src="/assets/icon-share.svg" alt="Partager" className="me-2" style={{ width: "1rem" }} />
                            Partager
                          </button>
                        </div> */}
                      </li>
                    );
                  })}
                </ul>

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
              <p className="text-white">Aucun post trouvé.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Forum;
