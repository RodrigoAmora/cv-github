import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

//API's
import { BASE_API_GITHUB } from '../app.api'

//MODELS
import { Owner } from '../model/owner';
import { Repository } from '../model/repository';

@Component({
  selector: 'app-make-cv-github',
  templateUrl: './make-cv-github.component.html',
  styleUrls: ['./make-cv-github.component.css']
})
export class MakeCvGithubComponent implements OnInit {

  owner:Owner;
  repositories: Repository[];
  
  name:String;
  newClient = new EventEmitter();

  constructor(private http:Http) {
    
  }

  ngOnInit() {}

  consultProfile() {
    this.owner = new Owner;
    this.repositories = [];

    var that = this;
    var stream = this.http.get(`${BASE_API_GITHUB}users/`+this.name+`/repos`);
    stream.subscribe(function(res) {
       for (var i = 0; i < res.json().length; i++) {
         var repository = new Repository();
         if (res.json()[i].description == null || res.json()[i].description == "") {
          repository.description = "No description.";
         } else {
          repository.description = res.json()[i].description;
         }
         repository.full_name = res.json()[i].full_name;
         repository.language = res.json()[i].language;
         repository.name = res.json()[i].name;
         repository.url = res.json()[i].html_url;

         that.repositories.push(repository);
       }

       that.owner.avatar_url = res.json()[0]['owner']['avatar_url'];
       //that.owner.gists_url = res.json()[0]['owner']['gists_url'];
       that.owner.gists_url = "https://gist.github.com/"+that.name;
       that.owner.html_url = res.json()[0]['owner']['html_url'];
       that.owner.id = res.json()[0]['owner']['id'];
       that.owner.login = res.json()[0]['owner']['login'];
       that.owner.repositories = that.repositories;
       that.owner.getTotalRepositories();
    });
    this.newClient.emit(this.owner);
  }

  buildCV() {
    
  }

}
