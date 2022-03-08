import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const NavBarStackedForPrivligedUser = (props) => {
    // console.log(props.data.linknameforarticleform);
    // console.log(props.data.linknameforprofileform);
    // console.log(props.data.linkurlforarticleform);
    // console.log(props.data.linkurlforprofileform);
    console.log('Nav is a lot hit');
    return (
        <ul className="nav flex-column" style={{ backgroundColor: '#a5d8a5' }}>
            <li className="nav-item">
                {Cookies.get('signedin') ? < Link className="nav-link active" to={props.data?.linkurlforprofileform} >{props.data?.linknameforprofileform}</Link> : ''}
            </li>
            <li className="nav-item">
                <Link to="/profile-all-form" className="nav-link active">All Profiles</Link>
            </li>
            <li className="nav-item">
                {Cookies.get('signedin') ? <Link className="nav-link" to={props.data?.linkurlforarticleform} >{props.data?.linknameforarticleform}</Link> : ''}
            </li>
            <li className="nav-item">
                {Cookies.get('signedin') ? <Link className="nav-link" to={'/agb-form'} >{'AGBs Form'}</Link> : ''}
            </li>
            <li className="nav-item">
                {Cookies.get('signedin') ? <Link className="nav-link" to={'/datenschutz-form'} >{'Datenschutz Form'}</Link> : ''}
            </li>
            <li className="nav-item">
                {Cookies.get('signedin') ? <Link className="nav-link" to={'/fqa-form'} >{'FQA Form'}</Link> : ''}
            </li>
            <li className="nav-item">
                {Cookies.get('signedin') ? <Link className="nav-link" to={'/kontakt-form'} >{'Kontakt Form'}</Link> : ''}
            </li>
            <li className="nav-item">
                {Cookies.get('signedin') ? <Link className="nav-link" to={'/media-tarife-form'} >{'Media Tarife Form'}</Link> : ''}
            </li>
            <li className="nav-item">
                {Cookies.get('signedin') ? <Link className="nav-link" to={'/impressum-form'} >{'Impressum Form'}</Link> : ''}
            </li>
        </ul>
    );
}
const NavBarStackedForBasicUser = (props) => {
    console.log(props);
    console.log(props.data === undefined);
    if (props.data === undefined) {
        return (
            <div style={{ height: '30px', backgroundColor: '#a5d8a5' }}></div>
        );
    } else {
        return (
            <ul className="nav flex-column" style={{ backgroundColor: '#a5d8a5' }}>
                <li className="nav-item">
                    <Link to="/basic-user-temporary-welcome-display" className="nav-link active">Temporary Welcome Display</Link>
                </li>
            </ul>
        );
    }
}
const NavBarStackedDynamic = (props) => {
    return (
        <ul>
            {
                props.map((value, index) => {
                    return (
                        <li key={value.value}>
                            {Cookies.get('signedin') ? < Link className="nav-link active" to={value.linkurl} >{value.linkname}</Link> : ''}
                        </li >
                    );
                })
            }
        </ul>
    );
}

export default NavBarStackedForPrivligedUser;
export { NavBarStackedForBasicUser };