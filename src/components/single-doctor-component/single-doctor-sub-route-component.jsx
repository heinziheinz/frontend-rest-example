import React, { Suspense } from 'react';
import { Helmet } from "react-helmet";
import {
    PortraiFotoPrimeCustomer,
    BewertungsBottom,
    ÖffungszeitenPrimeCustomer,
    KrankenkasseFachbereich
} from 'components/footer/single-doctor-route-component';
const ErrorBoundary = React.lazy(() => import('components/error-boundary'));
const SingleDoctorRouteComponent = React.lazy(() => import('components/footer/single-doctor-route-component'));
const SingleDoctorSubRouteComponent = (props) => {

    console.log(myStorage);
    var keys = Object.keys || require('object-keys');
    var myStorage = props.myStorage;
    const arrayOfkeyOfState = keys(myStorage);
    // const mySanitizedText = SanitizedDisplay(data, arrayOfkeyOfState);
    const ordinationszeitMontag = myStorage.confirmedmontag ? myStorage.montag + ' ' + myStorage.montagvormittagende : 'Geschlossen';
    const ordinationszeitMontagNachmittag = myStorage.confirmedmontagnachmittag ? myStorage.montagnachmittag + ' ' + myStorage.montagnachmittagende : 'Geschlossen';
    const ordinationszeitDienstag = myStorage.confirmeddienstag ? myStorage.dienstag + ' ' + myStorage.dienstagvormittagende : 'Geschlossen';
    const ordinationszeitDienstagNachmittag = myStorage.confirmeddienstagnachmittag ? myStorage.dienstagnachmittag + ' ' + myStorage.dienstagnachmittagende : 'Geschlossen';
    const ordinationszeitMittwoch = myStorage.confirmedmittwoch ? myStorage.mittwoch + ' ' + myStorage.mittwochvormittagende : "Geschlossen";
    const ordinationszeitMittwochNachmittag = myStorage.confirmedmittwochnachmittag ? myStorage.mittwochnachmittag + ' ' + myStorage.mittwochnachmittagende : "Geschlossen";
    const ordinationszeitDonnertstag = myStorage.confirmeddonnerstag ? myStorage.donnerstag + ' ' + myStorage.donnerstagvormittagende : "Geschlossen";
    const ordinationszeitDonnerstagNachmittag = myStorage.confirmeddonnerstagnachmittag ? myStorage.donnerstagnachmittag + ' ' + myStorage.donnerstagnachmittagende : "Geschlossen";
    const ordinationszeitFreitag = myStorage.confirmedfreitag ? myStorage.freitag + ' ' + myStorage.freitagvormittagende : "Geschlossen";
    const ordinationszeitFreitagNachmittag = myStorage.confirmedfreitagnachmittag ? myStorage.freitagnachmittag + ' ' + myStorage.freitagnachmittagende : "Geschlossen";
    const ordinationszeitSamstag = myStorage.confirmedsamstag ? myStorage.samstag + ' ' + myStorage.samstagvormittagende : "Geschlossen";
    const ordinationszeitSamstagNachmittag = myStorage.confirmedsamstagnachmittag ? myStorage.samstagnachmittag + ' ' + myStorage.samstagnachmittagende : "Geschlossen";
    const ordinationszeitSonntag = myStorage.confirmedsonntag ? myStorage.sonntag + ' ' + myStorage.sonntagvormittagende : "Geschlossen";
    const ordinationszeitSonntagNachmittag = myStorage.confirmedsonntagnachmittag ? myStorage.sonntagnachmittag + ' ' + myStorage.sonntagnachmittagende : "Geschlossen";
    return (
        <>
            <Helmet>
                <title>{myStorage.title + '.' + ' ' + myStorage.name + ' | ' + myStorage.specialization + ' - ' + process.env.REACT_APP_DEV_URL_TITLE}</title>
                <meta name="description"
                    content="Die Webseite spezialisiert auf die Suche nach Psychologen & psychologische Hilfe." />
                <link rel="canonical" href={process.env.REACT_APP_DEV_URL + 'prime-doctor/' + myStorage.id} />
                <style>{'body { background-color:   #f4f5f6; }'}</style>
            </Helmet>
            <Suspense fallback={<div>Loading</div>}>
                <ErrorBoundary>
                    {/* <div>Rendered at {props.dimensions.width} x {props.dimensions.height}</div> */}
                    <SingleDoctorRouteComponent
                        allData={myStorage}
                        imagebackgroundlink={myStorage.imagebackgroundlink}
                        widthDiv={props.widthDiv}
                        imageNumber={props.imageNumber}
                    />
                </ErrorBoundary>
            </Suspense>
            <div style={{
                // "border": "dotted",
                "width": props.widthDiv,//TODO: ändern
                "background-color": "white",
                "boxShadow": "5px 10px 18px #888888"
            }}>
                <PortraiFotoPrimeCustomer
                    alldata={myStorage}
                    imagelink={myStorage.imagelink}
                    name={myStorage.name}
                    specialization={myStorage.specialization}
                    adresse={myStorage.adresse}
                    postleitzahl={myStorage.postleitzahl}
                    stadt={myStorage.stadt}
                    telefonnumber={myStorage.telefonnumber}
                    emailaddresse={myStorage.emailaddresse}
                    marginTop={"0"}
                    marginLeft={props.portraiImage}
                    flexOrNot={props.flexOrNot}
                    namenUndDatenMarginTop={props.namenUndDatenMarginTop}
                />
                {myStorage.description === 'undefined' ? '' : <div
                    style={{
                        "width": props.widthTrenner,
                        "borderBottom": "1px solid lightgrey",
                        // "padding": "50px",
                        // "marginBottom": "30px",
                        "marginLeft": "150px",
                        "marginTop": "30px",
                        "marginBottom": "10px"
                    }}
                ></div>}
                <BewertungsBottom
                    data={myStorage}
                    paddingLeftTerminvereinbahrung={props.paddingLeftTerminvereinbahrung}
                />
            </div>
            <div style={{
                // "border": "dotted",
                "width": props.widthDiv,//TODO: ändern
                "background-color": "white",
                "marginTop": "10px",
                "boxShadow": "5px 10px 18px #888888"
            }}>
                <div
                    style={{
                        "width": "350px",
                        "borderBottom": "1px solid lightgrey",
                        "marginLeft": "50px",
                        "marginBottom": "30px"
                    }}
                ></div>
                <ÖffungszeitenPrimeCustomer
                    ordinationszeitMontag={ordinationszeitMontag}
                    ordinationszeitMontagNachmittag={ordinationszeitMontagNachmittag}
                    ordinationszeitDienstag={ordinationszeitDienstag}
                    ordinationszeitDienstagNachmittag={ordinationszeitDienstagNachmittag}
                    ordinationszeitMittwoch={ordinationszeitMittwoch}
                    ordinationszeitMittwochNachmittag={ordinationszeitMittwochNachmittag}
                    ordinationszeitDonnertstag={ordinationszeitDonnertstag}
                    ordinationszeitDonnerstagNachmittag={ordinationszeitDonnerstagNachmittag}
                    ordinationszeitFreitag={ordinationszeitFreitag}
                    ordinationszeitFreitagNachmittag={ordinationszeitFreitagNachmittag}
                    ordinationszeitSamstag={ordinationszeitSamstag}
                    ordinationszeitSamstagNachmittag={ordinationszeitSamstagNachmittag}
                    ordinationszeitSonntag={ordinationszeitSonntag}
                    ordinationszeitSonntagNachmittag={ordinationszeitSonntagNachmittag}
                    gesprochenesprache={myStorage.gesprochenesprache}
                    flexOrNot={props.flexOrNot}
                    oeffungszeitenLeftMargin={props.oeffungszeitenLeftMargin}
                    trennerHeightÖffungszeiten={props.trennerHeightÖffungszeiten}
                    trennerWidthÖffungszeiten={props.trennerWidthÖffungszeiten}
                    gesprocheneSpracheMarginTop={props.gesprocheneSpracheMarginTop}
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
                    specialization={myStorage.specialization}
                    krankenkassen={myStorage.krankenkassen}
                    marginLeftTrenner={props.marginLeftTrenner}
                    krankenkasseFachbereichFlex={props.krankenkasseFachbereichFlex}
                    krankenkasserLeftMargin={props.oeffungszeitenLeftMargin}
                    trennerHeightÖffungszeiten={props.trennerHeightÖffungszeiten}
                    trennerWidthÖffungszeiten={props.trennerWidthÖffungszeiten}
                    marginTop={props.marginTop}
                />
            </div>
        </>
    );
}

export default SingleDoctorSubRouteComponent;
