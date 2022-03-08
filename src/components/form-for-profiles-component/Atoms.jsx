import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';


const ProfileFolderNameHandler = (props) => {
    //TODO checken, ob bei props.fileNameHandler der context bewahrt wird stichwort stale
    return (
        <input
            type="text"
            placeholder="nameoftheperson"
            onChange={props.fileNameHandler}
        />
    );
}


const ImageUploadHandler = (props) => {
    //TODO checken, ob bei onAddingImage  der context bewahrt wird stichwort stale
    return (
        <input
            type="file"
            onChange={props.onAddingImage}
            name="image"
        />
    );
}

const FormButton = (props) => {
    //TODO checken, ob bei props.fileUploader  der context bewahrt wird stichwort stale
    return (
        <Button onClick={props.fileUploader}>{props.value}</Button>
    );
}

const FormForProfiles = (props) => {
    // console.log(props.text);
    return (
        <FormGroup>
            <Label for={props.formbezeichnung}>{props.name}</Label>
            <Input
                value={props.value}
                type={props.text}
                name={props.name}
                id={props.formbezeichnung}
                placeholder={props.formbezeichnung}
                onChange={props.handleChangeInputValue}
            />
        </FormGroup>
    );
}
const FormForProfilesTextarea = (props) => {
    // console.log(props.name);
    return (
        <FormGroup>
            <Label for={props.formbezeichnung}>{props.name}</Label>
            <Input
                value={props.value}
                type={props.text}
                name={props.name}
                id={props.formbezeichnung}
                placeholder={props.formbezeichnung}
                onChange={props.handleChangeInputValue}
            />
        </FormGroup>
    );
}

const OptionsSelector = (props) => {
    if (props.desicion === "title") {
        return (
            <Input type="select" name="title" id="exampleSelect" onChange={props.handleChangeInputValue}>
                <option value="Titel hinzufügen" defaultValue>Titel hinzufügen</option>
                <option value="Dr">Dr.</option>
                <option value="Prof">Prof.</option>
                <option value="Prof">Mag.</option>
                <option value="Prof">Mag. Mag.</option>
                <option value="Dr">-</option>
                <option value="Dr">MSc</option>
                <option value="Prof">Dipl. Päd.</option>
                <option value="Prof">Dipl.-Ing.</option>
                <option value="Prof">BA</option>
                <option value="Prof">DSA</option>
                <option value="Prof">BSc</option>
                <option value="Prof">MA</option>
                <option value="Prof">Dipl.Soz.Päd</option>
            </Input>
        );
    }
    if (props.desicion === "specialization") {

        let specificationStaring = process.env.REACT_APP_SPECIFICATIONS_OF_DOCTOR;
        let specificationsNames = specificationStaring.split(",");

        return (
            <Input type="select" name="specialization" id="specialization" onChange={props.handleChangeInputValue}>
                <option value="Titel hinzufügen" defaultValue>Spezialisierung  hinzufügen</option>
                {specificationsNames.map((value, index) => {
                    return <option key={value}>{value}</option >
                })}
            </Input>
        );
    }
    if (props.desicion === "bundesland") {
        let bundesländerString = process.env.REACT_APP_BUNDESLAENDER;
        let bundesländerNames = bundesländerString.split(",");

        return (
            <Input type="select" name="bundesland" id="bundesland" onChange={props.handleChangeInputValue}>
                <option value="Bundesland hinzufügen" defaultValue>Bundesland  hinzufügen</option>
                {bundesländerNames.map((value, index) => {
                    return <option key={value}>{value}</option >
                })}
            </Input>
        );
    }

}

const SpecificationSelector = (props) => {
    let specificationStaring = process.env.REACT_APP_SPECIFICATIONS_OF_DOCTOR;
    let specificationsNames = specificationStaring.split(",");

    return (
        <Input type="select" name="specification" id="specification" onChange={props.handleChangeInputValue}>
            <option value="Titel hinzufügen" defaultValue>Spezialisierung  hinzufügen</option>
            {specificationsNames.map((value, index) => {
                return <option key={value}>{value}</option >
            })}
        </Input>
    );
}
const ButtonWithEventHandler = (props) => {
    return (
        <button type="button" onClick={() => props.onClickInput()}>choose file</button>
    );
}
const ImageHiddenUploadHandler = (props) => {
    //TODO checken, ob bei onAddingImage  der context bewahrt wird stichwort stale
    return (
        <div
            style={{
                "height": "0px",
                "overflow": "hidden"
            }}
        >
            <input
                type="file"
                onChange={props.onAddingImage}
                name="image"
                ref={props.myRef}
            />
        </div>
    );
}


export default FormForProfiles;
export {
    FormButton,
    ImageUploadHandler,
    ProfileFolderNameHandler,
    OptionsSelector,
    SpecificationSelector,
    FormForProfilesTextarea,
    ButtonWithEventHandler,
    ImageHiddenUploadHandler
};

// <button type="button" onClick={this.fileUploader}>
//     Check on Array
//         </button>