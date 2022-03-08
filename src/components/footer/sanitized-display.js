// import { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
const AGBSanatizedDisplay = (prosdata, arrayOfkeyOfState) => {
    // const [displayState, setDisplayState] = useState(false);
    // console.log(prosdata);
    // console.log(arrayOfkeyOfState);
    const AGBSanatizedDisplay = arrayOfkeyOfState.map((moreData, index) => {

        const keyIncludes = [
            'fqaTexarea',
            'agbTexarea',
            'datenschutzTexarea',
            'impressumTexarea',
            'mediatarifeTexarea',
            'description',
            'blockoftext'
        ];
        // console.log(keyIncludes.includes(moreData));
        let selfInvokinFunction = (data) => {
            // console.log('PANTHASMA');
            // console.log(data);
            // console.log(typeof data);
            if (typeof data === "string") {
                var data = { blockoftext: data };
                // console.log(data[moreData]);
            }
            // console.log(moreData);
            // console.log(data[moreData]);
            if (keyIncludes.includes(moreData)) {
                // to check, if something contains something
                // https://stackoverflow.com/questions/6449131/javascript-regular-expression-to-not-match-a-word
                if (!(/<h2>/gi.test(data[moreData]) || /<h3>/gi.test(data[moreData]) || /<h4>/gi.test(data[moreData]) || /<h5>/gi.test(data[moreData]) || /<bulletpoints>/gi.test(data[moreData]) || /<p>/gi.test(data[moreData]) || /<facts>/gi.test(data[moreData]) || /<pinline>/gi.test(data[moreData]) || /<b>/gi.test(data[moreData]) || /<break>/gi.test(data[moreData]) || /<link>/gi.test(data[moreData]) || /<indentsection>/gi.test(data[moreData]))) {
                    // console.log('MISSING');
                    try {
                        throw new Error('Add h2 and p tags to textblock!');
                    } catch (e) {
                        // console.log(e.message);
                        // return <h2>{e.message}</h2>;
                    } finally {
                        // console.log('finally');
                        return (
                            <p key={moreData}>{data.blockoftext}</p>
                        );
                    }
                }
                var more = true;
                // let selfInvokinFunction = (data) => {
                let blocktextWithHTMLTags = data[moreData].match(/<h2>(.*?)<\/h2>|<h3>(.*?)<\/h3>|<h4>(.*?)<\/h4>|<h5>(.*?)<\/h5>|<facts>(.*?)<\/facts>|<bulletpoints>(.*?)<\/bulletpoints>|<p>(.*?)<\/p>|<pinline>(.*?)<\/pinline>|<b>(.*?)<\/b>|<break>(.*?)<\/break>|<link>(.*?)<\/link>|<indentsection>(.*?)<\/indentsection>/gi);
                // console.log(blocktextWithHTMLTags);
                // console.log(data);
                // TODO: selfInvokinFunction muss ausgeweitet werden
                var check;
                return check = blocktextWithHTMLTags.map((data, index) => {
                    // console.log(data);
                    // if (!(/<h2>/gi.test(data) || /<p>/gi.test(data))) throw new Error('No fruit!');
                    if (/<indentsection>/gi.test(data)) {
                        let res = data.replace(/<indentsection>|<\/indentsection>/gi, "");
                        let selfInvocedData = selfInvokinFunction(res);
                        // console.log('after calling');
                        // console.log(selfInvocedData);
                        return (
                            <div
                                style={{
                                    "width": "100%",
                                    "textIndent": "-9px",
                                    "paddingLeft": "9px"
                                }}
                            >
                                {selfInvocedData}
                            </div>
                        );

                    } if (/<facts>/gi.test(data)) {
                        let res = data.replace(/<facts>|<\/facts>/gi, "");
                        let selfInvocedData = selfInvokinFunction(res);
                        // console.log(data);
                        return (
                            <div
                                style={{
                                    "fontStyle": "italic"
                                }}
                            >
                                {selfInvocedData}
                            </div>
                        );
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } if (/<h2>/gi.test(data)) {
                        // console.log(data);
                        let res = data.replace(/<h2>|<\/h2>/gi, "");
                        // console.log(res);
                        return <h2 className="mt-5 pt-3" key={data}>{res}</h2>;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } if (/<h3>/gi.test(data)) {
                        // console.log(data);
                        let res = data.replace(/<h3>|<\/h3>/gi, "");
                        return <h3 className="mt-5" key={data}>{res}</h3>;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } if (/<h4>/gi.test(data)) {
                        // console.log(data);
                        let res = data.replace(/<h4>|<\/h4>/gi, "");
                        return <h4 className="mt-4" key={data}>{res}</h4>;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    }
                    if (/<h5>/gi.test(data)) {
                        // console.log(data);
                        let res = data.replace(/<h5>|<\/h5>/gi, "");
                        return <h5 className="mt-3" key={data}>{res}</h5>;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    }
                    if (/<bulletpoints>/gi.test(data)) {
                        // console.log(data);
                        let res = data.replace(/<bulletpoints>|<\/bulletpoints>/gi, "");
                        return <p style={{ "display": "inline" }} key={data}>&bull;{' '}</p>;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } if (/<p>/gi.test(data)) {
                        let res = data.replace(/<p>|<\/p>/gi, "");
                        // console.log(data);
                        return <p style={{ "fontSize": "17px" }} key={data}>{res}</p>;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } if (/<pinline>/gi.test(data)) {
                        let res = data.replace(/<pinline>|<\/pinline>/gi, "");
                        // console.log(data);
                        return (
                            <p
                                style={{
                                    "display": "inline",
                                    "fontSize": "17px",
                                }} key={data}>{res}</p>
                        );
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } if (/<b>/gi.test(data)) {
                        let res = data.replace(/<b>|<\/b>/gi, "");
                        // console.log(data);
                        return <b style={{ "fontSize": "17px" }} key={data}>{res}</b>;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } if (/<break>/gi.test(data)) {
                        let res = data.replace(/<break>|<\/break>/gi, "");
                        // console.log(data);
                        return <div></div>;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } if (/<link>/gi.test(data)) {
                        let res = data.replace(/<link>|<\/link>/gi, "");
                        let linkname = res.substr(0, res.indexOf('§'));
                        let linkToArticle = res.split('§')[1];
                        // console.log(res);

                        const MyLink = withRouter(({ history }) => (
                            <p
                                style={{
                                    "color": "blue",
                                    "display": "inline",
                                    "fontSize": "17px"
                                }}
                                onClick={() => { history.push(linkToArticle) }}
                            >
                                {" " + linkname}
                            </p>
                        ));
                        return <MyLink />;
                        // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                    } else {
                        return null;
                    }
                });
                // }
                // console.log(check);
                // let myPdata = selfInvokinFunction(data);
                // return myPdata;

            } else {
                // console.log('somthing else');
                // console.log(data[moreData]);
                return (null);
            }
        }
        let myPdata = selfInvokinFunction(prosdata);
        return myPdata;
    });//end saniitzed Function
    // console.log(AGBSanatizedDisplay);
    return AGBSanatizedDisplay;
}
export default AGBSanatizedDisplay;