import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./CategoryCard.css";

import checkMarkIcon from "../../icons/check-mark.png";

export default function CategoryCard(props) {
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(`${props.name}`);
  const id = props.id;

  const handleEditCategory = async () => {
    if (newName === props.name) {
      setEditName(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://89.22.225.116:8080/api/task/categoryId",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id, newName }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Категория изменена:", data);
        toast.success("Категория изменена");
        props.onUpdateCategory({ id, name: newName });
        setEditName(false);
      } else {
        const errorData = await response.json();
        console.error("Ошибка сервера:", errorData);
        toast.error("Ошибка сервера");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      toast.error("Ошибка сети");
    }
  };

  return (
    <>
      <section className="category-container">
        <ToastContainer
          position="bottom-right"
          theme="colored"
          closeOnClick
          onClick={(e) => e.stopPropagation()}
        />
        <div className="category-text">
          <p>Категория:</p>

          {!editName ? (
            <h3>{props.name}</h3>
          ) : (
            <div className="wrapper-edit_category">
              <input
                className="input-edit_category"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
              <button
                className="btn-edit_category"
                onClick={handleEditCategory}
              >
                <img src={checkMarkIcon} alt="checkmark icon" />
              </button>
            </div>
          )}
        </div>
        <div className="category-btns">
          {!editName ? (
            <button className="btn-card" onClick={() => setEditName(true)}>
              Изменить
            </button>
          ) : (
            <button
              className="btn-card"
              onClick={() => {
                setEditName(false);
                setNewName(`${props.name}`);
              }}
            >
              Отменить
            </button>
          )}

          <button
            className="btn-card"
            onClick={(e) => {
              e.stopPropagation();
              props.onDeleteCategory(props.id);
            }}
          >
            Удалить
          </button>
        </div>
      </section>
    </>
  );
}
