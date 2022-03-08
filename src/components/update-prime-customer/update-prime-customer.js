
import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Badge } from 'reactstrap';
import { timePickerWrapperStyle } from './style-objects';
import FormElements,
{
    CheckBox,
    ImageUploadHandler,
    ImageHiddenUploadHandler,
    OptionCategorySelector,
    OptionSelectorWithSelectedCategory,
    OptionsSelector,
    ButtonWithEventHandler,
    TimePickerCheckBox,
    TimePickerExample
} from 'components/atoms';
import ConditionsOnImageFileSize,
{
    OnLegthOfPortaitImageArray,
    ReduceToCurrentImage
} from 'components/conditions-on-image-size';
import {
    ErrorDisplay,
    MySwitchForPrimeUser
} from 'components/conditional-components';
import StrippingExifData from 'components/stripping-exif-data';
import {
    ImageValidationWithStateManupulation,
    FileSize,
    PictureMaximum,
    NoSameImagesInArray
} from 'components/image-validation';
import { EscapeHtml, OfficeTimes, nachMittag, VormittagEnde } from 'components/regex-collection';
import { altAndTitleAttribute, singleTitleAttribute } from 'components/update-prime-customer/alt-and-title-attribute';

// import UpdatePrimeCustomerComponent from 'components/updated-article-component';
// const UpdatePrimeCustomerComponent = React.lazy(() => import('components/updated-article-component'));
const UpdatePrimeCustomerComponent = React.lazy(() => import('components/update-prime-customer-component'));
var CancelToken;
var source;
class UpdatePrimeCustomer extends React.Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props);
        this.storage = this.props.location.state ? this.props.location.state.data : this.props.items;
        this.imageUpload = React.createRef();
        this.secondImageUpload = React.createRef();
        // console.log(this.storage);
        // console.log('another UpdatePrimeCustomer');
        // console.log(props);
        this.state = {
            isLoaded: false,
            articleImage: [],
            imageList: [],
            response: {},
            data: this.props.location.state ? this.props.location.state.data : this.props.items,
            id: null,
            file: null,
            multipleFile: [null],
            errors: {
                name: '',
                krankenkassen: '',
                adresse: '',
                bundesland: '',
                postleitzahl: '',
                description: '',
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
                specialization: '',
                stadt: '',
                title: '',
                gesprochenesprache: '',
                imagebackgroundlink: '',
                imagelink: '',
                inhaltbewertungsbutton: '',
                votes: 0,
                imageExtension: '',
                fileSizeToBig: '',
                pictureMaximum: '',
                noSameImagesInArray: '',
                testSize: '',
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
                telefonnumber: '',
                // FIXME:object inserted
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
        }
        // console.log(this.state.data);
    }

    // nesteing and names may be different
    imageTitleAndAltAttribute = (event) => {
        const { name, value } = event.target;

        let errors = this.state.errors;
        MySwitchForPrimeUser(name, errors, value);
        this.setState({
            data: {
                ...this.state.data,
                altAndTitleAttribute: {
                    ...this.state.data.altAndTitleAttribute,
                    [name]: value,
                }
            },
        });
        // https://www.semicolonworld.com/question/71633/how-do-i-setstate-for-nested-object

    }

    // nesteing and names may be different
    singleTitleAndAltAttribute = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        // this.state.date analyse data structure to properly update state
        // console.log(this.state.data);
        // console.log(name);
        // console.log(value);
        MySwitchForPrimeUser(name, errors, value);
        this.setState({
            data: {
                ...this.state.data,
                singleTitleAttribute: {
                    ...this.state.data.singleTitleAttribute,
                    [name]: value,
                }
            },
        });
    }
    componentDidMount() {
        const { errors } = this.state;
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        MySwitchForPrimeUser('imagelink', errors, false);
        MySwitchForPrimeUser('imagebackgroundlink', errors, false);
        // this.forceUpdate();//forceUpdate ncht mehr nötig, da jetzt setState unten
        this.setState({
            data: {
                ...this.state.data,
                anErrorOcurred: false,
                altAndTitleAttribute,
                singleTitleAttribute
            }
        });
    }
    onClickInput = () => {
        // console.log(this.imageUpload.current);
        this.imageUpload.current.click();
    }
    onClickSeondInput = () => {
        // console.log(this.imageUpload.current);
        this.secondImageUpload.current.click();
    }
    previewImages = (event) => {
        // console.log(event);
        this.fileObj.push(event);
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ multipleFile: this.fileArray })
    }
    onAddingImage = event => {
        // console.log('ADDING IMAGE');
        // this.previewImages(event);
        const { errors } = this.state;
        // this.fileObj.push(event.target.files)
        // for (let i = 0; i < this.fileObj[0].length; i++) {
        //     this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        // }
        // this.setState({ multipleFile: this.fileArray })
        // console.log(event.target.files[0].size);//max 1,8 MB 3000x2300 to max 1600x1000
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
            // console.log("EventTarget");
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
    removeImages = (props, index) => {
        const { errors, imageList } = this.state;
        // console.log('remove Images');
        // console.log(props);
        // console.log(index);
        // remove Images
        // that the problem
        // https://www.w3schools.com/code/tryit.asp?filename=GNBNOYB883B4
        // console.log(this.fileArray);
        if (index !== 0) {
            this.fileArray.splice(index, 1);
            this.removeSetState(index, 1);
        } else {
            this.removeSetState(0, 1);
            this.fileArray.splice(0, 1);
        }
    }
    removeSetState = (index, secondIndex) => {
        const { errors, imageList } = this.state;
        imageList.splice(index, secondIndex);
        this.setState({
            imageList: imageList.concat([]),
            multipleFile: [null]
        },
            () => {
                // console.log(this.state.articleImage);
                MySwitchForPrimeUser('imagelink', errors, this.state.imageList.length > 0);
                this.forceUpdate();
            }
        );

    }
    previewSingleImage = (event) => {

        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        });
    }

    onAddingProfileImage = event => {
        // console.log('ADDING Profile IMAGE');
        const { errors } = this.state;
        // this.previewSingleImage(event);
        // console.log(event.target.files[0]);
        let _this = this;
        async function watingOnStrippedImage(lengthOfPortraitArrayApporved, fileSizeIsApproved) {
            // console.log('befor stripping');
            let FileSizeIsApproved = fileSizeIsApproved;
            var imageExifStripped = await StrippingExifData(event);
            _this.resumeAfterEXIFStripping(imageExifStripped, lengthOfPortraitArrayApporved, FileSizeIsApproved);
        }
        this.forceUpdate = this.forceUpdate.bind(this);
        let lengthOfPortraitList = this.state.articleImage.length;
        let fileSizeIsApproved = ConditionsOnImageFileSize(event, this.state.errors, this.forceUpdate);
        // console.log(fileSizeIsApproved);
        let lengthOfPortraitArrayApporved = OnLegthOfPortaitImageArray(lengthOfPortraitList);
        watingOnStrippedImage(lengthOfPortraitArrayApporved, fileSizeIsApproved);
        if (fileSizeIsApproved) this.previewSingleImage(event);
    }
    resumeAfterEXIFStripping = (imageExifStripped, lengthOfPortraitArrayApporved, fileSizeIsApproved) => {
        // console.log('resumeAfterEXIFStripping');
        // console.log(fileSizeIsApproved);
        const { errors } = this.state;
        // console.log(lengthOfPortraitArrayApporved);
        if (lengthOfPortraitArrayApporved && fileSizeIsApproved) {
            // console.log('length approved');
            this.setState({
                articleImage: this.state.articleImage.concat(imageExifStripped)
            },
                () => {
                    // console.log(this.state.articleImage);
                    MySwitchForPrimeUser('imagebackgroundlink', errors, this.state.articleImage.length > 0);
                    this.forceUpdate();
                }
            );
        } else if (lengthOfPortraitArrayApporved === false && fileSizeIsApproved) {
            // console.log('length NOT approved');
            this.setState({
                articleImage: ReduceToCurrentImage(this.state.articleImage, imageExifStripped)
            },
                () => {
                    // console.log(this.state.articleImage);
                    MySwitchForPrimeUser('imagebackgroundlink', errors, this.state.articleImage.length > 0);
                    this.forceUpdate();
                }
            )
        } else {
            // console.log('nOTHING');
        }
    }
    removeProfileImage = (props) => {
        const { id, data, articleImage, imageList, errors } = this.state;
        // console.log(props);
        // console.log('ImageREmoved');
        // console.log(articleImage);
        this.setState({
            articleImage: [],
            file: null
        },
            () => {
                // console.log(this.state.articleImage);
                MySwitchForPrimeUser('imagebackgroundlink', errors, this.state.articleImage.length > 0);
                this.forceUpdate();
            }
        );
    }
    componentWillUnmount() {
        // console.log('Update Route will unmount');
        source.cancel();
    }
    stateUpdater = (data) => {
        // console.log(data);
        this.setState(prevState => {
            // console.log(prevState);
            // console.log(prevState.errors.singleTitleAttribute);
            let errors = Object.assign({}, prevState.errors);
            // console.log(errors[data]);
            // console.log(data);
            errors[data] = 'NOT ACCEPTED: No ' + data + ' added';
            // console.log(errors);
            return { errors };
        }
        );
    }
    validateFormInputBeforSubmission = () => {
        //TODO:https://www.npmjs.com/package/object.entries
        // console.log(this.state.data);
        var submitForm = true;
        for (let [key, value] of Object.entries(this.state.data)) {
            // console.log(`${key}: ${value}`);
            const keyIncludes = [
                'created_at',
                'updated_at',
                'deleted_at',
                'confirmed',
                'id',
                'inhaltbewertungsbutton',
                'votes',
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
                'altandtitleattribute',
                'singletitleattribute',
                'altAndTitleAttribute',
                'singleTitleAttribute',
                'anErrorOcurred',
            ];
            if (keyIncludes.includes(key)) {

                // console.log(key + 'so good data');
                // console.log(`${key}: ${value}`);
            } else {
                // console.log(`${key}: ${value}`);
                if (!(value.length > 0)) {
                    // console.log('drinnen');
                    // console.log(key);
                    // console.log(`${key}: ${value.length}`);
                    submitForm = false;
                    this.stateUpdater(key);
                }
            }
        }
        return submitForm;
    }
    formValidator = () => {
        // console.log('formValidator');
        const { errors } = this.state;
        var valid = true;
        let formValidation = new RegExp(/^\s*NOT\s*ACCEPTED/g);
        Object.values(errors).forEach((val) => {
            // console.log(val);
            formValidation.test(val) && (valid = false);
        });
        return valid;
    }
    statePortraitTitleAndAttributeUpdater = (data) => {
        // console.log(data);
        this.setState(prevState => {
            // console.log(prevState);
            let errors = Object.assign({}, prevState.errors);
            // console.log(errors.altAndTitleAttribute[data]);
            errors.singleTitleAttribute[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }
    portraitValidationForImageAltAndTitleAttribute = () => {

        console.log(this.state);
        const errorArray = [
        ];
        var submitForm = true;

        for (let [key, value] of Object.entries(this.state.data.singleTitleAttribute)) {

            if (errorArray.includes(key)) {
                // console.log(key);
            } else {
                // console.log(`${key}: ${value}`);
                if (!(value.length > 0)) {
                    // console.log('drinnen');
                    submitForm = false;

                    this.statePortraitTitleAndAttributeUpdater(key);
                }
            }

        }
        return submitForm;
    }


    stateTitleAndAttributeUpdater = (data) => {
        // console.log(data);
        // console.log(this.state);
        this.setState(prevState => {
            // console.log(prevState);
            // console.log(data);
            let errors = Object.assign({}, prevState.errors);
            // console.log(errors.altAndTitleAttribute[data]);
            // console.log(errors);

            // Checking validation steps esp: conditions and updateArticle()...
            errors.altAndTitleAttribute[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }

    extraValidationForImageAltAndTitleAttribute = () => {
        // console.log(this.fileArray);
        // console.log(Object.keys(this.state.data.altAndTitleAttribute));
        // this.fileObjBase64.length
        const errorArray = [
        ];
        var submitForm = true;
        var counter = 0;
        for (let [key, value] of Object.entries(this.state.data.altAndTitleAttribute)) {
            // console.log(`${key}: ${value}`);
            // errorArray.includes(key)
            counter++;
            if (counter <= (this.fileArray.length * 2)) {
                if (errorArray.includes(key)) {
                    // console.log(key);
                } else {
                    // console.log(`${key}: ${value}`);
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
    updateArticle() {
        const { id, data, articleImage, imageList, errors } = this.state;
        console.log('START');
        // console.log(this.state);
        // console.log(errors);

        var trueOrNot = this.validateFormInputBeforSubmission();
        // console.log(this.state);
        let extraTrueORNot = this.extraValidationForImageAltAndTitleAttribute();
        let portraitTrueOrNot = this.portraitValidationForImageAltAndTitleAttribute();
        // console.log(extraTrueORNot);
        // console.log(portraitTrueOrNot);
        // return null;
        var trueOrNot = articleImage.length > 0 && trueOrNot;
        // console.log(trueOrNot);
        // console.log(trueOrNot);

        var checkValidation = this.formValidator();
        // console.log(checkValidation);
        if (checkValidation === false) {
            trueOrNot = false;
        }

        if (trueOrNot === false || extraTrueORNot === false || portraitTrueOrNot === false || !(this.fileArray.length >= 3)) {
            console.log('trueOrNot is false: BLOCK');
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
        let confirmed;
        // console.log(data);
        // return;
        // const formData = new FormData();
        // if (!(articleImage.length > 0)) {
        // console.log('STOP IMAGE NOT')
        //     return null;
        // }
        if (data.confirmed) {
            confirmed = 1;
        } else {
            confirmed = 0;
        }

        // Below code from from-for-profiles-component.js line 3.02 and onwards
        if (this.state.data.title.length === 0 || this.state.data.specialization.length === 0) {
            // console.log('Option is null')
            return null;
        }
        const string = process.env.REACT_APP_TEN_NAMES_FOR_IMAGE_ARRAY;
        let imageNames = string.split(",");
        imageNames.length = imageList.length;
        var imageString = JSON.stringify(imageNames);
        // console.log(imageList);
        const formData = new FormData();
        formData.append('portraitImage', articleImage[0], articleImage[0].name);
        for (let i = 0; i < imageList.length; i++) {
            formData.append(imageNames[i], imageList[i], imageList[i].name);
        }
        // Above code form from-for-profiles-component.js
        // Notbehelf:
        const testOmio = ['storage/article/nnn/test-bild-mittel-160kb-reduced_1587971312.jpg',
            'storage/article/nnn/test-bild-mittel-160kb-reduced_1587971312.jpg',
            'storage/article/nnn/test-bild-mittel-160kb-reduced_1587971312.jpg'];
        const test = JSON.stringify(['storage/article/nnn/test-bild-mittel-160kb-reduced_1587971312.jpg',
            'storage/article/nnn/test-bild-mittel-160kb-reduced_1587971312.jpg',
            'storage/article/nnn/test-bild-mittel-160kb-reduced_1587971312.jpg']);
        const tesOmioSecond = 'storage/article/nnn/test-bild-mittel-160kb-reduced_1587971312.jpg';
        //
        // console.log(data);
        // console.log('sommmmemmememUPPPP');
        // console.log(data.imagelink);
        var altAndTitleAttributeString = JSON.stringify(data.altAndTitleAttribute);
        var singleTitleAttributeString = JSON.stringify(data.singleTitleAttribute);
        // console.log(data);
        formData.append('id', data.id);
        formData.append('adresse', data.adresse);
        formData.append('altandtitleattribute', altAndTitleAttributeString);
        formData.append('singletitleattribute', singleTitleAttributeString);
        formData.append('telefonnumber', data.telefonnumber);
        formData.append('bundesland', data.bundesland);
        formData.append('description', data.description);
        formData.append('dienstag', data.dienstag);
        formData.append('donnerstag', data.donnerstag);
        formData.append('emailaddresse', data.emailaddresse);
        formData.append('freitag', data.freitag);
        formData.append('gesprochenesprache', data.gesprochenesprache);
        formData.append('inhaltbewertungsbutton', 'mydata');//data.inhaltbewertungsbutton
        formData.append('krankenkassen', data.krankenkassen);
        formData.append('mittwoch', data.mittwoch);
        formData.append('montag', data.montag);
        formData.append('name', data.name);
        formData.append('postleitzahl', data.postleitzahl);
        formData.append('samstag', data.samstag);
        formData.append('sonntag', data.sonntag);
        formData.append('specialization', data.specialization);
        formData.append('stadt', data.stadt);
        formData.append('title', data.title);
        formData.append('votes', data.votes);
        formData.append('_method', 'PATCH');
        formData.append(CancelToken, source.token);
        formData.append('namearray', imageString);
        formData.append('portraitFoto', 'portraitImage');
        formData.append('namearrayImageLinks', test);
        formData.append('portraitImageLink', tesOmioSecond);
        formData.append('confirmedmontag', data.confirmedmontag);
        formData.append('confirmedmontagnachmittag', data.confirmedmontagnachmittag);
        formData.append('confirmeddienstag', data.confirmeddienstag);
        formData.append('confirmeddienstagnachmittag', data.confirmeddienstagnachmittag);
        formData.append('confirmedmittwoch', data.confirmedmittwoch);
        formData.append('confirmedmittwochnachmittag', data.confirmedmittwochnachmittag);
        formData.append('confirmeddonnerstag', data.confirmeddonnerstag);
        formData.append('confirmeddonnerstagnachmittag', data.confirmeddonnerstagnachmittag);
        formData.append('confirmedfreitag', data.confirmedfreitag);
        formData.append('confirmedfreitagnachmittag', data.confirmedfreitagnachmittag);
        formData.append('confirmedsamstag', data.confirmedsamstag);
        formData.append('confirmedsamstagnachmittag', data.confirmedsamstagnachmittag);
        formData.append('confirmedsonntag', data.confirmedsonntag);
        formData.append('confirmedsonntagnachmittag', data.confirmedsonntagnachmittag);
        formData.append('montag', data.montag);
        formData.append('montagvormittagende', data.montagvormittagende);
        formData.append('montagnachmittag', data.montagnachmittag);
        formData.append('montagnachmittagende', data.montagnachmittagende);
        formData.append('dienstag', data.dienstag);
        formData.append('dienstagvormittagende', data.dienstagvormittagende);
        formData.append('dienstagnachmittag', data.dienstagnachmittag);
        formData.append('dienstagnachmittagende', data.dienstagnachmittagende);
        formData.append('mittwoch', data.mittwoch);
        formData.append('mittwochvormittagende', data.mittwochvormittagende);
        formData.append('mittwochnachmittag', data.mittwochnachmittag);
        formData.append('mittwochnachmittagende', data.mittwochnachmittagende);
        formData.append('donnerstag', data.donnerstag);
        formData.append('donnerstagvormittagende', data.donnerstagvormittagende);
        formData.append('donnerstagnachmittag', data.donnerstagnachmittag);
        formData.append('donnerstagnachmittagende', data.donnerstagnachmittagende);
        formData.append('freitag', data.freitag);
        formData.append('freitagvormittagende', data.freitagvormittagende);
        formData.append('freitagnachmittag', data.freitagnachmittag);
        formData.append('freitagnachmittagende', data.freitagnachmittagende);
        formData.append('samstag', data.samstag);
        formData.append('samstagvormittagende', data.samstagvormittagende);
        formData.append('samstagnachmittag', data.samstagnachmittag);
        formData.append('samstagnachmittagende', data.samstagnachmittagende);
        formData.append('sonntag', data.sonntag);
        formData.append('sonntagvormittagende', data.sonntagvormittagende);
        formData.append('sonntagnachmittag', data.sonntagnachmittag);
        formData.append('sonntagnachmittagende', data.sonntagnachmittagende);
        // cancelToken: source.token
        // api / loggedin / prime / { prime }
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post(process.env.REACT_APP_URL + `api/loggedin/prime/${id}`, formData)
            .then(res => {
                // console.log(res);
                // console.log(res.data);

                this.setState({
                    isLoaded: true,
                    response: res
                });

            }).catch(error => {
                // console.log(error.message);

            });
    }
    updateYourArticle = (event) => {
        event.preventDefault();
        // console.log('UPDATE YOUR ARTICLE');
        this.updateArticle();
    }
    handleValueOfInputfield = (event) => {
        const { name, value, checked } = event.target;
        // console.log('checked');
        // console.log(name);
        // console.log(value);
        // console.log(checked);
        // console.log(this.state.data);
        var newValue;
        if (name === 'confirmed') {
            newValue = checked;
        } else {
            newValue = value;
        }
        let errors = this.state.errors;
        MySwitchForPrimeUser(name, errors, value);
        // const saveValue = EscapeHtml(value);
        this.setState(prevState => {
            let data = Object.assign({}, prevState.data);
            data[name] = value;
            return { data };
        });
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


        this.setState(prevState => {
            let data = Object.assign({}, prevState.data);
            data[name] = datestring;
            return { data };
        },
            () => {
                // console.log(this.state);
            }
        )
    }

    render() {
        // console.log("RENDER");
        const { data, isLoaded, errors, response, file } = this.state;
        console.log(data);
        // console.log(this.state);
        const timePickerRowSecond = [];
        const dienstagRow = [];
        const mittwochRow = [];
        const donnerstagRow = [];
        const freitagRow = [];
        const samstagRow = [];
        const sonntagRow = [];
        const montag = ['montag', 'montagvormittagende', 'montagnachmittag', 'montagnachmittagende'];
        const dienstag = ['dienstag', 'dienstagvormittagende', 'dienstagnachmittag', 'dienstagnachmittagende'];
        const mittwoch = ['mittwoch', 'mittwochvormittagende', 'mittwochnachmittag', 'mittwochnachmittagende'];
        const donnerstag = ['donnerstag', 'donnerstagvormittagende', 'donnerstagnachmittag', 'donnerstagnachmittagende'];
        const freitag = ['freitag', 'freitagvormittagende', 'freitagnachmittag', 'freitagnachmittagende'];
        const samstag = ['samstag', 'samstagvormittagende', 'samstagnachmittag', 'samstagnachmittagende'];
        const sonntag = ['sonntag', 'sonntagvormittagende', 'sonntagnachmittag', 'sonntagnachmittagende'];
        const skippedItems = [
            'created_at',
            'updated_at',
            'id',
            'deleted_at',
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
            'confirmedsonntagnachmittag',];
        let imgPreview;
        if (file) {
            imgPreview = <img src={file} alt='' width="200" />;
        }
        const deleteButton = file ? <p onClick={this.removeProfileImage}>delete image</p> : '';
        if (isLoaded) {
            console.log('isLoaded');
            console.log(response);
            return (
                // null
                <div>
                    <h1>Redirect</h1>
                    <div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <UpdatePrimeCustomerComponent id={data.id} />
                        </Suspense>
                    </div>
                </div>
            );

        } else {

            var keys = Object.keys || require('object-keys');
            const myState = this.state;
            const arrayOfkeyOfState = keys(this.state.data);
            let myNuberArray = process.env.REACT_APP_TEN_NAMES_FOR_IMAGE_ARRAY_NAME.split(",",);
            const imageAltAttribute = file ? <input name="imageAlt" placeholder="Add Alt Attribute" onChange={this.singleTitleAndAltAttribute}></input> : '';
            const imageTitleAttribute = file ? <input name="imageTitle" placeholder="Add Title Attribute" onChange={this.singleTitleAndAltAttribute}></input> : '';
            return (
                <div style={timePickerWrapperStyle}>
                    <Form>{arrayOfkeyOfState.map((data, index) => {
                        // console.log(data);
                        if (skippedItems.includes(data)) {
                            return null;
                        }
                        if (data === 'imagebackgroundlink') {
                            // console.log('imagebackgroundlinek');
                            return (
                                <React.Fragment key={data}>
                                    <div>
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
                                    <ImageHiddenUploadHandler
                                        onAddingImage={this.onAddingProfileImage}
                                        key={data}
                                        myRef={this.imageUpload}
                                    />
                                    <ErrorDisplay key={data + '_error'} error={errors[data]} />
                                    <ErrorDisplay key={'testSize'} error={errors['testSize']} />
                                    <ButtonWithEventHandler onClickInput={this.onClickInput} />
                                    {/* testSize */}
                                </React.Fragment>
                            );
                        }
                        if (data === 'imagelink') {
                            // console.log(errors);
                            // console.log(data);

                            return (
                                <React.Fragment key={data}>
                                    <div className="form-group multi-preview">
                                        {(this.fileArray || []).map((url, index) => {
                                            // console.log(myNuberArray[index]);
                                            return (
                                                <>
                                                    <img key={url + 'img'} src={url} alt="..." width="200" />
                                                    <p key={url + 'pOne'} onClick={(props) => this.removeImages(props, index)}>delete image</p>
                                                    {/* TODO_check data structer */}
                                                    <input key={url + 'inputOne'} name={myNuberArray[index] + "Alt"} onChange={this.imageTitleAndAltAttribute} placeholder="Add Alt Attribute"></input>
                                                    <ErrorDisplay key={myNuberArray[index] + "Alt"} error={errors.altAndTitleAttribute[myNuberArray[index] + "Alt"]} />
                                                    <br></br>
                                                    <input key={url + 'inputZwo'} name={myNuberArray[index] + "Title"} onChange={this.imageTitleAndAltAttribute} placeholder="Add Title Attribute"></input>
                                                    <ErrorDisplay key={myNuberArray[index] + "Title"} error={errors.altAndTitleAttribute[myNuberArray[index] + "Title"]} />
                                                    {/* anErrorOcurred doesn`t exist */}
                                                    {this.fileArray.length >= 3 ? '' : <p
                                                        style={this.state.anErrorOcurred ? { "color": "white", "backgroundColor": "red" } : { "color": "white" }}
                                                    >NOT ACCEPTED:Mindestes 3 Bilder hinzufügen</p>}
                                                </>
                                            )
                                        })}
                                    </div>
                                    <ImageHiddenUploadHandler
                                        onAddingImage={this.onAddingImage}
                                        key={null}
                                        myRef={this.secondImageUpload}
                                    />
                                    <ErrorDisplay key={data + '_error'} error={errors[data]} />
                                    <ErrorDisplay key={index} error={errors['imageExtension']} />
                                    <ErrorDisplay key={'jochen'} error={errors['fileSizeToBig']} />
                                    <ErrorDisplay key={'franz'} error={errors['noSameImagesInArray']} />
                                    <ErrorDisplay key={'georg'} error={errors['pictureMaximum']} />
                                    <ButtonWithEventHandler onClickInput={this.onClickSeondInput} />
                                    {/* testSize */}
                                </React.Fragment>
                            );
                        }
                        if (data === "title" || data === "specialization") {
                            // console.log(data);
                            return (
                                <React.Fragment key={data}>
                                    <OptionsSelector
                                        handleChangeInputValue={this.handleValue}
                                        key={data}
                                        formbezeichnung={data}
                                        value={this.state.data[data]}
                                        desicion={data}
                                    />
                                    <ErrorDisplay key={data + '_error'} error={errors[data]} />
                                </React.Fragment>
                            );
                        }
                        if (data === 'inhaltbewertungsbutton' || data === 'votes') {
                            // console.log(data);
                            return (
                                null
                            );
                        } else {
                            let officeTime;
                            // console.log(data);
                            if (montag.includes(data)) {
                                if ('montag' === data) {
                                    officeTime = '09:00'
                                    // console.log(data);
                                    return (
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
                                    // console.log(data);
                                    let myOfficetimes = OfficeTimes(data);
                                    let nachMittahTrue = nachMittag(data);
                                    let vormittagEnde = VormittagEnde(data);
                                    if (nachMittahTrue) {
                                        // console.log(data);
                                        return (
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
                                        return (
                                            <>
                                                <label style={{ 'margin': '10px' }} >{' - '}</label>
                                                <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedmontag} />
                                            </>
                                        );
                                    } else {
                                        // console.log(data);
                                        // console.log('sksksk');
                                        return (
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
                                    return (
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
                                        return (
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
                                        return (
                                            <>
                                                <label style={{ 'margin': '10px' }} >{' - '}</label>
                                                <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmeddienstag} />
                                            </>
                                        );
                                    } else {
                                        return (
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
                                    return (
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
                                        return (
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
                                        return (
                                            <>
                                                <label style={{ 'margin': '10px' }} >{' - '}</label>
                                                <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedmittwoch} />
                                            </>
                                        );
                                    } else {
                                        return (
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
                                    return (
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
                                        return (
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
                                        return (
                                            <>
                                                <label style={{ 'margin': '10px' }} >{' - '}</label>
                                                <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmeddonnerstag} />
                                            </>
                                        );
                                    } else {
                                        return (
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
                                    return (
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
                                        return (
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
                                        return (
                                            <>
                                                <label style={{ 'margin': '10px' }} >{' - '}</label>
                                                <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedfreitag} />
                                            </>
                                        );
                                    } else {
                                        return (
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
                                    return (
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
                                        return (
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
                                        return (
                                            <>
                                                <label style={{ 'margin': '10px' }} >{' - '}</label>
                                                <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsamstag} />
                                            </>
                                        );
                                    } else {
                                        return (
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
                                    return (
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
                                        return (
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
                                        return (
                                            <>
                                                <label style={{ 'margin': '10px' }} >{' - '}</label>
                                                <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsonntag} />
                                            </>
                                        );
                                    } else {
                                        return (
                                            <>
                                                <label style={{ 'margin': '10px' }} >{' - '}</label>
                                                <TimePickerExample name={data} handleChangeInputValue={this.handleTimePickerChange} officeTime={myOfficetimes} confirmed={this.state.confirmedsonntagnachmittag} />
                                            </>
                                        );
                                    }
                                }
                            } else {
                                // if (data === "altandtitleattribute") return;
                                // if (data === "singletitleattribute") return;
                                if (data === "altandtitleattribute") return;
                                if (data === "singletitleattribute") return;
                                if (data === "altAndTitleAttribute") return;
                                if (data === "singleTitleAttribute") return;
                                if (data === "anErrorOcurred") return;
                                console.log(data);
                                console.log(errors[data]);
                                // console.log(errors['singleTitleAttribute']);

                                // TODO: to fix temporary condition to fix
                                if (data === 'bezirk' || data === 'thema') {

                                } else {
                                    return (
                                        <React.Fragment key={data}>
                                            <FormElements
                                                key={data}
                                                formbezeichnung={data}
                                                text={'text'}
                                                name={data}
                                                value={this.state.data[data]}
                                                handleChangeInputValue={this.handleValueOfInputfield}
                                            />
                                            <ErrorDisplay key={data + '_error'} error={errors[data]} />
                                        </React.Fragment>
                                    );
                                }
                            }
                        }
                    })}
                        <Button onClick={this.updateYourArticle}>{'Update your Prime Customer'}</Button>
                        {this.state.anErrorOcurred ? <Badge style={{ "padding": "12px", "marginLeft": "10px" }} color="danger">You have to fill out the form completely</Badge> : ''}
                    </Form>
                </div>
            );
        }
    }
}
export default UpdatePrimeCustomer;