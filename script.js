document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".burger-btn");
  const navUL = document.querySelector(".nav-list");
  const bars = document.querySelectorAll(".bar");

  hamburger.addEventListener("click", () => {
    navUL.classList.toggle("show");

    bars.forEach((Element) => {
      Element.classList.toggle("active");
    });
  });
  navUL.addEventListener("click", () => {
    navUL.classList.remove("show");

    bars.forEach((Element) => {
      Element.classList.remove("active");
    });
  });

  /* =========SCROLL========= */
  // Get the button
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  scrollToTopBtn.addEventListener("click", function () {
    // Smooth scrolling behavior
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });


  /* KRISTOFFER SECTION */
  const button = document.querySelector(".order-button");
  const toast = document.querySelector(".toast");
  const closeIcon = document.querySelector(".close");
  const progressBar = document.querySelector(".progress");

  button.addEventListener("click", () => {
    // Show the toast
    toast.classList.add("active"); // Simulate progress

    progressBar.style.width = "100%";
    setTimeout(() => {
      // After a delay, reset the progress bar and remove the toast
      progressBar.style.transition = "width 4s linear"; // Slowly transition to zero width
      progressBar.style.width = "0%"; // Hide the toast after the progress animation completes

      setTimeout(() => {
        toast.classList.remove("active"); // Reset progress bar transition property for future use
        progressBar.style.transition = "";
      }, 4000); // Match the transition duration in milliseconds
    }, 1000); // Change 3000 to the desired duration of progress bar animation in milliseconds
  });

  closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");
  });
});



//GALLERI JS//

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollBarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  //scroll bar with thumb drag
  scrollBarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollBarThumb.offsetLeft;

    //thumb position when moving the mouse
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollBarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      scrollBarThumb.style.left = `${boundedPosition}px`;
    };

    //remove event listener when dragging mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    //event listener for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp); //event listener to make the bar to not move when dragging mouse up
  });

  //slide images depending on the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
  //hiding button when we have no more img
  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  //scrollbar position depending of scrolling image position
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollBarThumb.offsetWidth);
    scrollBarThumb.style.left = `${thumbPosition}px`;
  };

  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition();
  });
};

window.addEventListener("load", initSlider);