const tabcontent = document.querySelectorAll(".tabcontent");
const grid = document.getElementById("gridHelmets");
const savedItems = JSON.parse(localStorage.getItem("myList")); /* Stores items that the user owns */

// Helper function to format item names to file-compatible names
function formatItemNameToFile(helmName) {
    return helmName.replace(/'/g, "_");
}

function clickedItem(event){
    // Check if item in savedItems
    if (event.currentTarget.classList.contains("selected")) {
        event.currentTarget.classList.remove("selected");
    } else {
        event.currentTarget.classList.add("selected");
    }
}

// Function to populate the grid with items
function fillGrid(grid, items) {
    // Clear existing content in the grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    items.forEach((section) => {
        // Create a new section container
        const sectionContainer = document.createElement("div");
        sectionContainer.classList.add("section-container");

        // Use the first element in the section as the title
        const sectionTitle = document.createElement("h3");
        sectionTitle.classList.add("section-title");
        sectionTitle.textContent = section[0]; // First item in section as the title
        sectionContainer.appendChild(sectionTitle);

        // Create grid items for the current section
        section.slice(1).forEach((itemName) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("grid-item");
            itemContainer.addEventListener("click", clickedItem);

            const label = document.createElement("div");
            label.classList.add("grid-label");
            label.textContent = itemName; // Set label to the item name

            const img = document.createElement("img");
            img.classList.add("grid-image");

            // Format the item name to match the image filename
            const imageFilename = formatItemNameToFile(itemName) + ".png";
            img.src = `images/low_res/${imageFilename}`; // Load the image from the 'images' folder
            img.alt = `Image for ${itemName}`;

            // Append label and image to the item container
            itemContainer.appendChild(label);
            itemContainer.appendChild(img);
            sectionContainer.appendChild(itemContainer);
        });

        // Append the section container to the grid container
        grid.appendChild(sectionContainer);
    });
}

// Function to open a specific category
function openCategory(evt, categoryName) {
    // Hide all tab contents
    tabcontent.forEach((content) => {
        content.style.display = "none"; // Hide all tab contents
    });

    // Remove "active" class from all tab links
    const tablinks = document.querySelectorAll(".tablinks");
    tablinks.forEach((link) => {
        link.className = link.className.replace(" active", "");
    });

    // Show the selected tab content
    // document.getElementById(categoryName).style.display = "block";
    // evt.currentTarget.className += " active";

    // Populate the grid for the selected category
    if (categoryName === "Helmets") {
        fillGrid(grid, window.helms);
    } else if (categoryName === "Chest") {
        fillGrid(grid, window.chest);
    } else if (categoryName === "Arms") {
        fillGrid(grid, window.arms);
    } else if (categoryName === "Legs") {
        fillGrid(grid, window.legs);
    } else {
        fillGrid(grid, [["Sorry, no items defined in this category yet. Coming soon!"]]); // Replace `window.helms` with your actual data
    }
}

openCategory(null, "Helmets");