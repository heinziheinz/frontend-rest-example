const DoFetch = (url, option) => {
    fetch(url, option)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // TODO if unauthenticated, then redirect
            // wie kann ich hier einen redirect mechanismus einführen
            setData(data);
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

export default  DoFetch;