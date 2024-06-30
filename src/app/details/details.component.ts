import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units availables: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <!-- <button class="primary" type="button">Apply now</button> -->
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name:</label>
          <input id="first-name" type="text" formControlName="firstName" autocomplete="given-name">

          <label for="last-name">Last Name:</label>
          <input id="last-name" type="text" formControlName="lastName" autocomplete="family-name">

          <label for="email">Email:</label>
          <input id="email" type="email" formControlName="email" autocomplete="off">
          <button type="submit" class="primary">Apply now</button>

  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl (''),
    lastName: new FormControl (''),
    email: new FormControl (''),
  });


  constructor() {
    const housingLocationID = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousinglocationByID(housingLocationID);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
