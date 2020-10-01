import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faEye,
  faEdit,
  faTrash,
  faArrowDown,
  faArrowUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from './../../../core/movie.service';

const columnList = [
  {
    name: 'Movie Name',
    key: 'movieName',
  },
  {
    name: 'Genre',
    key: 'movieGenre',
  },
  {
    name: 'Director',
    key: 'movieDirector',
  },
  {
    name: 'Length',
    key: 'movieLength',
  },
  {
    name: 'Languages',
    key: 'languages',
  },
  {
    name: 'Release Date',
    key: 'movieReleaseDate',
  },
];

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faPlus = faPlus;

  movies: Movie[] = [];

  columnList = columnList;
  sortedColumn: string;
  sortedOrder = 'asc';
  isOrderAscOrDesc = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchTheaters();
  }

  fetchTheaters() {
    this.movieService.getMovies().subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => console.log(error)
    );
  }

  onSortedClick(column: string) {
    console.log(column);
    this.sortedColumn = column;
    this.isOrderAscOrDesc = !this.isOrderAscOrDesc;
    if (this.isOrderAscOrDesc) {
      this.sortedOrder = 'desc';
    } else {
      this.sortedOrder = 'asc';
    }
  }

  onEdit(theaterId: number) {
    this.router.navigate([theaterId, 'edit'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete theater?')) {
      this.movieService.deleteMovie(id).subscribe(
        (data) => {
          this.toastr.success(data.message);
          this.fetchTheaters();
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }
}
