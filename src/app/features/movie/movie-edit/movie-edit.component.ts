import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Movie } from 'src/app/core/models/movie';
import { TheaterService } from 'src/app/core/theater.service';
import { MovieService } from './../../../core/movie.service';

import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Theater } from 'src/app/core/models/theater';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  movieForm: FormGroup;
  movie: Observable<Movie>;
  theaters: Observable<Theater[]>;
  isEditMode = false;
  movieId: number;

  constructor(
    private formBuilder: FormBuilder,
    private theaterService: TheaterService,
    private movieService: MovieService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.setTheater();
    this.route.params.subscribe((param) => {
      const id = +param.id;
      if (id) {
        this.movieId = id;
        this.isEditMode = true;
        this.setMovie(id);
      }
    });
  }

  /**
   * This method set initial data of movie during editing
   * @param id movie id to get movie
   */
  setMovie(id: number) {
    this.movie = this.movieService.getMovie(id).pipe(
      tap((movie) => {
        movie.languages.forEach((language) => {
          this.lang.push(
            this.formBuilder.group({
              name: [language, Validators.required],
            })
          );
        });

        this.movieForm.patchValue({
          ...movie,
          theaterId: movie.theater.theaterId,
        });
      })
    );
  }

  /**
   * This method load all theatre for movie to add
   */
  setTheater() {
    this.theaters = this.theaterService.getTheaters();
  }

  /**
   * This method set initial form properties
   */
  formInit() {
    this.movieForm = this.formBuilder.group({
      movieName: ['', Validators.required],
      movieGenre: ['', Validators.required],
      movieDirector: ['', Validators.required],
      movieLength: [
        '',
        [Validators.required, Validators.max(4), Validators.min(1)],
      ],
      theaterId: ['', Validators.required],
      languages: new FormArray([]),
      movieReleaseDate: ['', Validators.required],
    });
  }

  /**
   * This methd add form group to FormArray
   * It is used to add list of string
   */
  onLanguageAdd() {
    (this.lang as FormArray).push(
      this.formBuilder.group({
        name: ['', Validators.required],
      })
    );
  }

  /**
   * To delete item from FormArray
   * @param index FormArray item index
   */
  onLanguageRemove(index: number) {
    (this.lang as FormArray).removeAt(index);
  }
  // convenience getter for easy access to form fields
  get form() {
    return this.movieForm.controls;
  }
  get lang() {
    return this.movieForm.controls.languages as FormArray;
  }

  /**
   * This method is used to add and update movie
   */
  addTheater() {
    const movie = {
      ...this.movieForm.value,
      languages: this.lang.value.map((item: { name: string }) => {
        return item.name;
      }),
      theater: { theaterId: this.form.theaterId.value },
    };

    if (this.isEditMode) {
      this.movieService.updateMovie(this.movieId, movie).subscribe(
        (data) => {
          this.toastr.success('Updated successfully with Id: ' + data.movieId);
          this.router.navigate(['/movie']);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error: ' + error.error.message);
        }
      );
    } else {
      this.movieService.saveMovie(movie).subscribe(
        (data) => {
          this.toastr.success('Saved successfully with Id: ' + data.movieId);
          this.movieForm.reset();
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error: ' + error.error.message);
        }
      );
    }
  }

  close() {
    this.router.navigate(['/movie']);
  }
}
