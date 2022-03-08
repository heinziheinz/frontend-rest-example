
import React from 'react';
import {
    Jumbotron, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
const ViewForStartPageIndex = (props) => {
    return (
        <div style={{
            display: "flex",
            marginTop: "40px",
            flexWrap: "wrap"
        }}>
            {props.data.map((value, index) => {
                console.log(value.imagelink);
                return (
                    <div key={index} style={{
                        width: "200px",
                        marginLeft: "10px"
                    }} >
                        <Card key={value.category + index}>
                            <CardImg key={process.env.REACT_APP_URL + value.imagelink} top width="200px" src={process.env.REACT_APP_URL + value.imagelink} alt="Card image cap" />
                            <h6 key={value.category}>{value.category}</h6>
                            <h4 key={value.headline + index}><small>{value.headline}</small></h4>
                            <p key={value.subheadline}
                                className="font-weight-lighter text-secondary"
                            ><small>{value.subheadline}</small></p>
                        </Card>
                    </div>
                );
            })
            }
        </div>
    );
}
export default ViewForStartPageIndex;