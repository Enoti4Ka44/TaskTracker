const API_BASE_URL = "http://89.22.225.116:8080";

export const fetchAllTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/task/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при загрузке задач");
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};

export const fetchImportantTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/task/important`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при загрузке важных задач");
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};

export const fetchTasksByStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен отсутствует. Пожалуйста, войдите в систему.");
      }

      const url = new URL(`${API_BASE_URL}/api/task/by-status`);
      url.searchParams.append("status", status);
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка сервера:", errorText);
        throw new Error(`Ошибка при загрузке задач по статусу: ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  };

  export const fetchTasksByCategory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен отсутствует. Пожалуйста, войдите в систему.");
      }

      const url = new URL(`${API_BASE_URL}/api/task/by-categoryId`);
      url.searchParams.append("id", id);
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка сервера:", errorText);
        throw new Error(`Ошибка при загрузке задач по категории: ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  };

export const fetchCategories = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/task/categoryId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при загрузке категорий");
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
