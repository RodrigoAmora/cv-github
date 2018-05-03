import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BASE_API_GITHUB } from '../app.api'

import { Repository } from '../model/repository';

@Component({
  selector: 'app-make-cv-github',
  templateUrl: './make-cv-github.component.html',
  styleUrls: ['./make-cv-github.component.css']
})
export class MakeCvGithubComponent implements OnInit {

  onibusJson: String = "";

  repositories: Repository[] = [];

  constructor(private http:Http) {}

  ngOnInit() {}

  consultProfile() {
    var that = this;
    var stream = this.http.get(`${BASE_API_GITHUB}users/RodrigoAmora/repos`);
    stream.subscribe(function(res) {
       //console.log(JSON.stringify(res.json()));

       for (var i = 0; i < res.json().length; i++) {
         var repository = new Repository();
         repository.description = res.json()[i].description;
         repository.full_name = res.json()[i].full_name;
         repository.language = res.json()[i].language;
         repository.name = res.json()[i].name;
         repository.url = res.json()[i].url;

         that.repositories.push(repository);
       }

       console.log(that.repositories);
       that.onibusJson = JSON.stringify(res.json());
    });
  }

}
