import React, { useEffect } from 'react';
const wichFooterForm = (Component, urlAndOption) => props => {
    console.log(urlAndOption);
    const myState = {
        headline: "",
        agbTexarea: "",
        isLoaded: false,
        error: null
    }
    const [state, setState] = useState(myState);
    const onAddingHeadline = (event) => {
        console.log('HEadline');
        // handleSubmit();
        // setState({ headline: event.target.value })
        setState({
            ...state,
            headline: event.target.value
        });
    }
    const onAddingAgbText = (event) => {
        console.log('TExt');
        // handleSubmit();
        // setState({ agbTexarea: event.target.value })
        setState({
            ...state,
            agbTexarea: event.target.value
        });
    }
    const fileSubmit = async (event) => {
        console.log('submit');
        console.log(state);
        // handleSubmit();
        // | POST | api / agbs / agbs
        const url = process.env.REACT_APP_URL + 'api/agbs/agbs'
        const option = {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({
                "name": state.headline,
                "bundesland": state.agbTexarea,
            })
        }
        fetch(url, option)
            .then(res => {
                return res;
            }).then(res => res.json())
            .then(res => {
                console.log(res);
            }).then(
                (result) => {
                    setState({
                        ...state,
                        isLoaded: true,
                    });
                },
                (error) => {
                    console.log('error');
                    console.log(error);
                    setState({
                        ...state,
                        error: error,
                        isLoaded: true,
                    });
                }
            );
    }
    if (state.error) {
        console.log('error');
        console.log(state.error.message);
        return <div>{state.error.message}</div>;
    } else if (state.isLoaded) {
        console.log('Say is LOADDED');
        console.log(state);
        const createdId = "1";
        return (
            <Component data={props.data} />
            // <>
            //     <Redirect to={`/agb-store-success/${createdId}`} />
            //     <Route path={`/agb-store-success/${createdId}`} component={Temporary} />
            // </>
            // TODO: Hier weiter redirect testen
        );
    } else {
        return (
            <Form>
                <FormGroup>
                    <Label for="headline">headline</Label>
                    <Input type="text" name="text" id="headline" placeholder="Add a headline" onChange={onAddingHeadline} />
                </FormGroup>
                <FormGroup>
                    <Label for="agbTexarea">Text Area</Label>
                    <Input type="textarea" name="text" id="agbTexarea" onChange={onAddingAgbText} />
                </FormGroup>
                <Button name="submit" onClick={fileSubmit}>Submit</Button>
            </Form>
        );
    }
};
// wichFooterForm.displayName = `formValidation(${getDisplayName(Component)})`;
function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}
export default wichFooterForm;