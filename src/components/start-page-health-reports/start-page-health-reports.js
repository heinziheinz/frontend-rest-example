import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import {
    StartPageMainArticle,
    StartPageHorizontalBlock,
    StartPageSideBar
} from 'components/atoms';
import { SortingOutdownToSpecificNumber } from 'components/regex-collection';
const StartPageHealthReports = (url) => {
    // console.log('called');
    // console.log(url);
    const myState = {
        error: false
    };
    const [mydata, setData] = useState([]);
    const [myErrorReport, setMyErrorReport] = useState(myState);
    const doFetch = (url, option) => {
        // console.log(url);
        fetch(url, option)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                // TODO if unauthenticated, then redirect
                // wie kann ich hier einen redirect mechanismus einführen
                setData(data);
            })
            .catch((err) => {
                // console.log(err);
                setMyErrorReport({
                    ...myErrorReport,
                    error: true
                });
                return err;
            });
    }


    useEffect(() => {
        // console.log('render startPageHEaltnREport');
        console.log('HI PRERENDERER');
        const url = process.env.REACT_APP_URL + 'api/startpage/startpage';
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            }
        };
        doFetch(url, options);
    }, []);

    // console.log(myErrorReport.error === true);
    if (myErrorReport.error === true) {
        return (<div class="alert alert-danger">
            <strong>Verbindungsfehler!</strong> Es tut uns Sehr leid, es konnte keine Verbindung aufgebaut werden.
        </div>);
    }
    if (mydata.length > 0) {
        console.log('StartPage mydata');
        console.log(mydata[0].headline);
        console.log('Start Page after my mydata');
        const main = SortingOutdownToSpecificNumber(mydata, 1, 'main');
        const sidebar = SortingOutdownToSpecificNumber(mydata, 4, 'sidebar');
        const horizontal = SortingOutdownToSpecificNumber(mydata, 3, 'horizontalblock');
        const startpageArticleComponents = main.concat(sidebar, horizontal);

        const startpagemainarticle = startpageArticleComponents.map((data, index) => {
            if (data.category === "main" && data.confirmed === 1) {
                // console.log(data)
                return (
                    <StartPageMainArticle key={data.category + index} data={data} />
                );

            } else {
                return (null);
            }
        });
        // console.log(startpagemainarticle);
        const startpagesidebar = startpageArticleComponents.map((data, index) => {
            if (data.category === 'sidebar' && data.confirmed === 1) {
                // console.log(data.blockoftext);
                return (
                    <StartPageSideBar key={data.blockoftext + index} data={data} index={index} />
                );
            } else {
                return (null);
            }
        });
        const startpagehorizontalblock = startpageArticleComponents.map((data, index) => {
            // console.log(data.category)
            // console.log(data.blockoftext);
            if (data.category === 'horizontalblock' && data.confirmed === 1) {
                // console.log(data.category)
                return (
                    <StartPageHorizontalBlock key={data.blockoftext + index} data={data} index={index} />
                );
            } else {
                return (null);
            }
        });

        // <div style={{ textAlign: "left" }} className="d-flex mt-5">
        return (
            <>
                <Helmet>
                    <title>Psyinfosearch | Suche nach Psychologen & psychologische Hilfe.</title>
                    <meta name="description"
                        content="Die Webseite spezialisiert auf die Suche nach Psychologen & psychologische Hilfe." />
                    <link rel="canonical" href={process.env.REACT_APP_URL} />
                </Helmet>
                <div className="container mt-3">
                    <div className="d-flex">
                        <div
                            style={{
                                "width": "65%"
                            }}>
                            {startpagemainarticle}
                        </div>
                        <div
                            style={{
                                "width": "35%",
                            }}>
                            {startpagesidebar}
                        </div>
                    </div>
                    <div className="d-flex mt-5 mb-5">
                        {startpagehorizontalblock}
                    </div>
                </div>

            </>
        );
    } else {
        console.log('NULL DATA START PAGE');
        return (
            null
        );
    }
}
export default StartPageHealthReports;
