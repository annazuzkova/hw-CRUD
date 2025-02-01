import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./api/api";

const studentButton = document.querySelector("#get-students-btn");
const deleteButtons = document.querySelector("#tbody-container");
const postForm = document.querySelector("#add-student-form");
const studentContainer = document.querySelector("#tbody-container");
const renderStudents = async () => {
  const students = await getStudents();
  students.forEach((student) => {
    const studentHtml = ` 
    <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.skills}</td>
            <td>${student.email}</td>
            <td>${student.isEnrolled}</td>
            <td><button id='delete-button' data-id-student='${student.id}'>Видалити</button></td>
          </tr>`;
    studentContainer.insertAdjacentHTML("beforeend", studentHtml);
  });
};

studentButton.addEventListener("click", renderStudents);

const newStudent = async () => {
  const student = {
    id: Math.floor(Math.random(100 - 1) + 1),
    name: document.querySelector("#name").value,
    name: document.querySelector("#age").value,
    name: document.querySelector("#course").value,
    name: document.querySelector("#skills").value,
    name: document.querySelector("#email").value,
    name: document.querySelector("#email").value,
    name: document.querySelector("#isEnrolled").value,
  };
  await addStudent(student);
};
postForm.addEventListener("submit", newStudent);

const deleteStudentHandler = async (event) => {
  if (event.target.nodeName === "BUTTON") {
    const studentId = event.target.dataset;
    await deleteStudent(studentId.idStudent);
  }
};
deleteButtons.addEventListener("click", deleteStudentHandler);
