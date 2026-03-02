import { Component, OnInit, signal } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects/projects-service';
import { CustomTile } from '../../components/custom-tile/custom-tile';

@Component({
  selector: 'app-projectspage',
  imports: [CustomTile],
  templateUrl: './projectspage.html',
  styleUrl: './projectspage.css',
})
export class Projectspage  implements OnInit {
  projects = signal<Project[]>([]);
  projectService:ProjectsService;

  constructor(projectService: ProjectsService)
  {
    this.projectService = projectService;
  }
  
  ngOnInit(){
    this.projects.set(this.projectService.getProjects())
  }
}
