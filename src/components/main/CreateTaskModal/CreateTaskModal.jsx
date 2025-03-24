import "./CreateTaskModal.css";
import plusIcon from "../../icons/plus.png";
import { useState } from "react";

export default function CreateTaskModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [sucsess, setSucsess] = useState("");
  const [categoryId, setCategoryId] = useState();
  const timeToComplete = `${date}T${time}:00`;

  const handleCreateTask = async () => {
    setError("");
    setSucsess("");

    if (!title) {
      setError("Название не может быть пустым");
      return;
    }
    if (description.length >= 255) {
      setError("Описание не может быть длиннее 255 слов");
      return;
    }
    if (!date || !time) {
      setError("Поля дата и время не могут быть пустыми");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://89.22.225.116:8080/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          important,
          timeToComplete,
          categoryId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        props.onAddCreatedTask(data);
        console.log("Задание создано:", data);
        setSucsess("Задание успешно создано");
        setDate("");
        setTime("");
        setImportant(false);
        setDescription("");
        setTitle("");
        setCategoryId();
      } else {
        const errorData = await response.json();
        console.error("Ошибка сервера:", errorData);
        setError(errorData.message || "Ошибка при создании задания");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      setError("Ошибка сети");
    }
  };

  const dropdownCategories = props.categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  return (
    <div className="create-task-modal" onClick={() => props.onIsOpen(false)}>
      <form
        className="create-task-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateTask();
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="task-form-title">Создание задачи</h2>
        <button
          className="btn-close-modal"
          onClick={() => props.onIsOpen(false)}
        >
          <img src={plusIcon} alt="plus icon" />
        </button>

        <div className="input-wrapper">
          <input
            className="task-form-input_name"
            type="text"
            value={title}
            placeholder="Введите название"
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="task-form-select_category"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Выберите категорию</option>
            {dropdownCategories}
          </select>
        </div>

        <div className="input-wrapper">
          <input
            className="task-form-input_date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="task-form-input_time"
            type="time"
            value={time}
            name="time"
            id="time"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <textarea
          className="task-form-input_desc"
          name="description"
          value={description}
          placeholder="Введите описание"
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="checkbox-wrapper">
          <input
            className="task-form-input_checkbox"
            type="checkbox"
            name="important"
            value={important}
            id="important"
            onChange={(e) => setImportant(e.target.checked)}
          />

          <label htmlFor="important">Пометить как важное</label>
          {error && <p className="message red">{error}!</p>}
          {sucsess && <p className="message green">{sucsess}!</p>}
        </span>

        <button className="btn-submit-task">Создать задание</button>
      </form>
    </div>
  );
}
