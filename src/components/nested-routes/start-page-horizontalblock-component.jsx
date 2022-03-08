import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
export default (props) => {
    console.log(props.index);
    let mr3 = props.index < 7 ? 'mr-3' : '';
    console.log(mr3);
    // TODO: Link und Routing
    return (
        <div className={`w-50   ${mr3}`} >
            <Link className="text-decoration-none">
                <Card>
                    <CardImg src={`${process.env.REACT_APP_URL + props.data.imagelink[0]}`} alt="health image" />
                    <CardBody>
                        <h5 className="text-primary font-weight-bold text-left mb-1">{process.env.REACT_APP_GESUNDHEITSNEWS}</h5>
                        <CardTitle className="font-weight-bold">{props.data.headline}</CardTitle>
                        <CardSubtitle className="text-left">{props.data.subheadline}</CardSubtitle>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
}