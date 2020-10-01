import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TheaterService } from 'src/app/core/theater.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Theater } from 'src/app/core/models/theater';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css'],
})
export class EditTheaterComponent implements OnInit {
  theaterForm: FormGroup;
  theater: Observable<Theater>;
  isEditMode = false;
  theaterId: number;

  constructor(
    private fb: FormBuilder,
    private theaterService: TheaterService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.route.params.subscribe((param) => {
      const id = +param.id;
      if (id) {
        this.theaterId = id;
        this.isEditMode = true;
        this.theater = this.theaterService
          .getTheater(id)
          .pipe(tap((theater) => this.theaterForm.patchValue(theater)));
      }
    });
  }

  formInit() {
    this.theaterForm = this.fb.group({
      theaterName: ['', Validators.required],
      theaterCity: ['', Validators.required],
      managerName: ['', Validators.required],
      managerContact: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]+'),
        ],
      ],
    });
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.theaterForm.controls;
  }

  addTheater() {
    if (this.isEditMode) {
      this.theaterService
        .updateTheater(this.theaterId, this.theaterForm.value)
        .subscribe(
          (data) => {
            this.toastr.success(
              'Updated successfully with Id: ' + data.theaterId
            );
            this.router.navigate(['/theater']);
          },
          (error) => {
            console.log(error);
            this.toastr.error('Error: ' + error.error.message);
          }
        );
    } else {
      this.theaterService.saveTheater(this.theaterForm.value).subscribe(
        (data) => {
          this.toastr.success('Saved successfully with Id: ' + data.theaterId);
          this.theaterForm.reset();
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error: ' + error.error.message);
        }
      );
    }
  }

  close() {
    this.router.navigate(['/theater']);
  }
}
