const one_day = 86400000;

function getDays(pastDate, currentDate) {

    return Math.floor((currentDate.getTime() - pastDate.getTime()) / one_day);
}

export function evaluateRepository(openIssues, lastCommitDate) {
    
    const lastDate = new Date(lastCommitDate);
    const currentDate = new Date();
    const daysPast = getDays(lastDate, currentDate);

    return (openIssues * 10 ) + daysPast;

}

export function getLastCommit(repository, branch){
    let data;
    try {
       const response = HTTP.get( `https://api.github.com/repos/${repository}/branches/${branch}`, {headers: {"User-Agent": "abrahamjsb"}} ).data;
    
       data = { date: response.commit.commit.author.date, 
        author: response.commit.commit.author.name, 
        message: response.commit.commit.message,
        sha: response.commit.sha 
        };

    } catch(e) {
        data = e;
    }
    return data;
}