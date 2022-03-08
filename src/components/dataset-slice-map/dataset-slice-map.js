import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg } from 'reactstrap';


export default class DataSetSliceMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // div style sollte flexible eingefügt werden können

            <div className="joe" style={{
                display: "flex",
                marginTop: "40px",
                flexWrap: "wrap"
            }}>
                {this.props.dataSet
                    .slice(
                        this.props.currentPage * this.props.pageSize,
                        (this.props.currentPage + 1) * this.props.pageSize
                    )
                    .map((data, index) =>
                        <div className="data-slice" key={index}>
                            {data}
                            <Card key={data.category + index}>
                                <CardImg key={process.env.REACT_APP_URL + data.imagelink} top width="200px" src={process.env.REACT_APP_URL + data.imagelink} alt="Card image cap" />
                                <h6 key={data.category}>{data.category}</h6>
                                <h4 key={data.headline + index}><small>{data.headline}</small></h4>
                                <p key={data.subheadline}
                                    className="font-weight-lighter text-secondary"
                                ><small>{data.subheadline}</small></p>
                                <Link to={{ pathname: `/all-articles/${data.id}`, query: { data } }} >{"Zum Artikel: " + data.headline}</Link>
                            </Card>
                        </div>
                    )}
            </div>
        );
    }
}
