document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const opened = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(opened));
    });
  }

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const opened = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(opened));
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));

  const popup = document.querySelector(".popup-backdrop");
  const popupClose = document.querySelector(".popup-close");
  const popupSeen = sessionStorage.getItem("ue-battle-popup-seen");

  if (popup && !popupSeen) {
    setTimeout(() => {
      popup.classList.add("show");
      document.body.classList.add("no-scroll");
      sessionStorage.setItem("ue-battle-popup-seen", "true");
    }, 1400);
  }

  if (popupClose && popup) {
    popupClose.addEventListener("click", () => {
      popup.classList.remove("show");
      document.body.classList.remove("no-scroll");
    });
  }

  if (popup) {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        popup.classList.remove("show");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  document.querySelectorAll("form[data-fake-submit]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector(".form-status");

      if (status) {
        status.textContent = "Dziękujemy! To przykładowy formularz projektu — dane nie są wysyłane.";
      }

      form.reset();
    });
  });

  document.querySelectorAll("[data-share]").forEach((button) => {
    button.addEventListener("click", async () => {
      const shareData = {
        title: "UE Battle Prototype",
        text: "Sprawdź prototyp walki arenowej stworzony w Unreal Engine 5.6.",
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          console.log("Udostępnianie anulowane.");
        }
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = "Link skopiowany";
      }
    });
  });

  const counter = document.querySelector("[data-counter]");

  if (counter) {
    const target = Number(counter.dataset.counter || "128");
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 70));

    const interval = setInterval(() => {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      counter.textContent = current.toString();
    }, 24);
  }
});