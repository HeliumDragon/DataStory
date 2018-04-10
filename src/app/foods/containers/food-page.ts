import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "ds-food-page",
  template: `
   <h1> food page </h1>
    <ds-food></ds-food>
  `
})
export class FoodPageComponent {
  constructor() {}
}
