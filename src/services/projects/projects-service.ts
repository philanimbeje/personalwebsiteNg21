import { Injectable } from '@angular/core';
import { Project } from '../../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor() { }
  
  getProjects(): Project[] {
    return [
      {
        "id":1,
        "project": "Simple Portfolio Website",
        "type": "software",
        "tools": [ "Angular v21", " Typescript", " p5.js", " Tailwind", " Font-Awesome", " tilt.js"],
        "deployment": {
          "accessUrl": "http://www.philanimbeje.co.za",
          "hostPlatform": "Github Pges"
        },
        "projectUrl": "https://github.com/philanimbeje/personalwebsiteNg21",
        "description": "A simple portfolio project",
        "imageUrl": "https://wallpaperaccess.com/full/2272665.jpg",
        "symbol": "fa-user"
      },
      {
        "id":2,
        "project": "TVMaze API Client",
        "type": "software",
        "tools": [ "Typescript", " Angular v14", " Angular Material", " TVMaze API" ],
        "deployment": {
          "accessUrl": "https://red-sea-0f1f48f10.3.azurestaticapps.net",
          "hostPlatform": "Microsoft Azure"
        },
        "projectUrl": "https://github.com/philanimbeje/tvshowapp",
        "description": "App using the TVMaze API",
        "imageUrl": "https://wallpaperaccess.com/full/2272665.jpg",
        "symbol": "fa-tv"
      },
      {
        "id":3,
        "project": "CSS Breath Timing App",
        "type": "software",
        "tools": [ "CSS", " JavaScript", " HTML" ],
        "deployment": {
          "accessUrl": "https://philanimbeje.github.io/relaxer/",
          "hostPlatform": "Github"
        },
        "projectUrl": "https://github.com/philanimbeje/relaxer",
        "description": "Simple HTML, CSS & JavaScript App",
        "imageUrl": "https://wallpaperaccess.com/full/2272665.jpg",
        "symbol": "fa-lungs"
      }
    ];
  }
}
