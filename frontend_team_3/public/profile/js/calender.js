const monthNumberEl = document.querySelector('.month-number');
monthNumberEl.textContent = new Date().getMonth() + 1; // set the month number as the text content of the element

const yearNumberEl = document.querySelector('.year-number');
yearNumberEl.textContent = new Date().getFullYear();

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

//array of days 
const dateRanges = [
  [new Date('2023-07-10'), new Date('2023-07-20')],
  [new Date('2023-08-05'), new Date('2023-08-15')]
];

// getting new date, current year and month
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(),
      liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                    && currYear === new Date().getFullYear() ? "active" : "";
    let isSunday = new Date(currYear, currMonth, i).getDay() === 0 ? "sunday" : "";
    let isInRange = "";

    for (let j = 0; j < dateRanges.length; j++) {
      const startDate = dateRanges[j][0];
      const endDate = dateRanges[j][1];
      const currentDate = new Date(currYear, currMonth, i);

      if (currentDate >= startDate && currentDate <= endDate) {
        if (currentDate.getTime() === startDate.getTime()) {
          isInRange = "highlight-start";
        } else if (currentDate.getTime() === endDate.getTime()) {
          isInRange = "highlight-end";
        } else {
          isInRange = "highlight-range";
        }
      }
    }

    liTag += `<li class="${isToday} ${isSunday} ${isInRange}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]}`;
  daysTag.innerHTML = liTag;
};
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY",
              "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar();// calling renderCalendar function
        monthNumberEl.textContent = currMonth + 1; // update the month number text content
        yearNumberEl.textContent = currYear;
    });
});