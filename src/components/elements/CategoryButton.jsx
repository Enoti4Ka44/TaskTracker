import { useState } from "react";

export default function CategoryButton(props) {
  return (
    <button
      className="btn-category"
      onClick={() => {
        props.onFilterCategory(props.name);
        props.onHandleId(props.id);
      }}
    >
      <img src={props.img} alt={props.name} />
      {props.name === "all"
        ? "Все задания"
        : props.name === "completed"
        ? "Выполненные задания"
        : props.name === "incompleted"
        ? "Невыполненные задания"
        : props.name === "important"
        ? "Важные задания"
        : props.name === "expired"
        ? "Просроченные задания"
        : props.name}
    </button>
  );
}
