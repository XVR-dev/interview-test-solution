import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  lastCalculatedPoop = 123.4567;
  poopPerHour = 0;
  completedBoinkers = 0;
  updatePoopInterval?: Subscription;

  constructor(
  ) { }

  ngOnInit(): void {
    this.completedBoinkers = 13;
    this.updatePoopValue();
    this.updatePoopInterval = interval(50).subscribe(this.updatePoopValue.bind(this));
  }

  updatePoopValue() {
    this.lastCalculatedPoop += 0.05;
    this.poopPerHour = 3.324
  }

}
