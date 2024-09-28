import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import Modal from "./components/Modal";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import Loader from "./components/Loader";
import NoNotes from "./components/NoNotes";

function App() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([
    { name: "business", icon: "bi-briefcase", color: "success" },
    { name: "social", icon: "bi-share", color: "info" },
    { name: "important", icon: "bi-tag", color: "danger" },
  ]);

  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const data = await fetchData("http://localhost:8080/notes");
      if (data) setNotes(data);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  // Modal open/close handler
  const handleClick = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  // Category wise filter handler on navbar
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // single note category change event handler
  const changeCategory = async (id, cate) => {
    const noteToUpdate = notes.find((note) => note._id === id);
    if (!noteToUpdate) {
      console.error("Note not found!");
      return;
    }
    const updatedNote = { ...noteToUpdate, category: cate };
    const updatedServerNote = await fetchData(
      `http://localhost:8080/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      }
    );
    if (updatedServerNote) {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note._id === id ? updatedServerNote : note
        )
      );
    }
  };

  // Star mark handler
  const handleStared = async (id) => {
    const noteToUpdate = notes.find((note) => note._id === id);
    if (!noteToUpdate) {
      console.error("Note not found");
      return;
    }
    const updatedNote = { ...noteToUpdate, isStared: !noteToUpdate.isStared };
    const updatedServerNote = await fetchData(
      `http://localhost:8080/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      }
    );
    if (updatedServerNote) {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note._id === id ? updatedServerNote : note
        )
      );
    }
  };

  // Delete note handler
  const handleDelete = async (id) => {
    const userResponse = confirm("Are you sure to delete ?");

    if (userResponse) {
      const data = await fetchData(`http://localhost:8080/notes/${id}`, {
        method: "DELETE",
      });
      setNotes((previousNotes) =>
        previousNotes.filter((note) => note._id !== id)
      );
    }
  };

  // new note submit handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const desc = formData.get("description");
    if (!title || !desc) {
      alert("Both Fields are required!");
      return;
    }
    const noteData = { title, desc };
    // Make post request to the API
    const newNote = await fetchData("http://localhost:8080/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData), // convert noteData to JSON string and send on  request body
    });
    if (newNote) {
      setNotes((previousNotes) => [...previousNotes, newNote]); // Add new note to the state
      setModalOpen(false); // close the modal
      event.target.reset(); // reset the form after submission
    }
  };

  // Filtered notes
  const filteredNotes =
    selectedCategory === "all"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

  return (
    <>
      <div className="page-content container note-has-grid">
        <Header
          categories={categories}
          handleClick={handleClick}
          handleCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <div className="tab-content bg-transparent">
          <div id="note-full-container" className="note-has-grid row">
            {loading ? (
              <Loader />
            ) : filteredNotes.length !== 0 ? (
              filteredNotes.map((note, id) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  categories={categories}
                  changeCategory={changeCategory}
                  handleStared={handleStared}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <NoNotes />
            )}
            <Modal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              handleFormSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
