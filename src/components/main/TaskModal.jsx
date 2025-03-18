import checkMarkIcon from "../../assets/check-mark.png";
import plusIcon from "../../assets/plus.png";
import editIcon from "../../assets/edit.png";
import "./style/TaskModal.css";
import { useState } from "react";
export default function TaskModal(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [important, setImportant] = useState(props.data.important);
  const [categoryId, setCategoryId] = useState(0);
  const [timeToComplete, setTimeToComplete] = useState(
    props.data.timeToComplete
  );
  console.log(props.data);
  console.log(title, description, important, categoryId, timeToComplete);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://89.22.225.116:8080/api/task/${props.data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            important,
            categoryId,
            timeToComplete,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      console.log("Задание успешно изменено:", data);
      props.onOpenTask(false);
    } catch (error) {
      console.error("Ошибка при редактировании задачи:", error);
    }
  };

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
            {isEditing ? (
              <input
                className="task-input_edit-title"
                type="text"
                name="title"
                value={title}
                id="title"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h4> {props.data.title} </h4>
            )}

            {isEditing && props.data.description ? (
              <textarea
                className="task-textarea_edit-desc"
                type="text"
                name="title"
                value={description}
                id="title"
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <p>{props.data.description}</p>
            )}
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
              {isEditing ? (
                <button className="btn-card-edit" onClick={handleEdit}>
                  Сохранить <img src={checkMarkIcon} alt="edit icon" />
                </button>
              ) : (
                <button
                  className="btn-card-edit"
                  onClick={() => setIsEditing(true)}
                >
                  Редактировать задание <img src={editIcon} alt="edit icon" />
                </button>
              )}

              <button
                className="btn-card"
                onClick={() => props.onDeleteTask(true, props.data.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
