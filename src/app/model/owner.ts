import { Repository } from './repository';

export class Owner {

    public avatar_url:String;
    public gists_url:String;
    public html_url:String;
    public id:Number;
    public login:String;
    
    public repositories: Repository[];
    public totalRepositories:Number;

    getTotalRepositories() {
        this.totalRepositories = this.repositories.length;
    }

}