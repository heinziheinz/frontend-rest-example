import { Button } from 'reactstrap';
import SanitizedDisplay from 'components/footer/sanitized-display';
import { AddingLinkToAltAndTitleAttribute } from 'components/reordering-img-and-alt-and-title';
const SingleDoctorRouteComponent = (props) => {
    console.log('SingleDocRegular');
    console.log(props);
    const linkAddedToTitleAndAltAttribute = AddingLinkToAltAndTitleAttribute(props.allData);
    console.log(linkAddedToTitleAndAltAttribute);
    try {
        var BackgroundImages = linkAddedToTitleAndAltAttribute.map((data, index) => {
            console.log(data.name[0]);
            // console.log(Object.values(data)[0]);
            // console.log(Object.values(data)[1]);
            if (index > props.imageNumber) return null;
            return (
                <img
                    key={data + index}
                    src={process.env.REACT_APP_URL + data.name[0]}
                    alt={Object.values(data)[0]}
                    title={Object.values(data)[1]}
                // height="150"
                />
            );
        });
    } catch (e) {
        return (
            <p>{"Something went wrong"}</p>
        );
    }

    return (
        <div
            style={{
                "height": "0px",
                // "paddingLeft": "53px",
                "marginTop": "90px",
                "width": props.widthDiv,//TODO:ajust
            }}
        >
            {BackgroundImages}
            {/* <img
                    src={props.temp ? props.imagebackgroundlink[0].base64 : process.env.REACT_APP_URL + props.imagebackgroundlink[0]}
                    alt={backgroundImageFirst}
                    title={backgroundImageFirst}
                />
                <img
                    src={props.temp ? props.imagebackgroundlink[1].base64 : process.env.REACT_APP_URL + props.imagebackgroundlink[1]}
                    alt={backgroundImageSecond}
                    title={backgroundImageSecond}
                />
                <img
                    src={props.temp ? props.imagebackgroundlink[2].base64 : process.env.REACT_APP_URL + props.imagebackgroundlink[2]}
                    alt={backgroundImageThird}
                    title={backgroundImageThird}
                /> */}
        </div>);
}

const SingleDoctorRouteComponentBase64 = (props) => {
    console.log('SingleDoctorBase64');
    console.log(props);
    return (
        <div
            style={{
                "height": "70px",
                "paddingLeft": "53px"
            }}
        >
            <div
                style={{
                    "position": "absolute",
                    "top": "150px",
                    "opacity": "0.8",
                    "zIndex": "-1"
                }}
            >
                <div
                    style={{
                        "width": "1400px",
                        "height": "200px",
                        // "border": "dotted",
                        "overflow": "hidden",
                        "marginLeft": "30px"
                    }}
                >
                    <img
                        src={props.temp ? props.imagebackgroundlink[0].base64 : process.env.REACT_APP_URL + props.imagebackgroundlink[0]}
                        alt="Image not found"
                        style={{
                            "height": "280px",
                            // "margin": "-50px -300px 0px 0px"
                        }}
                    />
                    <img
                        src={props.temp ? props.imagebackgroundlink[1].base64 : process.env.REACT_APP_URL + props.imagebackgroundlink[1]}
                        alt="Image not found"
                        style={{
                            "height": "280px",
                            // "margin": "-50px -300px 0px 0px"
                        }}
                    />
                    <img
                        src={props.temp ? props.imagebackgroundlink[2].base64 : process.env.REACT_APP_URL + props.imagebackgroundlink[2]}
                        alt="Image not found"
                        style={{
                            "height": "280px",
                            // "margin": "-50px -300px 0px 0px"
                        }}
                    />
                </div>
            </div>
        </div>);
}

const PortraiFotoPrimeCustomer = (props) => {
    //TODO: Base 43 condition and html zum schneller laden
    // console.log(props);
    var imageAltAndTitleAttribute = {};
    if (props?.alldata?.singletitleattribute !== undefined) {
        // console.log(props.alldata.singletitleattribute !== undefined);
        imageAltAndTitleAttribute = JSON.parse(props.alldata.singletitleattribute);
    } else {
        // console.log("out");
        imageAltAndTitleAttribute.imageAlt = "";
        imageAltAndTitleAttribute.imageTitle = "";
    }
    let portraitImageText = props.imagelink[0].slice(props.imagelink[0].lastIndexOf("upright/") + "upright/".length);
    // console.log(imageAltAndTitleAttribute.imageAlt);
    // console.log(imageAltAndTitleAttribute.imageTitle);
    return (
        <div className={props.flexOrNot}
            style={{
                "marginLeft": "125px",
                "padding": "0",
                "marginTop": "90px",
                "marginLeft": props.marginLeft,
                // "border": "dotted"
            }}
        >
            <img
                src={props.temp ? props.imagelink : process.env.REACT_APP_URL + props.imagelink[1]}
                alt={imageAltAndTitleAttribute.imageAlt}
                title={imageAltAndTitleAttribute.imageTitle}
                style={{
                    "width": "220px",
                    "height": "100%",
                    // "margin": "30px",
                    // "marginBottom": "0px",
                    "border": "7px solid white",
                    "borderRadius": "10px"
                }}

            />
            {/*
             "display": "block",
            "width": "auto",
            "maxWidth": "150px",
            "maxHeight": "100%"
            */}

            <div
                className="flex-grow-1"
                style={{
                    "marginTop": props.namenUndDatenMarginTop,
                    "marginLeft": "10px",
                    "lineHeight": "0.8",
                    "paddingTop": "75px"
                }}
            >
                <h5>{props.name}</h5>
                <p>{props.specialization}</p>
                <p>{props.adresse + ',' + ' ' + props.postleitzahl + ' ' + props.stadt}</p>
                <p>{props.telefonnumber}</p>
                <p>{props.emailaddresse}</p>
            </div>

            {/* <div
                style={{
                    "border": "dotted",
                    "marginTop": "230px",
                    "marginRight": "230px"
                }}
            >
            </div> */}

        </div>
    );
}
const BewertungsBottom = (props) => {
    // console.log(props);
    var keys = Object.keys || require('object-keys');
    const arrayOfkeyOfState = keys(props.data);
    // console.log(arrayOfkeyOfState);
    const mySanitizedText = SanitizedDisplay(props.data, arrayOfkeyOfState);
    // console.log(mySanitizedText);
    return (
        <div className="d-flex"
        >
            <div
                style={{
                    "padding": "0 53px 0 53px",
                    "paddingLeft": props.paddingLeftTerminvereinbahrung,
                    "width": "65%",
                    "marginBottom": "50px"
                }}
            >
                {mySanitizedText}
            </div>
            {/* {props.data.description === 'undefined' ? '' : <div
                style={{
                    "height": "300px",
                    "borderLeft": "1px solid lightgrey",
                    "paddingLeft": "40px"
                }}
            ></div>} */}
            {/* <div>
                <Button>Bewertung schreiben</Button>
            </div> */}
        </div>
    )
}
const ÖffungszeitenPrimeCustomer = (props) => {
    return (
        <div
            style={{
                // "padding": "0 53px 0 53px",
                // "paddingLeft": "133px",
                "width": "75%",
                "marginLeft": props.oeffungszeitenLeftMargin
            }}
        >
            {/* <h5>props.Ordinationszeiten</h5> */}
            <div
                className={props.flexOrNot}
            >
                <div
                    style={{
                        "width": "300px"
                    }}
                >
                    <h5>Ordinationszeiten</h5>
                    <div
                        className="d-flex"
                        style={{
                            "lineHeight": "0.6"
                        }}
                    >
                        <div
                            className="d-flex"
                            style={{
                                "lineHeight": "0.6"
                            }}
                        >
                            <div>
                                <p>{'Montag'}</p>
                                <p>{'Dienstag'}</p>
                                <p>{'Mittwoch'}</p>
                                <p>{'Donnerstag'}</p>
                                <p>{'Freitag'}</p>
                                <p>{'Samstag'}</p>
                                <p>{'Sonntag'}</p>
                            </div>
                        </div>
                        <div
                            style={{
                                "marginLeft": "20px"
                            }}
                        >
                            <p>{props.ordinationszeitMontag + ' . ' + props.ordinationszeitMontagNachmittag}</p>
                            <p>{props.ordinationszeitDienstag + ' . ' + props.ordinationszeitDienstagNachmittag}</p>
                            <p>{props.ordinationszeitMittwoch + ' . ' + props.ordinationszeitMittwochNachmittag}</p>
                            <p>{props.ordinationszeitDonnertstag + ' . ' + props.ordinationszeitDonnerstagNachmittag}</p>
                            <p>{props.ordinationszeitFreitag + ' . ' + props.ordinationszeitFreitagNachmittag}</p>
                            <p>{props.ordinationszeitSamstag + ' . ' + props.ordinationszeitSamstagNachmittag}</p>
                            <p>{props.ordinationszeitSonntag + ' . ' + props.ordinationszeitSonntagNachmittag}</p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        "height": props.trennerHeightÖffungszeiten,
                        "width": props.trennerWidthÖffungszeiten,
                        "borderLeft": "1px solid lightgrey",
                        "marginRight": "30px"
                    }}
                ></div>
                <div
                    style={{
                        "width": "50%",
                        "marginTop": props.gesprocheneSpracheMarginTop
                    }}
                >
                    <h5>Gesprochene Sprache</h5>
                    <p>{props.gesprochenesprache}</p>
                </div>
            </div>
        </div>
    );
}
const KrankenkasseFachbereich = (props) => {
    return (
        <div
            className={props.krankenkasseFachbereichFlex}
            style={{
                // "padding": "0 53px 0 53px",
                // "paddingLeft": "133px",
                "width": "75%",
                "marginLeft": props.krankenkasserLeftMargin
            }}
        >
            <div
                style={{
                    "width": "300px"
                }}
            >
                <h5>Fachbereich </h5>
                <p>{props.specialization}</p>
            </div>
            <div
                style={{
                    "height": props.trennerHeightÖffungszeiten,
                    "width": props.trennerWidthÖffungszeiten,
                    "borderLeft": "1px solid lightgrey",
                    'marginRight': "30px",
                    "marginLeft": props.marginLeftTrenner
                }}
            ></div>
            <div
                style={{
                    "marginTop": props.marginTop
                }}
            >
                <h5>Krankenkassen</h5>
                <p>{props.krankenkassen}</p>
            </div>
        </div>
    );
}

export default SingleDoctorRouteComponent;
export {
    PortraiFotoPrimeCustomer,
    BewertungsBottom,
    ÖffungszeitenPrimeCustomer,
    KrankenkasseFachbereich,
    SingleDoctorRouteComponentBase64
};