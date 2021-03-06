import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

//pdfMake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

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

  name:String;
  newClient = new EventEmitter();

  constructor(private http:Http) {}

  ngOnInit() {}

  buildCV() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var textPDF = this.name+"\n";
    var totalFollwers = this.owner.totalFollwers;
    var totalFollwing = this.owner.totalFollwing;
    textPDF += "Total following: "+totalFollwing+"\n";
    textPDF += "Total follwers: "+totalFollwers+"\n";
    for(var i = 0; i < this.owner.repositories.length; i++) {
      textPDF += "Name: "+this.owner.repositories[i].name+"\n";
      textPDF += "Language: "+this.owner.repositories[i].language+"\n";
      textPDF += "URL: "+this.owner.repositories[i].url+"\n";
      textPDF += "Description: "+this.owner.repositories[i].description+"\n";
    }

    var pdf = { content: textPDF };
    pdfMake.createPdf(pdf).download();
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

    this.consultRepositories(that);
    this.getFollwers(that);
    this.getFollwing(that);
    this.newClient.emit(this.owner);
  }

  consultRepositories(that) {
    this.http.get(`${BASE_API_GITHUB}users/`+this.name+`/repos`).subscribe((res) => {
      that.owner.repositories = [];
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

        that.owner.repositories.push(repository);
      }

      that.owner.getTotalRepositories();
    });
  }

  cleanVariables() {
    this.errorGithub = null;
    this.owner = null;
  }

  getFollwers(that) {
    this.http.get(`${BASE_API_GITHUB}users/`+this.name+`/followers`).subscribe((res) => {
      that.owner.followers = [];
      for (var i = 0; i < res.json().length; i++) {
        var follwer = new UserGithub;
        follwer.avatar_url = res.json()[i]['avatar_url'];
        //that.owner.gists_url = res.json()[0]['owner']['gists_url'];
        follwer.gists_url = "https://gist.github.com/"+that.name;
        follwer.html_url = res.json()[i]['html_url'];
        follwer.id = res.json()[i]['id'];
        follwer.login = res.json()[i]['login'];

        that.owner.followers.push(follwer);
      }

      that.owner.totalFollwers = that.owner.followers.length;
    });
  }

  getFollwing(that) {
    this.http.get(`${BASE_API_GITHUB}users/`+this.name+`/following`).subscribe((res) => {
      that.owner.following = [];
      for (var i = 0; i < res.json().length; i++) {
        var follwer = new UserGithub;
        follwer.avatar_url = res.json()[i]['avatar_url'];
        //that.owner.gists_url = res.json()[0]['owner']['gists_url'];
        follwer.gists_url = "https://gist.github.com/"+that.name;
        follwer.html_url = res.json()[i]['html_url'];
        follwer.id = res.json()[i]['id'];
        follwer.login = res.json()[i]['login'];

        that.owner.following.push(follwer);
      }

      that.owner.totalFollwing = that.owner.following.length;
    });
  }

}
