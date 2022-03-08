import React, { Suspense } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { FooterComponentsMiddle, FooterComponentsRight } from './footer-components';
const FooterComponents = React.lazy(() => import('./footer-components'));


const Footer = (props) => {
    return (
        <div>
            <Jumbotron className="d-flex pt-1">
                <div className="d-flex container mt-3">
                    <Suspense fallback={<div>loading</div>}>
                        <FooterComponents />
                        <FooterComponentsMiddle />
                        <FooterComponentsRight />
                    </Suspense>
                </div>
            </Jumbotron>
        </div>
    );
};

export default Footer;
