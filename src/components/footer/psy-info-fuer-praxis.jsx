import AGBsanitizedDisplay from 'components/footer/sanitized-display-agb';
const PsyInfoFuerPraxis = (props) => {
    // console.log(props.data.mydata);
    // var keys = Object.keys || require('object-keys');
    // const arrayOfkeyOfState = keys(props.data);
    // const mySanitizedText = AGBsanitizedDisplay(props.data, arrayOfkeyOfState);
    return (
        <div>
            <p>Status 200</p>
            <h2>{props.data.headline}</h2>
            <h2>{props.data.subheadline}</h2>
        </div>
    );
}
export default PsyInfoFuerPraxis;
/**
 * Die Struktur für diese Komponente ist noch nicht klar:
 * Deshalbs ist hier nur ein einfach render Test
 */