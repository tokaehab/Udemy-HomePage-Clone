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

let addCourseToSlide = (course, slide) => {
  console.log(course.title);
  let temp = document.createElement("div");
  temp.classList.add("course-template");
  temp.innerHTML = `
    <img src=${course.image} alt=${course.title} class="w-100"/>
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
  slide.appendChild(temp);
};

let setViewedCourses = (currentCourses) => {
  let coursesContainer = document.getElementById("carousel-inner");
  coursesContainer.innerHTML = "";

  let coursesCntr = 0;
  let maxLimit = 4;

  let slide = document.createElement("div");
  slide.classList.add("carousel-item");
  slide.classList.add("active");

  for (let course of currentCourses) {
    console.log(course.title);
    coursesCntr = coursesCntr + 1;
    if (coursesCntr === maxLimit + 1) {
      coursesContainer.appendChild(slide);
      slide = document.createElement("div");
      slide.classList.add("carousel-item");
      coursesCntr = 1;
    }
    addCourseToSlide(course, slide);
    console.log(slide);
  }
  if (coursesCntr >= 1) {
    coursesContainer.appendChild(slide);
  }

  let buttons = document.createElement("div");
  buttons.innerHTML = `
  <button class="carousel-control-prev" style="width:auto; bottom:50px;" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" style="width:auto; bottom:50px;" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  `;
  coursesContainer.appendChild(buttons);
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
