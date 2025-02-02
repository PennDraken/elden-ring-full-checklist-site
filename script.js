// script.js

// Make sure the helms data is loaded
if (window.helms) {
    const grid = document.getElementById("grid");

    // Function to format the helm name into a filename (e.g., replace spaces with dashes)
    function formatHelmNameToFilename(helmName) {
        return helmName.replace(/'/g, "_");
    }
    
    // Loop over the helms array to create grid items
    window.helms.forEach((helm, index) => {
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
        grid.appendChild(item);
    });
} else {
    console.error("Helms data not found.");
}
