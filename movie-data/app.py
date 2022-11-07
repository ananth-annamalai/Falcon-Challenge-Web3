import requests
from pymongo import MongoClient

API_KEY = '<TMDB API KEY>'
API_URL = 'https://api.themoviedb.org/3/'
POSTER_URL = 'https://image.tmdb.org/t/p/original'

genre_map = {}
movies_list = []


def load_genres():
    genres_response = requests.get(f'{API_URL}genre/movie/list?api_key={API_KEY}').json()
    for genre in genres_response['genres']:
        genre_map[genre['id']] = genre['name']


def load_movies():
    load_genres()
    for page in range(1, 51):
        movies_response = requests.get(f'{API_URL}movie/popular?api_key={API_KEY}&page=1{page}').json()
        for movie_response in (movies_response['results']):
            movie = {}
            movie['title_id'] = movie_response['id']
            movie['title'] = movie_response['title']
            genres = []
            for genre_id in movie_response['genre_ids']:
                genres.append(genre_map[genre_id])
            movie['genres'] = genres
            if movie_response['poster_path']:
                movie['poster'] = POSTER_URL + movie_response['poster_path']
            movie['release_dt'] = movie_response['release_date']
            movie['overview'] = movie_response['overview']
            movies_list.append(movie)

def save_to_mongo():
    db_name = get_database()
    collection_name = db_name["all_movies"]
    collection_name.insert_many(movies_list)

def get_database():
    client = MongoClient(
        "mongodb+srv://master:z4j2w2Eyy3LtF8NU@cluster0.1ti7g3o.mongodb.net/?retryWrites=true&w=majority")
    return client['falcon_challenge_web3']


if __name__ == '__main__':
    load_movies()
    save_to_mongo()
