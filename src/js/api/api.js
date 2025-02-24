export const getStudents = async () => {
  const url = "http://localhost:3000/students";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Виникла помилка при запиті. Статус: ${response.status}`);
    }
    const students = await response.json();
    return students;
  } catch (error) {
    console.error(`Помилка при завантажені студентів ${error}`);
    return {};
  }
};

export const addStudent = async (student) => {
  const url = `http://localhost:3000/students`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`Виникла помилка при запиті. Статус: ${response.status}`);
    }

    const addStudent = await response.json();
    return addStudent;
  } catch (error) {
    console.error(`Помилка при додаванні студента ${error}`);
    return {};
  }
};

export const updateStudent = async (student) => {
  const url = `http://localhost:3000/students/${student.id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`Виникла помилка при запиті. Статус: ${response.status}`);
    }

    const updateStudents = await response.json();
    return updateStudents;
  } catch (error) {
    console.error(`Помилка при оновленні студента ${error}`);
    return {};
  }
};

export const deleteStudent = async (student) => {
  const url = `http://localhost:3000/students/${student.id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Виникла помилка при запиті. Статус: ${response.status}`);
    }

    // const deletePost = response.json();
    // return deletePost;
  } catch (error) {
    console.error(`Помилка при видаленні студента ${error}`);
    return {};
  }
};
