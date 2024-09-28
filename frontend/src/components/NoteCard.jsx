import React, { useState, useEffect, useRef } from "react";

const NoteCard = ({
  note,
  categories,
  changeCategory,
  handleStared,
  handleDelete,
}) => {
  const [show, setShow] = useState(false);
  const [stared, setStared] = useState(note.isStared || false); // set stared to note.isStared or false
  const categoryMenuRef = useRef(null);

  const handleShow = () => setShow((prev) => !prev);
  // const handleStared = () =>  setStared((prev) => !prev);

  // Hide the menu when clicked outside
  useEffect(() => {
    const handleClickedOutside = (event) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setShow(false); //close the menu
      }
    };
    // Add event listener when show is true
    if (show) {
      document.addEventListener("mousedown", handleClickedOutside);
    }
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickedOutside);
    };
  }, [show]);

  return (
    <div
      className={`col-md-6 col-lg-4 single-note-item all-category note-${note.category}`}
    >
      <div className="card card-body">
        <span className="side-stick"></span>
        <div className="d-flex justify-content-between">
        <h5
          className="note-title text-truncate w-100 mb-0"
          data-noteheading="Go for lunch"
        >
          {note.title}
        </h5>
          <i className="point bi-circle-fill ms-1 font-10"></i>
        </div>
        <p className="note-date text-muted">{note.date.slice(0,10).split("-").reverse().join("-")}</p>
        <div className="note-content">
          <p
            className="note-inner-content text-muted"
            data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
          >
            {note.desc}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <span className="me-1" onClick={() => handleStared(note._id)}>
            <i className={`${note.isStared ? "bi-star-fill" : "bi-star"}`}></i>
          </span>
          <span className="me-1" onClick={() => handleDelete(note._id)}>
            <i className="bi-trash"></i>
          </span>
          <div className="ms-auto">
            <div className="category-selector ">
              <button
                className="nav-link category-dropdown label-group p-0 position-relative"
                onClick={() => handleShow()}
              >
                <i className="bi-three-dots-vertical"></i>
              </button>
              {show && (
                <div
                  className="category-menu z-3 position-absolute bg-white rounded-3 p-3 shadow-sm"
                  ref={categoryMenuRef}
                >
                  {categories.map((cate, key) => (
                    <a
                      key={key}
                      className={`note-${cate.name} badge-group-item badge-${cate.name} dropdown-item position-relative category-${cate.name} text-${cate.color}`}
                      onClick={() => changeCategory(note._id, cate.name)}
                    >
                      <i
                        className={`mdi me-1 ${
                          cate.name == note.category
                            ? "mdi-checkbox-marked-circle"
                            : "mdi-checkbox-blank-circle-outline"
                        } `}
                      ></i>
                      {cate.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
