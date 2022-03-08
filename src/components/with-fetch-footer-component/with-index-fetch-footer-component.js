import React, { useEffect } from 'react';
import Fetcha from 'components/fetcha-component';
const withFooterFetchWrapper = (Component, url, option, localStorage, path) => props => {
    // console.log(Component);
    // console.log(url);
    // console.log(path);
    // console.log(option);
    const [data, setData] = React.useState(null);
    var primedata;
    useEffect(async () => {
        // console.log('Show_ ' + JSON.parse(window.localStorage.getItem(localStorage)));
        // Bei Eingabe neuer Daten müss der betreffende localStorage gelöscht werden
        // FIXME: dann im BRowser nachladen und testen, ob hier oder in jeweiliger ...-store-confirmation-componente.jsx
        // console.log(localStorage);
        // console.log(JSON.parse(window.localStorage.getItem(localStorage)));
        // console.log(JSON.parse(window.localStorage.getItem(localStorage)));
        // window.localStorage.clear();
        if (JSON.parse(window.localStorage.getItem(localStorage))) {
            // console.log('true');
            // console.log(process.env.REACT_APP_URL + url);
            primedata = JSON.parse(window.localStorage.getItem(localStorage));
            // FIXME:Rückgängig machen
            // primedata = await Fetcha(url, option);
            // console.log('myLocal Storage');
            // console.log(primedata);
            setData(primedata);
        } else {
            // console.log('fals');
            primedata = await Fetcha(url, option);
            // const mydata = 'hallo';
            // console.log('Somethin missing');
            // console.log(primedata);
            // console.log('primedata');
            // console.log('hakllloooo');
            // console.log(primedata);
            setData(primedata);
        }
        // console.log(data);
    }, []);
    const dataplaceholder = {
        mydata: "dataplaceholder"
    }
    if (data) {
        // console.log(data);
        // console.log('data');
        // console.log(data);
        // return (
        //     <p>..loading</p>
        // );
        // TODO: redirect machen. Beispiel anschauen
        return <Component {...props} data={data} path={path} />;
    } else {
        return (
            <p>..loading</p>
        );
    }
};
// withFooterFetchWrapper.displayName = `formValidation(${getDisplayName(Component)})`;
function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}
export default withFooterFetchWrapper;