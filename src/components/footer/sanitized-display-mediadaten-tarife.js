const ImpressumSanatizedDisplay = (data, arrayOfkeyOfState) => {
    // console.log(da)
    const ImpressumSanatizedDisplay = arrayOfkeyOfState.map((moreData, index) => {

        if (moreData === 'headline') {
            // console.log(data[moreData]);
            return <h2 key={moreData}>{data[moreData]}</h2>;
        } if (moreData === 'subheadline') {
            return <h6 key={moreData}>{data[moreData]}</h6>;
        } else if (moreData === 'blockoftext') {
            // console.log(data[moreData]);


            // to check, if something contains something
            // https://stackoverflow.com/questions/6449131/javascript-regular-expression-to-not-match-a-word
            if (!(/<h2>/gi.test(data[moreData]) || /<h3>/gi.test(data[moreData]) || /<h4>/gi.test(data[moreData]) || /<p>/gi.test(data[moreData]) || /<facts>/gi.test(data[moreData]))) {
                console.log('MISSING');
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
            // let blocktextWithHTMLTags = data[moreData].match(/<h2>(.*?)<\/h2>|<p>(.*?)<\/p>/gi);
            let blocktextWithHTMLTags = data[moreData].match(/<h2>(.*?)<\/h2>|<h3>(.*?)<\/h3>|<h4>(.*?)<\/h4>|<facts>(.*?)<\/facts>|<p>(.*?)<\/p>/gi);
            console.log(blocktextWithHTMLTags);
            const check = blocktextWithHTMLTags.map((data, index) => {

                // if (!(/<h2>/gi.test(data) || /<p>/gi.test(data))) throw new Error('No fruit!');
                if (/<h2>/gi.test(data)) {
                    // console.log(data);
                    let res = data.replace(/<h2>|<\/h2>/gi, "");
                    return <h2 key={data}>{res}</h2>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                }
                if (/<h3>/gi.test(data)) {
                    // console.log(data);
                    let res = data.replace(/<h3>|<\/h3>/gi, "");
                    return <h3 key={data}>{res}</h3>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                }
                if (/<h4>/gi.test(data)) {
                    // console.log(data);
                    let res = data.replace(/<h4>|<\/h4>/gi, "");
                    return <h4 key={data}>{res}</h4>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                } if (/<p>/gi.test(data)) {
                    // console.log(data);
                    let res = data.replace(/<p>|<\/p>/gi, "");
                    return <p key={data}>{res}</p>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                } else if (/<facts>/gi.test(data)) {
                    let res = data.replace(/<facts>|<\/facts>/gi, "");
                    // console.log(data);
                    return <p key={data}>{res}</p>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                }
            });
            console.log(check);
            return check;
        } else {
            // console.log('somthing else');
            // console.log(data[moreData]);
            return (null);
        }
    });//end saniitzed Function
    // console.log(ImpressumSanatizedDisplay);
    return ImpressumSanatizedDisplay;
}
export default ImpressumSanatizedDisplay;