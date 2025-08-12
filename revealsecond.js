window.onload = function () {
    const menu = document.querySelector('.flyout-menu');
    const columns = menu.querySelectorAll('.flyout-column');

    // Set the total number of elevated groups for the calculation
    menu.style.setProperty('--r-globalnav-flyout-elevated-group-count', 1); // Example: 1 elevated group

    // Loop through each column and set its unique number
    columns.forEach((column, index) => {
    column.style.setProperty('--r-globalnav-flyout-group-number', index + 1);
    });

    // A function to open and close the menu
    function toggleMenu() {
    menu.classList.toggle('is-open');
    }

    // Attach to a button or hover event to trigger the animation
    document.getElementById('toggle-menu-button').addEventListener('click', toggleMenu);
}

