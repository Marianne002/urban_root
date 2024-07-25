// components/TopicForm.jsx
'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const TopicForm = () => {
    // Initialize the session and router objects
    const { data: session } = useSession();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session) {
            signIn();
            return;
        }

        const res = await fetch('/api/topics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            },
            body: JSON.stringify({ title, description }),
        });

        const result = await res.json();
        if (res.ok) {
            router.push('/forum');
        } else {
            console.error('Failed to create topic', result);
        }
    };

    return (
        <div className="card bg-dark text-white">
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="d-flex flex-column mb-3">
                    <label htmlFor="title">Titre</label>
                    <input
                        id="title"
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Entrez le titre du sujet"
                        required
                    />
                </div>
                <div className="d-flex flex-column mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Insérer votre description ici..."
                        required
                    ></textarea>
                </div>
                <div className="d-flex gap-4">
                    <button className="btn btn-secondary" type="button" onClick={() => router.push('/forum')}>Annuler</button>
                    <button className="btn btn-success" type="submit">Créer un sujet</button>
                </div>
            </form>
        </div>
    );
};

export default TopicForm;
