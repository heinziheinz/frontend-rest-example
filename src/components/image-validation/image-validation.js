// import React from 'react';
export default function ImageValidation(name, errors, value) {
    // console.log(name);
    // console.log(errors);
    // console.log(value);
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    let testValid = allowedExtensions.test(value);
    return testValid;
}
export function ImageValidationWithStateManupulation(name, errors, value) {
    if (name !== 'image') {
        errors.imageExtension = 'No Image';
        return null;
    }
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    let testValid = allowedExtensions.test(value);
    if (testValid) {
        errors.imageExtension = 'Image extension is valid';
    } else {
        errors.imageExtension = 'NOT ACCEPTED: InvalidImage extension!';
    }

}

export function FileSize(shouldSend, errors) {
    // console.log(shouldSend);
    if (shouldSend === false) {
        errors.fileSizeToBig = 'NOT ACCEPTED: File size too Big. Not bigger than 200 KB!'
    }
    if (shouldSend === true) {
        // console.log('filesize all right');
        errors.fileSizeToBig = 'file size all right'
    }
    if (shouldSend === 'clearErrorNotice') {
        errors.fileSizeToBig = ''
    }
}

export function PictureMaximum(modus, errors) {
    if (modus === true) {
        errors.pictureMaximum = 'NOT ACCEPTED: Maximum of 12 images to be uploaded!'
    }
    if (modus === false) {
        errors.pictureMaximum = ''
    }
    if (modus === 'clearErrorNotice') {
        errors.pictureMaximum = ''
    }
}

export function NoSameImagesInArray(modus, errors) {
    // console.log(modus);
    // console.log(errors);
    if (modus === true) {
        errors.noSameImagesInArray = 'NOT ACCEPTED: Not allowed to upload same image twice!';
    }
    if (modus === false) {
        errors.noSameImagesInArray = '';
    }
    if (modus === 'clearErrorNotice') {
        errors.noSameImagesInArray = '';
    }
}

export function FileSizePortraitImage(shouldSend, errors) {
    // console.log(shouldSend);
    // console.log(errors);
    if (shouldSend === false) {
        errors.testSize = 'NOT ACCEPTED: File size of portrait Image is too Big. Not bigger than 200 KB!'
    }
    if (shouldSend === true) {
        // console.log('filesize of Portrait IMage is all right');
        errors.testSize = 'filesize of Portrait Image is all right'
    }
    if (shouldSend === 'clearErrorNotice') {
        // console.log('AUWEH');
        errors.testSize = ''
    }
}
