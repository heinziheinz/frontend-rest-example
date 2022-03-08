import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import GetImageBlob, { BlobToBase64 } from 'components/image-conversion-to-blob';
import { FormButton } from 'components/atoms';
import baseStringToFile, { urltoFile } from 'components/baste64-string-to-img-file';
import axios from 'axios';
import {
    PortraiFotoPrimeCustomer,
    BewertungsBottom,
    ÖffungszeitenPrimeCustomer,
    KrankenkasseFachbereich,
    SingleDoctorRouteComponentBase64
} from 'components/footer/single-doctor-route-component';
import ReorderingData from 'components/reordering-img-and-alt-and-title'
const SingleDoctorRouteComponent = React.lazy(() => import('components/footer/single-doctor-route-component'));
class FormForProfileTemporaryStorage extends React.Component {
    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props);
        // console.log(this.props === undefined);
        // console.log(this.props.file === null);
        // Cookies.set('storedPrimeCustomer', this.props);
        // console.log(this.props);
        this.storage = this.props.file ? this.props : JSON.parse(localStorage.getItem('storedPrimeCustomer'));
        // console.log(this.storage.state);
        this.imageList = this.props.imageList ? this.props.imageList : 'lusch';
        this.portraitImageList = this.props.portraitImageList ? this.props.portraitImageList : 'lusch';
        this.state = {
            myRedirect: false,
        }
        this.ordinationszeitMontag = this.storage.state.confirmedmontag ? this.storage.state.montag + ' ' + this.storage.state.montagvormittagende : 'Geschlossen';
        this.ordinationszeitMontagNachmittag = this.storage.state.confirmedmontagnachmittag ? this.storage.state.montagnachmittag + ' ' + this.storage.state.montagnachmittagende : 'Geschlossen';
        this.ordinationszeitDienstag = this.storage.state.confirmeddienstag ? this.storage.state.dienstag + ' ' + this.storage.state.dienstagvormittagende : 'Geschlossen';
        this.ordinationszeitDienstagNachmittag = this.storage.state.confirmeddienstagnachmittag ? this.storage.state.dienstagnachmittag + ' ' + this.storage.state.dienstagnachmittagende : 'Geschlossen';
        this.ordinationszeitMittwoch = this.storage.state.confirmedmittwoch ? this.storage.state.mittwoch + ' ' + this.storage.state.mittwochvormittagende : "Geschlossen";
        this.ordinationszeitMittwochNachmittag = this.storage.state.confirmedmittwochnachmittag ? this.storage.state.mittwochnachmittag + ' ' + this.storage.state.mittwochnachmittagende : "Geschlossen";
        this.ordinationszeitDonnertstag = this.storage.state.confirmeddonnerstag ? this.storage.state.donnerstag + ' ' + this.storage.state.donnerstagvormittagende : "Geschlossen";
        this.ordinationszeitDonnerstagNachmittag = this.storage.state.confirmeddonnerstagnachmittag ? this.storage.state.donnerstagnachmittag + ' ' + this.storage.state.donnerstagnachmittagende : "Geschlossen";
        this.ordinationszeitFreitag = this.storage.state.confirmedfreitag ? this.storage.state.freitag + ' ' + this.storage.state.freitagvormittagende : "Geschlossen";
        this.ordinationszeitFreitagNachmittag = this.storage.state.confirmedfreitagnachmittag ? this.storage.state.freitagnachmittag + ' ' + this.storage.state.freitagnachmittagende : "Geschlossen";
        this.ordinationszeitSamstag = this.storage.state.confirmedsamstag ? this.storage.state.samstag + ' ' + this.storage.state.samstagvormittagende : "Geschlossen";
        this.ordinationszeitSamstagNachmittag = this.storage.state.confirmedsamstagnachmittag ? this.storage.state.samstagnachmittag + ' ' + this.storage.state.samstagnachmittagende : "Geschlossen";
        this.ordinationszeitSonntag = this.storage.state.confirmedsonntag ? this.storage.state.sonntag + ' ' + this.storage.state.sonntagvormittagende : "Geschlossen";
        this.ordinationszeitSonntagNachmittag = this.storage.state.confirmedsonntagnachmittag ? this.storage.state.sonntagnachmittag + ' ' + this.storage.state.sonntagnachmittagende : "Geschlossen";
    }
    componentDidMount() {
        // console.log(this.props.portraitImageList[0]);
        // console.log(this.props.fileArray);
        const nuch = this.props.file ? localStorage.setItem('storedPrimeCustomer', JSON.stringify(this.props)) : 'nono';
        // console.log(nuch);
        // console.log(this.storage.file);
        // console.log(localStorage.getItem('storedPrimeCustomer'));
        localStorage.setItem('myDog', this.props);
        // console.log(localStorage.getItem('myDog'));
        // const tusch = this.props.file ? localStorage.setItem('storedPrimeCustomer', this.props) : 'SSS';
        // Cookies.set('storedPrimeCustomer', this.props);
        // // // this.storage = this.props ? this.props : Cookies.get('storedPrimeCustomer');
        // console.log(Cookies.get('storedPrimeCustomer'));
        // console.log(JSON.parse(Cookies.get('storedPrimeCustomer')));
        // console.log(localStorage.getItem('storedPrimeCustomer'));
    }
    componentWillUnmount() {
        // console.log('Cookies have been removed');
        Cookies.remove('myRedirect', { secure: true });
        // Cookies.remove('storedPrimeCustomer');
        // localStorage.clear();
        localStorage.removeItem('storedPrimeCustomer');
        // localStorage.clear();
    }

    previewSingleImage = async (event) => {

        let getBase64Image = async function (url) {
            let blob = await GetImageBlob(url);
            let base64 = await BlobToBase64(blob);
            return base64;
        }
        var portraiImageBae64 = await getBase64Image(URL.createObjectURL(event.target.files[0]));

    }

    fileUploader = () => {
        const { imageList, portraitImageList, base64File, base64MultipleFile, altAndTitleAttribute, ...names } = this.storage.state;
        // Importieren und richtigen platz finden
        // Converting single Image
        // console.log(this.storage);
        // TODO: Hier function einfügen und this.storage.state.altAndTitleAttribute übergeben
        // console.log(this.storage.state.altAndTitleAttribute);

        // import("components/reordering-img-and-alt-and-title").then(reordering => {
        // console.log(reordering(this.storage.state.altAndTitleAttribute));
        //     reOrderedAltTitleAttributes = reordering(this.storage.state.altAndTitleAttribute);
        // });
        var reOrderedAltTitleAttributes = ReorderingData(this.storage.state.altAndTitleAttribute);
        // console.log(reOrderedAltTitleAttributes);
        // console.log(this.storage.state.description);
        var mySingeImage = baseStringToFile(base64File.base64File, base64File.base64Name);
        // console.log(mySingeImage);
        // console.log(portraitImageList);
        var letshow = urltoFile(base64File, 'mycat.jpg', 'image/jpeg').then(function (file) { console.log(file); });

        // Converting multiple images
        // console.log(base64MultipleFile);
        // console.log(imageList);
        // let imagesNames = imageList.map((images) => {
        //     return images.name;
        // });
        // console.log(imagesNames);
        var myImageList = base64MultipleFile.map((singleBase64File) => {
            // console.log(singleBase64File);
            return baseStringToFile(singleBase64File.base64, singleBase64File.base64Name);
        });

        const string = process.env.REACT_APP_TEN_NAMES_FOR_IMAGE_ARRAY;
        let imageNames = string.split(",");
        imageNames.length = myImageList.length;
        var imageString = JSON.stringify(imageNames);
        // console.log(imageList);
        const formData = new FormData();
        // console.log(imageList);
        // console.log(imageNames);
        formData.append('portraitImage', mySingeImage, mySingeImage.name);
        for (let i = 0; i < myImageList.length; i++) {
            formData.append(imageNames[i], myImageList[i], myImageList[i].name);
        }
        formData.append('altandtitleattribute', reOrderedAltTitleAttributes);
        formData.append('singletitleattribute', JSON.stringify(this.storage.state.singleTitleAttribute));
        formData.append('title', this.storage.state.title);
        formData.append('name', this.storage.state.name);
        formData.append('telefonnumber', this.storage.state.telefonnumber);
        formData.append('postleitzahl', this.storage.state.postleitzahl);
        formData.append('stadt', this.storage.state.stadt);
        formData.append('bundesland', this.storage.state.bundesland);
        formData.append('specialization', this.storage.state.specialization);
        formData.append('adresse', this.storage.state.adresse);
        formData.append('emailaddresse', this.storage.state.emailaddresse);
        formData.append('krankenkassen', this.storage.state.krankenkassen);
        formData.append('montag', this.storage.state.montag);
        formData.append('montagvormittagende', this.storage.state.montagvormittagende);
        formData.append('montagnachmittag', this.storage.state.montagnachmittag);
        formData.append('montagnachmittagende', this.storage.state.montagnachmittagende);
        formData.append('dienstag', this.storage.state.dienstag);
        formData.append('dienstagvormittagende', this.storage.state.dienstagvormittagende);
        formData.append('dienstagnachmittag', this.storage.state.dienstagnachmittag);
        formData.append('dienstagnachmittagende', this.storage.state.dienstagnachmittagende);
        formData.append('mittwoch', this.storage.state.mittwoch);
        formData.append('mittwochvormittagende', this.storage.state.mittwochvormittagende);
        formData.append('mittwochnachmittag', this.storage.state.mittwochnachmittag);
        formData.append('mittwochnachmittagende', this.storage.state.mittwochnachmittagende);
        formData.append('donnerstag', this.storage.state.donnerstag);
        formData.append('donnerstagvormittagende', this.storage.state.donnerstagvormittagende);
        formData.append('donnerstagnachmittag', this.storage.state.donnerstagnachmittag);
        formData.append('donnerstagnachmittagende', this.storage.state.donnerstagnachmittagende);
        formData.append('freitag', this.storage.state.freitag);
        formData.append('freitagvormittagende', this.storage.state.freitagvormittagende);
        formData.append('freitagnachmittag', this.storage.state.freitagnachmittag);
        formData.append('freitagnachmittagende', this.storage.state.freitagnachmittagende);
        formData.append('samstag', this.storage.state.samstag);
        formData.append('samstagvormittagende', this.storage.state.samstagvormittagende);
        formData.append('samstagnachmittag', this.storage.state.samstagnachmittag);
        formData.append('samstagnachmittagende', this.storage.state.samstagnachmittagende);
        formData.append('sonntag', this.storage.state.sonntag);
        formData.append('sonntagvormittagende', this.storage.state.sonntagvormittagende);
        formData.append('sonntagnachmittag', this.storage.state.sonntagnachmittag);
        formData.append('sonntagnachmittagende', this.storage.state.sonntagnachmittagende);
        formData.append('description', this.storage.state.blockoftext);
        formData.append('gesprochenesprache', this.storage.state.gesprochenesprache);
        formData.append('confirmedmontag', this.storage.state.confirmedmontag);
        formData.append('confirmedmontagnachmittag', this.storage.state.confirmedmontagnachmittag);
        formData.append('confirmeddienstag', this.storage.state.confirmeddienstag);
        formData.append('confirmeddienstagnachmittag', this.storage.state.confirmeddienstagnachmittag);
        formData.append('confirmedmittwoch', this.storage.state.confirmedmittwoch);
        formData.append('confirmedmittwochnachmittag', this.storage.state.confirmedmittwochnachmittag);
        formData.append('confirmeddonnerstag', this.storage.state.confirmeddonnerstag);
        formData.append('confirmeddonnerstagnachmittag', this.storage.state.confirmeddonnerstagnachmittag);
        formData.append('confirmedfreitag', this.storage.state.confirmedfreitag);
        formData.append('confirmedfreitagnachmittag', this.storage.state.confirmedfreitagnachmittag);
        formData.append('confirmedsamstag', this.storage.state.confirmedsamstag);
        formData.append('confirmedsamstagnachmittag', this.storage.state.confirmedsamstagnachmittag);
        formData.append('confirmedsonntag', this.storage.state.confirmedsonntag);
        formData.append('confirmedsonntagnachmittag', this.storage.state.confirmedsonntagnachmittag);
        formData.append('namearray', imageString);
        formData.append('portraitFoto', 'portraitImage');
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post(process.env.REACT_APP_URL + 'api/loggedin/prime', formData, { timeout: 5000 })
            .then(res => {
                // console.log(res.status);
                // console.log(res);
                this.setState({
                    myRedirect: true,
                });
            }).catch(error => {
                // console.log(error.message);
            });
    }


    render() {
        const { myRedirect, myStoreResponse } = this.state;
        console.log(this.storage);
        console.log(this.storage.state.blockoftext);
        if (myRedirect === false) {
            return (
                <>
                    <SingleDoctorRouteComponentBase64
                        imagebackgroundlink={this.storage.base64MultipleFile}
                        temp={true}
                    />

                    <PortraiFotoPrimeCustomer
                        imagelink={this.storage.base64File.base64File}
                        name={this.storage.state.name}
                        specialization={this.storage.state.specialization}
                        adresse={this.storage.state.adresse}
                        postleitzahl={this.storage.state.postleitzahl}
                        stadt={this.storage.state.stadt}
                        telefonnumber={this.storage.state.telefonnumber}
                        emailaddresse={this.storage.state.emailaddresse}
                        temp={true}
                        marginTop={"140px"}
                        marginLeft={"130px"}
                    />

                    {this.storage.state.blockoftext === undefined ? '' : <div
                        style={{
                            "width": "300px",
                            "borderBottom": "1px solid lightgrey",
                            "padding": "50px",
                            "marginBottom": "30px",
                            "marginLeft": "50px"
                        }}
                    ></div>}
                    {this.storage.state.blockoftext === undefined ? '' : <BewertungsBottom data={this.storage.state} />}
                    <div
                        style={{
                            "width": "350px",
                            "borderBottom": "1px solid lightgrey",
                            "marginLeft": "50px",
                            "marginBottom": "30px"
                        }}
                    ></div>
                    <ÖffungszeitenPrimeCustomer
                        ordinationszeitMontag={this.ordinationszeitMontag}
                        ordinationszeitMontagNachmittag={this.ordinationszeitMontagNachmittag}
                        ordinationszeitDienstag={this.ordinationszeitDienstag}
                        ordinationszeitDienstagNachmittag={this.ordinationszeitDienstagNachmittag}
                        ordinationszeitMittwoch={this.ordinationszeitMittwoch}
                        ordinationszeitMittwochNachmittag={this.ordinationszeitMittwochNachmittag}
                        ordinationszeitDonnertstag={this.ordinationszeitDonnertstag}
                        ordinationszeitDonnerstagNachmittag={this.ordinationszeitDonnerstagNachmittag}
                        ordinationszeitFreitag={this.ordinationszeitFreitag}
                        ordinationszeitFreitagNachmittag={this.ordinationszeitFreitagNachmittag}
                        ordinationszeitSamstag={this.ordinationszeitSamstag}
                        ordinationszeitSamstagNachmittag={this.ordinationszeitSamstagNachmittag}
                        ordinationszeitSonntag={this.ordinationszeitSonntag}
                        ordinationszeitSonntagNachmittag={this.ordinationszeitSonntagNachmittag}
                        gesprochenesprache={this.storage.state.gesprochenesprache}
                    />
                    <div
                        style={{
                            "width": "350px",
                            "borderBottom": "1px solid lightgrey",
                            "marginBottom": "30px",
                            "marginTop": "30px",
                            "marginLeft": "50px"
                        }}
                    ></div>
                    <KrankenkasseFachbereich
                        specialization={this.storage.state.specialization}
                        krankenkassen={this.storage.state.krankenkassen}
                    />
                    {/* <div>
                        <h1>Confirm the data</h1 >
                        <img src={this.storage.base64File.base64File} alt='' width="200" />
                    </div>
                    <div className="form-group multi-preview">
                        {(this.storage.base64MultipleFile || []).map((url, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <img key={url.base64} src={url.base64} alt="..." width="200" />
                                </React.Fragment>
                            )
                        })}
                    </div> */}
                    <FormButton value={'submit'} fileUploader={this.fileUploader} />
                </>
            );
        } else if (myRedirect === true) {
            return (
                <>
                    <Redirect to={{
                        pathname: "/data-has-been-saved",
                        state: { state: this.storage.state }
                    }}
                    />
                </>
            );
        } else {
            return <h1>Didn`twork</h1>;
        }
    }
}
export default FormForProfileTemporaryStorage;