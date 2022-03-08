export default (url, option) => {
    return (fetch(url, option)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
    );
}