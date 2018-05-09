import { Repository } from './repository';

export class UserGithub {

    public avatar_url:String;
    public bio:String;
    public gists_url:String;
    public html_url:String;
    public id:Number;
    public login:String;
    public name:String;
    
    public follwers: UserGithub[];
    public totalFollwers:Number;

    public follwing: UserGithub[];
    public totalFollwing:Number;

    public repositories: Repository[];
    public totalRepositories:Number;

    getTotalFollwers() {
        this.totalFollwers = this.follwers.length;
    }

    getTotalFollwing() {
        this.totalFollwing = this.follwing.length;
    }

    getTotalRepositories() {
        this.totalRepositories = this.repositories.length;
    }

}