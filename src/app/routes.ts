import { Routes } from "@angular/router";
// import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from "./core/containers/not-found-page";

export const routes: Routes = [
  { path: "", redirectTo: "/movies", pathMatch: "full" },
  {
    path: "movies",
    loadChildren: "./movies/movies.module#MoviesModule"
    // canActivate: [AuthGuard],
  },
  {
    path: "foods",
    loadChildren: "./foods/foods.module#FoodsModule"
    // canActivate: [AuthGuard],
  },
  { path: "**", component: NotFoundPageComponent }
];
