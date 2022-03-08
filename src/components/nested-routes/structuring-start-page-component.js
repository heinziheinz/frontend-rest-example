
import React from 'react';

export const StructuringStartPageComponent = (props) => {
    var keys = Object.keys || require('object-keys');
    // const myState = this.state;
    var data = props.data;

    const arrayOfkeyOfState = keys(props.data);
    // console.log(arrayOfkeyOfState);
    const newRows = [];
    const mySanatizedDisplay = arrayOfkeyOfState.map((moreData, index) => {
        // console.log(moreData);
        // console.log(moreData === 'blockoftext');
        // return (null);
        if (moreData === 'category') {
            // console.log(data[moreData]);
            return <h6 key={moreData + index}>{data[moreData]}</h6>;
        } else if (moreData === 'headline') {
            // console.log(data[moreData]);
            return <h3 key={moreData + index}>{data[moreData]}</h3>;
        } else if (moreData === 'subheadline') {
            // console.log(data[moreData]);
            return <h6 key={moreData + index}>{data[moreData]}</h6>;
        } else if (moreData === 'captions') {
            // console.log(data[moreData]);
            return (
                <h5 key={moreData + index}>{data[moreData]}</h5>
            );
        } else if (moreData === 'blockoftext') {
            // console.log(data[moreData]);


            // to check, if something contains something
            // https://stackoverflow.com/questions/6449131/javascript-regular-expression-to-not-match-a-word
            if (!(/<h2>/gi.test(data[moreData]) || /<p>/gi.test(data[moreData]))) {
                // console.log('MISSING');
                try {
                    throw new Error('Add h2 and p tags to textblock!');
                } catch (e) {
                    // console.log(e.message);
                    // return <h2>{e.message}</h2>;
                } finally {
                    // console.log('finally');
                    return (
                        <p key={moreData + index}>{data.blockoftext}</p>
                    );
                }
            }
            let blocktextWithHTMLTags = data[moreData].match(/<h2>(.*?)<\/h2>|<p>(.*?)<\/p>/gi);
            // console.log(blocktextWithHTMLTags);
            const check = blocktextWithHTMLTags.map((data, index) => {

                // if (!(/<h2>/gi.test(data) || /<p>/gi.test(data))) throw new Error('No fruit!');
                if (/<h2>/gi.test(data)) {
                    let res = data.replace(/<h2>|<\/h2>/gi, "");
                    return <h2 key={data + index}>{res}</h2>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                } else if (/<p>/gi.test(data)) {
                    let res = data.replace(/<p>|<\/p>/gi, "");
                    return <p key={data + index}>{res}</p>;
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
    return mySanatizedDisplay;
}