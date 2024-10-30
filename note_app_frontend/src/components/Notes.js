import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axiosInstance.get('notes/');
            setNotes(response.data);
        } catch (error) {
            console.error("Failed to fetch notes", error);
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('notes/', { title, description });
            fetchNotes();
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error("Failed to create note", error);
        }
    };

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={createNote}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <button type="submit">Add Note</button>
            </form>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notes;