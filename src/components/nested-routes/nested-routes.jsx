import React, { Suspense, useEffect } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import { SearchFormForDoctor } from 'components/atoms';
import Cookies from "js-cookie";
const PaginationResult = React.lazy(() => import('components/pagination-hook-variante/pagination-hook-variante'));
const StartPageHealthReports = React.lazy(() => import('components/start-page-health-reports'));
const GesundheitsRatgeberSingleArticle = React.lazy(() => import('components/gesundheits-ratgeber-single-article'));


const Spass = () => {
    return (
        <h1>Hallo</h1>
    );
}
const NestedRoutes = () => {
    // console.log('my Nested Routes');
    // const mainarticle = 'mainarticle';
    // window.onload = function () {
    //console.log('ONLOAD ONLOAD ONLOAD ONLOAD');
    // };


    return (
        <header>
            <Navbar expand="md" className="shadow-sm pb-3" style={{ backgroundColor: '#a5d8a5' }}>
                <div className="container mt-3">
                    <NavbarBrand className="text-secondary" style={{ textShadow: '1px 1px 4px  grey' }}>
                        {/* PsyInfo Search */}
                        <h1><small>PsyFinder</small></h1>
                    </NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/" className="text-decoration-none text-secondary p-4">Suche Deinen Psychologen</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/gesundheitsratgeber" className="text-decoration-none text-secondary p-4">GesundheitsRatgeber</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/login" className="text-decoration-none text-secondary p-4">Login</Link>
                        </NavItem>
                        {/* <NavItem className="nav-item">
                        < Link className="nav-link active" to="/article-form" >Protected: Article Form</Link>
                    </NavItem>
                    <NavItem className="nav-item">
                        <Link className="nav-link" to="/profile-form" >Protected: Profile Form</Link>
                    </NavItem> */}
                    </Nav>
                </div>
            </Navbar>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchFormForDoctor />{/* SearchFormFor Doctor render zu oft*/}
                <Route exact path="/" component={StartPageHealthReports} />
                <Route path="/gesundheitsratgeber/:id" component={GesundheitsRatgeberSingleArticle} />
                <Route path="/GesundheitsRatgeberSingleArticle/:id" component={GesundheitsRatgeberSingleArticle} />
                <Route
                    path="/search-result:id" component={PaginationResult} />
            </Suspense>
        </header>
    );
}

export default NestedRoutes

