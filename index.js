let courses = [];
let fetchData = async () => {
  await axios
    .get("http://localhost:3000/courses")
    .then((resp) => {
      courses = resp.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
  setViewedCourses(courses);
};

let setViewedCourses = (currentCourses) => {
  let coursesContainer = document.getElementById("tabs-courses");
  coursesContainer.innerHTML = "";
  for (let course of currentCourses) {
    let item = document.createElement("div");
    item.classList.add("course-template");
    item.innerHTML = `
    <img src=${course.image} alt=${course.title}/>
    <div class="course-description">
    <h4>${course.title}</h4>
    <div class="author">${course.author}</div>
    <div class="rating">
        ${course.rating}
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fas fa-star-half-alt"></i>
    </div>
    (${course.people})
    <h4>E£${course.price}</h4>
    </div>
    `;

    coursesContainer.appendChild(item);
  }
};

let onSearch = (event) => {
  event.preventDefault();
  let inputElement = document.getElementsByTagName("input");
  let searchValue = inputElement[0].value;
  if (searchValue.trim().length === 0) {
    setViewedCourses(courses);
    return;
  }
  let filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchValue)
  );
  setViewedCourses(filteredCourses);
};
