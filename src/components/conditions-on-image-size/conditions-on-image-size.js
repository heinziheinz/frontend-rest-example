import {
    FileSizePortraitImage
} from 'components/image-validation';
const ConditionsOnImageFileSize = (event, errors, forceUpdate, lengthOfPortraitList) => {
    let fileSize = event.target.files[0].size;
    let fileSizeLimit = parseInt(process.env.REACT_APP_MAX_FILE_SIZE_FOR_IMAGES);//max file size 200  KB
    if (fileSizeLimit < fileSize) {
        let shouldSend = false;
        FileSizePortraitImage(shouldSend, errors);
        return false;
    } else {
        let shouldSend = true;
        FileSizePortraitImage(shouldSend, errors);
        return true;
    }
}

const OnLegthOfPortaitImageArray = (lengthOfPortraitList) => {
    let maximumNumberOfPortraitImages = parseInt(process.env.REACT_APP_MAXIMUM_NUMBER_OF_PORTRAIT_IMAGES);
    console.log(maximumNumberOfPortraitImages);
    console.log(lengthOfPortraitList);
    if (lengthOfPortraitList < maximumNumberOfPortraitImages) {
        return true
    } else if (lengthOfPortraitList === 1) {
        return false
    } else if (lengthOfPortraitList > 1) {
        return false
    } else {
        return false;
    }

}
const ReduceToCurrentImage = (list, portraitImage) => {
    var concatList = list.concat(portraitImage);

    var sliceNice = concatList.length - 1;
    var sliceTwice = concatList.length;
    var newImage = concatList.slice(sliceNice, sliceTwice);
    return newImage;
}
export default ConditionsOnImageFileSize;
export { OnLegthOfPortaitImageArray, ReduceToCurrentImage };