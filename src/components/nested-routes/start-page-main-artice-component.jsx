import React from 'react';
import { Link } from 'react-router-dom';
export default (props) => {
    console.log('main');
    return (
        // TODO: Link und Routing
        <Link className="text-decoration-none">
            <span className="d-flex align-items-end h-100 d-inline-block text-white" style={{
                display: "block",
                backgroundImage: `url(${process.env.REACT_APP_URL + props.data.imagelink[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}>
                <div className="p-3">
                    <h4 style={{ lineHeight: ' 0.6', textShadow: '1px 1px 4px grey' }}>{process.env.REACT_APP_GESUNDHEITSNEWS}</h4>
                    <h3 className="font-weight-bold" style={{ textShadow: '1px 1px 4px  grey' }}>{props.data.headline}</h3>
                    <h4><small>{`${props.data.subheadline}`}</small></h4>
                </div>
            </span>
        </Link>
    );
}
// inline style background images problemlösung:
// https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles