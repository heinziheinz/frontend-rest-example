import React from 'react';
const AGB = (props) => {
    console.log(props.data);
    return (
        <div>
            <h2>{'props.data'}</h2>
        </div>
    );
}
export default AGB;