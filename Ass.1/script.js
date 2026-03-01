let events = JSON.parse(localStorage.getItem("events")) || [];

displayEvents();


function showMessage(text, color) {
  let msg = document.getElementById("msg");
  msg.innerText = text;
  msg.style.color = color;

  setTimeout(() => {
    msg.innerText = "";
  }, 2000);
}


function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}


function updateCount() {
  document.getElementById("eventCount").innerText =
    "Total Events: " + events.length;
}

function addEvent() {
  let title = document.getElementById("eventTitle").value.trim();
  let date = document.getElementById("eventDate").value;
  let category = document.getElementById("eventCategory").value;
  let desc = document.getElementById("eventDesc").value.trim();

  if (title === "" || date === "" || desc === "") {
    showMessage("Please fill all fields!", "yellow");
    return;
  }

  events.push({ title, date, category, desc });

  saveEvents();
  displayEvents();

  document.getElementById("eventTitle").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventDesc").value = "";

  showMessage("Event Added Successfully!", "green");
}

function displayEvents() {
  let list = document.getElementById("eventList");

  updateCount();

  if (events.length === 0) {
    list.innerHTML = `<p class="empty">No events Add your first event</p>`;
    return;
  }

  list.innerHTML = "";

  events.forEach((event, index) => {
    list.innerHTML += `
      <div class="event-item">
        <h3>${event.title}</h3>
        <p><b>Date:</b> ${event.date}</p>
        <p><b>Category:</b> ${event.category}</p>
        <p>${event.desc}</p>

        <button onclick="deleteEvent(${index})">
          Delete
        </button>
      </div>
    `;
  });
}

function deleteEvent(index) {
  events.splice(index, 1);
  saveEvents();
  displayEvents();
  showMessage("Event Deleted", "red");
}

function clearEvents() {
  events = [];
  saveEvents();
  displayEvents();
  showMessage("All Events Cleared", "red");
}

function addSampleEvents() {
  events = [
    {
      title: "Web Dev Class ",
      date: "2026-02-10",
      category: "Conference",
      desc: "Advanced JavaScript"
    },
    
  ];

  saveEvents();
  displayEvents();
  showMessage("Sample Events Added!", "blue");
}


document.addEventListener("keydown", function(event) {
  document.getElementById("keyPressed").innerText = event.key;
});
