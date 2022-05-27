const fetchImages = (query, page = 1) => {
  const API_KEY = '27133035-a58a151a38e3c6ba8d82de304';

  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`We're sorry, nothing is found for "${query}".`)
    );
  });
};

const api = { fetchImages };

export default api;
