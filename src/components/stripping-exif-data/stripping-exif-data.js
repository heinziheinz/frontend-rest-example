import piexif from 'piexifjs';


const StrippingExifData = (evt) => {
    var file = evt.target.files[0];
    var toBlob;
    // console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(resolve => {
        reader.onloadend = function (e) {
            // console.log(e.target);
            // console.log(e.target.result);
            var strippedData = piexif.remove(e.target.result)

            // von hier weg wird data wird data zurück in Blob verwandelt
            var byteString = atob(strippedData.split(',')[1]);
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            var blob = new Blob([ia], {
                type: 'image/jpeg'
            });
            toBlob = new File([blob], file.name, { type: 'image/jpeg' });
            console.log(toBlob);

            resolve(toBlob);
            // hier image wieder blob
            // Frage, wurden EXIF daten gestripped?


        }
    });


    // reader.readAsDataURL(file);
    // https://stackoverflow.com/questions/34623766/return-variable-from-a-reader-onload-event
    // oder etwas mit state machen?
}

export default StrippingExifData;
