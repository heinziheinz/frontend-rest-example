import React, { useEffect } from 'react';
import SpecialForm from './../search-for-doctor-from/special-form';
import ObjectHookExample from './object-hook-example';
import useMyState from 'components/use-state';
import Fetcha from 'components/fetcha-component';
import PaginationNavigation from './third-handler';
import Arti from './arti';
const Combination = (props) => {
    console.log(props.location.state);
    const AbortController = window.AbortController;
    const myController = new AbortController();
    const mySignal = myController.signal;

    const [myState, setState] = useMyState({
        searchfordoctor: '',
        location: '',
        state: ''
    });
    const [data, setData] = React.useState(null);

    const handleOnChange = (props) => {
        const { name, value } = props.target;
        console.log(value);
        setState({
            ...myState,
            [name]: value
        });

    }
    const handleOnSubmit = async evt => {
        evt.preventDefault();
        console.log('handle submit from pagination hook variant');
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            signal: mySignal
        }
        const primedata = await Fetcha(process.env.REACT_APP_URL + 'api/loggedin/prime/{prime}' + '?bundesland=' + myState.location + '&name=' + myState.searchfordoctor, options);
        console.log(primedata);
        console.log('combinatin');
        setData(primedata.data);
    }
    useEffect(() => {
        console.log('pagination hook variante didi');
        return function cleanAllSubscribtion() {
            myController.abort();
        }
    });
    // TODO: Hier const Name = props.location ? sosudnso : amders;
    return [<SpecialForm
        mystate={myState}
        handleOnChange={e => handleOnChange(e)}
        handlerOnSubmit={() => {
            handleOnSubmit();
        }}
    />,
    <ObjectHookExample
        data={props.location.state}
        upOrDown={true}
        paginationNavigation={
            <PaginationNavigation />
        }
        arti={
            <Arti />
        }
    />
    ];
}

export default Combination;