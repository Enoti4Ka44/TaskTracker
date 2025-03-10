import { useState, useEffect } from "react";
import Header from "./Header";
import CreateTaskModal from "./CreateTaskModal";
import CreateCategoryModal from "./CreateCategoryModal";
import CategoryButton from "../elements/CategoryButton";
import Card from "../elements/Card";
import ActionButton from "../elements/ActionButton";
import DeleteTaskModal from "../elements/DeleteTaskModal";
import TaskModal from "./TaskModal";
import CategoryCard from "../elements/CategoryCard";

import "./style/MainPage.css";

import allTasksIcon from "../../assets/all.png";
import completedTasksIcon from "../../assets/completed.png";
import incompletedTasksIcon from "../../assets/incompleted.png";
import importantTasksIcon from "../../assets/important.png";
import customTaskIcon from "../../assets/custom-icon.png";

import {
  fetchAllTasks,
  fetchCategories,
  fetchImportantTasks,
  fetchTasksByStatus,
  fetchTasksByCategory,
} from "../data/data";

export default function MainPage() {
  const [categories, setCategories] = useState([
    { name: "all" },
    { name: "completed" },
    { name: "incompleted" },
    { name: "important" },
  ]);
  const [usersCategories, setUsersCategories] = useState([]);
  const [cardData, setCardData] = useState([]);

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [usersCategoryId, setUsersCategoryId] = useState(null);

  const [whatToRender, setWhatToRender] = useState("cards");
  const [display, setDisplay] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryIcons = {
    all: allTasksIcon,
    completed: completedTasksIcon,
    incompleted: incompletedTasksIcon,
    important: importantTasksIcon,
    custom: customTaskIcon,
  };

  function handleOpenCreateTaskModal(isOpen) {
    return setIsCreateTaskModalOpen(isOpen);
  }
  function handleOpenCategoryModal(isOpen, isDisplay) {
    return setIsCategoryModalOpen(isOpen), setDisplay(isDisplay);
  }
  function handleOpenTaskModal(isOpen, data = null) {
    return setIsTaskModalOpen(isOpen), setSelectedTask(data);
  }
  function handleOpenDeleteModal(isOpen, taskId) {
    return setIsDeleteModalOpen(isOpen), setTaskToDelete(taskId);
  }
  function handleFilterCategory(categoryName) {
    return setCategoryFilter(categoryName);
  }
  function handleUsersCategoryId(id) {
    return setUsersCategoryId(id);
  }

  useEffect(() => {
    const loadTasks = async () => {
      try {
        let tasks;
        if (categoryFilter === "important") {
          tasks = await fetchImportantTasks();
        } else if (categoryFilter === "completed") {
          tasks = await fetchTasksByStatus("COMPLETED");
        } else if (categoryFilter === "incompleted") {
          tasks = await fetchTasksByStatus("CREATED");
        } else if (categoryFilter === "all") {
          tasks = await fetchAllTasks();
        } else {
          tasks = await fetchTasksByCategory(usersCategoryId);
        }
        setCardData(tasks);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      }
    };
    loadTasks();
  }, [categoryFilter]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setUsersCategories(categories);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    loadCategories();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://89.22.225.116:8080/api/task/${taskId}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Задача завершена");

        setCardData((previousCardData) =>
          previousCardData.map((task) =>
            task.id === taskId ? { ...task, isCompleted: true } : task
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Ошибка сервера:", errorData);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  const handleDeleteTask = async (confirm) => {
    if (confirm && taskToDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://89.22.225.116:8080/api/task/${taskToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          console.log("Задача удалена");
          setCardData((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskToDelete)
          );
        } else {
          const errorData = await response.json();
          console.error("Ошибка сервера:", errorData);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      }
    }
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
    setIsTaskModalOpen(false);
  };
  const handleDeleteCategory = async (categoryToDelete) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://89.22.225.116:8080/api/task/category/${categoryToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Категория удалена");
        setUsersCategories((prevCategory) =>
          prevCategory.filter((category) => category.id !== categoryToDelete)
        );
      } else {
        const errorData = await response.json();
        console.error("Ошибка сервера:", errorData);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  const defaultCategories = categories.map((category) => (
    <CategoryButton
      key={category.name}
      name={category.name}
      img={categoryIcons[category.name]}
      onFilterCategory={handleFilterCategory}
      onHandleId={handleUsersCategoryId}
    />
  ));
  const сustomCategories = usersCategories.map((category) => (
    <CategoryButton
      key={category.id}
      id={category.id}
      name={category.name}
      img={categoryIcons["custom"]}
      onFilterCategory={handleFilterCategory}
      onHandleId={handleUsersCategoryId}
    />
  ));

  const cardsToRender = cardData.map((card) => (
    <Card
      key={card.id}
      data={card}
      onCompleteTask={handleCompleteTask}
      onDeleteTask={handleOpenDeleteModal}
      onOpenTask={(isOpen) => handleOpenTaskModal(isOpen, card)}
    />
  ));

  const categoriesToRender = usersCategories.map((category) => (
    <CategoryCard
      key={category.id}
      id={category.id}
      name={category.name}
      onDeleteCategory={handleDeleteCategory}
    />
  ));

  return (
    <>
      <Header />
      <main
        className="main"
        onClick={() => handleOpenCategoryModal(false, " ")}
      >
        {isTaskModalOpen && (
          <TaskModal
            data={selectedTask}
            onOpenTask={handleOpenTaskModal}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleOpenDeleteModal}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteTaskModal onDeleteTask={handleDeleteTask} />
        )}
        <div className="main-sidebar">
          <div className="buttons-sidebar" onClick={(e) => e.stopPropagation()}>
            <ActionButton
              text="Создать категорию"
              onIsOpen={handleOpenCategoryModal}
              display={display}
            />
            {isCategoryModalOpen && (
              <CreateCategoryModal onIsOpen={handleOpenCategoryModal} />
            )}

            <ActionButton
              text="Создать задачу"
              onIsOpen={handleOpenCreateTaskModal}
            />
          </div>
          <div className="category-sidebar">
            {whatToRender === "cards" ? (
              <button
                onClick={() => setWhatToRender("categories")}
                className="btn-view-all"
              >
                Посмотреть все категории
              </button>
            ) : (
              <button
                onClick={() => setWhatToRender("cards")}
                className="btn-view-all"
              >
                Вернуться к задачам
              </button>
            )}
            {defaultCategories} {сustomCategories}{" "}
          </div>
        </div>

        <div className="cards">
          {whatToRender === "cards"
            ? cardsToRender
            : whatToRender === "categories"
            ? categoriesToRender
            : ""}
        </div>
        {isCreateTaskModalOpen && (
          <CreateTaskModal
            categories={usersCategories}
            onIsOpen={handleOpenCreateTaskModal}
          />
        )}
      </main>
    </>
  );
}
