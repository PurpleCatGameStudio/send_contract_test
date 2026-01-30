const activities = [
  {
    id: 1,
    name: "Pixel Art",
    description: "Arte pixel 16x16 ou 32x32",
    price: 50
  },
  {
    id: 2,
    name: "Animação",
    description: "Sprite animado em loop",
    price: 80
  },
  {
    id: 3,
    name: "UI Game",
    description: "Interface completa para jogos",
    price: 100
  }
];

const activitiesDiv = document.getElementById("activities");
const totalSpan = document.getElementById("total");
const form = document.getElementById("form");

function renderActivities() {
  activitiesDiv.innerHTML = "";

  activities.forEach(act => {
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
  alert("Frontend funcionando. Dados no console.");
});

renderActivities();
