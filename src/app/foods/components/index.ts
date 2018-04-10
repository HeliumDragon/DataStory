import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { DSChartDirective } from "../../shared/directives/ds-chart.directive";
import { FoodChartComponent } from "./food-chart";

import { PipesModule } from "../../shared/pipes";
import { MaterialModule } from "../../material";

export const COMPONENTS = [DSChartDirective, FoodChartComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
