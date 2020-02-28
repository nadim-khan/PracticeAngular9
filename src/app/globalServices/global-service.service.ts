import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  languages = ["English (en-us)","Hindi","French","Arabic"];
  constructor() { }
}
