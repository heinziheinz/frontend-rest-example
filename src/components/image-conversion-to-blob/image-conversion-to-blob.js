import piexif from 'piexifjs';



// get an image blob from url using fetch
let GetImageBlob = function (url) {
    return new Promise(async resolve => {
        let resposne = await fetch(url);
        let blob = resposne.blob();
        resolve(blob);
    });
};

// convert a blob to base64
let BlobToBase64 = function (blob) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = function () {
            let dataUrl = reader.result;
            resolve(dataUrl);
        };
        reader.readAsDataURL(blob);
    });
}

export default GetImageBlob;
export { BlobToBase64 };