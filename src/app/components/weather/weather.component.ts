import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
weatherForm : FormGroup
weatherData:{}
  constructor(private formBuilder: FormBuilder, private weatherService:WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      city: ['', [Validators.required]]})
  }
  weather(){
  this.weatherService.selectedCity(this.weatherForm.value).subscribe(
    (data)=>{ console.log("data",data.weather);
    this.weatherData=data.weather
    console.log("here is ", this.weatherData);
    
    }

  )
}
}
