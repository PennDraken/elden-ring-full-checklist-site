// Make sure the helms data is loaded
if (window.helms) {
    const grid = document.getElementById("grid");

    // Function to format the helm name into a filename (e.g., replace spaces with dashes)
    function formatHelmNameToFilename(helmName) {
        return helmName.replace(/'/g, "_");
    }

    // Loop over the helms array to create grid items
    window.helms.forEach((section, sectionIndex) => {
        // Create a new section container (flexbox or grid)
        const sectionContainer = document.createElement("div");
        sectionContainer.classList.add("section-container");

        // Optional: Create a title for each section
        const sectionTitle = document.createElement("h3");
        sectionTitle.classList.add("section-title");
        sectionTitle.textContent = `Section ${sectionIndex + 1}`; // Customize this text as needed
        sectionContainer.appendChild(sectionTitle);

        // Create grid items for the current section
        section.forEach(helm => {
            const item = document.createElement("div");
            item.classList.add("grid-item");

            const label = document.createElement("div");
            label.classList.add("grid-label");
            label.textContent = helm;  // Set label to the helm name

            const img = document.createElement("img");
            img.classList.add("grid-image");

            // Format the helm name to match the image filename
            const imageFilename = formatHelmNameToFilename(helm) + '.png';
            img.src = `images/low_res/${imageFilename}`;  // Load the image from the 'images' folder
            img.alt = `Image for ${helm}`;

            item.appendChild(label);
            item.appendChild(img);
            sectionContainer.appendChild(item);
        });

        // Append the section container to the grid container
        grid.appendChild(sectionContainer);
    });
} else {
    console.error("Helms data not found.");
}
