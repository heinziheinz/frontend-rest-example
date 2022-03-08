import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import sanitizedDisplay from 'components/footer/sanitized-display';
import Fetcha from 'components/fetcha-component/fetcha-component';
const GesundheitsRatgeberSingleArticle = (props) => {
    const [mainArticle, setMainArticle] = React.useState([]);
    const [hasBeenFetched, setHasBeenFetched] = React.useState(false);
    const AbortController = window.AbortController;
    const myController = new AbortController();
    const mySignal = myController.signal;
    const { id } = useParams();
    const MyHref = window.location.href;
    // console.log(MyHref);
    const mainarticle = 'mainarticle';
    var myStorage = null;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
        },
        mode: 'cors',
        credentials: 'include',
        signal: mySignal
    }
    // console.log('LADDDDEN');
    const handleFetchMainArticleData = async (evt) => {
        // console.log('handleFetchMAINStorageData');
        // console.log(id);
        const mainArticleData = await Fetcha(process.env.REACT_APP_URL + 'api/startpage/startpage/{ startpage } ?' + id + '=number', options);
        setMainArticle(mainArticleData);
        localStorage.setItem(MyHref, JSON.stringify(mainArticleData[0]));
        // console.log(localStorage.getItem(MyHref));
    }
    useEffect(() => {
        // console.log('One TIMERONlY');
        return () => {
            // console.log('One TIMERONlY CLEAN');
        }
    }, []);

    useEffect(() => {
        // console.log(localStorage.getItem(MyHref));
        // console.log(typeof localStorage.getItem(MyHref));
        if (localStorage.getItem(MyHref) === null) {
            // console.log('FETCH');
            handleFetchMainArticleData();
        } else {
            // console.log('KEIN FETCH MEHR');
            if (hasBeenFetched === false) {
                setHasBeenFetched(true);
            }
        }

        return () => {
            // console.log('MORE TIMERONlY CLEAN');
            // localStorage.removeItem(MyHref);
        }
    }, [mainArticle]);
    // console.log(localStorage.getItem(MyHref));
    try {
        myStorage = JSON.parse(localStorage.getItem(MyHref));
    } catch (e) {
        // console.log(e);
        return <h2>Ein Fehler ist aufgetreten</h2>;
    }
    // console.log(myStorage);

    if (localStorage.getItem(MyHref) === null) {
        return (<p></p>);
    } else {
        var keys = Object.keys || require('object-keys');
        const arrayOfkeyOfState = keys(myStorage);
        // console.log(arrayOfkeyOfState);
        // console.log(myStorage);
        const mySanitizedText = sanitizedDisplay(myStorage, arrayOfkeyOfState);
        // console.log(myStorage);
        // className = "container border pl-5 pr-5"
        // console.log('GesundheutsRatgeber');
        // console.log(myStorage.headline);
        // console.log(myStorage.singletitleattribute.length);
        // console.log(myStorage);
        // console.log(process.env.REACT_APP_DEV_URL + 'gesundheitsratgeber/' + myStorage.id);
        var imgTitleAndAltAttribute;
        if (myStorage.singletitleattribute.length < 1) {
            imgTitleAndAltAttribute = { imageAlt: "Nice image without an alt text", imageTitle: "Nice image without an image title text" };
        } else {
            imgTitleAndAltAttribute = myStorage.singletitleattribute;
        }
        // console.log(imgTitleAndAltAttribute.imageAlt);
        // console.log(imgTitleAndAltAttribute.imageTitle);
        return (
            //    TODO: style: margin_left:0
            // Dann ganzes nach links
            <>
                <Helmet>
                    <title>{myStorage.headline + ' - ' + process.env.REACT_APP_DEV_URL_TITLE}</title>
                    <meta name="description"
                        content="Die Webseite spezialisiert auf die Suche nach Psychologen & psychologische Hilfe." />
                    <link rel="canonical" href={process.env.REACT_APP_DEV_URL + 'gesundheitsratgeber/' + myStorage.id} />
                </Helmet>
                <div
                    className="container border pt-4"
                    style={{
                        "paddingLeft": "10%",
                        "paddingRight": "10%"
                    }}
                >
                    <article>
                        <header
                            style={{
                                "paddingLeft": "0.5%"
                            }}
                        >
                            <h1
                                className="display-4 mb-1"
                                style={{
                                    "paddingRight": "23%"
                                }}
                            >{myStorage.headline}</h1>
                            <h5 className="font-weight-light text-left mb-1 mb-5" style={{ color: '#a5d8a5' }}>{process.env.REACT_APP_GESUNDHEITSNEWS}</h5>
                        </header>
                        <img
                            className="w-100 mb-4"
                            src={process.env.REACT_APP_URL + myStorage.imagelink[0]}
                            alt={imgTitleAndAltAttribute.imageAlt}
                            title={imgTitleAndAltAttribute.imageTitle}
                        />
                        <div
                        // style={{
                        //     "paddingRight": "25%"
                        // }}
                        >
                            <p
                                className="font-weight-bold text-justify"
                                style={{ "fontSize": "16px" }}
                            >{myStorage.subheadline}</p>
                        </div>
                        <div
                        // style={{
                        //     "paddingRight": "25%"
                        // }}
                        >
                            {mySanitizedText}
                        </div>
                    </article>
                </div >
            </>
        );
    }
}
export default GesundheitsRatgeberSingleArticle;
// String.fromCharCode('&#x2023;')