import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./searchbox.css";

export default function Search() {
  const [city, setcity] = useState(" ");
  const [message, setmessage] = useState("");
  function showvalue(event) {
    event.preventDefault();
    setmessage(`searching for ${city}`);
  }
  function changecity(event) {
    setcity(event.target.value);
  }
  return (
    <div className="App">
      <form className="box" onSubmit={showvalue}>
        <button>
          <FontAwesomeIcon icon={faSearch} size="xl" />
        </button>
        <input type="search" placeholder="type a city" onChange={changecity} />
      </form>
      <h2>{message}</h2>
    </div>
  );
}
