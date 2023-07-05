const key = '6349f50b351774f2efa2cf42756a4c0d'

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US`,
    requestTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en=US`, // Added '&' before 'language'
    requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror`, // Fixed 'api_key' value
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US`, // Added '&' before 'language'
  };
  
export default requests

