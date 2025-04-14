import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import checkMarkIcon from "../../icons/check-mark.png";
import "./CreateCategoryModal.css";

export default function CreateCategoryModal(props) {
  const [name, setName] = useState("");

  const handleCreateCategory = async () => {
    if (!name) {
      toast.error("Название не может быть пустым");
      return;
    } else if (name.length < 3) {
      toast.error("Название не может быть короче 3 символов");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://89.22.225.116:8080/api/task/categoryId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        props.onAddCreatedCategory(data);
        toast.success("Категория успешно создана");
        setName("");
      } else {
        const errorData = await response.json();
        if (errorData.message === "Category is already exists") {
          toast.error("Такая категория уже существует");
        } else {
          console.error("Ошибка сервера:", errorData);
          toast.error("Ошибка при создании категории");
        }
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      toast.error("Ошибка сети");
    }
  };

  return (
    <div className="wrapper-create_category">
      <ToastContainer position="bottom-right" theme="colored" closeOnClick />
      <button className="btn-create_category" onClick={handleCreateCategory}>
        <img src={checkMarkIcon} alt="" />
      </button>
      <input
        type="text"
        value={name}
        className="input-create_category"
        placeholder="Введите название категории"
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
    </div>
  );
}
