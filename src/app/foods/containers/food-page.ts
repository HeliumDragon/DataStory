import { Component, OnInit } from "@angular/core";
import { variables } from "../../../data/usda";
import { data } from "../../../data/usdadata";
import {} from "lodash";

@Component({
  selector: "ds-food-page",
  template: `
    <h1> food page </h1>
    <ds-food></ds-food>
  `
})
export class FoodPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let variableMap = {};
    variables.forEach((value, index) => {
      variableMap[value] = index;
    });
    const niceFoods = data.filter(food => {
      return (
        +food[variableMap["Carbohydrate"]] < 5 &&
        +food[variableMap["Protein"]] > 25 &&
        food[variableMap["Description"]].includes("CHEESE")
      );
    });
    console.log(
      variableMap,
      niceFoods.length,
      niceFoods.map(food => food[variableMap["Description"]]).join("\n")
    );
  }
}
