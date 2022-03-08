import React from 'react';
import {
    MailRegEx,
    RegExForPostCode,
    NameRegExValidation,
    AddressRegExValidation,
    KrankenkasseRegExValidation,
    ProfessionDescribtionRegExValidation,
    GesprocheneSprachenRegExValidation,
    StrongRegexPassword,
    MediumRegexPassword,
    BlockOfTextRegExValidation,
    CaptionRegExValidation,
    Category,
    ExtractingBlockOfText,
    UseOfNotAllowedTag,
    UseOfCityNames,
    GesprocheneSprachenRegExKeineSonderzeichen,
    GesprocheneSprachenRegExValidationVariante,
    PhoneNumberRegEx
} from 'components/regex-collection';

const ErrorDisplay = (props) => {
    // console.log(props.error);
    // console.log(props);
    return (
        <div>{props.error.length > 0 &&
            <span>{props.error}</span>}</div>
    );
}


const Test = (name, errors, value) => {
    switch (name) {
        case 'fullName':
            errors.fullName =
                value.length < 5
                    ? 'Full Name must be 5 characters long!'
                    : '';
            break;
        case 'email':
            errors.email =
                MailRegEx().test(value)
                    ? ''
                    : 'Email is not valid!';
            break;
        case 'password':
            errors.password =
                value.length < 8
                    ? 'Password must be 8 characters long!'
                    : '';
            break;
        default:
            break;
    }

}

const MySwitchForPrimeUser = (name, errors, value) => {

    switch (name) {
        case 'title':

            errors.title =
                'Titel hinzufügen' === value ?
                    errors.title = 'NOT ACCEPTED: Select a title'
                    :
                    errors.title = '';
            break;
        case 'name':
            errors.name =
                NameRegExValidation().test(value)
                    ? 'Name is valid!'
                    : 'NOT ACCEPTED: Name is not valid';
            break;
        case 'specialization':

            'Titel hinzufügen' === value ?
                errors.specialization = 'NOT ACCEPTED: Select a specialization'
                :
                errors.specialization = '';
            break;
        case 'postleitzahl':
            errors.postleitzahl =
                RegExForPostCode().test(value)
                    ? 'Postcode is valid!'
                    : 'NOT ACCEPTED: Postcode must be 4 digits long!';
            break;
        case 'stadt':
            errors.stadt =
                UseOfCityNames().test(value)
                    ? 'City name is valid!'
                    : 'NOT ACCEPTED: City name is not accepted!';
            break;
        case 'bundesland':
            errors.bundesland =
                UseOfCityNames().test(value) && value !== 'Bundesland hinzufügen'
                    ? 'name for bundesland is valid!'
                    : 'NOT ACCEPTED: Name for bundesland is not accepted!';
            break;
        case 'adresse':
            errors.adresse =
                AddressRegExValidation().test(value)
                    ? 'Address is valid!'
                    : 'NOT ACCEPTED: Adress is not vaild';
            break;
        case 'krankenkassen':
            errors.krankenkassen =
                KrankenkasseRegExValidation().test(value)
                    ? 'Wort passt'
                    : 'NOT ACCEPTED: Invalid use of characters!';
            break;
        case 'montag':
            errors.montag =
                value.length < 8
                    ? 'NOT ACCEPTED: Password must be 8 characters long!'
                    : '';
            break;
        case 'dienstag':
            errors.dienstag =
                value.length < 8
                    ? 'NOT ACCEPTED: Password must be 8 characters long!'
                    : '';
            break;
        case 'mittwoch':
            errors.mittwoch =
                value.length < 8
                    ? 'NOT ACCEPTED: Password must be 8 characters long!'
                    : '';
            break;
        case 'donnerstag':
            errors.donnerstag =
                value.length < 8
                    ? 'NOT ACCEPTED: Password must be 8 characters long!'
                    : '';
            break;
        case 'freitag':
            errors.freitag =
                value.length < 8
                    ? 'NOT ACCEPTED: Password must be 8 characters long!'
                    : '';
            break;
        case 'samstag':
            errors.samstag =
                value.length < 8
                    ? 'NOT ACCEPTED: Password must be 8 characters long!'
                    : '';
            break;
        case 'sonntag':
            errors.sonntag =
                value.length < 8
                    ? 'NOT ACCEPTED: Password must be 8 characters long!'
                    : '';
            break;
        case 'emailaddresse':
            errors.emailaddresse =
                MailRegEx().test(value)
                    ? 'Email is valid'
                    : 'NOT ACCEPTED: Email is not valid!';
            break;
        case 'email':
            errors.email =
                MailRegEx().test(value)
                    ? 'Email is ok'
                    : 'NOT ACCEPTED: Email is not valid!';
            break;
        case 'description':
            errors.description =
                ProfessionDescribtionRegExValidation().test(value)
                    ? 'Text passt!'
                    : 'NOT ACCEPTED: Characters are not valid';
            break;
        case 'gesprochenesprache':
            let trueOrFalse = GesprocheneSprachenRegExKeineSonderzeichen().test(value);
            let trueOrFalseTwo = GesprocheneSprachenRegExValidationVariante().test(value);
            errors.gesprochenesprache =
                trueOrFalse && trueOrFalseTwo
                    ? 'Characres are valid !'
                    : 'NOT ACCEPTED: Characters are not valid';
            break;
        case 'password':
            if (StrongRegexPassword().test(value)) {
                errors.password = 'strong';
            } else if (MediumRegexPassword().test(value)) {
                errors.password = 'medium';
            } else {
                errors.password = 'weak';
            }
            break;
        case 'headline':

            if (CaptionRegExValidation().test(value)) {
                errors.headline = 'Characters for headline are allowed';
                if (UseOfNotAllowedTag().test(value)) {

                    errors.headline = 'NOT ACCEPTED: Use of invalid tag!';
                }
            } else {
                errors.headline = 'NOT ACCEPTED: Character for headline is not allowed';
            }
            break;
        case 'subheadline':
            if (CaptionRegExValidation().test(value)) {
                errors.subheadline = 'Characters for subheadline are allowed';
                if (UseOfNotAllowedTag().test(value)) {

                    errors.subheadline = 'NOT ACCEPTED: Use of invalid tag!';
                }
            } else {
                errors.subheadline = 'NOT ACCEPTED: Character for subheadline is not allowed';
            }
            break;
        case 'category':
            if (Category().test(value)) {
                errors.category = 'Characters for category are allowed';
                if (UseOfNotAllowedTag().test(value)) {

                    errors.category = 'NOT ACCEPTED: Use of invalid tag!';
                }
            } else {
                errors.category = 'NOT ACCEPTED: Character for category is not allowed';
            }
            break;
        case 'captions':
            if (CaptionRegExValidation().test(value)) {
                errors.captions = 'Caption is allowed';
                if (UseOfNotAllowedTag().test(value)) {
                    errors.captions = 'NOT ACCEPTED: Use of invalid tag!';
                }
            } else {
                errors.captions = 'NOT ACCEPTED: Character for caption is not allowed';
            }
            break;
        case 'blockoftext':
            let allowedCharactersUsed = BlockOfTextRegExValidation().test(value);
            if (allowedCharactersUsed) {

                let txt = value.replace(ExtractingBlockOfText(), "");

                if (txt.length > 0) {

                    errors.blockoftext = 'NOT ACCEPTED: Some text is not enclosed with a tags';
                }
                if (UseOfNotAllowedTag().test(txt)) {

                    errors.blockoftext = 'NOT ACCEPTED: Use of invalid tag!';
                }


                if (!(UseOfNotAllowedTag().test(txt)) && txt.length === 0) {
                    errors.blockoftext = 'Allowed';
                }
            } else {
                errors.blockoftext = 'NOT ACCEPTED: Characters are not allowed';

            }
            break;
        case 'agbTexarea':
            let allowedCharactersUseds = BlockOfTextRegExValidation().test(value);
            if (allowedCharactersUseds) {
                let txt = value.replace(ExtractingBlockOfText(), "");
                if (txt.length > 0) {
                    // console.log('some text is not properly enclosed');
                    errors.agbTexarea = 'NOT ACCEPTED: Some text is not enclosed with a tags';
                }
                if (UseOfNotAllowedTag().test(txt)) {
                    errors.agbTexarea = 'NOT ACCEPTED: Use of invalid tag!';
                }
                if (!(UseOfNotAllowedTag().test(txt)) && txt.length === 0) {
                    // console.log('allowed');
                    errors.agbTexarea = 'Allowed';
                }
            } else {
                errors.agbTexarea = 'NOT ACCEPTED: Characters are not allowed';

            }
        case 'datenschutzTexarea':
            let allowedCharactersUsedss = BlockOfTextRegExValidation().test(value);
            if (allowedCharactersUsedss) {
                let txt = value.replace(ExtractingBlockOfText(), "");
                if (txt.length > 0) {
                    errors.datenschutzTexarea = 'NOT ACCEPTED: Some text is not enclosed with a tags';
                }
                if (UseOfNotAllowedTag().test(txt)) {
                    errors.datenschutzTexarea = 'NOT ACCEPTED: Use of invalid tag!';
                }

                if (!(UseOfNotAllowedTag().test(txt)) && txt.length === 0) {
                    errors.datenschutzTexarea = 'Allowed';
                }
            } else {
                errors.datenschutzTexarea = 'NOT ACCEPTED: Characters are not allowed';

            }
            break;
        case 'fqaTexarea':
            // console.log('FQA');
            let allowedCharactersUsedsss = BlockOfTextRegExValidation().test(value);
            if (allowedCharactersUsedsss) {
                let txt = value.replace(ExtractingBlockOfText(), "");
                // console.log(txt);
                if (txt.length > 0) {
                    errors.fqaTexarea = 'NOT ACCEPTED: Some text is not enclosed with a tags';
                }
                if (UseOfNotAllowedTag().test(txt)) {
                    errors.fqaTexarea = 'NOT ACCEPTED: Use of invalid tag!';
                }

                if (!(UseOfNotAllowedTag().test(txt)) && txt.length === 0) {
                    errors.fqaTexarea = 'Allowed';
                }
            } else {
                errors.fqaTexarea = 'NOT ACCEPTED: Characters are not allowed';

            }
            break;
        case 'mediatarifeTexarea':
            let allowedCharactersUsedssss = BlockOfTextRegExValidation().test(value);
            if (allowedCharactersUsedssss) {
                let txt = value.replace(ExtractingBlockOfText(), "");
                if (txt.length > 0) {
                    errors.mediatarifeTexarea = 'NOT ACCEPTED: Some text is not enclosed with a tags';
                }
                if (UseOfNotAllowedTag().test(txt)) {
                    errors.mediatarifeTexarea = 'NOT ACCEPTED: Use of invalid tag!';
                }
                if (!(UseOfNotAllowedTag().test(txt)) && txt.length === 0) {
                    errors.mediatarifeTexarea = 'Allowed';
                }
            } else {
                errors.mediatarifeTexarea = 'NOT ACCEPTED: Characters are not allowed';

            }
            break;
        case 'impressumTexarea':
            let allowedCharactersUsedsssss = BlockOfTextRegExValidation().test(value);
            if (allowedCharactersUsedsssss) {
                let txt = value.replace(ExtractingBlockOfText(), "");
                // console.log(txt);
                if (txt.length > 0) {
                    errors.impressumTexarea = 'NOT ACCEPTED: Some text is not enclosed with a tags';
                }
                if (UseOfNotAllowedTag().test(txt)) {
                    // console.log('not allowed tag');
                    errors.impressumTexarea = 'NOT ACCEPTED: Use of invalid tag!';
                }

                if (!(UseOfNotAllowedTag().test(txt)) && txt.length === 0) {
                    errors.impressumTexarea = 'Allowed';
                }
            } else {
                errors.impressumTexarea = 'NOT ACCEPTED: Characters are not allowed';

            }
            break;
        case 'imagelink':
            if (value) {
                errors.imagelink = '';
            } else {
                errors.imagelink = 'NOT ACCEPTED: Imagelink is missing';
            }
            break;
        case 'imagebackgroundlink':
            if (value) {
                errors.imagebackgroundlink = '';
            } else {
                errors.imagebackgroundlink = 'NOT ACCEPTED: imagebackgroundlink is missing';
            }
            break;
        case 'stipulation':
            if (value) {
                errors.stipulation = '';
            } else {
                errors.stipulation = 'NOT ACCEPTED: stipulation is missing';
            }
            break;
        case 'telefonnumber':
            if (PhoneNumberRegEx().test(value)) {
                errors.telefonnumber = '';
            } else {
                errors.telefonnumber = 'NOT ACCEPTED: phone number not valid';
            }
            break;
        case 'firstBackgroundImageAlt': case 'firstBackgroundImageTitle':
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            break;
        case 'secondBackgroundImageAlt': case 'secondBackgroundImageTitle':
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition2";
            break;
        case 'thirdBackgroundImageAlt': case 'thirdBackgroundImageTitle':
            // console.log('third');
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition3";
            break;
        case 'fourthBackgroundImageAlt': case 'fourthBackgroundImageTitle':
            // console.log('fourth');
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition4";
            break;
        case 'fithsBackgroundImageAlt': case 'fithsBackgroundImageTitle':
            // console.log('fiths');
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition5";
            break;
        case 'sixBackgroundImageAlt': case 'sixBackgroundImageTitle':
            // console.log('sixth');
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition6";
            break;
        case 'sevenBackgroundImageAlt': case 'sevenBackgroundImageTitle':
            // console.log('senventh');
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition7";
            break;
        case 'eightBackgroundImageAlt': case 'eightBackgroundImageTitle':
            // console.log('eigth');
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition8";
            break;
        case 'nineBackgroundImageAlt': case 'nineBackgroundImageTitle':
            // console.log('nineth');
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition9";
            break;
        case 'tenBackgroundImageAlt': case 'tenBackgroundImageTitle':
            // console.log('tenth');
            if (CaptionRegExValidation().test(value)) {
                errors.altAndTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.altAndTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition10";
            break;
        case 'imageTitle':
            // console.log('tenth');
            if (CaptionRegExValidation().test(value)) {
                errors.singleTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.singleTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition10";
            break;
        case 'imageAlt':
            // console.log('tenth');
            if (CaptionRegExValidation().test(value)) {
                errors.singleTitleAttribute[name] = 'Characters for headline are allowed';
                // console.log('not allowed tag')
            } else {
                errors.singleTitleAttribute[name] = 'NOT ACCEPTED: Use of invalid tag!';
            }
            // errors.altAndTitleAttribute[name] = "condition10";
            break;
        default:
            break;
    }
}
const TestSwitcher = (name, errors, value, keys) => {
    // console.log(keys);
    keys.forEach((data) => {
        if (data === 'imageList' || data === 'errors') {
            // console.log(data);
        } else {
            // console.log(data);
            switch (name) {
                case data:
                    errors.data =
                        value.length < 5
                            ? 'full name must be 5 characters long!'
                            : '';
                    break;
                default:
                    break;
            }
        }
    });
}

const MyDeafultComponent = () => {
    return null;
}

export default MyDeafultComponent;
export {
    ErrorDisplay,
    Test,
    MySwitchForPrimeUser,
    TestSwitcher,
};