import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getList(meal: string) {
    return this.httpClient.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
  }

  createMeal(data: any) {
    const body = {
      strMeal: data.strMeal
    }
  }
}
