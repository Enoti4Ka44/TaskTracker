import { useState, useEffect } from "react";
import Header from "../Header/Header";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import CreateCategoryModal from "../CreateCategoryModal/CreateCategoryModal";
import Profile from "../Profile/Profile";

import CategoryButton from "../../elements/CategoryButton";
import Card from "../Card/Card";
import ActionButton from "../../elements/ActionButton";
import DeleteTaskModal from "../../elements/DeleteTaskModal";
import TaskModal from "../TaskModal/TaskModal";
import CategoryCard from "../CategoryCard/CategoryCard";

import "./MainPage.css";

import allTasksIcon from "../../icons/all.png";
import completedTasksIcon from "../../icons/completed.png";
import incompletedTasksIcon from "../../icons/incompleted.png";
import importantTasksIcon from "../../icons/important.png";
import customTaskIcon from "../../icons/custom-icon.png";

import {
  fetchAllTasks,
  fetchCategories,
  fetchImportantTasks,
  fetchTasksByStatus,
  fetchTasksByCategory,
} from "../../data/data";

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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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
  function handleOpenProfileModal(isOpen) {
    return setIsProfileModalOpen(isOpen);
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
        `http://89.22.225.116:8080/api/task/categoryId/${categoryToDelete}`,
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

  const handleAddUpdatedTask = (updatedTask) => {
    setCardData((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleAddCreatedTask = (createdTask) => {
    setCardData((prevTask) => [createdTask, ...prevTask]);
  };

  const handleAddCreatedCategory = (createdCategory) => {
    setUsersCategories((prevCategories) => [
      ...prevCategories,
      createdCategory,
    ]);
  };

  const handleWhatToRender = (whatToRender) => {
    setWhatToRender(whatToRender);
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
      onIsOpen={(isOpen) => handleOpenTaskModal(isOpen, card)}
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
      <Header
        onRender={handleWhatToRender}
        activeSection={whatToRender}
        onIsOpen={handleOpenProfileModal}
      />
      <main
        className="main"
        onClick={() => handleOpenCategoryModal(false, " ")}
      >
        {isTaskModalOpen && (
          <TaskModal
            data={selectedTask}
            categories={usersCategories}
            onIsOpen={handleOpenTaskModal}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleOpenDeleteModal}
            onTaskUpdate={handleAddUpdatedTask}
          />
        )}

        {isProfileModalOpen && <Profile onIsOpen={handleOpenProfileModal} />}

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
              <CreateCategoryModal
                onIsOpen={handleOpenCategoryModal}
                onAddCreatedCategory={handleAddCreatedCategory}
              />
            )}

            <ActionButton
              text="Создать задачу"
              onIsOpen={handleOpenCreateTaskModal}
            />
          </div>
          <div className="category-sidebar">
            {whatToRender === "cards"
              ? [defaultCategories, сustomCategories]
              : ""}
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
            onAddCreatedTask={handleAddCreatedTask}
          />
        )}
      </main>
    </>
  );
}
