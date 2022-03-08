import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
/**
 * Die dazupassenden Routes sind in basic-root-components.js zu finden.
 * footer-components.jsx ist in index.js eingebunden
 */
const FooterComponentLeftWithoutH5 = (props) => {
    return (
        <div className="pr-5 mr-4">
            <Link to="/FQA/psychotherapeuten">
                <h6>FQA für Psychotherapeuten</h6>
            </Link>
            {/* <Route path="/FQA/aertze" component={Dummy} /> */}
        </div>
    );
};
const FooterComponentsMiddleWithoutH5 = (props) => {
    return (
        <div className="pr-5 mr-4" >
            <Link to="/business/aertze" >
                <h6>Psy Info für Ihre Praxis</h6>
            </Link>
            <Link to="/ratgeber/mediadaten-tarife" target="_blank">
                <h6>Werbung auf PsyInfo</h6>
            </Link>
        </div>
    );
};
const FooterComponentsRightWithoutH5 = (props) => {
    return (
        <div className="pr-5 mr-4">
            <Link to="/datenschutz">
                <h6>Datenschutz</h6>
            </Link>
            <Link to="/agb">
                <h6>AGB</h6>
            </Link>
            <Link to="/kontakt">
                <h6>Kontakt</h6>
            </Link>
            <Link to="/impressum">
                <h6>Impressum</h6>
            </Link>
        </div>
    );
};
const FooterComponentLeft = (props) => {
    return (
        <div className="pr-5 mr-4">
            <h5>Über Psy Info</h5>
            <Link to="/FQA/psychotherapeuten">
                <h6>FQA für Psychotherapeuten</h6>
            </Link>
            {/* <Route path="/FQA/aertze" component={Dummy} /> */}
        </div>
    );
};
const FooterComponentsMiddle = (props) => {
    return (
        <div className="pr-5 mr-4" >
            <h5>Unsere Produkte</h5>
            {/* <Link to="/business/aertze" target="_blank" rel="noopener noreferrer" /> */}
            <Link to="/business/aertze" >
                <h6>Psy Info für Ihre Praxis</h6>
            </Link>
            <Link to="/ratgeber/mediadaten-tarife" target="_blank">
                <h6>Werbung auf PsyInfo</h6>
            </Link>
        </div>
    );
};
const FooterComponentsRight = (props) => {
    return (
        <div className="pr-5 mr-4">
            <h5>Info zu PsyInfo</h5>
            <Link to="/datenschutz">
                <h6>Datenschutz</h6>
            </Link>
            <Link to="/agb">
                <h6>AGB</h6>
            </Link>
            <Link to="/kontakt">
                <h6>Kontakt</h6>
            </Link>
            <Link to="/impressum">
                <h6>Impressum</h6>
            </Link>
        </div>
    );
};


export default FooterComponentLeft;
export {
    FooterComponentsMiddle,
    FooterComponentsRight,
    FooterComponentLeftWithoutH5,
    FooterComponentsMiddleWithoutH5,
    FooterComponentsRightWithoutH5
};
