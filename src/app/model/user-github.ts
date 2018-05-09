import { Repository } from './repository';

export class UserGithub {

    public avatar_url:String;
    public bio:String;
    public gists_url:String;
    public html_url:String;
    public id:Number;
    public login:String;
    public name:String;
    
    public repositories: Repository[];
    public totalRepositories:Number;

    getTotalRepositories() {
        this.totalRepositories = this.repositories.length;
    }

}