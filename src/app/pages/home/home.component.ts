import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from "../../services/movie-api-service.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



interface Video {
  id: number;
  results: {
    id: string;
    name: string;
    type: string;
    key: string;
  }[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private service: MovieApiServiceService, private sanitizer: DomSanitizer) {
  }

  bannerDatas: any;
  videoUrl: any = [];
  trendingMovieDatas: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];


  ngOnInit(): void {
    this.playVideo();
    this.bannerData();
    this.trendingMovieData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();
  }

  //play video
  playVideo() {
    this.service.getRandomTrendingMovie().subscribe((result) => {
      if (result) {

        this.service.getVideo(result.id).subscribe((video: any) => {

          const urls: any = video.results.map((value: any) => {
            const url = `https://www.youtube.com/embed/${value.key}`;
            console.log(url, "hello prayag");
            return this.sanitizer.bypassSecurityTrustResourceUrl(url)
          })
          this.videoUrl = urls
          console.log(this.videoUrl, "jlsadfjldlk");
          if (video.results[0].key == 'undefined' || video.results[0].key == null) {
            this.playVideo();
          }
        });
      }
    });
  }

  //bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result: any) => {
      this.bannerDatas = result.results;
    })
  }

  //trending movie
  trendingMovieData() {
    this.service.trendingMovieApiData().subscribe((result: any) => {
      this.trendingMovieDatas = result.results;
    })
  }

  // action
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }

  // adventure
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }

  // animation
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }

  // comedy
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // documentary
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }


  // science-fiction
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // thriller
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }

  // public method to sanitize video URL
  public sanitizeVideoUrl(url: string|unknown): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url as string);
  }


}
