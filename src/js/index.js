import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./api/api";

const studentButton = document.querySelector("#get-students-btn");
const deleteButtons = document.querySelector("#tbody-container");
const submitButton = document.querySelector(".submit-button");
const postForm = document.querySelector("#add-student-form");
const studentContainer = document.querySelector("#tbody-container");
let formUpdate = false;
let updateId = "";
const renderStudents = async () => {
  studentContainer.innerHTML = "";
  const students = await getStudents();
  students.map((student) => {
    const studentHtml = ` 
    <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.skills}</td>
            <td>${student.email}</td>
            <td>${student.isEnrolled}</td>
            <td><button id='delete-button' data-idstudent='${student.id}' class='delete-button'>Видалити</button></td>
            <td><button id='update-button' data-idstudent='${student.id}' class='update-button'>Оновити</button></td>
          </tr>`;
    studentContainer.insertAdjacentHTML("beforeend", studentHtml);
  });
};

studentButton.addEventListener("click", renderStudents);

const newStudent = async () => {
  const student = {
    id: Math.floor(Math.random() * (100 - 1) + 1).toString(),
    name: document.querySelector("#name").value,
    age: document.querySelector("#age").value,
    course: document.querySelector("#course").value,
    skills: document.querySelector("#skills").value,
    email: document.querySelector("#email").value,
    isEnrolled: document.querySelector("#isEnrolled").value,
  };
  await addStudent(student);
};
postForm.addEventListener("submit", newStudent);

const deleteStudentHandler = async (event) => {
  if (
    event.target.nodeName === "BUTTON" &&
    event.target.classList.contains("delete-button")
  ) {
    const students = await getStudents();
    const studentId = event.target.dataset.idstudent;
    const findDeleteStudent = students.find(
      (student) => student.id === studentId
    );

    await deleteStudent(findDeleteStudent);
    await renderStudents();
  }
};

deleteButtons.addEventListener("click", deleteStudentHandler);

const updateButtonHandler = async (event) => {
  formUpdate = true;
  if (
    event.target.nodeName === "BUTTON" &&
    event.target.classList.contains("update-button")
  ) {
    const students = await getStudents();
    const studentId = event.target.dataset.idstudent;
    const findUpdateStudent = students.find(
      (student) => student.id === studentId
    );
    (document.querySelector("#name").value = findUpdateStudent.name),
      (document.querySelector("#age").value = findUpdateStudent.age),
      (document.querySelector("#course").value = findUpdateStudent.course),
      (document.querySelector("#skills").value = findUpdateStudent.skills),
      (document.querySelector("#email").value = findUpdateStudent.email);
    submitButton.textContent = "Оновити студента";
    updateId = studentId;
  }
};
deleteButtons.addEventListener("click", updateButtonHandler);

const updateStudentHandler = async () => {
  if (formUpdate) {
    const student = {
      id: updateId.toString(),
      name: document.querySelector("#name").value,
      age: document.querySelector("#age").value,
      course: document.querySelector("#course").value,
      skills: document.querySelector("#skills").value,
      email: document.querySelector("#email").value,
      isEnrolled: document.querySelector("#isEnrolled").value,
    };
    await updateStudent(student);
    formUpdate = false;
  }
};
postForm.addEventListener("submit", updateStudentHandler);
