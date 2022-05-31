"use strict";

function burgerMenu() {
    const menuBtn = document.getElementById("burger-menu");
    const closeMenuBtn = document.getElementById('close-burger-menu');
    const navbar = document.querySelector("nav");
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    const loginBtn = document.querySelector('nav button.cb-button');

    menuBtn.addEventListener('click', openMenu);

    closeMenuBtn.addEventListener('click', closeMenu)

    function openMenu() {
        closeMenuBtn.classList.remove("hidden");
        menuBtn.classList.add("hidden");

        createDropdown();
    }

    function closeMenu() {
        closeMenuBtn.classList.add("hidden");
        menuBtn.classList.remove("hidden");

        removeDropdown();
    }

    function createDropdown() {
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown')
        const createMenu = document.createElement('ul');

        sidebarLinks.forEach((link) => {
            const menuItemLink = document.createElement('a');
            menuItemLink.setAttribute('href', `${link.textContent}.html`)
            menuItemLink.innerText = link.textContent;

            const menuItem = document.createElement('li');
            menuItem.append(menuItemLink);
            createMenu.append(menuItem);
            dropdown.append(createMenu);
        })
        dropdown.append(loginBtn);

        navbar.append(dropdown)
    }

    function removeDropdown() {
        const dropdown = document.querySelector('.dropdown')
        navbar.removeChild(dropdown)
    }

}
burgerMenu();