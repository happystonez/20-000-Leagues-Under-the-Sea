// Initialize map
const map = L.map('map').setView([20, 0], 2);

// Add tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for each ocean region
oceanRegions.forEach(region => {
    const marker = L.marker(region.coords).addTo(map);
    marker.bindPopup(`
        <b>${region.name}</b><br>
        <img src="oceanRegions/${region.image}" alt="${region.name}" style="width:100%;height:auto;"><br>
        ${region.description}<br><br>
        <i>${region.intro}</i>
    `);
});

// Add markers for each chapter
chapters.forEach(chapter => {
    const marker = L.marker(chapter.coords).addTo(map);
    marker.bindPopup(`<b>${chapter.number}. ${chapter.title}</b><br>${chapter.plot}`);
    
    // Add chapter to list in the sidebar
    const li = document.createElement('li');
    li.innerHTML = `<h3>${chapter.number}. ${chapter.title}</h3>`;
    li.onclick = () => toggleChapterDetail(li);
    const detail = document.createElement('div');
    detail.className = 'chapter-detail';
    detail.innerHTML = `
        <p><strong>Time:</strong> ${chapter.time}</p>
        <p>${chapter.plot}</p>
    `;
    li.appendChild(detail);
    document.getElementById('chapterList').appendChild(li);
});

// Toggle chapter details in the sidebar
function toggleChapterDetail(li) {
    const detail = li.querySelector('.chapter-detail');
    detail.classList.toggle('show');
}
