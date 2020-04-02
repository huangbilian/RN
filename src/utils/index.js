import queryString from 'query-string';

let rootUrl = 'https://www.fastmock.site/mock/98127e7810920db6fbb9adf74ae13b8e/api';

let myFetch ={
    get(url,queryParams){
        url = rootUrl+url;
        if(queryParams){
            url += '?'+queryString.stringify(queryParams)
        }
        return fetch(url)
            .then(res=>res.json())
    },
    post(url,body){
        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
              "Accppt":'application/json',
              'Content-type':'application/json'
            },
            body:JSON.stringify(body)
          })
            .then(res=>res.json())
            
    }
}

export {myFetch};
