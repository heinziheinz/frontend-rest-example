const Fetcha = (url, option) => {
    // console.log(url);
    return (fetch(url, option)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            return data;
        }, (err) => {
            console.log(err);
            return err;
        })
    );
}
export default Fetcha;