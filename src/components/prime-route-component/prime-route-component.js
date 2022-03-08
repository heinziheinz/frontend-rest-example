import React, { Suspense } from 'react';
import axios from 'axios';
import { Redirect, Route, Link } from 'react-router-dom';
import UpdatePrimeCustomer from 'components/update-prime-customer';
import {
    PortraiFotoPrimeCustomer,
    BewertungsBottom,
    ÖffungszeitenPrimeCustomer,
    KrankenkasseFachbereich
} from 'components/footer/single-doctor-route-component';
// import { array } from 'prop-types';
const SingleDoctorRouteComponent = React.lazy(() => import('components/footer/single-doctor-route-component'));

// import { EscapeHtml } from 'components/regex-collection';

export default class PrimeRouteComponent extends React.Component {
    constructor(props) {
        super(props);
        // console.log('another Prime Route Component');
        console.log(props);
        this.state = {
            isLoaded: false,
            data: {},
            id: null,
            storage: this.props.location.query ? this.props.location.query : JSON.parse(localStorage.getItem('appPrimeUSerState'))
        }
        console.log(this.state.storage);
        this.ordinationszeitMontag = this.state.storage.data.confirmedmontag ? this.state.storage.data.montag + ' ' + this.state.storage.data.montagvormittagende : 'Geschlossen';
        this.ordinationszeitMontagNachmittag = this.state.storage.data.confirmedmontagnachmittag ? this.state.storage.data.montagnachmittag + ' ' + this.state.storage.data.montagnachmittagende : 'Geschlossen';
        this.ordinationszeitDienstag = this.state.storage.data.confirmeddienstag ? this.state.storage.data.dienstag + ' ' + this.state.storage.data.dienstagvormittagende : 'Geschlossen';
        this.ordinationszeitDienstagNachmittag = this.state.storage.data.confirmeddienstagnachmittag ? this.state.storage.data.dienstagnachmittag + ' ' + this.state.storage.data.dienstagnachmittagende : 'Geschlossen';
        this.ordinationszeitMittwoch = this.state.storage.data.confirmedmittwoch ? this.state.storage.data.mittwoch + ' ' + this.state.storage.data.mittwochvormittagende : "Geschlossen";
        this.ordinationszeitMittwochNachmittag = this.state.storage.data.confirmedmittwochnachmittag ? this.state.storage.data.mittwochnachmittag + ' ' + this.state.storage.data.mittwochnachmittagende : "Geschlossen";
        this.ordinationszeitDonnertstag = this.state.storage.data.confirmeddonnerstag ? this.state.storage.data.donnerstag + ' ' + this.state.storage.data.donnerstagvormittagende : "Geschlossen";
        this.ordinationszeitDonnerstagNachmittag = this.state.storage.data.confirmeddonnerstagnachmittag ? this.state.storage.data.donnerstagnachmittag + ' ' + this.state.storage.data.donnerstagnachmittagende : "Geschlossen";
        this.ordinationszeitFreitag = this.state.storage.data.confirmedfreitag ? this.state.storage.data.freitag + ' ' + this.state.storage.data.freitagvormittagende : "Geschlossen";
        this.ordinationszeitFreitagNachmittag = this.state.storage.data.confirmedfreitagnachmittag ? this.state.storage.data.freitagnachmittag + ' ' + this.state.storage.data.freitagnachmittagende : "Geschlossen";
        this.ordinationszeitSamstag = this.state.storage.data.confirmedsamstag ? this.state.storage.data.samstag + ' ' + this.state.storage.data.samstagvormittagende : "Geschlossen";
        this.ordinationszeitSamstagNachmittag = this.state.storage.data.confirmedsamstagnachmittag ? this.state.storage.data.samstagnachmittag + ' ' + this.state.storage.data.samstagnachmittagende : "Geschlossen";
        this.ordinationszeitSonntag = this.state.storage.data.confirmedsonntag ? this.state.storage.data.sonntag + ' ' + this.state.storage.data.sonntagvormittagende : "Geschlossen";
        this.ordinationszeitSonntagNachmittag = this.state.storage.data.confirmedsonntagnachmittag ? this.state.storage.data.sonntagnachmittag + ' ' + this.state.storage.data.sonntagnachmittagende : "Geschlossen";
        // FIXME: have a look
        this.gesprocheneSprache = this.state.storage.data.gesprochenesprache;
    }

    static getDerivedStateFromProps(props, state) {

        if (state.storage) {
            if (Array.isArray(props.location.query)) {
                var mo = props.location.query ? localStorage.setItem('appPrimeUSerState', JSON.stringify(props.location.query[0])) : '';
                return { storage: props.location.query };

            } else {
                // console.log('is NOT array');
                var data = state.storage.data;

            }

            if (typeof props.location.query === 'undefined') {
                return {
                    storage: JSON.parse(localStorage.getItem('appPrimeUSerState'))
                };
            } else if (props.location.query !== state.storage) {
                return {
                    storage: props.location.query,
                };
            }
            var so = props.location.query ? localStorage.setItem('appPrimeUSerState', JSON.stringify(props.location.query)) : '';
            return null;
        }
    }
    componentDidMount() {
        // console.log('Route Component:ROUTE COMPONENT DIT MOUNT');
        if (this.state.storage) {
            if (typeof this.state.storage.data === 'undefined') {
                this.setState({
                    id: this.state.storage.id
                });
            } else {
                this.setState({
                    id: this.state.storage.data.id
                });
            }
        }
    }

    componentDidUpdate() {
        // console.log('Route Component: Component did Update WAS HIT');
    }

    updateHandler = () => {
        // this.updateArticle();
        this.setState({
            isLoaded: true
        });
    }
    redirectToEditArticle = () => {

    }

    componentWillUnmount() {
        // console.log('ROUTE_COMPONENT will unmount');
        // localStorage.clear();
        // localStorage.removeItem('appPrimeUSerState');

    }
    render() {
        const { isLoaded, id } = this.state;
        var data;
        let UpdateyourArticle = "Update Prime Customer";
        // console.log(this.state.storage);
        if (this.state.storage) {
            // console.log('enter');
            if (Array.isArray(this.state.storage)) {
                // console.log('is array');
                data = this.state.storage[0];
            } else {
                // console.log('is NOT array');
                if (typeof this.state.storage.data === 'undefined') {
                    data = this.state.storage;
                } else {
                    data = this.state.storage.data;
                }
            }

            // Trial
            // console.log(data);
            // console.log(data);
            var keys = Object.keys || require('object-keys');
            const myState = this.state;
            const arrayOfkeyOfState = keys(data);
            // console.log(arrayOfkeyOfState);
            // const newRows = [];
            // const nameBlock = arrayOfkeyOfState.map((moreData, index) => {
            //     if (moreData === 'title') {
            //         return <h6 key={moreData}>{data[moreData]}</h6>;
            //     } else if (moreData === 'name') {
            //         return <h6 key={moreData}>{data[moreData]}</h6>;
            //     } else {
            // console.log('somthing else');
            //         return (null);
            //     }
            // });
            // const spezialisierungsBlock = arrayOfkeyOfState.map((moreData, index) => {
            //     if (moreData === 'specialization') {
            //         return <h3 key={moreData}>{data[moreData]}</h3>;
            //     } else if (moreData === 'krankenkassen') {
            //         return <h6 key={moreData}>{data[moreData]}</h6>;
            //     } else {
            // console.log('somthing else');
            //         return (null);
            //     }
            // });
            // const adresseBlock = arrayOfkeyOfState.map((moreData, index) => {
            //     if (moreData === 'adresse') {
            //         return <h6 key={moreData}>{data[moreData]}</h6>;
            //     } else if (moreData === 'postleitzahl') {
            //         return <h6 key={moreData}>{data[moreData]}</h6>;
            //     } else if (moreData === 'bundesland') {
            //         return <h3 key={moreData}>{data[moreData]}</h3>;
            //     } else if (moreData === 'emailaddresse') {
            //         return <h6 key={moreData}>{data[moreData]}</h6>;
            //     } else {
            // console.log('somthing else');
            //         return (null);
            //     }
            // });

            // if (!(typeof data.blockoftext === 'undefined')) {
            // console.log('data.blockoftext: ' + data.blockoftext);
            // }
            // console.log(data.description === "undefined");
            if (this.state.storage.data === undefined) {
                console.log('this.state.data Undefined');
            } else {
                console.log('this.state.data Defined');
            }

            return (
                <React.Fragment>
                    <>
                        <Suspense fallback={<div>Loading</div>}>
                            <SingleDoctorRouteComponent allData={data} imagebackgroundlink={data.imagebackgroundlink} />
                        </Suspense>
                    </>
                    <div>
                        <PortraiFotoPrimeCustomer
                            imagelink={data.imagelink}
                            name={data.name}
                            specialization={data.specialization}
                            adresse={data.adresse}
                            postleitzahl={data.postleitzahl}
                            stadt={data.stadt}
                            telefonnumber={data.telefonnumber}
                            emailaddresse={data.emailaddresse}
                            marginTop={"0"}
                            marginLeft={"130px"}
                        />
                    </div>
                    {/* {data.description === "undefined" ? '' : <div
                        style={{
                            "width": "300px",
                            "borderBottom": "1px solid lightgrey",
                            "padding": "50px",
                            "marginBottom": "30px",
                            "marginLeft": "50px"
                        }}
                    ></div>} */}

                    {data.description === "undefined" ? '' : <div
                        style={{
                            "width": "300px",
                            "borderBottom": "1px solid lightgrey",
                            "padding": "50px",
                            "marginBottom": "30px",
                            "marginLeft": "50px"
                        }}
                    ></div>}
                    {data.description === "undefined" ? '' : <BewertungsBottom data={data} />}
                    {/* <BewertungsBottom data={data} /> */}
                    <div
                        style={{
                            "width": "350px",
                            "borderBottom": "1px solid lightgrey",
                            "marginLeft": "50px",
                            "marginBottom": "30px"
                        }}
                    ></div>
                    <ÖffungszeitenPrimeCustomer
                        ordinationszeitMontag={this.ordinationszeitMontag}
                        ordinationszeitMontagNachmittag={this.ordinationszeitMontagNachmittag}
                        ordinationszeitDienstag={this.ordinationszeitDienstag}
                        ordinationszeitDienstagNachmittag={this.ordinationszeitDienstagNachmittag}
                        ordinationszeitMittwoch={this.ordinationszeitMittwoch}
                        ordinationszeitMittwochNachmittag={this.ordinationszeitMittwochNachmittag}
                        ordinationszeitDonnertstag={this.ordinationszeitDonnertstag}
                        ordinationszeitDonnerstagNachmittag={this.ordinationszeitDonnerstagNachmittag}
                        ordinationszeitFreitag={this.ordinationszeitFreitag}
                        ordinationszeitFreitagNachmittag={this.ordinationszeitFreitagNachmittag}
                        ordinationszeitSamstag={this.ordinationszeitSamstag}
                        ordinationszeitSamstagNachmittag={this.ordinationszeitSamstagNachmittag}
                        ordinationszeitSonntag={this.ordinationszeitSonntag}
                        ordinationszeitSonntagNachmittag={this.ordinationszeitSonntagNachmittag}
                        // FIXME: warum
                        gesprochenesprache={data.gesprocheneSprache}
                    />
                    <div
                        style={{
                            "width": "350px",
                            "borderBottom": "1px solid lightgrey",
                            "marginBottom": "30px",
                            "marginTop": "30px",
                            "marginLeft": "50px"
                        }}
                    ></div>
                    <KrankenkasseFachbereich
                        specialization={data.specialization}
                        krankenkassen={data.krankenkassen}
                    />
                    {/* <img src={process.env.REACT_APP_URL + data.imagebackgroundlink} alt={data.name} />
                    <div>{nameBlock}</div>
                    <div>{spezialisierungsBlock}</div>
                    <div>{adresseBlock}</div> */}
                    <Link to={{ pathname: `/all-prime-customers/customer/${id}`, query: { data } }} >{UpdateyourArticle}</Link>
                    <Route path="/all-prime-customers/customer/:id" render={props => <UpdatePrimeCustomer {...props} items={data} />} />
                </React.Fragment>
            );
        } else {
            return (null);
        }
    }
}
// api / loggedin / prime / { prime }