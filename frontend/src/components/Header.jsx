import { useState } from "react";

const Header = ({
  categories,
  handleClick,
  handleCategorySelect,
  selectedCategory,
}) => {
  return (
    <ul className="nav nav-pills p-3 bg-white mb-3 rounded-3 align-items-center">
      <li className="nav-item">
        <a
          onClick={() => handleCategorySelect("all")}
          className={`nav-link rounded-3 note-link d-flex align-items-center px-md-3 mr-0 mr-md-2 ${
            selectedCategory === "all" && "active"
          }`}
        >
          <i className="bi-layers"></i>
          <span className="d-none ms-2 d-md-block">All Notes</span>
        </a>
      </li>
      {categories.map((category, key) => (
        <li className="nav-item" key={key}>
          <a
            onClick={() => handleCategorySelect(category.name)}
            className={`nav-link rounded-3 note-link d-flex align-items-center px-md-3 mr-0 mr-md-2 ${
              selectedCategory === category.name && "active"
            }`}
          >
            <i className={category.icon}></i>
            <span className="d-none ms-2 d-md-block text-capitalize">
              {category.name}
            </span>
          </a>
        </li>
      ))}

      <li className="nav-item ms-auto">
        <button
          className="nav-link bg-primary text-white rounded-3 d-flex align-items-center px-3"
          onClick={() => handleClick()}
        >
          <i className="bi-plus-circle"></i>
          <span className="d-none  ms-1 d-md-block font-14">Add Notes</span>
        </button>
      </li>
    </ul>
  );
};

export default Header;
