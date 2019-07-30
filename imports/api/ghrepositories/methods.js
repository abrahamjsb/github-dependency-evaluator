import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { GhRepositories as Repositories }  from './ghrepositories';
import { HTTP } from 'meteor/http'
import { evaluateRepository, getLastCommit } from './helpers/helpers';

Meteor.methods({
    'ghrepositories.insert'(repositoryName) {
        check(repositoryName, String);
        let response;
        try {
            response = HTTP.get( `https://api.github.com/repos/${repositoryName}`, {headers: {"User-Agent": "abrahamjsb"}} );

            if(response.statusCode == 200) {
                const repositoryData = response.data;
                const lastCommit = getLastCommit(repositoryName, repositoryData.default_branch);
                const result = evaluateRepository(repositoryData.open_issues, lastCommit.date);
                const data = {
                    id: repositoryData.id,
                    repositoryName: repositoryData.name,
                    fullName: repositoryData.full_name,
                    author: repositoryData.owner.login,
                    issues: repositoryData.open_issues,
                    defaultBranch: repositoryData.default_branch,
                    lastCommit: lastCommit,
                    avatarUrl: repositoryData.owner.avatar_url,
                    license: repositoryData.license.name,
                    homepage: repositoryData.homepage,
                    created_at: new Date(),
                    result: result
                };
                
                return Repositories.upsert({fullName: repositoryName}, {$set:{...data}}, (error, result)=>{
                    if(error){
                        console.log(error);
                        throw error;
                    } else {
                        console.log(result);
                    }
                });
            } else {
                throw "An Error has ocurred during the request. The server returned the message: ${response.data.message}  Status code: ${response.statusCode}"
            }

        } catch(e) {
            console.log(e);
            return e
        }


    }
});