// BARI REAL ESTATE INDIA - INTERACTIVE CLIENT SIDE SCRIPTS

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Header Navigation
  const headerMid = document.querySelector(".mid-nav");
  if (headerMid) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        headerMid.classList.add("sticky");
      } else {
        headerMid.classList.remove("sticky");
      }
    });
  }

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.querySelector(".navbar-toggle");
  const closeNav = document.querySelector(".closeNav");
  const navDrawer = document.querySelector(".nav");

  if (mobileToggle && navDrawer) {
    mobileToggle.addEventListener("click", () => {
      navDrawer.classList.add("open");
    });
  }

  if (closeNav && navDrawer) {
    closeNav.addEventListener("click", () => {
      navDrawer.classList.remove("open");
    });
  }

  // 3. Search Bar Suggestions toggle (Homepage)
  const searchInput = document.getElementById("searchInput");
  const resultDiv = document.getElementById("resultDiv");

  if (searchInput && resultDiv) {
    searchInput.addEventListener("focus", () => {
      resultDiv.style.display = "block";
    });

    searchInput.addEventListener("input", (e) => {
      if (e.target.value.trim() !== "") {
        resultDiv.style.display = "block";
      } else {
        resultDiv.style.display = "none";
      }
    });

    // Close when clicking outside search area
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !resultDiv.contains(e.target)) {
        resultDiv.style.display = "none";
      }
    });
  }

  // 4. Global Settings Side Drawer (Units and Currencies)
  const showSettingsBtn = document.getElementById("showButton");
  const closeSettingsBtn = document.getElementById("closeFlag");
  const settingsDrawer = document.getElementById("siteMenuFlag");

  if (showSettingsBtn && settingsDrawer) {
    showSettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      settingsDrawer.classList.add("open");
    });
  }

  if (closeSettingsBtn && settingsDrawer) {
    closeSettingsBtn.addEventListener("click", () => {
      settingsDrawer.classList.remove("open");
    });
  }

  // Toggle button state in Settings Drawer
  const unitButtons = document.querySelectorAll(".btn-group button");
  unitButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      unitButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // 5. Track Record Tabs switching
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tableContainers = document.querySelectorAll(".track-table-container");

  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");

        // Set active button
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Set active table container
        tableContainers.forEach(container => {
          if (container.id === targetTab) {
            container.classList.add("active");
          } else {
            container.classList.remove("active");
          }
        });
      });
    });
  }

  // 6. Property Card Image Sliders (for multi-image properties)
  const sliderWrappers = document.querySelectorAll(".slider-wrapper");
  sliderWrappers.forEach(wrapper => {
    const sliderImagesInput = wrapper.querySelectorAll("input[type='hidden']");
    if (sliderImagesInput.length <= 1) return; // No need to slide

    const imgElement = wrapper.querySelector(".sliderImage");
    const prevBtn = wrapper.querySelector(".prevBtn");
    const nextBtn = wrapper.querySelector(".nextBtn");

    const images = Array.from(sliderImagesInput).map(input => input.value);
    let currentIndex = 0;

    if (prevBtn && nextBtn && imgElement) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        imgElement.src = images[currentIndex];
      });

      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
      });
    }
  });

  // 7. Properties filtering (Properties page)
  const filterRegion = document.getElementById("filterRegion");
  const filterType = document.getElementById("filterType");
  const filterSearch = document.getElementById("filterSearch");
  const propertyCards = document.querySelectorAll(".listings-grid .card-wrapper");

  function filterProperties() {
    if (!propertyCards.length) return;

    const selectedRegion = filterRegion ? filterRegion.value.toLowerCase() : "all";
    const selectedType = filterType ? filterType.value.toLowerCase() : "all";
    const searchVal = filterSearch ? filterSearch.value.toLowerCase().trim() : "";

    propertyCards.forEach(wrapper => {
      const card = wrapper.querySelector(".card");
      const region = card.getAttribute("data-region").toLowerCase();
      const type = card.getAttribute("data-type").toLowerCase();
      const title = card.querySelector("p").innerText.toLowerCase();
      const specs = card.querySelector(".inter-details h4").innerText.toLowerCase();

      let regionMatch = selectedRegion === "all" || region === selectedRegion;
      let typeMatch = selectedType === "all" || type.includes(selectedType);
      let searchMatch = searchVal === "" || title.includes(searchVal) || specs.includes(searchVal) || region.includes(searchVal);

      if (regionMatch && typeMatch && searchMatch) {
        wrapper.style.display = "block";
      } else {
        wrapper.style.display = "none";
      }
    });
  }

  if (filterRegion) filterRegion.addEventListener("change", filterProperties);
  if (filterType) filterType.addEventListener("change", filterProperties);
  if (filterSearch) filterSearch.addEventListener("input", filterProperties);

  // 8. Contact Form Handling
  const contactForm = document.getElementById("contactInquiryForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById("firstname").value.trim();
      const lastName = document.getElementById("lastname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const comments = document.getElementById("user_comment").value.trim();

      if (!firstName || !lastName || !email || !phone) {
        alert("Please fill in all required fields (First Name, Last Name, Email, Phone).");
        return;
      }

      // Simple Email Check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Successful simulated submission
      const successDiv = document.createElement("div");
      successDiv.style.backgroundColor = "#c5a880";
      successDiv.style.color = "#111111";
      successDiv.style.padding = "20px";
      successDiv.style.marginTop = "20px";
      successDiv.style.textAlign = "center";
      successDiv.style.fontWeight = "bold";
      successDiv.innerText = `Thank you, ${firstName}! Your inquiry has been submitted. A Bari Real Estate specialist will reach out to you shortly.`;
      
      contactForm.innerHTML = "";
      contactForm.appendChild(successDiv);
    });
  }

  // 9. Footer Newsletter Subscribe
  const subscribeBtn = document.getElementById("subscribe_btn");
  const subscribeEmail = document.getElementById("subscribe_email");
  const subscribeMsg = document.getElementById("subscribe_msg");

  if (subscribeBtn && subscribeEmail && subscribeMsg) {
    subscribeBtn.addEventListener("click", () => {
      const email = subscribeEmail.value.trim();
      if (!email) {
        subscribeMsg.innerText = "Please enter your email.";
        subscribeMsg.style.color = "#ff6b6b";
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        subscribeMsg.innerText = "Please enter a valid email.";
        subscribeMsg.style.color = "#ff6b6b";
        return;
      }

      subscribeMsg.innerText = "Successfully subscribed to newsletter!";
      subscribeMsg.style.color = "#c5a880";
      subscribeEmail.value = "";
    });
  }
});
