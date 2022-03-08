import React from 'react';
import { Card, CardImg } from 'reactstrap';
import {
    Link,
    Route
} from "react-router-dom";
import SingleDoctorComponent from './single-docotor-component';

const Arti = (props) => {
    console.log(props.data[0].imagebackgroundlink);
    return (
        <div style={{
            display: "flex",
            marginTop: "40px",
            flexWrap: "wrap"
        }}>
            {props.data
                .slice(
                    props.state.currentPage * props.pageSize,
                    (props.state.currentPage + 1) * props.pageSize
                )
                .map((data, index) => {
                    return (
                        <div className="data-slice" style={{
                            width: "200px",
                            marginLeft: "10px"
                        }} key={index}>
                            <h4 key={data.name + index}><small>{data.name}</small></h4>
                            <h6 key={data.specification}>{data.specification}</h6>
                            <Card key={data.specification + index}>
                                <CardImg key={process.env.REACT_APP_URL + data.imagelink} top width="200px" src={process.env.REACT_APP_URL + data.imagelink} alt="Card image cap" />
                                {data.imagebackgroundlink.map((mydata) => {
                                    return (
                                        <CardImg key={process.env.REACT_APP_URL + mydata} top width="200px" src={process.env.REACT_APP_URL + data.imagelink} alt="Card image cap" />
                                    );
                                })}
                                <Route path="/prime-doctor/:id" component={SingleDoctorComponent} />
                                <Link id="danger" to={{ pathname: `/prime-doctor/${data.id}`, query: { data } }} >{"Zum Artikel: " + data.id}</Link>
                                {/* TODO:wo soll der path hinführen */}
                            </Card>
                        </div>
                    );
                })
            }
        </div>
    );
}
export default Arti;