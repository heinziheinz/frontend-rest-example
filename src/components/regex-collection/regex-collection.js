// import React from 'react';

var sourceCodeMap = {
    "&": "\u0026",
    "<": "\u003C",
    ">": "\u003E",
    '"': '\u0022',
    "'": '\u0027',
    "/": '\u002F',
    ")": '\u0029',
    "(": '\u0028',
    ";": '\u003B'
};
var HTMLEntityToSourceCodeMap = {
    "&amp;": "\u0026",
    "&lt;": "\u003C",
    "&gt;": "\u003E",
    "&quot;": "\u0022",
    "&#39;": "\u0027",
    "&#x2f;": "\u002F",
    "&#41;": "\u0029",
    "&#40;": "\u0028",
    "&#x3b;": "\u003B"
};

//sanitizeing values
// https://stackoverflow.com/questions/24154267/what-is-the-correct-way-to-support-apostrophes-in-javascript-when-building-up-ht
var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;',
    ")": '&rpar;',
    "(": '&lpar;',
    ";": '&semi;'
};
// EscapeHtml
// EscapeHtmlEntityToSourceCodeMap
function EscapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

function EscapeHtmlEntityToSourceCodeMap(string) {
    return String(string).replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2f;|&#41;|&#40;|&#x3b;/g, function (s) {
        return sourceCodeMap[s];
    });
}
//END

const MailRegEx = () => {
    const validEmailRegex =
        new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    return (
        validEmailRegex
    );
}
// time reg ex:
// https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s06.html
const TimeRegEx = () => {
    const timeRegEx = new RegExp(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/);
}

const RegExForPostCode = () => {
    const regExForPostCode = new RegExp(/^[0-9][0-9][0-9][0-9]$/);
    return (regExForPostCode);
}
// on how to create a strong password
// https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/

const RegEx = (props) => {
    return (
        null
    );
}

//Regex form passwords

const StrongRegexPassword = () => {
    const strongRegexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegexPassword;
}

const MediumRegexPassword = () => {
    var mediumRegexPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    return mediumRegexPassword;
}

const SwitchRegExForPassword = (name, errors, value) => {
    switch (name) {
        case 'password':
            if (StrongRegexPassword().test(errors.value)) {
                errors.password = 'strong';
            } else if (MediumRegexPassword().test(value)) {
                errors.password = 'medium';
            } else {
                errors.password = 'weak';
            }
    }
}

const NameRegExValidation = () => {
    const nameRegExValidation = new RegExp(/^[a-z ,.'-äöüß]+$/ig);
    return (
        nameRegExValidation
    );
}
const AddressRegExValidation = () => {
    const addressRegExValidation = new RegExp(/^[\w',-\\/.\söäüß]{3,60}$/ig);
    return (
        addressRegExValidation
    );
}
const KrankenkasseRegExValidation = () => {
    const addressRegExValidation = new RegExp(/^[a-zA-Zäöüß]{3,15}$/ig);
    return (
        addressRegExValidation
    );
}

const ProfessionDescribtionRegExValidation = () => {
    const professionDEscribtionRegExValidation = new RegExp(/^[\w'!"?,-\\/.\säöüß]{3,1600}$/ig);
    return (
        professionDEscribtionRegExValidation
    );
}

const GesprocheneSprachenRegExValidation = () => {
    const gesprocheneSprachenRegExValidation = new RegExp(/^[a-zA-Z]{2,15}$/ig);
    return (
        gesprocheneSprachenRegExValidation
    );
}

const GesprocheneSprachenRegExValidationVariante = () => {
    const gesprocheneSprachenRegExValidation = new RegExp(/\b[a-zA-Z]{3,8}\b/ig);
    return (
        gesprocheneSprachenRegExValidation
    );
}
const GesprocheneSprachenRegExKeineSonderzeichen = () => {
    const gesprocheneSprachenRegExValidation = new RegExp(/^((?!(\d|def|"|')).)*$/);
    return (
        gesprocheneSprachenRegExValidation
    );
}

const BlockOfTextRegExValidation = () => {
    const blockOfTextRegExValidation = new RegExp(/^[üäöß§()\w'!"?,-\\/.\s0-9]{3,60000}$/ig);
    return (
        blockOfTextRegExValidation
    );
}
const CaptionRegExValidation = () => {
    const CaptionRegExValidation = new RegExp(/^[üäöß()\w'!"?,-\\/.\s0-9]{3,2000}$/ig);
    return (
        CaptionRegExValidation
    );
}
const Category = () => {
    const CategoryRegExValidation = new RegExp(/^[\w'!"?,-\\/.\s0-9]{3,50}$/ig);
    return (
        CategoryRegExValidation
    );
}
const ExtractingBlockOfText = () => {
    const extractingBlockOfText = new RegExp(/<h2>(.*?)<\/h2>|<h3>(.*?)<\/h3>|<h4>(.*?)<\/h4>|<h5>(.*?)<\/h5>|<p>(.*?)<\/p>|<pinline>(.*?)<\/pinline>|<bulletpoints>(.*?)<\/bulletpoints>|<b>(.*?)<\/b>|<break>(.*?)<\/break>|<link>(.*?)<\/link>|<indentsection>(.*?)<\/indentsection>|<facts>(.*?)<\/facts>/gi);
    return (
        extractingBlockOfText
    );
}
const UseOfNotAllowedTag = () => {
    const useOfNotAllowedTag = new RegExp(/[<]|[>]|[\[]|[\]]/gi);
    return (
        useOfNotAllowedTag
    );
}
const UseOfCityNames = () => {
    const useOfNotAllowedTag = new RegExp(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/gi);
    return (
        useOfNotAllowedTag
    );
}
const SpaceForUnderScoreAndToLowerCase = (prop) => {
    const spaceForUnderScoreAndToLowerCase = prop.replace(/\s/g, '_').toLowerCase();
    return (
        spaceForUnderScoreAndToLowerCase
    );
}
const AllToLowerCase = (prop) => {
    const allToLowerCase = prop.toLowerCase();
    return (
        allToLowerCase
    );
}
const SortingOutdownToSpecificNumber = (data, number, category) => {
    const filteredData = data.filter((data) => {
        if (data.category === category && data.confirmed === 1) {
            return data;
        }
    });
    const myfiltered = filteredData.filter((
        each,
        index,
        all
    ) => {
        if (index < number) {
            return data;
        }
    });
    return myfiltered;
}

const OfficeTimes = (data) => {
    var officeTime;
    if (/vormittagende/.test(data)) return officeTime = '12:00';
    if (/nachmittagende/.test(data)) return officeTime = '17:00';
    if (/nachmittag/.test(data)) return officeTime = '13:00';
}
const nachMittag = (data) => {
    return /nachmittag$/.test(data);
}

const VormittagEnde = (data) => {
    return /vormittagende$/.test(data);
}
const PhoneNumberRegEx = () => {
    const phoneNumberRegEx = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{2,50}$/g);
    return (
        phoneNumberRegEx
    );
}
const GesundheitsratgeberInPathExistent = () => {
    const gesundheitsratgeberInPathExistent = new RegExp(/gesundheitsratgeber/);
    return (
        gesundheitsratgeberInPathExistent
    );
}

export default RegEx;
export {
    EscapeHtml,
    EscapeHtmlEntityToSourceCodeMap,
    MailRegEx,
    TimeRegEx,
    RegExForPostCode,
    StrongRegexPassword,
    MediumRegexPassword,
    NameRegExValidation,
    AddressRegExValidation,
    KrankenkasseRegExValidation,
    ProfessionDescribtionRegExValidation,
    GesprocheneSprachenRegExValidation,
    BlockOfTextRegExValidation,
    CaptionRegExValidation,
    Category,
    ExtractingBlockOfText,
    UseOfNotAllowedTag,
    UseOfCityNames,
    SpaceForUnderScoreAndToLowerCase,
    AllToLowerCase,
    SortingOutdownToSpecificNumber,
    OfficeTimes,
    nachMittag,
    VormittagEnde,
    GesprocheneSprachenRegExKeineSonderzeichen,
    GesprocheneSprachenRegExValidationVariante,
    PhoneNumberRegEx,
    GesundheitsratgeberInPathExistent
};