import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

//API's
import { BASE_API_GITHUB } from '../app.api'

//MODELS
import { ErrorGithub } from '../model/error-github';
import { UserGithub } from '../model/user-github';
import { Repository } from '../model/repository';

@Component({
  selector: 'app-make-cv-github',
  templateUrl: './make-cv-github.component.html',
  styleUrls: ['./make-cv-github.component.css']
})
export class MakeCvGithubComponent implements OnInit {

  errorGithub:ErrorGithub;
  owner:UserGithub;
  repositories: Repository[];
  
  name:String;
  newClient = new EventEmitter();

  constructor(private http:Http) {}

  ngOnInit() {}

  buildCV() {
    
  }
  
  consultProfile() {
    this.cleanVariables();
    
    var that = this;
    this.http.get(`${BASE_API_GITHUB}users/`+this.name).subscribe((res) => {
      that.owner = new UserGithub;
      that.owner.avatar_url = res.json()['avatar_url'];
      that.owner.bio = res.json()['bio'];
      //that.owner.gists_url = res.json()[0]['owner']['gists_url'];
      that.owner.gists_url = "https://gist.github.com/"+that.name;
      that.owner.html_url = res.json()['html_url'];
      that.owner.id = res.json()['id'];
      that.owner.login = res.json()['login'];
      that.owner.name = res.json()['name'];
    }, error => {
      that.errorGithub = new ErrorGithub;
      that.errorGithub.message = error.json().message;
    });

    if (this.owner != null) {
      this.consultRepositories(that);
    }

    this.newClient.emit(this.owner);
  }

  consultRepositories(that) {
    this.http.get(`${BASE_API_GITHUB}users/`+this.name+`/repos`).subscribe((res) => {
      that.repositories = [];
      for (var i = 0; i < res.json().length; i++) {
        var repository = new Repository;

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

      that.owner.repositories = that.repositories;
      that.owner.getTotalRepositories();
    });
  }

  cleanVariables() {
    this.errorGithub = null;
    this.owner = null;
    this.repositories = null;
  }

}
