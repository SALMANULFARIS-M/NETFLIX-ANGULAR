import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';


interface Movie {
  id: number;
  title: string;
  overview: string;
  video: string;
}

interface ProcessedMovie {
  id: number;
  title: string;
  overview: string;
  videoUrl: string;
}

interface Video {
  key: string;
}

@Injectable({
  providedIn: 'root'
})

export class MovieApiServiceService {

  constructor(private http: HttpClient) { }
  baseurl = "https://api.themoviedb.org/3"
  apikey = "28b14884f6a3601fe29b63f951ef37cc"

  //bannerapidata
  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);

  }

  getRandomTrendingMovie(): Observable<ProcessedMovie> {
    return this.http.get<Movie[]>(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`)
      .pipe(
        map((response: any) => {
          const movies = response.results; // assuming the movies are in a 'results' property of the object
          const randomIndex = Math.floor(Math.random() * movies.length);
          const randomMovie = movies[randomIndex];

          return {
            id: randomMovie.id,
            title: randomMovie.title,
            overview: randomMovie.overview,
            videoUrl: `https://www.youtube.com/watch?v=${randomMovie.video}`
          };
        })
      );
  }
  getVideo(videoId: number): Observable<Video> {
    return this.http.get<Video>(`${this.baseurl}/movie/${videoId}/videos?api_key=${this.apikey}&append_to_response=videos`);
  }

  //trendingmovieapidata
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);
  }

  // searchmovive
  getSearchMovie(data: any): Observable<any> {
    console.log(data, 'movie#');
    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

  // getmoviedatails
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`)
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`)
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`)
  }
  // action
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=28`);
  }

  // adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=12`);
  }

  // animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=16`);
  }

  // comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=35`);
  }

  // documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=99`);
  }

  // science-fiction:878
  fetchScienceFictionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=878`);
  }

  // thriller:53
  fetchThrillerMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=53`);
  }

}
