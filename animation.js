document.addEventListener("DOMContentLoaded", function () {
    /*Here i create the const that is the observer, which means that it will observe multiple elements at the same time, which also means we will create a forEach entry to loop over each of them. 
    
    Then you say that if ''entry'' is intersecting, aka visible on your screen, then add the classlist*/
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                /* I create an else so that it will continue to show the animation more than just once. */
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    /* Here is where you tell the observer what to observe, which is all the hidden elements */
    hiddenElements.forEach((el) => observer.observe(el));
    
    


    /* ===SECTION ANIMATION 1 */
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('show2');
            } else {
                entry.target.classList.remove('show2');
            }
        });
    });

    const hiddenElements2 = document.querySelectorAll(".hidden2");
    hiddenElements2.forEach((el) => observer2.observe(el));
  });