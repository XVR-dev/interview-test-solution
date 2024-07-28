import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  signal,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { map, scan, switchMap, timer } from "rxjs";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, DecimalPipe],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly millisecondsInHour = 1000 * 60 * 60;
  protected readonly numberPipeFormat = "1.4-4";

  private readonly injector = inject(Injector);

  private readonly updatePoopIntervalMs = signal(50);
  private readonly initialPoopCount = signal(32450000.4567);
  protected readonly poopPerHour = signal(12.2518);
  protected readonly completedBoinkers = signal(13);

  private readonly poopPerMs = computed(
    () => this.poopPerHour() / this.millisecondsInHour,
  );
  private readonly poopPerInterval = computed(
    () => this.poopPerMs() * this.updatePoopIntervalMs(),
  );

  private readonly currentPoopCount$ = toObservable(this.initialPoopCount).pipe(
    switchMap((initialPoopCount) =>
      toObservable(this.updatePoopIntervalMs, {
        injector: this.injector,
      }).pipe(
        switchMap((intervalMs) => timer(0, intervalMs)),
        scan((acc) => acc + this.poopPerInterval(), initialPoopCount),
        map((currentValue) => currentValue.toFixed(4)),
      ),
    ),
  );

  protected readonly currentPoopCount = toSignal(this.currentPoopCount$);

  protected readonly isBigNumber = computed(
    () => Number(this.currentPoopCount()) >= 1_000_000,
  );
}
