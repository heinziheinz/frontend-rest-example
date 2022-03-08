function APIRequest(who) {
    if (who === 'google') {
        return fetch('https://google.com').then(res => res.json());
    } else {
        return 'no argument provided';
    }
}

function MyFetch(who) {
    const request = new Request('https://google.com', {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
            "email": 'email',
        }),
        headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
    }
    );
    const myObject = {
        credentials: 'include',
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
            "email": 'email',
        })// body data type must match "Content-Type" header
    };

    if (who === 'qwant') {
        return fetch(request).then(res => res.json());
    } if (who === 'google') {
        return fetch('https://google.com', myObject).then(res => res.json());
    } else {
        return 'nothing essential provided';
    }
}
export { APIRequest, MyFetch };