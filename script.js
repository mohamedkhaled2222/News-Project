const API_KEY = '1f674ea2dd7d9f2dd499f2a76c0441fb'; // Your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

document.addEventListener('DOMContentLoaded', () => {
    const movieContainer = document.getElementById('movieContainer');
    const logoutLink = document.getElementById('logoutLink');

    async function fetchTrendingMovies() {
        const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.results) {
                displayMovies(data.results);
            } else {
                movieContainer.innerHTML = '<p>No trending movies found.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            movieContainer.innerHTML = `<p>Error fetching trending movies. Details: ${error.message}</p>`;
        }
    }

    function displayMovies(movies) {
        movieContainer.innerHTML = '';

        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-item');

            const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';

            movieElement.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.release_date ? new Date(movie.release_date).getFullYear() : 'No release date'}</p>
            `;

            movieContainer.appendChild(movieElement);
        });
    }

    // Fetch trending movies when the page loads
    fetchTrendingMovies();

    // Simulate logout action
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Logged out successfully!');
            // Redirect or perform logout logic here
        });
    }
});
