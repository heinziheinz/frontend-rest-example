import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const SpecialForm = (props) => {
    // console.log(props);
    const handleOnChange = (e) => {
        props.handleOnChange(e);
    }
    const handleOnSubmit = async (e) => {
        //    console.log(props);
        //    console.log('felllch');
        props.handlerOnSubmit(e);
    }
    // console.log('special');
    // console.log(process.env.REACT_APP_BEZIRKE_IN_OESTERREICH);
    // console.log(process.env.REACT_APP_THEMEN_FUER_THERAPIE);
    // console.log(process.env.REACT_APP_BUNDESLAENDER_OPTION);
    let bezirkeString = process.env.REACT_APP_BEZIRKE_IN_OESTERREICH;
    let bezirkeNames = bezirkeString.split(",");
    let themenString = process.env.REACT_APP_THEMEN_FUER_THERAPIE;
    let themenNames = themenString.split(",");
    let bundeslandString = process.env.REACT_APP_BUNDESLAENDER_OPTION;
    let bundeslandNames = bundeslandString.split(",");
    return (
        <div className="container bg-light">
            <h1 style={{
                "fontSize": "40px",
                "color": "#a5d8a5"
            }}>Psychologen finden!</h1>
            <Form inline className="p-4 mb-5">
                <FormGroup>
                    {/* <Label for="searchfordoctor">Suche nach Arzt</Label> */}
                    <Input
                        type="search"
                        name="searchfordoctor"
                        id="searchfordoctor"
                        placeholder="Name / Spezialisierung"
                        value={props.mystate.searchfordoctor}
                        // onChange={handleOnChange}
                        onChange={e => {
                            handleOnChange(e);
                            // props.anotherOnChange();
                        }}
                    />
                    {/* <FormText>Suchen Sie nach Ihrem Psychologen.</FormText> */}
                </FormGroup>
                <FormGroup>
                    {/* <Label for="location">Suche nach Ort</Label> */}
                    <Input
                        type="search"
                        name="location"
                        id="location"
                        placeholder="PLZ / Ort"
                        value={props.mystate.location}
                        onChange={e => props.handleOnChange(e)}
                    />
                    {/* <FormText>Ortsbezogene Suche</FormText> */}
                </FormGroup>
                {/* NEU */}

                <FormGroup>
                    {/* <Label for="bundesland">Bundesland einfügen</Label> */}
                    <Input
                        type="select"
                        name="bundesland"
                        id="bundesland"
                        placeholder="bundesland"
                        value={props.mystate.bundesland}
                        // onChange={handleOnChange}
                        onChange={e => {
                            props.handleOptionValue(e);
                            // props.anotherOnChange();
                        }}
                    ><option value="Bundesland hinzufügen" defaultValue>Bundesland</option>
                        {bundeslandNames.map((value, index) => {
                            return <option key={value}>{value}</option >
                        })}
                    </Input>
                    {/* <FormText>Wählen Sie ein Bundesland aus.</FormText> */}
                </FormGroup>
                <FormGroup>
                    {/* <Label for="bezirk">Bezirk einfügen</Label> */}
                    <Input
                        type="select"
                        name="bezirk"
                        id="bezirk"
                        placeholder="bezirk"
                        value={props.mystate.bezirk}
                        // onChange={handleOnChange}
                        onChange={e => {
                            props.handleOptionValue(e);
                            // props.anotherOnChange();
                        }}
                    ><option value="Bezirke hinzufügen" defaultValue>Bezirke</option>
                        {bezirkeNames.map((value, index) => {
                            return <option key={value}>{value}</option >
                        })}
                    </Input>
                    {/* <FormText>Wählen Sie ein BUndesland aus.</FormText> */}
                </FormGroup>
                <FormGroup>
                    {/* <Label for="thema">Bezirk einfügen</Label> */}
                    <Input
                        type="select"
                        name="thema"
                        id="thema"
                        placeholder="thema"
                        value={props.mystate.thema}
                        // onChange={handleOnChange}
                        onChange={e => {
                            props.handleOptionValue(e);
                            // props.anotherOnChange();
                        }}
                    ><option value="themen hinzufügen" defaultValue>Thema</option>
                        {themenNames.map((value, index) => {
                            return <option key={value}>{value}</option >
                        })}
                    </Input>
                    {/* <FormText>Wählen Sie ein Thema aus.</FormText> */}
                </FormGroup>
                <Button onClick={handleOnSubmit}>Submit</Button>
            </Form>
        </div>
    );
}
export default SpecialForm;