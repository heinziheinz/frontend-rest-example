import React, { useEffect, useState } from 'react';

const withFormOrComponent = (HOCinsertComponent, HOCFooterIndexFetchComponent, url, option) => props => {

    const myState = {
        primedata: {},
        isLoaded: false,
        error: null
    }
    const [state, setState] = useState(myState);

    useEffect(async () => {
        // console.log('Hallo use effest');
        fetchData();
    }, []);

    const fetchData = async (event) => {
        fetch(url, option)
            .then(res => {
                return res;
            }).then(res => res.json())
            .then(res => {
                // console.log(res);
                return res;
            }).then(
                (result) => {
                    // console.log(result.content);
                    setState({
                        ...state,
                        isLoaded: true,
                        primedata: result
                    });
                },
                (error) => {
                    // console.log('error');
                    // console.log(error);
                    setState({
                        ...state,
                        error: error,
                        isLoaded: true,
                    });
                }
            );
    }
    const { error, isLoaded, primedata } = state;

    if (isLoaded === false) {
        return (
            <p>...loading</p>
        )
    } else {
        try {
            if (state.primedata.content.length == 0) {

                return (
                    <HOCinsertComponent data={props} />
                );
            } else {
                return (
                    <HOCFooterIndexFetchComponent data={props} />
                );
            }
        } catch (e) {
            return (<p>{e}</p>)
        }
    }
};
// withFormOrComponent.displayName = `formValidation(${getDisplayName(Component)})`;
function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}
export default withFormOrComponent;