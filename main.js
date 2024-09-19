document.addEventListener('DOMContentLoaded', function() {
    const sidePanel = document.querySelector('.side-panel');
    const toggleButton = document.getElementById('toggleSidePanel');

    const sections = {
        home: ["Popular", "Best", "Explore","New"],
        pre_production: ["Concept Development", "Budgeting", "Casting", "Location Scouting", "Scheduling", "Storyboarding", "Hiring Crew"],
        production: ["Shooting", "Direction", "Cinematography", "Sound Recording", "Production Design", "Makeup and Hair"],
        post_production: ["Editing", "Sound Design", "Visual Effects (VFX)", "Color Correction", "Music Scoring", "ADR", "Subtitles and Dubbing"],
        distribution: ["Marketing", "Film Festivals", "Premiere", "Release"],
        post_release: ["Audience Feedback", "Box Office Analysis", "Awards", "Home Media"],
    };

    const sectionButtons = {
        home: document.getElementById('home'),
        pre_production: document.getElementById('pre_production'),
        production: document.getElementById('production'),
        post_production: document.getElementById('post_production'),
        distribution: document.getElementById('distribution'),
        post_release: document.getElementById('post_release'),
    };

    // Function to clear existing buttons and add new ones
    function updateSidePanel(buttons_list) {
        const buttons = sidePanel.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('data-flag') != 'all') {
                button.remove();
            }
        });

        buttons_list.forEach(item => {
            const flag_button = document.createElement('button');
            flag_button.classList.add('sort-button');
            flag_button.setAttribute('data-flag', 'new');
            flag_button.innerText = item;
            sidePanel.appendChild(flag_button);
        });

        if (!sidePanel.classList.toggle('open')) {
            sidePanel.classList.toggle('open');
            toggleButton.textContent = sidePanel.classList.contains('open') ? '✖' : '☰';
        }
    }

    // Add event listeners to all section buttons
    Object.keys(sectionButtons).forEach(key => {
        sectionButtons[key].addEventListener('click', () => {
            updateSidePanel(sections[key]);
        });
    });

    // Toggle button for opening/closing the side panel
    toggleButton.addEventListener('click', function() {
        sidePanel.classList.toggle('open');
        toggleButton.textContent = sidePanel.classList.contains('open') ? '✖' : '☰';
    });
});


function login_openForm() {
    const sidePanel = document.querySelector('.side-panel');
    const toggleButton = document.getElementById('toggleSidePanel');
    document.getElementById("loginForm").style.display = 'block';
    sidePanel.classList.remove('open');
    toggleButton.textContent = '☰';
    // close other forms
    document.getElementById("createForm").style.display = 'none';
}

function login_closeForm() {
    document.getElementById("loginForm").style.display = 'none';
}

function create_openForm() {
    const sidePanel = document.querySelector('.side-panel');
    const toggleButton = document.getElementById('toggleSidePanel');
    document.getElementById("createForm").style.display = 'block';
    sidePanel.classList.remove('open');
    toggleButton.textContent = '☰';
    // close other forms
    document.getElementById("loginForm").style.display = 'none';
}

function create_closeForm() {
    document.getElementById("createForm").style.display = 'none';
}