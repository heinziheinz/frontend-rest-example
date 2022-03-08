const AGBSanatizedDisplay = (data, arrayOfkeyOfState) => {
    // console.log(da)
    const AGBSanatizedDisplay = arrayOfkeyOfState.map((moreData, index) => {
        console.log(moreData);
        console.log('Säy HELLO');
        // console.log(moreData === 'blockoftext');
        if (moreData === 'blockoftext') {
            // console.log(data[moreData]);


            // to check, if something contains something
            // https://stackoverflow.com/questions/6449131/javascript-regular-expression-to-not-match-a-word
            if (!(/<h2>/gi.test(data[moreData]) || /<p>/gi.test(data[moreData]))) {
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
            let blocktextWithHTMLTags = data[moreData].match(/<h2>(.*?)<\/h2>|<p>(.*?)<\/p>/gi);
            console.log(blocktextWithHTMLTags);
            const check = blocktextWithHTMLTags.map((data, index) => {

                // if (!(/<h2>/gi.test(data) || /<p>/gi.test(data))) throw new Error('No fruit!');
                if (/<h2>/gi.test(data)) {
                    console.log(data);
                    let res = data.replace(/<h2>|<\/h2>/gi, "");
                    return <h2 key={data}>{res}</h2>;
                    // hier zur jeweiligen Funktion bzw. Component schicken, um in React den Text in HTML Tag zu wrappen
                } else if (/<p>/gi.test(data)) {
                    let res = data.replace(/<p>|<\/p>/gi, "");
                    console.log(data);
                    return <p key={data}> &bull;{res}</p>;
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
    });//end saniitzed Function
    // console.log(AGBSanatizedDisplay);
    return AGBSanatizedDisplay;
}
export default AGBSanatizedDisplay;