// app/forum/create/page.jsx
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import TopicForm from '@components/TopicForm';

const CreateTopic = () => {
    return (
        <>
            <title>Créer un sujet - Urban Root</title>
            <meta name="description" content="Créer un nouveau sujet de discussion." />
            <meta name="keywords" content="forum, discussion, créer sujet, jardin urbain" />

            <Navbar />
            <div className="navbar-padding-protection"></div>
            <section className="container">
                <h1>Créer un sujet de discussion</h1>
                <TopicForm />
            </section>
            <Footer />
        </>
    );
};

export default CreateTopic;
