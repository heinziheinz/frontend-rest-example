import React from 'react';
import { Form, Input, Badge } from 'reactstrap';
import Cookies from 'js-cookie';
import GetImageBlob, { BlobToBase64 } from 'components/image-conversion-to-blob';
import { timePickerWrapperStyle } from './style-objects';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import FormElements,
{
    FormButton,
    ImageUploadHandler,
    OptionsSelector,
    SpecificationSelector,
    // TODO: adding ButtonWithEventHandler and ImageHiddenUploadHandler
    ButtonWithEventHandler,
    ImageHiddenUploadHandler
} from './Atoms';
import { EscapeHtml, OfficeTimes, nachMittag, VormittagEnde } from 'components/regex-collection';
import {
    ErrorDisplay,
    MySwitchForPrimeUser,
    TestSwitcher
} from 'components/conditional-components';
import {
    ImageValidationWithStateManupulation,
    FileSize,
    PictureMaximum,
    NoSameImagesInArray
} from 'components/image-validation';
import ConditionsOnImageFileSize,
{
    OnLegthOfPortaitImageArray,
    ReduceToCurrentImage
} from 'components/conditions-on-image-size';
import { TimePickerExample, CheckBox, TimePickerCheckBox } from 'components/atoms'
import baseStringToFile, { urltoFile } from 'components/baste64-string-to-img-file';
const PrimeCustomerTemporaryStorage = React.lazy(() => import('components/form-for-profiles-temporary-storage'));
// const baseStringToFile = React.lazy(() => import('components/baste64-string-to-img-file'));
class FormForProfiles extends React.Component {
    // TODO: form-for-start-page
    fileObj = [];
    fileArray = [];
    fileObjBase64 = [];
    fileArrayBase64 = [];
    imageTitleAttribute = [];
    imageAltAttribute = [];
    constructor(props) {
        super(props);
        // TODO: add imageUpload it
        this.imageUpload = React.createRef();
        this.secondImageUpload = React.createRef();
        this.state = {
            title: '',
            name: '',
            telefonnumber: '',
            specialization: '',
            postleitzahl: '',
            stadt: '',
            bundesland: '',
            adresse: '',
            krankenkassen: '',
            montag: process.env.REACT_APP_OFFICE_TIME_START,
            montagvormittagende: process.env.REACT_APP_OFFICE_TIME_VORMITTAG_ENDE,
            montagnachmittag: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_START,
            montagnachmittagende: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_ENDE,
            dienstag: process.env.REACT_APP_OFFICE_TIME_START,
            dienstagvormittagende: process.env.REACT_APP_OFFICE_TIME_VORMITTAG_ENDE,
            dienstagnachmittag: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_START,
            dienstagnachmittagende: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_ENDE,
            mittwoch: process.env.REACT_APP_OFFICE_TIME_START,
            mittwochvormittagende: process.env.REACT_APP_OFFICE_TIME_VORMITTAG_ENDE,
            mittwochnachmittag: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_START,
            mittwochnachmittagende: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_ENDE,
            donnerstag: process.env.REACT_APP_OFFICE_TIME_START,
            donnerstagvormittagende: process.env.REACT_APP_OFFICE_TIME_VORMITTAG_ENDE,
            donnerstagnachmittag: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_START,
            donnerstagnachmittagende: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_ENDE,
            freitag: process.env.REACT_APP_OFFICE_TIME_START,
            freitagvormittagende: process.env.REACT_APP_OFFICE_TIME_VORMITTAG_ENDE,
            freitagnachmittag: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_START,
            freitagnachmittagende: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_ENDE,
            samstag: process.env.REACT_APP_OFFICE_TIME_START,
            samstagvormittagende: process.env.REACT_APP_OFFICE_TIME_VORMITTAG_ENDE,
            samstagnachmittag: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_START,
            samstagnachmittagende: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_ENDE,
            sonntag: process.env.REACT_APP_OFFICE_TIME_START,
            sonntagvormittagende: process.env.REACT_APP_OFFICE_TIME_VORMITTAG_ENDE,
            sonntagnachmittag: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_START,
            sonntagnachmittagende: process.env.REACT_APP_OFFICE_TIME_NACHMITTAG_ENDE,
            emailaddresse: '',
            blockoftext: '',
            gesprochenesprache: '',
            imageList: [],
            portraitImageList: [],
            myRedirect: false,
            file: null,
            base64File: null,
            multipleFile: [null],
            base64MultipleFile: [null],
            articleImage: [],
            imageList: [],
            confirmedmontag: true,
            confirmedmontagnachmittag: true,
            confirmeddienstag: true,
            confirmeddienstagnachmittag: true,
            confirmedmittwoch: true,
            confirmedmittwochnachmittag: true,
            confirmeddonnerstag: true,
            confirmeddonnerstagnachmittag: true,
            confirmedfreitag: true,
            confirmedfreitagnachmittag: true,
            confirmedsamstag: true,
            confirmedsamstagnachmittag: true,
            confirmedsonntag: true,
            confirmedsonntagnachmittag: true,
            anErrorOcurred: false,
            // TODO: only for single Attribute
            singleTitleAttribute: {
                imageAlt: '',
                imageTitle: '',
            },
            altAndTitleAttribute: {
                firstBackgroundImageAlt: '',
                firstBackgroundImageTitle: '',
                secondBackgroundImageAlt: '',
                secondBackgroundImageTitle: '',
                thirdBackgroundImageAlt: '',
                thirdBackgroundImageTitle: '',
                fourthBackgroundImageAlt: '',
                fourthBackgroundImageTitle: '',
                fithsBackgroundImageAlt: '',
                fithsBackgroundImageTitle: '',
                sixBackgroundImageAlt: '',
                sixBackgroundImageTitle: '',
                sevenBackgroundImageAlt: '',
                sevenBackgroundImageTitle: '',
                eightBackgroundImageAlt: '',
                eightBackgroundImageTitle: '',
                nineBackgroundImageAlt: '',
                nineBackgroundImageTitle: '',
                tenBackgroundImageAlt: '',
                tenBackgroundImageTitle: '',
            },
            errors: {
                title: '',
                name: '',
                telefonnumber: '',
                specialization: '',
                postleitzahl: '',
                stadt: '',
                bundesland: '',
                adresse: '',
                krankenkassen: '',
                montag: '',
                montagvormittagende: '',
                montagnachmittag: '',
                montagnachmittagende: '',
                dienstag: '',
                dienstagvormittagende: '',
                dienstagnachmittag: '',
                dienstagnachmittagende: '',
                mittwoch: '',
                mittwochvormittagende: '',
                mittwochnachmittag: '',
                mittwochnachmittagende: '',
                donnerstag: '',
                donnerstagvormittagende: '',
                donnerstagnachmittag: '',
                donnerstagnachmittagende: '',
                freitag: '',
                freitagvormittagende: '',
                freitagnachmittag: '',
                freitagnachmittagende: '',
                samstag: '',
                samstagvormittagende: '',
                samstagnachmittag: '',
                samstagnachmittagende: '',
                sonntag: '',
                sonntagvormittagende: '',
                sonntagnachmittag: '',
                sonntagnachmittagende: '',
                emailaddresse: '',
                blockoftext: '',
                gesprochenesprache: '',
                imageExtension: '',
                fileSizeToBig: '',
                pictureMaximum: '',
                noSameImagesInArray: '',
                testSize: '',
                imagebackgroundlink: '',
                imagelink: '',
                confirmedmontag: '',
                confirmedmontagnachmittag: '',
                confirmeddienstag: '',
                confirmeddienstagnachmittag: '',
                confirmedmittwoch: '',
                confirmedmittwochnachmittag: '',
                confirmeddonnerstag: '',
                confirmeddonnerstagnachmittag: '',
                confirmedfreitag: '',
                confirmedfreitagnachmittag: '',
                confirmedsamstag: '',
                confirmedsamstagnachmittag: '',
                confirmedsonntag: '',
                confirmedsonntagnachmittag: '',
                altAndTitleAttribute: {
                    firstBackgroundImageAlt: '',
                    secondBackgroundImageAlt: '',
                    thirdBackgroundImageAlt: '',
                    fourthBackgroundImageAlt: '',
                    fithsBackgroundImageAlt: '',
                    sixBackgroundImageAlt: '',
                    sevenBackgroundImageAlt: '',
                    eightBackgroundImageAlt: '',
                    nineBackgroundImageAlt: '',
                    tenBackgroundImageAlt: '',
                    firstBackgroundImageTitle: '',
                    secondBackgroundImageTitle: '',
                    thirdBackgroundImageTitle: '',
                    fourthBackgroundImageTitle: '',
                    fithsBackgroundImageTitle: '',
                    sixBackgroundImageTitle: '',
                    sevenBackgroundImageTitle: '',
                    eightBackgroundImageTitle: '',
                    nineBackgroundImageTitle: '',
                    tenBackgroundImageTitle: '',
                },
                singleTitleAttribute: {
                    imageAlt: '',
                    imageTitle: '',
                },
            }
        };
    }
    componentWillUnmount() {
        // console.log('component did unmount');

    }
    componentDidMount() {
        const { errors } = this.state;
        // console.log(this.state.monday);
        if (Cookies.get('myRedirect') === undefined) {
            Cookies.set('myRedirect', false, { secure: true });
        }
        // console.log('FormforProfiles did mount');
        MySwitchForPrimeUser('imagelink', errors, false);
        MySwitchForPrimeUser('imagebackgroundlink', errors, false);
        // this.forceUpdate();
    }
    // TODO: add it
    onClickInput = () => {
        // console.log(this.imageUpload.current);
        this.imageUpload.current.click();
    }
    onClickSeondInput = () => {
        // console.log(this.imageUpload.current);
        this.secondImageUpload.current.click();
    }
    // TODO: Form-for-start-page
    removeProfileImage = (props) => {
        const { id, data, articleImage, imageList, errors, base64File } = this.state;
        // console.log(props);
        // console.log('ImageREmoved');
        // console.log(articleImage);
        this.setState({
            articleImage: [],
            file: null,
            base64File: null
        },
            () => {
                // console.log(this.state.articleImage);
                MySwitchForPrimeUser('imagebackgroundlink', errors, this.state.articleImage.length > 0);
                this.forceUpdate();
                // console.log(base64File);
            }
        );
    }
    removeImages = (props, index) => {
        const { errors, imageList, base64MultipleFile } = this.state;
        // console.log('remove Images');
        // console.log(props);
        // console.log(index);
        // remove Images
        // that the problem
        // https://www.w3schools.com/code/tryit.asp?filename=GNBNOYB883B4
        // console.log(this.fileArray);
        if (index !== 0) {
            // console.log(this.fileArray);

            this.fileArray.splice(index, 1);
            this.fileArrayBase64.splice(index, 1);
            this.removeSetState(index, 1);

            // console.log(this.fileArray);
        } else {
            // console.log(this.fileArray);

            this.removeSetState(0, 1);
            this.fileArray.splice(0, 1);
            this.fileArrayBase64.splice(index, 1);

            // console.log(this.fileArray);
        }
    }
    removeSetState = (index, secondIndex) => {
        const { errors, imageList, base64MultipleFile } = this.state;

        // console.log(imageList);
        imageList.splice(index, secondIndex);
        // console.log(imageList);

        // console.log(base64MultipleFile);
        base64MultipleFile.splice(index, secondIndex);
        // console.log(base64MultipleFile);

        // https://www.w3schools.com/code/tryit.asp?filename=GO90KQI7XTU8
        this.setState({
            imageList: imageList.concat([]),
            multipleFile: [null],
            base64MultipleFile: base64MultipleFile.concat([])
        },
            () => {
                // console.log(this.state.articleImage);
                MySwitchForPrimeUser('imagelink', errors, this.state.imageList.length > 0);
                this.forceUpdate();
                // console.log(base64MultipleFile);
            }
        );

    }
    // TODO: form-for-start-page
    previewSingleImage = async (event) => {
        var myeventfile = event.target.files[0];
        // console.log(myeventfile);
        localStorage.setItem('myBlobFile', JSON.stringify(myeventfile));
        let getBase64Image = async function (url) {
            let blob = await GetImageBlob(url);
            let base64 = await BlobToBase64(blob);
            return base64;
        }
        var base64File = await getBase64Image(URL.createObjectURL(event.target.files[0]));
        this.setState({
            file: URL.createObjectURL(myeventfile),
            base64File: { base64File: base64File, base64Name: myeventfile.name }
        }
        );

        // this.setState({
        //     file: URL.createObjectURL(event.target.files[0])
        // });
        // console.log(this.state);
        // var go = JSON.stringify(show);
        // localStorage.setItem('portraitImage', show);
        // var portraitImage = localStorage.getItem('portraitImage');
        // var eventData = localStorage.getItem('eventData');
        // console.log(JSON.parse(eventData));
        // var letshow = baseStringToFile(base64File, 'mycat.jpg');
        // console.log(letshow);
        var letshow = urltoFile(base64File, 'mycat.jpg', 'image/jpeg').then(function (file) { console.log(file); });


    }
    previewImages = async (event) => {
        // console.log('PreviewImages');
        // console.log(event);
        var nameOfBase64 = event[0].name;
        this.fileObj.push(event);
        // console.log(this.fileObj);
        var base64File;
        let getBase64Image = async function (url) {
            let blob = await GetImageBlob(url);
            let base64 = await BlobToBase64(blob);
            return base64;
        }

        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.fileObjBase64.push(event);
        // console.log(this.fileObjBase64);
        // console.log(this.fileObjBase64);
        for (let i = 0; i < this.fileObj[0].length; i++) {
            base64File = await getBase64Image(URL.createObjectURL(this.fileObjBase64[0][i]));

            // Hier muss noch der name hinzugefügt werden

            // CHANGED
            // this.fileArrayBase64.push(base64File);
            this.fileArrayBase64.push({ base64: base64File, base64Name: nameOfBase64 });
        }

        // console.log(this.fileArrayBase64);
        this.setState({
            multipleFile: this.fileArray,
            base64MultipleFile: this.fileArrayBase64
        });
        // console.log(this.state);
    }
    onAddingProfileImage = event => {
        const { errors } = this.state;
        // console.log(event);
        // console.log('HIT IT HARD');
        //
        this.forceUpdate = this.forceUpdate.bind(this);
        // console.log(this.state.portraitImageList.length);
        let lengthOfPortraitList = this.state.portraitImageList.length;
        // console.log(lengthOfPortraitList);
        let fileSizeIsApproved = ConditionsOnImageFileSize(event, this.state.errors, this.forceUpdate);
        // console.log(fileSizeIsApproved);
        let lengthOfPortraitArrayApporved = OnLegthOfPortaitImageArray(lengthOfPortraitList);
        // console.log(lengthOfPortraitArrayApporved);
        if (lengthOfPortraitArrayApporved) {
            // console.log('HIT IT HARD TWOO TIMES');
            this.previewSingleImage(event);
            this.setState({
                portraitImageList: this.state.portraitImageList.concat(event.target.files[0])
            },
                () => {
                    // console.log(this.state.portraitImageList);
                    MySwitchForPrimeUser('imagebackgroundlink', errors, this.state.portraitImageList.length > 0);
                    this.forceUpdate();
                }
            );
        } else {
            // console.log('HIT IT HARD THIRD TIMES');
            this.previewSingleImage(event);
            this.setState({
                portraitImageList: ReduceToCurrentImage(this.state.portraitImageList, event.target.files[0])
            },
                () => {
                    // console.log(this.state.portraitImageList);
                    MySwitchForPrimeUser('imagebackgroundlink', errors, this.state.portraitImageList.length > 0);
                    this.forceUpdate();
                }
            )
        }
    }

    onAddingImage = event => {
        // console.log('AddingMYImage');
        var addImageToArray = true;
        let newName = event.target.files[0].name;
        let fileSize = event.target.files[0].size;
        let fileSizeLimit = parseInt(process.env.REACT_APP_MAX_FILE_SIZE_FOR_IMAGES);//max file size 200  KB
        let maximumNumberOfImages = parseInt(process.env.REACT_APP_MAXIMUM_NUMBER_OF_IMAGES);// man number 11

        //added conditions on length and size
        // TODO file size bruacht auch ein unteres Limit
        // backend auf 100 KB festgelegt
        if (fileSizeLimit < fileSize) {
            // console.log("sorry, fileSize limit exeeded");
            // console.log(this);
            setTimeout(() => {
                FileSize('clearErrorNotice', this.state.errors);
                this.forceUpdate();
            }, 4000);
            let shouldSend = false;
            FileSize(shouldSend, this.state.errors);
        } else {
            // console.log("File size below limit");
            setTimeout(() => {
                FileSize('clearErrorNotice', this.state.errors);
                this.forceUpdate();
            }, 4000);
            let shouldSend = true;
            FileSize(shouldSend, this.state.errors);
        }
        // added condition on length aka maximul number of pictures to be upload
        // console.log(this.state.imageList.length);
        if (this.state.imageList.length >= maximumNumberOfImages) {
            setTimeout(() => {
                PictureMaximum('clearErrorNotice', this.state.errors);
                this.forceUpdate();
            }, 4000);
            var modus = true;
            PictureMaximum(modus, this.state.errors);
        } else {
            // console.log("within max numbers of pictures");
            setTimeout(() => {
                PictureMaximum('clearErrorNotice', this.state.errors);
                this.forceUpdate();
            }, 4000);
            var modus = false;
            PictureMaximum(modus, this.state.errors);
        }

        if (typeof this.state.imageList[0] !== "undefined") {
            // console.log("ssss");
            // console.log(this.state.imageList[0].name);
            // checking, if not same imAge are adde to array
            const noSameImagesInArray = (currentName) => currentName.name !== newName;
            addImageToArray = this.state.imageList.every(noSameImagesInArray);
            if (addImageToArray) {
                setTimeout(() => {
                    NoSameImagesInArray('clearErrorNotice', this.state.errors);
                    this.forceUpdate();
                }, 4000);
                let modus = false;
                NoSameImagesInArray(modus, this.state.errors);
            } else if (addImageToArray === false) {
                setTimeout(() => {
                    NoSameImagesInArray('clearErrorNotice', this.state.errors);
                    this.forceUpdate();
                }, 4000);
                let modus = true;
                NoSameImagesInArray(modus, this.state.errors);
            } else {
                // console.log("else");
            }

        }
        //
        ImageValidationWithStateManupulation(event.target.name, this.state.errors, event.target.value);
        if (addImageToArray && fileSizeLimit >= fileSize && this.state.imageList.length < maximumNumberOfImages) {
            const { errors } = this.state;
            // console.log("adding images");
            const EventTarget = event.target.files;
            this.setState({
                imageList: this.state.imageList.concat(event.target.files[0])
            },
                () => {
                    // console.log(this.state.imageList);
                    MySwitchForPrimeUser('imagelink', errors, true);
                    this.forceUpdate();
                    this.previewImages(EventTarget);
                }
            );
        } else {
            this.forceUpdate();
        }
    }

    handleChangeInputValue = event => {
        event.preventDefault();
        const { name, value } = event.target;

        // console.log(name);
        // console.log(value);
        this.setState({
            [name]: value
        });
    }
    handleTimePickerChange = (event, datestring, name) => {

        // console.log(event);
        // console.log(name);
        // console.log(datestring);

        this.setState({
            [name]: datestring
        });
    }

    singleTitleAndAltAttribute = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        console.log(name);
        console.log(value);
        MySwitchForPrimeUser(name, errors, value);
        this.setState({
            singleTitleAttribute: {
                ...this.state.singleTitleAttribute,
                [name]: value,
            }
        });
    }

    imageTitleAndAltAttribute = (event) => {
        const { name, value } = event.target;
        // console.log(name);
        // console.log(value);
        // firstBackgroundImageAlt
        // secondBackgroundImageAlt ...
        let errors = this.state.errors;
        MySwitchForPrimeUser(name, errors, value);
        this.setState({
            altAndTitleAttribute: {
                ...this.state.altAndTitleAttribute,
                [name]: value,
            },
        }, () => {
            // console.log(this.state);
        }
        );
        // https://www.semicolonworld.com/question/71633/how-do-i-setstate-for-nested-object

    }

    handleChange = (event) => {
        // console.log(event);
        event.preventDefault();
        const { name, value } = event.target;
        // console.log(name);
        // console.log(value);
        let errors = this.state.errors;


        MySwitchForPrimeUser(name, errors, value);

        const saveValue = EscapeHtml(value);
        // console.log(saveValue);


        // const myState = this.state;
        // const keys = Object.keys(myState);
        // TestSwitcher(name, errors, value, keys);


        this.setState({
            errors, [name]: value
        });

        // this.setState({ errors, [name]: value }, () => {
        // console.log(errors)
        // })
    }
    formValidator = () => {
        const { errors } = this.state;
        var valid = true;
        let formValidation = new RegExp(/^\s*NOT\s*ACCEPTED/g);
        Object.values(errors).forEach((val) => {
            console.log(val);
            formValidation.test(val) && (valid = false);
        });
        return valid;
    }
    stateUpdater = (data) => {
        // console.log(data);
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            errors[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }
    validateFormInputBeforSubmission = () => {
        //TODO:https://www.npmjs.com/package/object.entries
        const errorArray = [
            'montag',
            'montagvormittagende',
            'montagnachmittag',
            'montagnachmittagende',
            'dienstag',
            'dienstagvormittagende',
            'dienstagnachmittag',
            'dienstagnachmittagende',
            'mittwoch',
            'mittwochvormittagende',
            'mittwochnachmittag',
            'mittwochnachmittagende',
            'donnerstag',
            'donnerstagvormittagende',
            'donnerstagnachmittag',
            'donnerstagnachmittagende',
            'freitag',
            'freitagvormittagende',
            'freitagnachmittag',
            'freitagnachmittagende',
            'samstag',
            'samstagvormittagende',
            'samstagnachmittag',
            'samstagnachmittagende',
            'sonntag',
            'sonntagvormittagende',
            'sonntagnachmittag',
            'sonntagnachmittagende',
            'imageList',
            'errors',
            'myRedirect',
            'multipleFile',
            'file',
            'base64File',
            'base64MultipleFile',
            'articleImage',
            'portraitImageList',
            'confirmedmontag',
            'confirmedmontagnachmittag',
            'confirmeddienstag',
            'confirmeddienstagnachmittag',
            'confirmedmittwoch',
            'confirmedmittwochnachmittag',
            'confirmeddonnerstag',
            'confirmeddonnerstagnachmittag',
            'confirmedfreitag',
            'confirmedfreitagnachmittag',
            'confirmedsamstag',
            'confirmedsamstagnachmittag',
            'confirmedsonntag',
            'confirmedsonntagnachmittag',
            'anErrorOcurred',
            'altAndTitleAttribute',//FIXME: Check, if this works
            'singleTitleAttribute'

        ];
        var submitForm = true;
        for (let [key, value] of Object.entries(this.state)) {
            // console.log(`${key}: ${value}`);
            // errorArray.includes(key)
            if (errorArray.includes(key)) {
                // console.log(key);
            } else {
                // console.log(`${key}: ${value}`);
                if (!(value.length > 0)) {
                    // console.log('drinnen');
                    submitForm = false;
                    this.stateUpdater(key);
                }
            }
        }
        return submitForm;
    }
    stateTitleAndAttributeUpdater = (data) => {
        console.log(data);
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            console.log(errors.altAndTitleAttribute[data]);
            errors.altAndTitleAttribute[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }
    extraValidationForImageAltAndTitleAttribute = () => {
        // console.log(this.fileObjBase64);
        console.log(this.fileArray);
        console.log(Object.keys(this.state.altAndTitleAttribute));
        // this.fileObjBase64.length
        const errorArray = [
        ];
        var submitForm = true;
        var counter = 0;
        for (let [key, value] of Object.entries(this.state.altAndTitleAttribute)) {
            // console.log(`${key}: ${value}`);
            // errorArray.includes(key)
            counter++;
            if (counter <= (this.fileArray.length * 2)) {
                if (errorArray.includes(key)) {
                    // console.log(key);
                } else {
                    console.log(`${key}: ${value}`);
                    if (!(value.length > 0)) {
                        // console.log('drinnen');
                        submitForm = false;
                        this.stateTitleAndAttributeUpdater(key);
                    }
                }
            }
        }
        return submitForm;
    }
    // FIXME: ADD
    statePortraitTitleAndAttributeUpdater = (data) => {
        console.log(data);
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            console.log(errors.altAndTitleAttribute[data]);
            errors.singleTitleAttribute[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }

    portraitValidationForImageAltAndTitleAttribute = () => {
        // FIXME: Checkout how many images are in Array and remove the reminder
        // console.log(this.fileObjBase64);
        console.log(this.fileArray);
        console.log(Object.keys(this.state.singleTitleAttribute));
        // this.fileObjBase64.length
        const errorArray = [
        ];
        var submitForm = true;

        for (let [key, value] of Object.entries(this.state.singleTitleAttribute)) {

            if (errorArray.includes(key)) {
                // console.log(key);
            } else {
                console.log(`${key}: ${value}`);
                if (!(value.length > 0)) {
                    // console.log('drinnen');
                    submitForm = false;
                    //FIXME:einen eingenen stateUpdate für title ...
                    this.statePortraitTitleAndAttributeUpdater(key);
                }
            }

        }
        return submitForm;
    }

    fileUploader = (event) => {
        const { errors } = this.state;
        event.preventDefault();
        // console.log('upload file');
        var myEvent = event;
        let trueOrNot = this.validateFormInputBeforSubmission();
        let extraTrueORNot = this.extraValidationForImageAltAndTitleAttribute();
        let portraitTrueOrNot = this.portraitValidationForImageAltAndTitleAttribute();
        console.log('ALL True OR Not');
        console.log(trueOrNot);
        console.log(extraTrueORNot);
        console.log(portraitTrueOrNot);


        if (trueOrNot || extraTrueORNot || portraitTrueOrNot) {
            console.log('Inside formValidation');
            var checkValidation = this.formValidator();
            console.log(checkValidation);
            if (checkValidation === false) {
                trueOrNot = false;
            }
        }
        if (trueOrNot === false || extraTrueORNot === false || portraitTrueOrNot === false || !(this.fileArray.length >= 3)) {
            console.log('trueOrNot is false: BLOCK');
            // TODO
            this.setState({
                anErrorOcurred: true
            });
            setTimeout(() => {
                this.setState({
                    anErrorOcurred: false
                });
            }, 9000);
            return null;
        }
        const { imageList, portraitImageList, ...names } = this.state;
        if (imageList.length >= 5) {
            // console.log('diese bedingung löschen');
        }

        if (this.state.title.length === 0 || this.state.specialization.length === 0) {
            console.log('State Title')
            return null;
        }
        console.log('REDIRECT');
        this.setState({
            myRedirect: true
        });
        Cookies.set('myRedirect', true, { secure: true });
        // console.log(Cookies.get('myRedirect'));
    }
    handleValue = (event) => {
        // const { value, name } = event.target;
        const { name, value } = event.target;
        // console.log(name);
        // console.log(this.state.confirmedmontagnachmittag);
        // console.log(value);
        var myBoolean;
        if (value === 'false') {
            myBoolean = !value;
        } else if (value === 'true') {
            myBoolean = !!value;

        } else {

        }
        // console.log(myBoolean);
        this.setState({
            [name]: !myBoolean
        });
    }
    render() {
        // console.log(this.state.altAndTitleAttribute);
        // console.log(this.state.base64MultipleFile);
        // console.log(this.state.imageList);
        // console.log(this.state.montag);
        console.log(this.fileArray.length);
        console.log(Object.keys(this.state.altAndTitleAttribute));

        const montag = ['montag', 'montagvormittagende', 'montagnachmittag', 'montagnachmittagende'];
        const dienstag = ['dienstag', 'dienstagvormittagende', 'dienstagnachmittag', 'dienstagnachmittagende'];
        const mittwoch = ['mittwoch', 'mittwochvormittagende', 'mittwochnachmittag', 'mittwochnachmittagende'];
        const donnerstag = ['donnerstag', 'donnerstagvormittagende', 'donnerstagnachmittag', 'donnerstagnachmittagende'];
        const freitag = ['freitag', 'freitagvormittagende', 'freitagnachmittag', 'freitagnachmittagende'];
        const samstag = ['samstag', 'samstagvormittagende', 'samstagnachmittag', 'samstagnachmittagende'];
        const sonntag = ['sonntag', 'sonntagvormittagende', 'sonntagnachmittag', 'sonntagnachmittagende'];
        const skippedItems = [
            'myRedirect',
            'file',
            'multipleFile',
            'base64File',
            'base64MultipleFile',
            'confirmedmontag',
            'confirmedmontagnachmittag',
            'confirmeddienstag',
            'confirmeddienstagnachmittag',
            'confirmedmittwoch',
            'confirmedmittwochnachmittag',
            'confirmeddonnerstag',
            'confirmeddonnerstagnachmittag',
            'confirmedfreitag',
            'confirmedfreitagnachmittag',
            'confirmedsamstag',
            'confirmedsamstagnachmittag',
            'confirmedsonntag',
            'confirmedsonntagnachmittag',
            'anErrorOcurred'
        ];
        // if (montag.includes(data)) {
        // console.log(key + 'so good data');
        // }
        //TODO if Object.keys is not available
        //FIXME undo var keys = Object.keys || require('object-keys'), more central way to do it
        //https://www.npmjs.com/package/object-keys
        // console.log('RENNDERRRRRR');
        // console.log(localStorage.getItem('myCat'));
        // console.log(Cookies.get('myCat'));
        // console.log(this.state.multipleFile);
        // console.log("RENDER");
        const { errors, myRedirect, multipleFile, file } = this.state;
        // TODO: form-for-start-page
        let imgPreview;
        if (file) {
            imgPreview = <img src={file} alt='' width="200" />;
        }
        // console.log(multipleFile);
        // console.log(Cookies.get('myRedirect'));
        var keys = Object.keys || require('object-keys');
        const myState = this.state;
        const arrayOfkeyOfState = keys(myState);
        const newRows = [];
        const timePickerRow = [];
        const timePickerRowSecond = [];
        const dienstagRow = [];
        const mittwochRow = [];
        const donnerstagRow = [];
        const freitagRow = [];
        const samstagRow = [];
        const sonntagRow = [];
        const deleteButton = file ? <p onClick={this.removeProfileImage}>delete image</p> : '';
        // TODO: MOdify
        // onChange = { this.singleTitleAndAltAttribute }
        // imageAlt: '',
        //     imageTitle:
        const imageAltAttribute = file ? <input name="imageAlt" placeholder="Add Alt Attribute" onChange={this.singleTitleAndAltAttribute}></input> : '';
        const imageTitleAttribute = file ? <input name="imageTitle" placeholder="Add Title Attribute" onChange={this.singleTitleAndAltAttribute}></input> : '';
        const errorMessage = file ? <ErrorDisplay error={errors.singleTitleAttribute['imageAlt']} /> : '';
        // console.log(process.env.REACT_APP_TEN_NAMES_FOR_IMAGE_ARRAY.split(",",));
        let myNuberArray = process.env.REACT_APP_TEN_NAMES_FOR_IMAGE_ARRAY_NAME.split(",",);
        // console.log(myNuberArray[0]);
        arrayOfkeyOfState.forEach((data, index) => {
            if (data === 'imageList' || data === 'errors' || data === 'portraitImageList') {
                if (data === "imageList") {
                    newRows.push(
                        <React.Fragment key={data + index}>
                            <div className="form-group multi-preview">
                                {(this.fileArray || []).map((url, index, us) => {
                                    // console.log(myNuberArray[index]);
                                    // console.log(errors.altAndTitleAttribute);
                                    // console.log(errors.altAndTitleAttribute[myNuberArray[index]]);
                                    // passing an additional parameter with onChange:<fieldset onChange={(e) => this.props.handleChange("tags", e)}>
                                    return (
                                        <div>
                                            <img key={url} src={url} alt="..." width="200" />
                                            <p key={url + index} onClick={(props) => this.removeImages(props, index)}>delete image</p>
                                            <input name={myNuberArray[index] + "Alt"} onChange={this.imageTitleAndAltAttribute} placeholder="Add Alt Attribute"></input>
                                            <ErrorDisplay key={myNuberArray[index]} error={errors.altAndTitleAttribute[myNuberArray[index] + "Alt"]} />
                                            <br></br>
                                            <input name={myNuberArray[index] + "Title"} onChange={this.imageTitleAndAltAttribute} placeholder="Add Title Attribute"></input>
                                            <ErrorDisplay key={myNuberArray[index]} error={errors.altAndTitleAttribute[myNuberArray[index] + "Title"]} />
                                            {this.fileArray.length >= 3 ? '' : <p
                                                style={this.state.anErrorOcurred ? { "color": "white", "backgroundColor": "red" } : { "color": "white" }}
                                            >NOT ACCEPTED:Mindestes 3 Bilder hinzufügen</p>}
                                            {/* {this.state.anErrorOcurred ? <div>Hallo</div> : ''} */}
                                            {/* <FormButton value={'submit'} fileUploader={this.fileUploader} /> */}
                                        </div>
                                    )
                                })}
                            </div>
                            <ImageHiddenUploadHandler
                                onAddingImage={this.onAddingImage}
                                key={null}
                                myRef={this.secondImageUpload}
                            />
                            <ErrorDisplay key={index} error={errors['imageExtension']} />
                            <ErrorDisplay key={'imagelink'} error={errors['imagelink']} />
                            <ErrorDisplay key={'jochen'} error={errors['fileSizeToBig']} />
                            <ErrorDisplay key={'georg'} error={errors['pictureMaximum']} />
                            <ErrorDisplay key={'franz'} error={errors['noSameImagesInArray']} />
                            <ButtonWithEventHandler onClickInput={this.onClickSeondInput} />
                        </React.Fragment>
                    );
                }
            } else if (skippedItems.includes(data)) {

                newRows.push(
                    null
                );
            }
            else {
                // console.log(data);

                if (data === "title" || data === "specialization") {
                    // console.log(data);
                    newRows.push(
                        <React.Fragment key={data + index}>
                            <OptionsSelector
                                handleChangeInputValue={this.handleChange}
                                key={data}
                                desicion={data}
                            />
                            <ErrorDisplay key={index} error={errors[data]} />
                        </React.Fragment>
                    );
                } else if (data === "bundesland") {
                    // console.log(data);
                    // console.log(process.env.REACT_APP_BUNDESLAENDER);
                    newRows.push(
                        <React.Fragment key={data + index}>
                            <OptionsSelector
                                handleChangeInputValue={this.handleChange}
                                key={data}
                                desicion={data}
                            />
                            <ErrorDisplay key={index} error={errors[data]} />
                        </React.Fragment>
                    );
                } else {
                    let officeTime;
                    if (data === 'articleImage') {
                        newRows.push(null);
                    } else if (montag.includes(data)) {
                        officeTime = '09:00'
                        if ('montag' === data) {
                            // console.log(data);
                            timePickerRowSecond.push(
                                <>
                                    {/* <label style={{ 'margin': '10px' }} >{data}</label> */}
                                    <TimePickerCheckBox
                                        key={data}
                                        formbezeichnung={data}
                                        text={'checkbox'}
                                        name={'confirmed' + data}
                                        value={this.state.confirmedmontag}
                                        confirmed={this.state.confirmedmontag}
                                        handleChangeInputValue={this.handleValue}
                                        showText={true}
                                    />
                                    <TimePickerExample
                                        name={data}
                                        handleChangeInputValue={this.handleTimePickerChange}
                                        officeTime={officeTime}
                                        confirmed={this.state.confirmedmontag}
                                    />
                                </>
                            );
                        } else {
                            let myOfficetimes = OfficeTimes(data);
                            let nachMittahTrue = nachMittag(data);
                            let vormittagEnde = VormittagEnde(data);
                            if (nachMittahTrue) {
                                // console.log(data);
                                timePickerRowSecond.push(
                                    <>
                                        <TimePickerCheckBox
                                            key={data}
                                            formbezeichnung={data}
                                            text={'checkbox'}
                                            name={'confirmed' + data}
                                            value={this.state.confirmedmontagnachmittag}
                                            confirmed={this.state.confirmedmontagnachmittag}
                                            handleChangeInputValue={this.handleValue}
                                            showText={false}
                                        />
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedmontagnachmittag} />
                                    </>
                                );
                            } else if (vormittagEnde) {
                                // console.log('slslsls')
                                // console.log(data)
                                timePickerRowSecond.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedmontag} />
                                    </>
                                );
                            } else {
                                // console.log(data);
                                // console.log('sksksk');
                                timePickerRowSecond.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedmontagnachmittag} />
                                    </>
                                );
                            }
                        }
                    } else if (dienstag.includes(data)) {
                        if ('dienstag' === data) {
                            officeTime = '09:00'
                            dienstagRow.push(
                                <>
                                    {/* <label style={{ 'margin': '10px' }} >{data}</label> */}
                                    <TimePickerCheckBox
                                        key={data}
                                        formbezeichnung={data}
                                        text={'checkbox'}
                                        name={'confirmed' + data}
                                        value={this.state.confirmeddienstag}
                                        confirmed={this.state.confirmeddienstag}
                                        handleChangeInputValue={this.handleValue}
                                        showText={true}
                                    />
                                    <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={officeTime} confirmed={this.state.confirmeddienstag} />
                                </>
                            );
                        } else {
                            let myOfficetimes = OfficeTimes(data);
                            let nachMittahTrue = nachMittag(data);
                            let vormittagEnde = VormittagEnde(data);
                            if (nachMittahTrue) {
                                // console.log(this.state.confirmedmontagnachmittag);
                                dienstagRow.push(
                                    <>
                                        <TimePickerCheckBox
                                            key={data}
                                            formbezeichnung={data}
                                            text={'checkbox'}
                                            name={'confirmed' + data}
                                            value={this.state.confirmeddienstagnachmittag}
                                            confirmed={this.state.confirmeddienstagnachmittag}
                                            handleChangeInputValue={this.handleValue}
                                            showText={false}
                                        />
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmeddienstagnachmittag} />
                                    </>
                                );
                            } else if (vormittagEnde) {
                                // console.log('slslsls')
                                // console.log(data)
                                dienstagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmeddienstag} />
                                    </>
                                );
                            } else {
                                dienstagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmeddienstagnachmittag} />
                                    </>
                                );
                            }
                        }
                    } else if (mittwoch.includes(data)) {
                        if ('mittwoch' === data) {
                            officeTime = '09:00'
                            mittwochRow.push(
                                <>
                                    {/* <label style={{ 'margin': '10px' }} >{data}</label> */}
                                    <TimePickerCheckBox
                                        key={data}
                                        formbezeichnung={data}
                                        text={'checkbox'}
                                        name={'confirmed' + data}
                                        value={this.state.confirmedmittwoch}
                                        confirmed={this.state.confirmedmittwoch}
                                        handleChangeInputValue={this.handleValue}
                                        showText={true}
                                    />
                                    <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={officeTime} confirmed={this.state.confirmedmittwoch} />
                                </>
                            );

                        } else {
                            let myOfficetimes = OfficeTimes(data);
                            let nachMittahTrue = nachMittag(data);
                            let vormittagEnde = VormittagEnde(data);
                            if (nachMittahTrue) {
                                // console.log(this.state.confirmedmontagnachmittag);
                                mittwochRow.push(
                                    <>
                                        <TimePickerCheckBox
                                            key={data}
                                            formbezeichnung={data}
                                            text={'checkbox'}
                                            name={'confirmed' + data}
                                            value={this.state.confirmedmittwochnachmittag}
                                            confirmed={this.state.confirmedmittwochnachmittag}
                                            handleChangeInputValue={this.handleValue}
                                            showText={false}
                                        />
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedmittwochnachmittag} />
                                    </>
                                );
                            } else if (vormittagEnde) {
                                // console.log('slslsls')
                                // console.log(data)
                                mittwochRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedmittwoch} />
                                    </>
                                );
                            } else {
                                mittwochRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedmittwochnachmittag} />
                                    </>
                                );
                            }
                        }
                    } else if (donnerstag.includes(data)) {
                        if ('donnerstag' === data) {
                            officeTime = '09:00'
                            donnerstagRow.push(
                                <>
                                    {/* <label style={{ 'margin': '10px' }} >{data}</label> */}
                                    <TimePickerCheckBox
                                        key={data}
                                        formbezeichnung={data}
                                        text={'checkbox'}
                                        name={'confirmed' + data}
                                        value={this.state.confirmeddonnerstag}
                                        confirmed={this.state.confirmeddonnerstag}
                                        handleChangeInputValue={this.handleValue}
                                        showText={true}
                                    />
                                    <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={officeTime} confirmed={this.state.confirmeddonnerstag} />
                                </>
                            );

                        } else {
                            let myOfficetimes = OfficeTimes(data);
                            let nachMittahTrue = nachMittag(data);
                            let vormittagEnde = VormittagEnde(data);
                            if (nachMittahTrue) {
                                // console.log(this.state.confirmedmontagnachmittag);
                                donnerstagRow.push(
                                    <>
                                        <TimePickerCheckBox
                                            key={data}
                                            formbezeichnung={data}
                                            text={'checkbox'}
                                            name={'confirmed' + data}
                                            value={this.state.confirmeddonnerstagnachmittag}
                                            confirmed={this.state.confirmeddonnerstagnachmittag}
                                            handleChangeInputValue={this.handleValue}
                                            showText={false}
                                        />
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmeddonnerstagnachmittag} />
                                    </>
                                );
                            } else if (vormittagEnde) {
                                // console.log('slslsls')
                                // console.log(data)
                                donnerstagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmeddonnerstag} />
                                    </>
                                );
                            } else {
                                donnerstagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmeddonnerstagnachmittag} />
                                    </>
                                );
                            }
                        }
                    } else if (freitag.includes(data)) {
                        if ('freitag' === data) {
                            officeTime = '09:00'
                            freitagRow.push(
                                <>
                                    {/* <label style={{ 'margin': '10px' }} >{data}</label> */}
                                    <TimePickerCheckBox
                                        key={data}
                                        formbezeichnung={data}
                                        text={'checkbox'}
                                        name={'confirmed' + data}
                                        value={this.state.confirmedfreitag}
                                        confirmed={this.state.confirmedfreitag}
                                        handleChangeInputValue={this.handleValue}
                                        showText={true}
                                    />
                                    <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={officeTime} confirmed={this.state.confirmedfreitag} />
                                </>
                            );

                        } else {
                            let myOfficetimes = OfficeTimes(data);
                            let nachMittahTrue = nachMittag(data);
                            let vormittagEnde = VormittagEnde(data);
                            if (nachMittahTrue) {
                                // console.log(this.state.confirmedmontagnachmittag);
                                freitagRow.push(
                                    <>
                                        <TimePickerCheckBox
                                            key={data}
                                            formbezeichnung={data}
                                            text={'checkbox'}
                                            name={'confirmed' + data}
                                            value={this.state.confirmedfreitagnachmittag}
                                            confirmed={this.state.confirmedfreitagnachmittag}
                                            handleChangeInputValue={this.handleValue}
                                            showText={false}
                                        />
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedfreitagnachmittag} />
                                    </>
                                );
                            } else if (vormittagEnde) {
                                // console.log('slslsls')
                                // console.log(data)
                                freitagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedfreitag} />
                                    </>
                                );
                            } else {
                                freitagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedfreitagnachmittag} />
                                    </>
                                );
                            }

                        }
                    } else if (samstag.includes(data)) {
                        if ('samstag' === data) {
                            officeTime = '09:00'
                            samstagRow.push(
                                <>
                                    {/* <label style={{ 'margin': '10px' }} >{data}</label> */}
                                    <TimePickerCheckBox
                                        key={data}
                                        formbezeichnung={data}
                                        text={'checkbox'}
                                        name={'confirmed' + data}
                                        value={this.state.confirmedsamstag}
                                        confirmed={this.state.confirmedsamstag}
                                        handleChangeInputValue={this.handleValue}
                                        showText={true}
                                    />
                                    <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={officeTime} confirmed={this.state.confirmedsamstag} />
                                </>
                            );

                        } else {
                            let myOfficetimes = OfficeTimes(data);
                            let nachMittahTrue = nachMittag(data);
                            let vormittagEnde = VormittagEnde(data);
                            if (nachMittahTrue) {
                                // console.log(this.state.confirmedmontagnachmittag);
                                samstagRow.push(
                                    <>
                                        <TimePickerCheckBox
                                            key={data}
                                            formbezeichnung={data}
                                            text={'checkbox'}
                                            name={'confirmed' + data}
                                            value={this.state.confirmedsamstagnachmittag}
                                            confirmed={this.state.confirmedsamstagnachmittag}
                                            handleChangeInputValue={this.handleValue}
                                            showText={false}
                                        />
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsamstagnachmittag} />
                                    </>
                                );
                            } else if (vormittagEnde) {
                                // console.log('slslsls')
                                // console.log(data)
                                samstagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsamstag} />
                                    </>
                                );
                            } else {
                                samstagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsamstagnachmittag} />
                                    </>
                                );
                            }

                        }
                    } else if (sonntag.includes(data)) {
                        if ('sonntag' === data) {
                            officeTime = '09:00'
                            sonntagRow.push(
                                <>
                                    {/* <label style={{ 'margin': '10px' }} >{data}</label> */}
                                    <TimePickerCheckBox
                                        key={data}
                                        formbezeichnung={data}
                                        text={'checkbox'}
                                        name={'confirmed' + data}
                                        value={this.state.confirmedsonntag}
                                        confirmed={this.state.confirmedsonntag}
                                        handleChangeInputValue={this.handleValue}
                                        showText={true}
                                    />
                                    <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={officeTime} confirmed={this.state.confirmedsonntag} />
                                </>
                            );

                        } else {
                            let myOfficetimes = OfficeTimes(data);
                            let nachMittahTrue = nachMittag(data);
                            let vormittagEnde = VormittagEnde(data);
                            if (nachMittahTrue) {
                                // console.log(this.state.confirmedmontagnachmittag);
                                sonntagRow.push(
                                    <>
                                        <TimePickerCheckBox
                                            key={data}
                                            formbezeichnung={data}
                                            text={'checkbox'}
                                            name={'confirmed' + data}
                                            value={this.state.confirmedsonntagnachmittag}
                                            confirmed={this.state.confirmedsonntagnachmittag}
                                            handleChangeInputValue={this.handleValue}
                                            showText={false}
                                        />
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsonntagnachmittag} />
                                    </>
                                );
                            } else if (vormittagEnde) {
                                // console.log('slslsls')
                                // console.log(data)
                                sonntagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsonntag} />
                                    </>
                                );
                            } else {
                                sonntagRow.push(
                                    <>
                                        <label style={{ 'margin': '10px' }} >{' - '}</label>
                                        <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsonntagnachmittag} />
                                    </>
                                );
                            }
                        }
                    } else {
                        // console.log(data)
                        if (data === "altAndTitleAttribute") return;
                        if (data === "singleTitleAttribute") return;
                        if (data === 'blockoftext') {
                            newRows.push(
                                <React.Fragment key={data}>
                                    <FormElements
                                        key={data}
                                        formbezeichnung={data}
                                        text={'textarea'}
                                        name={data}
                                        value={this.state.data}
                                        handleChangeInputValue={this.handleChange}
                                    />
                                    <ErrorDisplay key={data + '_error'} error={errors[data]} />
                                </React.Fragment>
                            );
                        } else {
                            newRows.push(
                                <React.Fragment key={data + index}>
                                    <FormElements
                                        key={data}
                                        formbezeichnung={data}
                                        text={'text'}
                                        name={data}
                                        value={this.state.data}
                                        handleChangeInputValue={this.handleChange}
                                    />
                                    <ErrorDisplay key={index} error={errors[data]} />
                                    {/* <TimePickerExample /> */}
                                </React.Fragment>
                            );
                        }
                    }
                }
            }
        });
        if (Cookies.get('myRedirect') === 'true') {
            console.log(this.state);
            console.log(this.state.file);
            return <PrimeCustomerTemporaryStorage
                massage="easyDown"
                file={this.state.file}
                multipleFile={this.state.multipleFile}
                base64File={this.state.base64File}
                base64MultipleFile={this.state.base64MultipleFile}
                state={this.state}
                imageList={this.state.imageList}
                portraitImageList={this.state.portraitImageList}
            />;
        }
        if (myRedirect === false) {
            return (
                <React.Fragment>
                    <div style={timePickerWrapperStyle}>
                        <Form onSubmit={this.handleSubmit}>
                            {newRows}{errors.name.length > 0 &&
                                <span>{errors.name}</span>}
                            <div>
                                {/* TODO: for form-for-start-page */}
                                {imgPreview}
                                {/* <p onClick={this.removeProfileImage}>delete image</p> */}
                                {deleteButton}
                                {imageAltAttribute}
                                <ErrorDisplay error={errors.singleTitleAttribute['imageAlt']} />
                                {/* {errorMessage} */}
                                <br></br>
                                {imageTitleAttribute}
                                <ErrorDisplay error={errors.singleTitleAttribute['imageTitle']} />
                            </div>
                            {/* TODO: do it */}
                            <ImageHiddenUploadHandler
                                onAddingImage={this.onAddingProfileImage}
                                key={null}
                                myRef={this.imageUpload}
                            />

                            <ErrorDisplay key={'first'} error={errors['testSize']} />
                            <ErrorDisplay key={'imagebackgroundlink'} error={errors['imagebackgroundlink']} />
                            {/* TODO: Check this stuff out */}
                            <ButtonWithEventHandler onClickInput={this.onClickInput} />
                            <div class="flex-container" style={timePickerWrapperStyle}>
                                <h4>Ordinationszeiten</h4>
                                {timePickerRowSecond}
                                <div></div>
                                {dienstagRow}
                                <div></div>
                                {mittwochRow}
                                <div></div>
                                {donnerstagRow}
                                <div></div>
                                {freitagRow}
                                <div></div>
                                {samstagRow}
                                <div></div>
                                {sonntagRow}
                            </div>
                            <FormButton value={'submit'} fileUploader={this.fileUploader} />
                            {this.state.anErrorOcurred ? <Badge style={{ "padding": "12px", "marginLeft": "10px" }} color="danger">You have to fill out the form completely</Badge> : ''}
                        </Form>
                    </div>
                </React.Fragment>
            );
        } else {
            // console.log('myRedirect === other');
            return <h1>Error</h1>;
        }

    }
}

export default FormForProfiles;
