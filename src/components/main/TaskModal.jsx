import CompleteButton from "../elements/CompleteButton";

import plusIcon from "../../assets/plus.png";
import editIcon from "../../assets/edit.png";
import "./style/TaskModal.css";
import { useState } from "react";
export default function TaskModal(props) {
  const [isDeleting, setIsDeleting] = useState(false);
  function handleIsDeleting() {
    setIsDeleting(true);
  }
  return (
    <>
      <div className="overlay">
        <div className="task-modal">
          <button
            className="btn-close-modal-task"
            onClick={() => props.onOpenTask(false)}
          >
            <img src={plusIcon} alt="plus icon" />
          </button>

          <div className="task-modal-top">
            <h4>{props.data.title}</h4>
            <p>{props.data.description}</p>
          </div>
          <div className="task-modal-bottom">
            <div className="task-modal-bottom_categories">
              <span>Категория: </span>
              <ul>
                <li className="test">История</li>
                {props.data.important && <li className="test">Важное</li>}
              </ul>
            </div>

            <p className="task-modal-bottom_date">
              Выполнить до: {props.data.timeToComplete}
            </p>
            <div className="task-modal-bottom_btns">
              <button className="btn-card-edit">
                Редактировать задание <img src={editIcon} alt="edit icon" />
              </button>
              <div className="btns-container">
                {props.data.status === "COMPLETED" ? (
                  <button
                    className="btn-card"
                    onClick={() => console.log("Work")}
                  >
                    Отменить
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="btn-card"
                  onClick={() => {
                    props.onDeleteTask(true, props.data.id);
                    handleIsDeleting(true);
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
