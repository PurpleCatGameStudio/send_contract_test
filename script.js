const activitiesDiv = document.getElementById("activities");
const totalSpan = document.getElementById("total");
const form = document.getElementById("form");

let activities = [];

async function loadActivities() {
  try {
    const response = await fetch("activities.json");
    activities = await response.json();
    renderActivities();
  } catch (err) {
    console.error("Erro ao carregar atividades", err);
  }
}

function renderActivities() {
  activitiesDiv.innerHTML = "";

  activities
    .filter(a => a.active)
    .forEach(act => {
      const div = document.createElement("div");
      div.className = "activity";

      div.innerHTML = `
        <input type="checkbox" data-id="${act.id}" data-price="${act.price}">
        <div>
          <h3>${act.name} – R$ ${act.price}</h3>
          <p>${act.description}</p>
        </div>
      `;

      activitiesDiv.appendChild(div);
    });
}

function updateTotal() {
  const checked = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );

  let total = 0;
  checked.forEach(c => {
    total += Number(c.dataset.price);
  });

  totalSpan.textContent = `R$ ${total}`;
}

activitiesDiv.addEventListener("change", updateTotal);

form.addEventListener("submit", e => {
  e.preventDefault();

  const selectedActivities = [
    ...document.querySelectorAll("input[type=checkbox]:checked")
  ].map(c => c.dataset.id);

  const data = {
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    activities: selectedActivities
  };

  console.log("FORM DATA:", data);
  alert("Frontend OK – dados no console");
});

loadActivities();
