import { useState } from "react";
import plusIcon from "../../icons/plus.png";

import "./Profile.css";

export default function Profile(props) {
  return (
    <div className="overlay">
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-close-modal"
          onClick={() => props.onIsOpen(false)}
        >
          <img src={plusIcon} alt="plus icon" />
        </button>
      </div>
    </div>
  );
}
