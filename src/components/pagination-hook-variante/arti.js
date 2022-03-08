import React from 'react';
import {
    Link,
    Route
} from "react-router-dom";
// import SingleDoctorComponent from './single-docotor-component';
import { AddingLinkToAltAndTitleAttribute } from 'components/reordering-img-and-alt-and-title';
const Arti = (props) => {
    console.log(props.data[0].name);
    console.log(props.data[0]?.suchanwesungen?.richtigeAnwendung);

    React.useEffect(() => {
        console.log('ARTIFAZI RENDER');
        // function handleResize() {
        // setDimensions({
        //     height: window.innerHeight,
        //     width: window.innerWidth
        // })
        // }
        // window.addEventListener('resize', handleResize)
        // return _ => {
        //     window.removeEventListener('resize', handleResize);
        // }
    });

    try {
        console.log(JSON.parse(props.data[0].altandtitleattribute));

        const user = JSON.parse(props.data[0].altandtitleattribute);
        console.log(user);
    } catch (e) {
        console.log('SAY FEHLER');
        console.log(props.data[0].name);
        // props.data[0]?.suchanwesungen?.solchEineAnwendung ist in handle-empty-response.js zu finden line 36.
        console.log(props.data[0]?.suchanwesungen?.solchEineAnwendung);
        return (<div style={{ 'backgroundColor': '#edf7ed', 'padding': '30px', 'margin': '0 130px 0 130px' }}
        >
            <p>{props.data[0].name}</p>
            {props.data[0]?.suchanwesungen?.solchEineAnwendung}
        </div>);
    }
    // AddingLinkToAltAndTitleAttribute()

    return (
        <>
            {props.data
                .slice(
                    props.state.currentPage * props.pageSize,
                    (props.state.currentPage + 1) * props.pageSize
                )
                .map((data, index) => {
                    var backgroundImagesPlusAltandTitleAttributes = null;
                    try {
                        backgroundImagesPlusAltandTitleAttributes = AddingLinkToAltAndTitleAttribute(data);
                    } catch (e) {
                        return <p>Something went wrong</p>;
                    }
                    console.log(backgroundImagesPlusAltandTitleAttributes);
                    console.log('ARTIT:');
                    console.log(data);
                    var singleTitleAndAltAttributeParsed = JSON.parse(data.singletitleattribute);
                    console.log(singleTitleAndAltAttributeParsed.imageAlt);
                    console.log(singleTitleAndAltAttributeParsed.imageTitle);
                    console.log(process.env.REACT_APP_URL + data.imagelink[2]);
                    let portraitImage = data.imagelink[2].slice(data.imagelink[2].lastIndexOf("horizontal/") + "horizontal/".length);
                    return (
                        <Link key={data.imagelink + index} className="text-decoration-none text-dark" id="danger" to={{ pathname: `/prime-doctor/${data.id}`, query: { data } }} >
                            <div className="border">
                                <div className="d-flex border p-3 pl-4">
                                    <img className="mr-3"
                                        key={process.env.REACT_APP_URL + data.imagelink[2]} width="auto" height="118em"
                                        src={process.env.REACT_APP_URL + data.imagelink[2]}
                                        alt={singleTitleAndAltAttributeParsed.imageAlt}
                                        title={singleTitleAndAltAttributeParsed.imageTitle}
                                    />
                                    <div className="flex-column border">
                                        <h4 style={{ lineHeight: "0.7" }} key={data.name + index}><small>{data.name}</small></h4>
                                        <h6 key={data.specialization + index}>{data.specialization}</h6>
                                        {
                                            // TODO:two loops
                                            backgroundImagesPlusAltandTitleAttributes.map((data, index) => {
                                                // console.log(index);
                                                if (index > 2) return null;
                                                return (<img key={data} className="mr-1"
                                                    src={process.env.REACT_APP_URL + data.name[0]}
                                                    alt={Object.values(data)[0]}
                                                    title={Object.values(data)[1]}
                                                    width="auto"
                                                    height="50em" />)
                                            })
                                        }
                                        <p key={data.adresse}>{data.adresse + ", " + data.postleitzahl + " " + data.stadt}</p>
                                    </div>
                                </div>
                                <div className="d-flex text-success">

                                    <p className="border rounded border-success text-success ml-3 mr-3 pb-2 pl-2 pr-2">
                                        <small>{data.specialization}</small></p>

                                </div>
                            </div>
                        </Link>
                    );
                })
            }
            {/* < Route path="/prime-doctor/:id" component={SingleDoctorComponent} /> */}
        </>
    );
}
export default Arti;
// das ganze in Bootstrap umwandeln:
// https://www.w3schools.com/code/tryit.asp?filename=GHBPS2QF8D92

