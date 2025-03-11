import { useState } from "react";
import checkMarkIcon from "../../assets/check-mark.png";
import "./style/CreateCategoryModal.css";

export default function CreateCategoryModal() {
  const [error, setError] = useState("");
  const [sucsess, setSucsess] = useState("");
  const [name, setName] = useState("");

  const handleCreateCategory = async () => {
    setError("");
    setSucsess("");

    if (!name) {
      setError("Название не может быть пустым");
      return;
    } else if (name.length < 3) {
      return setError("Название не может быть короче 3 символов");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://89.22.225.116:8080/api/task/category",
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
        console.log("Категория создана:", data);
        setSucsess("Категория успешно создана");
        setName("");
      } else {
        const errorData = await response.json();
        if (errorData.message === "Category is already exists") {
          setError("Такая категория уже существует");
        } else {
          console.error("Ошибка сервера:", errorData);
          setError(errorData.message || "Ошибка при создании категории");
        }
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      setError("Ошибка сети");
    }
  };

  return (
    <div className="wrapper-create_category">
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
      {(error && (
        <p style={{ marginBottom: 10 }} className="message red">
          {error}!
        </p>
      )) ||
        (sucsess && (
          <p style={{ marginBottom: 10 }} className="message green">
            {sucsess}!
          </p>
        ))}
    </div>
  );
}
