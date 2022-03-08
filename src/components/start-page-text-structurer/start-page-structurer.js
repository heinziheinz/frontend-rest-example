import React from 'react';
const SanatizedDisplay = (data) => {
    console.log(data);
    var keys = Object.keys || require('object-keys');
    const arrayOfkeyOfState = keys(data);
    console.log(arrayOfkeyOfState);
    // console.log(arrayOfkeyOfState)
    return arrayOfkeyOfState.map((moreData, index) => {
        if (moreData === 'blockoftext') {
            console.log(data[moreData]);
            if (!(/<h2>/gi.test(data[moreData]) || /<p>/gi.test(data[moreData]) || /<arrow>/gi.test(data[moreData]))) {
                console.log('MISSING');
                try {
                    throw new Error('Sorry, something went wrong!');
                } catch (e) {
                    // console.log(e.message);
                    return <h2 key={moreData}>{e.message}</h2>;
                }
            }
            let blocktextWithHTMLTags = data[moreData].match(/<h2>(.*?)<\/h2>|<p>(.*?)<\/p>|<arrow>(.*?)<\/arrow>/gi);
            // console.log(blocktextWithHTMLTags);
            const check = blocktextWithHTMLTags.map((data, index) => {

                //TODO: Überlegen, wie man die reg ex verbessern kann: Wie kann ich nested tag seperat bearbeiten und dann wieder zusammenfügen
                // TODO: Oder soll ich soetwas wie Formulare machen, die man dann in chronologische Reihenfolge "anhängen" kann?
                if (/<h2>/gi.test(data)) {
                    let res = data.replace(/<h2>|<\/h2>/gi, "");
                    return <h4 key={data + index} className="font-weight-bold">{res}</h4>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                } if (/<arrow>/gi.test(data)) {
                    let res = data.replace(/<arrow>|<\/arrow>/gi, "");
                    return <p key={data + index} className="font-italic">{"\u2023" + ' ' + res}</p>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                } else if (/<p>/gi.test(data)) {
                    let res = data.replace(/<p>|<\/p>/gi, "");
                    return <p key={data + index} >{res}</p>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                }
            });
            // console.log(check);
            return check;
        } else {
            // console.log('somthing else');
            // console.log(data[moreData]);
            return (null);
        }
    });
}
export default SanatizedDisplay;
// "\u2023" +
{/* <p class="font-weight-bolder">Bolder text.</p> */ }