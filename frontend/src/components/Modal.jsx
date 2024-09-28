import React, { useState, useRef, useEffect } from "react";

const Modal = ({ modalOpen, setModalOpen, handleFormSubmit }) => {
  const modaRef = useRef(null);
  const handleClose = () => setModalOpen((prev) => !prev);

  

  useEffect(() => {
    const handleClickedOutsideModal = (event) => {
      if (modaRef.current && !modaRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    // Add event listener
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickedOutsideModal);
    }
    // clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickedOutsideModal);
    };
  }, [modalOpen]);

  return (
    modalOpen && (
      <div className="modal" id="addnotesmodal">
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          ref={modaRef}
        >
          <div className="modal-content border-0">
            <div className="modal-header border-0">
              <h5 className="modal-title">Add Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <div className="modal-body">
                <div className="notes-box">
                  <div className="notes-content">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <div className="note-title">
                          <label>Note Title</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            minLength="10"
                            placeholder="Title"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="note-description">
                          <label>Note Description</label>
                          <textarea
                            name="description"
                            className="form-control"
                            minLength="15"
                            placeholder="Description"
                            rows="3"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                {/* <button className="float-left btn btn-success"><i className="bi-floppy"></i> Save</button> */}
                <button
                  type="reset"
                  className="btn btn-danger"
                  onClick={handleClose}
                >
                  <i className="bi-x-lg"></i> Discard
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="bi-plus-lg"></i> Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
