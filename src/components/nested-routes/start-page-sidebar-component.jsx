import React from 'react';
import { Link } from 'react-router-dom';
export default (props) => {
    let mp3 = props.index < 4 ? 'mb-3' : '';
    return (
        // TODO: Link und Routing
        <Link className="text-decoration-none">
            <span style={{ display: "block" }} className={`d-flex ${mp3} ml-3 pb-3 border-bottom`}>
                <img src={`${process.env.REACT_APP_URL + props.data.imagelink[0]}`} alt="health image" className="rounded" width="150" />
                <div className="ml-3">

                    <h5 className="text-primary font-weight-bold font-italic text-left mb-1"><small>{process.env.REACT_APP_GESUNDHEITSNEWS}</small></h5>
                    <h5 className="text-left"><small>{props.data.headline}</small></h5>
                </div>
            </span>
        </Link>
    );
}