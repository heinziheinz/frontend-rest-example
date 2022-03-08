import React, { Suspense } from 'react';
import axios from 'axios';
import { Button, Form, Badge } from 'reactstrap';
import FormElements,
{
    CheckBox,
    ImageUploadHandler,
    ImageHiddenUploadHandler,
    OptionCategorySelector,
    OptionSelectorWithSelectedCategory,
    ButtonWithEventHandler,
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
import GetImageBlob, { BlobToBase64 } from 'components/image-conversion-to-blob';
import baseStringToFile, { urltoFile } from 'components/baste64-string-to-img-file';
import { EscapeHtml } from 'components/regex-collection';
// import UpdateArticleComponent from 'components/updated-article-component';
const UpdateArticleComponent = React.lazy(() => import('components/updated-article-component'));
var CancelToken;
var source;
class UpdateRouteComponentForm extends React.Component {
    constructor(props) {
        super(props);
        // TODO:von form-for-start-page
        this.imageUpload = React.createRef();
        this.storage = this.props.location.state ? this.props.location.state.data : this.props.items;
        this.state = {
            isLoaded: false,
            articleImage: [],
            data: this.props.location.state ? this.props.location.state.data : this.props.items,
            id: null,
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
                singleTitleAttribute: {
                    imageAlt: '',
                    imageTitle: '',
                },
            }
        }
    }
    componentDidMount() {
        // singleTitleAttribute: {
        //     imageAlt: '',
        //         imageTitle: '',
        //     }
        const { errors } = this.state;
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        MySwitchForPrimeUser('imagelink', errors, false);
        // this.forceUpdate();
        // FIXME: wirft Fehler
        this.setState({
            data: {
                ...this.state.data,
                file: null,
                base64File: null,
                anErrorOcurred: false,
                singletitleattribute: {
                    imageAlt: '',
                    imageTitle: '',
                }
            }
        });
    }
    onAddingProfileImage = event => {
        const { errors } = this.state;
        // console.log(event.target.files[0]);
        let _this = this;
        let myEvent = event;
        async function watingOnStrippedImage(lengthOfPortraitArrayApporved, myEvent) {
            // console.log('befor stripping');
            var imageExifStripped = await StrippingExifData(event);
            _this.resumeAfterEXIFStripping(imageExifStripped, lengthOfPortraitArrayApporved, myEvent);
        }
        this.forceUpdate = this.forceUpdate.bind(this);
        let lengthOfPortraitList = this.state.articleImage.length;
        let fileSizeIsApproved = ConditionsOnImageFileSize(event, this.state.errors, this.forceUpdate);
        // console.log(fileSizeIsApproved);
        let lengthOfPortraitArrayApporved = OnLegthOfPortaitImageArray(lengthOfPortraitList);
        watingOnStrippedImage(lengthOfPortraitArrayApporved, myEvent);
    }
    resumeAfterEXIFStripping = (imageExifStripped, lengthOfPortraitArrayApporved, myEvent) => {
        // console.log('resumeAfterEXIFStripping');
        const { errors } = this.state;
        // console.log(lengthOfPortraitArrayApporved);
        if (lengthOfPortraitArrayApporved) {
            // console.log('length approved');
            this.previewSingleImage(myEvent);
            this.setState({
                articleImage: this.state.articleImage.concat(imageExifStripped)
            },
                () => {
                    // console.log(this.state.articleImage);
                    MySwitchForPrimeUser('imagelink', errors, this.state.articleImage.length > 0);
                    this.forceUpdate();
                }
            );
        } else {
            // console.log('length NOT approved');
            this.previewSingleImage(myEvent);
            this.setState({
                articleImage: ReduceToCurrentImage(this.state.articleImage, imageExifStripped)
            },
                () => {
                    console.log(this.state.articleImage);
                    MySwitchForPrimeUser('imagelink', errors, this.state.articleImage.length > 0);
                    this.forceUpdate();
                }
            )
        }
    }
    previewSingleImage = async (event) => {
        var myeventfile = event.target.files[0];
        console.log(myeventfile);
        localStorage.setItem('myBlobFile', JSON.stringify(myeventfile));
        // console.log(localStorage.getItem('myBlobFile'));
        // localStorage.setItem('state', JSON.stringify(this.state));
        // console.log(JSON.parse(localStorage.getItem('state')));
        // localStorage.setItem('eventData', JSON.stringify(event.target.files[0]));
        let getBase64Image = async function (url) {
            let blob = await GetImageBlob(url);
            let base64 = await BlobToBase64(blob);
            return base64;
        }
        var base64File = await getBase64Image(URL.createObjectURL(event.target.files[0]));
        this.setState({
            data: {
                ...this.state.data,
                file: URL.createObjectURL(myeventfile),
                base64File: { base64File: base64File, base64Name: myeventfile.name }
            }
        });
        var letshow = urltoFile(base64File, 'mycat.jpg', 'image/jpeg').then(function (file) { console.log(file); });
    }

    componentWillUnmount() {
        // console.log('Update Route will unmount');
        source.cancel();
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
        var submitForm = true;
        for (let [key, value] of Object.entries(this.state.data)) {
            // console.log(`${key}: ${value}`);
            // FIXME: singletitleattribute, base64File hinzufügen
            const keyIncludes = ['created_at', 'updated_at', 'confirmed', 'id', 'singletitleattribute', 'base64File', 'file', 'anErrorOcurred',];//singletitleattribute, base64File
            if (keyIncludes.includes(key)) {
                // console.log(key + 'so good data');
            } else {
                console.log(`${key}: ${value}`);
                if (!(value.length > 0)) {
                    console.log('drinnen');
                    console.log(`${key}: ${value.length}`);
                    submitForm = false;
                    this.stateUpdater(key);
                }
            }
        }
        return submitForm;
    }
    // TODO: tüberprüfen, ob sonst ncihts gelöscht wird
    singleTitleAndAltAttribute = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        console.log(name);
        console.log(value);
        MySwitchForPrimeUser(name, errors, value);
        console.log(this.state.data);
        this.setState({
            data: {
                ...this.state.data,
                singletitleattribute: {
                    ...this.state.data.singletitleattribute,
                    [name]: value,
                }
            }
        });

    }
    // TODO: from form-for-start-page.js
    onClickInput = () => {
        // console.log(this.imageUpload.current);
        this.imageUpload.current.click();
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
    // TODO: for alt and title attr
    formValidatorForImgTitleAndAlt = () => {
        // console.log('formValidator');
        const { errors } = this.state;
        var valid = true;
        let formValidation = new RegExp(/^\s*NOT\s*ACCEPTED/g);
        Object.values(errors.singleTitleAttribute).forEach((val) => {
            console.log(val);
            formValidation.test(val) && (valid = false);
        });
        return valid;
    }
    statePortraitTitleAndAttributeUpdater = (data) => {
        console.log(data);
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            console.log(errors.singleTitleAttribute[data]);
            errors.singleTitleAttribute[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }
    portraitValidationForImageAltAndTitleAttribute = () => {
        // FIXME: Checkout how many images are in Array and remove the reminder
        // console.log(this.fileObjBase64);
        console.log(this.state.data.singletitleattribute);
        // this.fileObjBase64.length
        const errorArray = [
        ];
        var submitForm = true;

        for (let [key, value] of Object.entries(this.state.data.singletitleattribute)) {

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

    updateArticle() {
        const { id, data, articleImage } = this.state;
        var trueOrNot = this.validateFormInputBeforSubmission();
        // TODO: hier weiter
        console.log(trueOrNot);
        let portraitTrueOrNot = this.portraitValidationForImageAltAndTitleAttribute();
        console.log(portraitTrueOrNot);
        console.log(JSON.stringify(this.state.singletitleattribute));

        var readyToSend = articleImage.length > 0 && trueOrNot;
        // console.log(trueOrNot);
        // console.log(readyToSend);

        var checkValidation = this.formValidator();
        var checkImgTitleAndAlt = this.formValidatorForImgTitleAndAlt();
        console.log(checkValidation);
        console.log(checkImgTitleAndAlt);
        console.log(readyToSend);
        console.log(articleImage);
        console.log(articleImage.length);
        // console.log(checkValidation);
        if (checkValidation === false || checkImgTitleAndAlt === false || portraitTrueOrNot === false) {
            readyToSend = false;
        }
        console.log(checkValidation);
        if (readyToSend === false) {
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
        // return null;
        let confirmed;
        // console.log(data);
        // return;
        const formData = new FormData();

        // console.log(data.confirmed);
        if (data.confirmed) {
            confirmed = 1;
        } else {
            confirmed = 0;
        }
        console.log('Update Route Component wird gesendet');
        console.log(data);
        formData.append('id', data.id);
        formData.append('category', data.category);
        formData.append('imagelink', data.imagelink);
        formData.append('headline', data.headline);
        formData.append('subheadline', data.subheadline);
        formData.append('captions', data.captions);
        formData.append('blockoftext', data.blockoftext);
        formData.append('singletitleattribute', JSON.stringify(this.state.data.singletitleattribute));//TODO: check if it does work
        formData.append('confirmed', confirmed);
        formData.append('_method', 'PATCH');
        formData.append(CancelToken, source.token);//TODO:this needs be be checked again
        formData.append('articleImage', articleImage[0], articleImage[0].name);
        formData.append('myArticleImage', 'articleImage');
        // cancelToken: source.token
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post(process.env.REACT_APP_URL + `api/startpage/startpage/${id}`, formData)
            .then(res => {
                // console.log(res);
                // console.log(res.data);

                this.setState({
                    isLoaded: true
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
    handleChecked = (event) => {
        const { name, value, checked } = event.target;
        // console.log(name);
        // console.log(value);
        // console.log(checked);
        // console.log(this.state.data[name]);
        // console.log(this.state.data[name] === 0);
        var myBoolean;
        if (this.state.data[name] === 0) {
            myBoolean = true;
        }
        if (this.state.data[name] === 1) {
            myBoolean = false;
        }

        this.setState(prevState => {
            let data = Object.assign({}, prevState.data);
            data[name] = myBoolean;
            return { data };
        });
    }
    handleValue = (event) => {
        const { name, value, checked } = event.target;
        var newValue
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
    render() {
        const { data, isLoaded, errors, file } = this.state;
        console.log(data);
        let imgPreview;
        if (data.file) {
            imgPreview = <img src={data.file} alt='' width="200" />;
        }
        const deleteButton = data.file ? <p onClick={this.removeProfileImage}>delete image</p> : '';
        const imageAltAttribute = data.file ? <input name="imageAlt" placeholder="Add Alt Attribute" onChange={this.singleTitleAndAltAttribute}></input> : '';
        const imageTitleAttribute = data.file ? <input name="imageTitle" placeholder="Add Title Attribute" onChange={this.singleTitleAndAltAttribute}></input> : '';
        // console.log(data.confirmed);
        // console.log(this.state.data.confirmed);
        if (isLoaded) {
            return (
                // null
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UpdateArticleComponent id={data.id} />
                    </Suspense>
                </div>
            );

        } else {

            var keys = Object.keys || require('object-keys');
            const myState = this.state;
            const arrayOfkeyOfState = keys(this.state.data);
            console.log(this.state.data);

            return (<Form>{arrayOfkeyOfState.map((data, index) => {

                if (data === 'created_at'
                    || data === 'updated_at'
                    || data === 'id'
                    || data === 'singletitleattribute'
                    || data === 'file'
                    || data === 'base64File'
                    || data === 'anErrorOcurred'
                ) {
                    //FIXME:data === 'singletitleattribute' added. gehört wieder geändert. Wie 
                    return null;
                }
                if (data === 'imagelink') {
                    // FIXME:  Hiier|| data === 'singletitleattribute'
                    // oder wie in form-for-start-page einfach ing upload unten ausserhalb des loops geben
                    return (
                        null//FIXME:Unters nachher löschen
                        // <React.Fragment key={data}>
                        //     <ImageUploadHandler
                        //         onAddingImage={this.onAddingProfileImage}
                        //         key={null}
                        //     />
                        //     <ErrorDisplay key={data + '_error'} error={errors[data]} />
                        //     <ErrorDisplay key={'testSize'} error={errors['testSize']} />
                        //     {/* testSize */}
                        // </React.Fragment>
                    );
                }
                if (data === 'category') {
                    // console.log(data);
                    return (
                        <React.Fragment key={data}>
                            <OptionSelectorWithSelectedCategory
                                handleChangeInputValue={this.handleValue}
                                key={data}
                                formbezeichnung={data}
                                value={this.state.data[data]}
                            />
                            <ErrorDisplay key={data + '_error'} error={errors[data]} />
                        </React.Fragment>
                    );
                }
                if (data === 'confirmed') {
                    // console.log(this.state.data[data]);
                    return (
                        <CheckBox
                            key={data}
                            formbezeichnung={data}
                            text={'checkbox'}
                            name={data}
                            value={this.state.data[data]}
                            confirmed={this.state.data.confirmed}
                            handleChangeInputValue={this.handleChecked}
                        />
                    );
                } else {
                    // console.log(data);
                    // console.log(data);
                    if (data === 'blockoftext') {
                        return (
                            <React.Fragment key={data}>
                                <FormElements
                                    key={data}
                                    formbezeichnung={data}
                                    text={'textarea'}
                                    name={data}
                                    value={this.state.data[data]}
                                    handleChangeInputValue={this.handleValue}
                                />
                                <ErrorDisplay key={data + '_error'} error={errors[data]} />
                            </React.Fragment>
                        );
                    } else {
                        return (
                            <React.Fragment key={data}>
                                <FormElements
                                    key={data}
                                    formbezeichnung={data}
                                    text={'text'}
                                    name={data}
                                    value={this.state.data[data]}
                                    handleChangeInputValue={this.handleValue}
                                />
                                <ErrorDisplay key={data + '_error'} error={errors[data]} />
                            </React.Fragment>
                        );
                    }
                }
            })}
                {/* TODO: Vorlage: form-for-start-page.js */}
                {imgPreview}
                {deleteButton}
                {imageAltAttribute}
                <ErrorDisplay error={errors.singleTitleAttribute['imageAlt']} />
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
                {/* bis hier vorlage form-for-start-page.js */}
                {/* <ErrorDisplay key={'testSize'} error={errors['testSize']} /> */}
                <Button onClick={this.updateYourArticle}>{'Update your Article'}</Button>
                {this.state.anErrorOcurred ? <Badge style={{ "padding": "12px", "marginLeft": "10px" }} color="danger">You have to fill out the form completely</Badge> : ''}
            </Form>
            );
        }
    }
}
export default UpdateRouteComponentForm;