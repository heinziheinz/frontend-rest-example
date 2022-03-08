import React from 'react';
import { Card, CardImg } from 'reactstrap';
import {
    Link
} from "react-router-dom";
const Arti = (props) => {
    console.log(props.state);
    return (
        <div style={{
            marginTop: "40px",
        }}>
            {props.data
                .slice(
                    props.state.currentPage * props.pageSize,
                    (props.state.currentPage + 1) * props.pageSize
                )
                .map((data, index) =>
                    <div className="data-slice" style={{
                        width: "200px",
                        marginLeft: "10px"
                    }} key={index}>
                        <Card key={data.category + index}>
                            <CardImg key={process.env.REACT_APP_URL + data.imagelink} top width="200px" src={process.env.REACT_APP_URL + data.imagelink} alt="Card image cap" />
                            <h6 key={data.category}>{data.category}</h6>
                            <h4 key={data.headline + index}><small>{data.headline}</small></h4>
                            <p key={data.subheadline}
                                className="font-weight-lighter text-secondary"
                            ><small>{data.subheadline}</small></p>
                            <Link id="danger" to={{ pathname: `/all-articles/${data.id}`, query: { data } }} >{"Zum Artikel: " + data.headline}</Link>
                            {/* TODO:wo soll der path hinführen */}
                        </Card>
                    </div>
                )
            }
        </div>
    );
}
export default Arti;