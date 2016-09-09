import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class SearchService {
  constructor (private http:Http) { }

  loadSearchableData(uri?:string, text?:string, limit?:number, offset?:number) {
    let params: URLSearchParams = new URLSearchParams();

    if (typeof text === "string" && text.length) {
      params.set("search", text);
      localStorage.setItem("searching", "true");
    } else {
      localStorage.setItem("searching", "false");
    }
    if (typeof limit === "number" && limit > 0) {
      params.set("show", typeof limit === "number" && limit.toString());
    }
    if (typeof offset === "number" && offset > 0) {
      params.set("offset", (offset.toString()));
    }

    return this.http.get(uri, {
      search: params
    }).map(res => res.json());
  }
}