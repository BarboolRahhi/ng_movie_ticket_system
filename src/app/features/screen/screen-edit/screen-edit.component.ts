import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Screen } from 'src/app/core/models/screen';
import { Theater } from 'src/app/core/models/theater';
import { ScreenService } from 'src/app/core/screen.service';
import { TheaterService } from 'src/app/core/theater.service';

@Component({
  selector: 'app-screen-edit',
  templateUrl: './screen-edit.component.html',
  styleUrls: ['./screen-edit.component.css'],
})
export class ScreenEditComponent implements OnInit {
  screenForm: FormGroup;
  screen: Observable<Screen>;
  theaters: Observable<Theater[]>;
  isEditMode = false;
  screenId: number;

  constructor(
    private formBuilder: FormBuilder,
    private theaterService: TheaterService,
    private screenService: ScreenService,
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
        this.screenId = id;
        this.isEditMode = true;
        this.setScreen(id);
      }
    });
  }

  setScreen(id: number) {
    this.screen = this.screenService.getScreen(id).pipe(
      tap((screen) => {
        this.screenForm.patchValue({
          ...screen,
          theaterId: screen.theater.theaterId,
        });
      })
    );
  }

  setTheater() {
    this.theaters = this.theaterService.getTheaters();
  }

  formInit() {
    this.screenForm = this.formBuilder.group({
      screenName: ['', Validators.required],
      rows: ['', [Validators.required, Validators.max(10), Validators.min(1)]],
      columns: [
        '',
        [Validators.required, Validators.max(10), Validators.min(1)],
      ],
      theaterId: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.screenForm.controls;
  }

  addTheater() {
    const screen = {
      ...this.screenForm.value,
      theater: { theaterId: this.form.theaterId.value },
    };

    if (this.isEditMode) {
      this.screenService.updateScreen(this.screenId, screen).subscribe(
        (data) => {
          this.toastr.success('Updated successfully with Id: ' + data.screenId);
          this.router.navigate(['/screen']);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error: ' + error.error.message);
        }
      );
    } else {
      this.screenService.saveScreen(screen).subscribe(
        (data) => {
          this.toastr.success('Saved successfully with Id: ' + data.screenId);
          this.screenForm.reset();
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error: ' + error.error.message);
        }
      );
    }
  }

  close() {
    this.router.navigate(['/screen']);
  }
}
