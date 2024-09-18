document.addEventListener('DOMContentLoaded', function() {
    const sidePanel = document.querySelector('.side-panel');
    const home = document.getElementById('home');
    const pre_production = document.getElementById('pre_production');
    const production = document.getElementById('production');
    const post_production = document.getElementById('post_production');
    const distribution = document.getElementById('distribution');
    const post_release = document.getElementById('post_release');

    home.addEventListener('click', function() {
        const buttons = sidePanel.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('data-flag') != 'all') {
                button.remove();
            }
        });
        // Create a new sort flag button
        const buttons_list = ["Popular","Best","Explore"];
        let number_buttons = buttons_list.length
        for (let i = 0; i < number_buttons; i++) {
            const flag_button = document.createElement('button');
            flag_button.classList.add('sort-button');
            flag_button.setAttribute('data-flag', 'new');
            flag_button.innerText = buttons_list[i];
            // Append the new button to the side panel
            sidePanel.appendChild(flag_button);
        }
    });

    pre_production.addEventListener('click', function() {
        const buttons = sidePanel.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('data-flag') != 'all') {
                button.remove();
            }
        });
        // Create a new sort flag button
        const buttons_list = ["Concept Development","Budgeting","Casting","Location Scouting","Scheduling","Storyboarding","Hiring Crew"];
        let number_buttons = buttons_list.length
        for (let i = 0; i < number_buttons; i++) {
            const flag_button = document.createElement('button');
            flag_button.classList.add('sort-button');
            flag_button.setAttribute('data-flag', 'new');
            flag_button.innerText = buttons_list[i];
            // Append the new button to the side panel
            sidePanel.appendChild(flag_button);
        }
    });

    production.addEventListener('click', function() {
        const buttons = sidePanel.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('data-flag') != 'all') {
                button.remove();
            }
        });
        // Create a new sort flag button
        const buttons_list = ["Shooting","Direction","Cinematography","Sound Recording","Production Design","Makeup and Hair"];
        let number_buttons = buttons_list.length
        for (let i = 0; i < number_buttons; i++) {
            const flag_button = document.createElement('button');
            flag_button.classList.add('sort-button');
            flag_button.setAttribute('data-flag', 'new');
            flag_button.innerText = buttons_list[i];
            // Append the new button to the side panel
            sidePanel.appendChild(flag_button);
        }
    });

    post_production.addEventListener('click', function() {
        const buttons = sidePanel.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('data-flag') != 'all') {
                button.remove();
            }
        });
        // Create a new sort flag button
        const buttons_list = ["Editing","Sound Design","Visual Effects (VFX)","Color Correction","Music Scoring","ADR (Automated Dialogue Replacement)","Subtitles and Dubbing"];
        let number_buttons = buttons_list.length
        for (let i = 0; i < number_buttons; i++) {
            const flag_button = document.createElement('button');
            flag_button.classList.add('sort-button');
            flag_button.setAttribute('data-flag', 'new');
            flag_button.innerText = buttons_list[i];
            // Append the new button to the side panel
            sidePanel.appendChild(flag_button);
        }
    });

    distribution.addEventListener('click', function() {
        const buttons = sidePanel.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('data-flag') != 'all') {
                button.remove();
            }
        });
        // Create a new sort flag button
        const buttons_list = ["Marketing","Film Festivals","Premiere","Release"];
        let number_buttons = buttons_list.length
        for (let i = 0; i < number_buttons; i++) {
            const flag_button = document.createElement('button');
            flag_button.classList.add('sort-button');
            flag_button.setAttribute('data-flag', 'new');
            flag_button.innerText = buttons_list[i];
            // Append the new button to the side panel
            sidePanel.appendChild(flag_button);
        }
    });

    post_release.addEventListener('click', function() {
        const buttons = sidePanel.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('data-flag') != 'all') {
                button.remove();
            }
        });
        // Create a new sort flag button
        const buttons_list = ["Audience Feedback","Box Office and Performance Analysis","Awards and Recognition","Home Media and Merchandising"];
        let number_buttons = buttons_list.length
        for (let i = 0; i < number_buttons; i++) {
            const flag_button = document.createElement('button');
            flag_button.classList.add('sort-button');
            flag_button.setAttribute('data-flag', 'new');
            flag_button.innerText = buttons_list[i];
            // Append the new button to the side panel
            sidePanel.appendChild(flag_button);
        }
    });

    const toggleButton = document.getElementById('toggleSidePanel');
    toggleButton.addEventListener('click', function() {
        sidePanel.classList.toggle('open');
        toggleButton.textContent = sidePanel.classList.contains('open') ? '✖' : '☰';
    });
});