import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance';
import './Notes.css';

function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createAudioFile, setCreateAudioFile] = useState(null);
    const [createAudioURL, setCreateAudioURL] = useState(null);
    const [editAudioFile, setEditAudioFile] = useState(null);
    const [editAudioURL, setEditAudioURL] = useState(null);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editedNote, setEditedNote] = useState({ title: '', description: '' });

    const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({ audio: true });

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

        if (!title || !description) {
            toast.error("Please provide a title and description for your note.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (createAudioFile) {
            formData.append("recording_file", createAudioFile);
        }

        try {
            await axiosInstance.post('notes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchNotes();
            setTitle('');
            setDescription('');
            setCreateAudioFile(null);
            setCreateAudioURL(null);
            clearBlobUrl();
            toast.success("Note added successfully!");
        } catch (error) {
            toast.error("Failed to add note.");
            console.error("Failed to create note", error);
        }
    };

    const handleCreateRecording = async () => {
        if (mediaBlobUrl) {
            const response = await fetch(mediaBlobUrl);
            const blob = await response.blob();
            setCreateAudioFile(new File([blob], 'createRecording.mp3', { type: 'audio/mp3' }));
            setCreateAudioURL(mediaBlobUrl);
        }
    };

    const handleEditRecording = async () => {
        if (mediaBlobUrl) {
            const response = await fetch(mediaBlobUrl);
            const blob = await response.blob();
            setEditAudioFile(new File([blob], 'editRecording.mp3', { type: 'audio/mp3' }));
            setEditAudioURL(mediaBlobUrl);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            await axiosInstance.delete(`notes/${noteId}/`);
            fetchNotes();
            toast.success("Note deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete note.");
            console.error("Failed to delete note", error);
        }
    };

    const startEditing = (note) => {
        setEditingNoteId(note.id);
        setEditedNote({
            title: note.title,
            description: note.description
        });
        setEditAudioURL(note.recording_file);
    };

    const cancelEditing = () => {
        setEditingNoteId(null);
        setEditedNote({ title: '', description: '' });
        setEditAudioFile(null);
        setEditAudioURL(null);
    };

    const saveEdit = async (noteId) => {
        const formData = new FormData();
        formData.append("title", editedNote.title);
        formData.append("description", editedNote.description);

        if (editAudioFile) {
            formData.append("recording_file", editAudioFile);
        }

        try {
            await axiosInstance.put(`notes/${noteId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchNotes();
            cancelEditing();
            toast.success("Note updated successfully!");
        } catch (error) {
            toast.error("Failed to update note.");
            console.error("Failed to update note", error);
        }
    };

    useEffect(() => {
        if (editingNoteId) {
            handleEditRecording();
        } else {
            handleCreateRecording();
        }
    }, [mediaBlobUrl]);

    return (
        <div className="notes-container">
            <ToastContainer />
            <h2>Create a Note</h2>
            <form onSubmit={createNote} className="note-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="note-input"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="note-input note-textarea"
                />
                <div className="audio-controls">
                    <button type="button" onClick={startRecording} className="record-button">Start Recording</button>
                    <button type="button" onClick={stopRecording} className="record-button">Stop Recording</button>
                    {createAudioURL && <audio src={createAudioURL} controls className="audio-player" />}
                </div>
                <button type="submit" className="submit-button">Add Note</button>
            </form>

            <h2>Your Notes</h2>
            <table className="notes-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th className="audio-column">Audio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id}>
                            <td>
                                {editingNoteId === note.id ? (
                                    <input
                                        type="text"
                                        value={editedNote.title}
                                        onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                                    />
                                ) : (
                                    note.title
                                )}
                            </td>
                            <td>
                                {editingNoteId === note.id ? (
                                    <textarea
                                        value={editedNote.description}
                                        onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
                                    />
                                ) : (
                                    note.description
                                )}
                            </td>
                            <td className="audio-column">
                                {editingNoteId === note.id ? (
                                    <>
                                        <button type="button" onClick={startRecording} className="record-button">Start</button>
                                        <button type="button" onClick={stopRecording} className="record-button">Stop</button>
                                        {editAudioURL && <audio src={editAudioURL} controls className="audio-player" />}
                                    </>
                                ) : (
                                    note.recording_file ? <audio src={note.recording_file} controls /> : "No Audio"
                                )}
                            </td>
                            <td>
                                {editingNoteId === note.id ? (
                                    <>
                                        <button onClick={() => saveEdit(note.id)} className="save-button">Save</button>
                                        <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditing(note)} className="edit-button">Edit</button>
                                        <button onClick={() => deleteNote(note.id)} className="delete-button">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Notes;