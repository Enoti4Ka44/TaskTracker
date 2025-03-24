import "./Сard.css";
import { useState } from "react";
import deleteIcon from "../../icons/close.png";
import CompleteButton from "../../elements/CompleteButton";

export default function Card(props) {
  return (
    <section className="card-container" key={props.data.id}>
      <div className="card-top" onClick={() => props.onIsOpen(true)}>
        <button
          className="btn-card_cross"
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteTask(true, props.data.id);
          }}
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
        <h3 className="card-title">{props.data.title}</h3>

        <p className="card-desc">{props.data.description}</p>
      </div>
      <div className="card-bottom">
        <span className="card-task-end">
          Выполнить до:{" "}
          {props.data.timeToComplete ? props.data.timeToComplete : "не указано"}
        </span>
        <CompleteButton
          data={props.data}
          onCompleteTask={props.onCompleteTask}
        />{" "}
      </div>
    </section>
  );
}
