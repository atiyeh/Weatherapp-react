import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./searchbox.css";

export default function Search() {
  return (
    <div className="App">
      <div className="box">
        <button>
          <FontAwesomeIcon icon={faSearch} size="xl" />
        </button>
        <input type="search" placeholder="type a city" />
      </div>
    </div>
  );
}
