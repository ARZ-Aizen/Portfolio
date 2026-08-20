const btn = document.getElementById("menuBtn");
const menu = document.getElementById("mobileMenu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const sections = document.querySelectorAll("section");

function removeActiveClasses() {
  navLinks.forEach((link) => {
    link.classList.remove("text-white", "border-b-4", "border-blue-500");
    link.classList.add("text-gray-400");
  });
  mobileNavLinks.forEach((link) => {
    link.classList.remove("text-white", "bg-blue-600");
  });
}

function addActiveClass(sectionId) {
  removeActiveClasses();

  const activeLink = document.querySelector(
    `.nav-link[data-section="${sectionId}"]`,
  );
  if (activeLink) {
    activeLink.classList.remove("text-gray-400");
    activeLink.classList.add("text-white", "border-b-4", "border-blue-500");
  }

  const activeMobileLink = document.querySelector(
    `.mobile-nav-link[href="#${sectionId}"]`,
  );
  if (activeMobileLink) {
    activeMobileLink.classList.add("text-white", "bg-blue-600");
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const sectionId = this.getAttribute("data-section");
    addActiveClass(sectionId);
  });
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const sectionId = this.getAttribute("href").substring(1);
    addActiveClass(sectionId);
    menu.classList.add("hidden");
  });
});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute("id");
      addActiveClass(sectionId);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

addActiveClass("home");

const achievementCards = document.querySelectorAll(".achievement-card");

const achievementObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.3,
  },
);

achievementCards.forEach((card) => achievementObserver.observe(card));
