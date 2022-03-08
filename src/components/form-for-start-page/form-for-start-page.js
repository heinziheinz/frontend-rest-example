import React from 'react';
import { Form, Input, Badge } from 'reactstrap';
import axios from 'axios';
import GetImageBlob, { BlobToBase64 } from 'components/image-conversion-to-blob';
import baseStringToFile, { urltoFile } from 'components/baste64-string-to-img-file';
import StrippingExifData from 'components/stripping-exif-data';
import FormElements, {
    FormButton,
    ImageUploadHandler,
    OptionCategorySelector,
    CheckBox,
    // TODO: added
    ImageHiddenUploadHandler,
    ButtonWithEventHandler,
} from 'components/atoms';

import {
    ErrorDisplay,
    MySwitchForPrimeUser
} from 'components/conditional-components';
// import { EscapeHtml } from 'components/regex-collection';
import ConditionsOnImageFileSize,
{
    OnLegthOfPortaitImageArray,
    ReduceToCurrentImage
} from 'components/conditions-on-image-size';
import FormForStartPageIndex from 'components/form-for-start-page-index';

export default class FormForProfiles extends React.Component {
    // TODO: added from form-for-profiles-component.js
    fileObj = [];
    fileArray = [];
    fileObjBase64 = [];
    fileArrayBase64 = [];
    imageTitleAttribute = [];
    imageAltAttribute = [];
    // ===
    constructor(props) {
        super(props);
        this.imageUpload = React.createRef();
        this.state = {
            category: '',
            headline: '',
            subheadline: '',
            captions: '',
            blockoftext: '',
            imagelink: [],
            arrayForCaptions: [],
            arrayForBlockOfText: [],
            portraitImageList: [],
            singleTitleAttribute: {
                imageAlt: '',
                imageTitle: '',
            },
            update: true,
            confirmed: false,
            anErrorOcurred: false,
            // TODO:file and base64... added
            file: null,
            base64File: null,
            errors: {
                category: '',
                imagelink: '',
                headline: '',
                subheadline: '',
                captions: '',
                blockoftext: '',
                fileSizeToBig: '',
                imageExtension: '',
                pictureMaximum: '',
                testSize: '',
                confirmed: '',
                singleTitleAttribute: {
                    imageAlt: '',
                    imageTitle: '',
                },
            }
        };
    }
    componentDidMount() {
        const { errors } = this.state;
        MySwitchForPrimeUser('imagelink', errors, false);
        // console.log(this.state);
        // this.setState({
        //     ...this.state,
        //     portraitImageList: [],
        //     singleTitleAttribute: {
        //         imageAlt: '',
        //         imageTitle: '',
        //     }
        // });
    }
    // TODO: add it
    onClickInput = () => {
        // console.log(this.imageUpload.current);
        this.imageUpload.current.click();
    }
    onAddingProfileImage = event => {
        let _this = this;
        let myEvent = event;
        async function watingOnStrippedImage(lengthOfPortraitArrayApporved, myEvent) {
            // console.log('befor stripping');
            var imageExifStripped = await StrippingExifData(event);
            _this.resumeAfterEXIFStripping(imageExifStripped, lengthOfPortraitArrayApporved, myEvent);
        }
        this.forceUpdate = this.forceUpdate.bind(this);
        let lengthOfPortraitList = this.state.imagelink.length;
        let fileSizeIsApproved = ConditionsOnImageFileSize(event, this.state.errors, this.forceUpdate);
        let lengthOfPortraitArrayApporved = OnLegthOfPortaitImageArray(lengthOfPortraitList);
        watingOnStrippedImage(lengthOfPortraitArrayApporved, myEvent);
    }

    resumeAfterEXIFStripping = (imageExifStripped, lengthOfPortraitArrayApporved, myEvent) => {
        const { errors } = this.state;
        // console.log('ResumeAfterEXIF strippinh');
        if (lengthOfPortraitArrayApporved) {
            this.previewSingleImage(myEvent);
            this.setState({
                imagelink: this.state.imagelink.concat(imageExifStripped)
            },
                () => {
                    MySwitchForPrimeUser('imagelink', errors, this.state.imagelink.length > 0);
                    this.forceUpdate();
                }
            );
        } else {
            this.previewSingleImage(myEvent);
            this.setState({
                imagelink: ReduceToCurrentImage(this.state.imagelink, imageExifStripped)
            },
                () => {
                    MySwitchForPrimeUser('imagelink', errors, this.state.imagelink.length > 0);
                    this.forceUpdate();
                }
            )
        }
    }

    formValidator = () => {
        const { errors } = this.state;
        var valid = true;
        let formValidation = new RegExp(/^\s*NOT\s*ACCEPTED/g);
        Object.values(errors).forEach((val) => {
            // console.log(val);
            formValidation.test(val) && (valid = false);
        });
        return valid;
    }

    handleChange = event => {
        // console.log(event);
        event.preventDefault();
        const { name, value } = event.target;
        // console.log(name);
        // console.log(value);
        let errors = this.state.errors;
        MySwitchForPrimeUser(name, errors, value);
        // const saveValue = EscapeHtml(value);
        // console.log(saveValue);
        this.setState({
            errors, [name]: value
        });
    }
    handleCheckbox = event => {
        // event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        // MySwitchForPrimeUser(name, errors, value);
        // console.log(this.state.confirmed);
        this.setState({
            errors, [name]: !this.state.confirmed
        });
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
    statePortraitTitleAndAttributeUpdater = (data) => {
        // console.log(data);
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            // console.log(errors.singleTitleAttribute[data]);
            errors.singleTitleAttribute[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }
    singleTitleAndAltAttribute = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        // console.log(name);
        // console.log(value);
        MySwitchForPrimeUser(name, errors, value);
        this.setState({
            singleTitleAttribute: {
                ...this.state.singleTitleAttribute,
                [name]: value,
            }
        });
    }
    portraitValidationForImageAltAndTitleAttribute = () => {
        // FIXME: Checkout how many images are in Array and remove the reminder
        // console.log(this.fileObjBase64);
        // console.log(this.fileArray);
        // console.log(Object.keys(this.state.singleTitleAttribute));
        // this.fileObjBase64.length
        const errorArray = [
        ];
        var submitForm = true;

        for (let [key, value] of Object.entries(this.state.singleTitleAttribute)) {

            if (errorArray.includes(key)) {
                // console.log(key);
            } else {
                // console.log(`${key}: ${value}`);
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
    validateFormInputBeforSubmission = () => {
        //   https://www.npmjs.com/package/object.entries
        var submitForm = true;
        for (let [key, value] of Object.entries(this.state)) {
            // console.log(`${key}: ${value}`);
            const keyIncludes = [
                'imagelink',
                'errors',
                'arrayForCaptions',
                'arrayForBlockOfText',
                'update',
                'confirmed',
                'anErrorOcurred',
                'portraitImageList',
                'base64File',
                'file',
                'articleImage',
                'singleTitleAttribute'
            ];
            if (keyIncludes.includes(key)) {
                // console.log(key + 'so good data');
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
    // TODO: form-for-start-page
    previewSingleImage = async (event) => {
        var myeventfile = event.target.files[0];
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
        // var letshow = urltoFile(base64File, 'mycat.jpg', 'image/jpeg').then(function (file) { console.log(file); });


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
                MySwitchForPrimeUser('imagelink', errors, this.state.articleImage.length > 0);
                this.forceUpdate();
                // console.log(base64File);
            }
        );
    }

    fileUploader = (event) => {
        // const { errors } = this.state;
        event.preventDefault();
        // console.log(this.state.headline);
        // console.log(this.state.subheadline);
        // console.log(this.state.captions);
        // console.log(this.state.category);
        // console.log(this.state.blockoftext);
        // console.log(this.state.confirmed);
        // console.log('UPLOAD NOW');
        let trueOrNot = this.validateFormInputBeforSubmission();
        let portraitTrueOrNot = this.portraitValidationForImageAltAndTitleAttribute();
        // console.log(portraitTrueOrNot);
        // let trueOrNot = true;

        // console.log('trueOrNot');
        // console.log(trueOrNot);
        if (trueOrNot || portraitTrueOrNot) {
            var checkValidation = this.formValidator();
            // console.log(checkValidation);
            if (checkValidation === false) {
                trueOrNot = false;
            }
        }
        if (trueOrNot === false || portraitTrueOrNot === false) {
            TODO:
            // console.log('trueOrNot is false: BLOCK');
            this.setState({
                anErrorOcurred: true
            });
            setTimeout(() => {
                this.setState({
                    anErrorOcurred: false
                });
            }, 3000);
            return null;
        }
        const { imagelink } = this.state;
        // console.log(imagelink.length > 1);
        // console.log(imagelink.length < 1);
        // if (imagelink.length < 1) {
        //     // MySwitchForPrimeUser('imagebackgroundlink', errors, false);
        //     // return null;
        // }
        // if (imagelink.length > 1) {
        // console.log('diese bedingung löschen');
        // 
        // }

        if (this.state.category.length === 0 || this.state.captions.length === 0) {
            // console.log('Option is null')
            return null;
        }
        // console.log('Data gets submitted');
        // with regex and extract captions and blocktext store them successively
        // console.log('Check SINGLE TITLE ATTRIBUTE');
        // console.log(JSON.stringify(this.state.singleTitleAttribute));
        const formData = new FormData();
        formData.append('portraitImage', imagelink[0], imagelink[0].name);
        // console.log('FORMDATA IS INITIALIZED');
        formData.append('category', this.state.category);
        formData.append('singletitleattribute', JSON.stringify(this.state.singleTitleAttribute));
        formData.append('headline', this.state.headline);
        formData.append('subheadline', this.state.subheadline);
        formData.append('captions', this.state.captions);
        formData.append('blockoftext', this.state.blockoftext);
        formData.append('confirmed', this.state.confirmed);
        formData.append('portraitFoto', 'portraitImage');
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post(process.env.REACT_APP_URL + 'api/startpage/startpage', formData, { timeout: 3000 })
            .then(res => {
                // console.log(res.status);
                // console.log(res);
                this.setState({
                    update: !this.state.update
                });

            }).catch(error => {
                // console.log(error.message);
            });
    }
    render() {
        // console.log('Form Start page DOES RENDER');
        // console.log('Form Start page DOES RENDER');
        // console.log(this.state);
        const { file } = this.state;
        const { errors } = this.state;
        // TODO: form-for.profiles-com
        let imgPreview;
        if (file) {
            imgPreview = <img src={file} alt='' width="200" />;
        }
        const deleteButton = file ? <p onClick={this.removeProfileImage}>delete image</p> : '';
        const imageAltAttribute = file ? <input name="imageAlt" placeholder="Add Alt Attribute" onChange={this.singleTitleAndAltAttribute}></input> : '';
        const imageTitleAttribute = file ? <input name="imageTitle" placeholder="Add Title Attribute" onChange={this.singleTitleAndAltAttribute}></input> : '';
        // console.log(this.state.update);
        var keys = Object.keys || require('object-keys');
        const myState = this.state;
        const arrayOfkeyOfState = keys(myState);
        const newRows = [];
        arrayOfkeyOfState.forEach((data, index) => {
            const myStateHeadlineSubheadlineCaptions = ['headline', 'subheadline', 'captions'];

            if (myStateHeadlineSubheadlineCaptions.includes(data)) {
                // console.log(data);
                newRows.push(
                    <React.Fragment key={data}>
                        <FormElements
                            key={data}
                            formbezeichnung={data}
                            text={'text'}
                            name={data}
                            value={this.state.data}
                            handleChangeInputValue={this.handleChange}
                        />
                        <ErrorDisplay key={data + '_error'} error={errors[data]} />
                    </React.Fragment>
                );
            }
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
            }
            if (data === 'category') {
                newRows.push(
                    <React.Fragment key={data}>
                        <OptionCategorySelector
                            handleChangeInputValue={this.handleChange}
                            key={data}
                            formbezeichnung={data}
                        />
                        <ErrorDisplay key={data + '_error'} error={errors[data]} />
                    </React.Fragment>
                );
            }
            if (data === 'confirmed') {
                // console.log(data);
                newRows.push(
                    <React.Fragment key={data}>
                        <p>{'Artikel wird angezeigt: ' + this.state.confirmed}</p>
                        <CheckBox
                            handleChangeInputValue={this.handleCheckbox}
                            key={data}
                            formbezeichnung={data}
                            text={"checkbox"}
                            confirmed={this.state.confirmed}
                            name={data}
                        />
                        {/* <ErrorDisplay key={data + '_error'} error={errors[data]} /> */}
                    </React.Fragment>
                );
            }
        });
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit}>
                    {newRows}
                    {/* <ImageUploadHandler
                        onAddingImage={this.onAddingProfileImage}
                        key={null}
                    /> */}
                    {imgPreview}
                    {deleteButton}
                    {imageAltAttribute}
                    <ErrorDisplay error={errors.singleTitleAttribute['imageAlt']} />
                    {/* {errorMessage} */}
                    <br></br>
                    {imageTitleAttribute}
                    <ErrorDisplay error={errors.singleTitleAttribute['imageTitle']} />
                    <ImageHiddenUploadHandler
                        onAddingImage={this.onAddingProfileImage}
                        key={null}
                        myRef={this.imageUpload}
                    />
                    <ErrorDisplay key={'imagelink'} error={errors['imagelink']} />
                    <ButtonWithEventHandler onClickInput={this.onClickInput} />
                    <div></div>
                    <FormButton value={'submit'} fileUploader={this.fileUploader} />
                    {this.state.anErrorOcurred ? <Badge style={{ "padding": "12px", "marginLeft": "10px" }} color="danger">You have to fill out the form completely</Badge> : ''}
                </Form>
                <ErrorDisplay key={'testSize'} error={errors['testSize']} />
                {/* <FormForStartPageIndex /> */}
                <FormForStartPageIndex update={this.state.update} />
            </React.Fragment >
        );
    }
}
