const key = 'a5997c47b8fc29e25488735ca99f0983';

const requests = {
    apiKey: key,
    
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en-US`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,

    requestTvTopRated: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`,
    requestTvAiring: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1`,
    requestTvTrending: `https://api.themoviedb.org/3/trending/tv/day?api_key=${key}&language=en-US`,

    requestTopAnime: `https://api.jikan.moe/v4/top/anime`,
    requestDemonSlayer: `https://api.jikan.moe/v4/anime?q=demon slayer&sfw`,
    requestJK: `https://api.jikan.moe/v4/anime?q=jujutsu kaisen&sfw`,
    requestAOT: `https://api.jikan.moe/v4/anime?q=attack on titan&sfw`,
    requestNaruto: `https://api.jikan.moe/v4/anime?q=naruto&sfw`
};

export default requests;