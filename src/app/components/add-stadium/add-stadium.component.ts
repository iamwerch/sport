import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {
  stadiumForm: FormGroup;
  stadiums: any[] = [];
  nextStadiumId: number = 1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.stadiumForm = this.formBuilder.group({
      id: [this.generateUniqueId()],
      stadiumName: [''],
      capacity: [''],
      city: [''],
    });
  }

  generateUniqueId(): number {
    return this.nextStadiumId++;
  }

  addStadium() {
    const newStadium = this.stadiumForm.value;

    const storedStadiums = JSON.parse(localStorage.getItem('stadiums')) || [];
    storedStadiums.push(newStadium);

    localStorage.setItem('stadiums', JSON.stringify(storedStadiums));

    this.stadiumForm.reset();
    this.initializeForm();
  }
}
