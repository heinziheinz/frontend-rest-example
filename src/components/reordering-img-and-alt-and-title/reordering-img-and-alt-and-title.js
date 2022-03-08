export default (altAndTitleAttribute) => {
    var myArray = [];
    for (const [index, [key, value]] of Object.entries(Object.entries(altAndTitleAttribute))) {
        if (!(index % 2)) myArray.push({
            [Object.keys(altAndTitleAttribute)[index]]: Object.values(altAndTitleAttribute)[index],
            [Object.keys(altAndTitleAttribute)[1 + parseInt(index)]]: Object.values(altAndTitleAttribute)[1 + parseInt(index)]
        })
    }
    return JSON.stringify(myArray);
}
// explained
// default(objectStructure);
// const objectStructure = {
//     firstBackgroundImageAlt: 'Lambo',
//     firstBackgroundImageTitle: 'Smcck',
//     secondBackgroundImageAlt: 'Kambp',
//     secondBackgroundImageTitle: 'Slck',
//     ...
// }


export const AddingLinkToAltAndTitleAttribute = (myObject) => {
    var chek = new Array();
    // console.log(myObject);
    // console.log(myObject.imagebackgroundlink);
    var altandtitleattributeParsed = JSON.parse(myObject.altandtitleattribute);
    // console.log(altandtitleattributeParsed);
    altandtitleattributeParsed.forEach(function (x, index) {

        // console.log(x);

        if (x[Object.keys(x)[0]] !== "" && x[Object.keys(x)[1]] !== "" && myObject.imagebackgroundlink[index] !== undefined) {
            var obj = Object.assign({}, x, { name: myObject.imagebackgroundlink[index] });
            chek.push(obj);
        }
    });
    return chek;
}
// explaind:
// myNewFunction(myObject)
/*myObject: [{
    firstBackgroundImageAlt: 'Mambo',
    firstBackgroundImageTitle: 'Sambo',
}, {
    secondBackgroundImageAlt: 'Jambo',
    secondBackgroundImageTitle: 'Gambo',
}, {
    thirdBackgroundImageAlt: 'Dambo',
    thirdBackgroundImageTitle: 'Rambo',
},
{
    fourthBackgroundImageAlt: 'Leckko',
    fourthBackgroundImageTitle: 'Luckko',
}
    , {
    thirdBackgroundImageAlt: 'Knekko',
    thirdBackgroundImageTitle: 'Duckko',
},
    //     , {
    //     thirdBackgroundImageAlt: '',
    //     thirdBackgroundImageTitle: '',
    // }
]*/