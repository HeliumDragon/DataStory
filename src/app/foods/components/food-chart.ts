import { Component, Input } from "@angular/core";

@Component({
  selector: "ds-food",
  template: `
  <p>hello food</p>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `
  ]
})
export class FoodChartComponent {}
