import React, { Suspense } from 'react';
import './time-picker-style.css';
import { TimePicker } from 'antd';
import moment from 'moment';
import { withRouter, Route, Link } from 'react-router-dom';
import {
    Button,
    FormGroup,
    Label,
    Input,
    Pagination,
    PaginationItem,
    PaginationLink,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import Cookies from 'js-cookie';
import { SpaceForUnderScoreAndToLowerCase, AllToLowerCase, GesundheitsratgeberInPathExistent } from 'components/regex-collection';
const SearchForDoctorForm = React.lazy(() => import('components/search-for-doctor-from'));
// import SearchForDoctorForm from 'components/search-for-doctor-from';
const ProfileFolderNameHandler = (props) => {
    return (
        <input
            type="text"
            placeholder="nameoftheperson"
            onChange={props.fileNameHandler}
        />
    );
}


const ImageUploadHandler = (props) => {
    return (
        <input
            type="file"
            onChange={props.onAddingImage}
            name="image"
        />
    );
}
const ImageHiddenUploadHandler = (props) => {
    return (
        <div
            style={{
                "height": "0px",
                "overflow": "hidden"
            }}
        >
            <input
                type="file"
                onChange={props.onAddingImage}
                name="image"
                ref={props.myRef}
            />
        </div>
    );
}

const FormButton = (props) => {
    return (
        <Button onClick={props.fileUploader}>{props.value}</Button>
    );
}

const FormForProfiles = (props) => {
    // console.log(props.text);
    return (
        <FormGroup>
            <Label for={props.formbezeichnung}>{props.name}</Label>
            <Input
                value={props.value}
                type={props.text}
                name={props.name}
                id={props.formbezeichnung}
                placeholder={props.formbezeichnung}
                onChange={props.handleChangeInputValue}
            />
        </FormGroup>
    );
}

const CheckBox = (props) => {
    // console.log(props.confirmed);
    return (
        <FormGroup>
            <label for={props.name}>{props.name}</label>
            <input
                type={props.text}
                // checked={props.confirmed}
                onChange={props.handleChangeInputValue}
                name={props.name}
                id={props.name}
                value={props.name}
                checked={props.confirmed}
            ></input>

        </FormGroup>
    );
}
// const CheckBox = (props) => {
// console.log(props.confirmed);
//     return (
//         <FormGroup>
//             <Label for={props.formbezeichnung}>{props.name}   </Label>
//             <Input
//                 value={props.value}
//                 type={props.text}
//                 name={props.name}
//                 id={props.formbezeichnung}
//                 placeholder={props.formbezeichnung}
//                 onChange={props.handleChangeInputValue}
//                 defaultChecked={props.confirmed}
//             />

//         </FormGroup>
//     );
// }



const OptionsSelector = (props) => {
    if (props.desicion === "title") {
        return (
            <Input type="select" name="title" id="exampleSelect" onChange={props.handleChangeInputValue}>
                <option value="Titel hinzufügen" defaultValue>Titel hinzufügen</option>
                <option value="Dr">Dr.</option>
                <option value="Prof">Prof.</option>
                <option value="Prof">Mag.</option>
                <option value="Prof">Mag. Mag.</option>
                <option value="Prof">-</option>
                <option value="Prof">MSc</option>
                <option value="Prof">Dipl. Päd.</option>
                <option value="Prof">Dipl.-Ing.</option>
                <option value="Prof">BA</option>
                <option value="Prof">DSA</option>
                <option value="Prof">BSc</option>
                <option value="Prof">MA</option>
                <option value="Prof">Dipl.Soz.Päd</option>
            </Input>
        );
    }
    if (props.desicion === "specialization") {

        let specificationStaring = process.env.REACT_APP_SPECIFICATIONS_OF_DOCTOR;
        let specificationsNames = specificationStaring.split(",");

        return (
            <Input type="select" name="specialization" id="specialization" onChange={props.handleChangeInputValue}>
                <option value="Titel hinzufügen" defaultValue>Spezialisierung  hinzufügen</option>
                {specificationsNames.map((value, index) => {
                    return <option key={value}>{value}</option >
                })}
            </Input>
        );
    }
    if (props.desicion === "bundesland") {
        let bundesländerString = process.env.REACT_APP_BUNDESLAENDER;
        let bundesländerNames = bundesländerString.split(",");

        return (
            <Input type="select" name="bundesland" id="bundesland" onChange={props.handleChangeInputValue}>
                <option value="Bundesland hinzufügen" defaultValue>Bundesland  hinzufügen</option>
                {bundesländerNames.map((value, index) => {
                    return <option key={value}>{value}</option >
                })}
            </Input>
        );
    }

}
const OptionSelectorWithSelectedCategory = (props) => {
    let categorys = process.env.REACT_APP_CATEGORY_OF_ARTICLE;
    let categoryNames = categorys.split(",");
    // console.log(props.value);
    return (
        <Input value={props.value} type="select" name="category" id="category" onChange={props.handleChangeInputValue}>
            {categoryNames.map((value, index) => {
                return <option key={value}>{value}</option >
            })}
        </Input>
    );
}
const OptionCategorySelector = (props) => {
    let categorys = process.env.REACT_APP_CATEGORY_OF_ARTICLE;
    let categoryNames = categorys.split(",");
    return (
        <Input type="select" name="category" id="category" onChange={props.handleChangeInputValue}>
            <option value="category hinzufügen" defaultValue>category hinzufügen</option>
            {categoryNames.map((value, index) => {
                return <option key={value}>{value}</option >
            })}
        </Input>
    );
}

const SpecificationSelector = (props) => {
    let specificationStaring = process.env.REACT_APP_SPECIFICATIONS_OF_DOCTOR;
    let specificationsNames = specificationStaring.split(",");

    return (
        <Input type="select" name="specification" id="specification" onChange={props.handleChangeInputValue}>
            <option value="Titel hinzufügen" defaultValue>Spezialisierung  hinzufügen</option>
            {specificationsNames.map((value, index) => {
                return <option key={value}>{value}</option >
            })}
        </Input>
    );
}
const PaginationComponent = (props) => {
    return (
        <Pagination size="sm" aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    1
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    2
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    3
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
        </Pagination>
    );
}
const ArticleSelecter = (props) => {
    let categorys = process.env.REACT_APP_ARTICLE_SELECTER;
    let categoryNames = categorys.split(",");
    return (
        <Input type="select" name="articleselecter" id="articleselecter" onChange={props.handler}>
            <option value="category_aussuchen" defaultValue>category aussuchen</option>
            {categoryNames.map((value, index) => {
                return <option key={value}>{value}</option >
            })}
        </Input>
    );
}
const SearchFormForDoctor = withRouter(({ location }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={SearchForDoctorForm} />
        </Suspense>
    );
})
const ArtikelAboutHealth = () => <h1>Hier kommen Artikel zu Gesundheit.</h1>;

const StartPageMainArticle = (props) => {
    let name = SpaceForUnderScoreAndToLowerCase(props.data.headline);
    const myData = props.data;
    // console.log(myData.id);
    var imgTitleAndAltAttribute;
    if (props.data.singletitleattribute.length < 1) {
        imgTitleAndAltAttribute = { imageAlt: "Nice image without an alt text", imageTitle: "Nice image without an image title text" };
    } else {
        imgTitleAndAltAttribute = props.data.singletitleattribute;
    }
    return (
        <Link
            to={{ pathname: "/gesundheitsratgeber/" + myData.id, query: myData }}
            className="text-decoration-none text-secondary"
            style={{ "display": "block", "height": "100%" }}
        >
            {/* <div
                style={{ "height": "100%" }}
            > */}
            {/* TODO: Das backgroundimage austauschen oder */}
            {/* <span className="d-flex align-items-end h-100 d-inline-block text-white" style={{
                    display: "block",
                    backgroundImage: `url(${process.env.REACT_APP_URL + props.data.imagelink[0]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}> */}
            <div
                style={{
                    "display": "inline-block",
                    "overflow": "hidden",
                    "position": "relative",
                    "width": "100%",
                    "height": "100%"
                }}
            >
                <img
                    style={{
                        "objectFit": "cover",
                        "pointerEvents": "none",
                        "position": "absolute",
                        "width": "100%",
                        "height": "100%",
                        "zIndex": "-1"
                    }}
                    alt={imgTitleAndAltAttribute.imageAlt}
                    title={imgTitleAndAltAttribute.imageTitle}
                    src={process.env.REACT_APP_URL + props.data.imagelink[0]} />

                {/* </div> */}
                <div
                    className="pt-5 p-3"
                    style={{
                        "marginTop": "34%"
                    }}
                >
                    <h5
                        style={{ color: 'white', lineHeight: '0.6', textShadow: '1px 1px 4px grey' }}
                    >{process.env.REACT_APP_GESUNDHEITSNEWS}</h5>
                    <h3
                        className="mb-1"
                        style={{ color: 'white', textShadow: '1px 1px 4px  grey' }}
                    >{props.data.headline}</h3>
                    <p
                        className="lead"
                        style={{
                            color: 'white',
                            "overflow": "hidden",
                            "textOverflow": "ellipsis",
                            "display": "-webkit-box",
                            "WebkitLineClamp": "2",
                            "WebkitBoxOrient": "vertical"
                        }}
                    >{`${props.data.subheadline}`}</p>
                </div>
            </div>
            {/* </span> */}
            {/* </div> */}
        </Link >
    );
}

const StartPageHorizontalBlock = (props) => {
    console.log('STARTPage Hor');
    console.log(props);
    let name = SpaceForUnderScoreAndToLowerCase(props.data.headline);
    let mr3 = props.index < 7 ? 'mr-3' : '';
    const myData = props.data;
    var imgTitleAndAltAttribute;
    if (props.data.singletitleattribute.length < 1) {
        imgTitleAndAltAttribute = { imageAlt: "Nice image without an alt text", imageTitle: "Nice image without an image title text" };
    } else {
        imgTitleAndAltAttribute = props.data.singletitleattribute;
    }
    return (
        <div className={`w-50   ${mr3}`} >
            <Link to={{ pathname: "/gesundheitsratgeber/" + myData.id, query: myData }} className="text-decoration-none text-secondary">
                <Card>
                    <CardImg src={`${process.env.REACT_APP_URL + props.data.imagelink[0]}`}
                        alt={imgTitleAndAltAttribute.imageAlt}
                        title={imgTitleAndAltAttribute.imageTitle}
                    />
                    <CardBody>
                        <h5 className="font-weight-light text-left mb-1" style={{ color: '#a5d8a5' }}>{process.env.REACT_APP_GESUNDHEITSNEWS}</h5>
                        <CardTitle className="font-weight-bold">{props.data.headline}</CardTitle>
                        <CardSubtitle
                            style={{
                                "overflow": "hidden",
                                "textOverflow": "ellipsis",
                                "display": "-webkit-box",
                                "WebkitLineClamp": "6",
                                "WebkitBoxOrient": "vertical"
                            }}
                            className="text-left"
                        >{props.data.subheadline}</CardSubtitle>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
}

const StartPageSideBar = (props) => {
    let name = SpaceForUnderScoreAndToLowerCase(props.data.headline);
    let mp3 = props.index < 4 ? 'mb-3' : '';
    const myData = props.data;
    // console.log('HI SIDEBAR');
    // console.log(props.data.singletitleattribute);
    var imgTitleAndAltAttribute;
    if (props.data.singletitleattribute.length < 1) {
        imgTitleAndAltAttribute = { imageAlt: "Nice image without an alt text", imageTitle: "Nice image without an image title text" };
    } else {
        imgTitleAndAltAttribute = props.data.singletitleattribute;
    }
    return (
        <Link to={{ pathname: "/gesundheitsratgeber/" + myData.id, query: myData }} className="text-decoration-none text-secondary">
            <span style={{ display: "block" }} className={`d-flex ${mp3} ml-3 pb-3 border-bottom`}>
                <img src={`${process.env.REACT_APP_URL + props.data.imagelink[0]}`}
                    alt={imgTitleAndAltAttribute.imageAlt}
                    title={imgTitleAndAltAttribute.imageTitle}
                    className="rounded"
                    width="150" />

                <div className="ml-3">

                    <h5 className="font-weight-bold text-left mb-1" style={{ color: '#a5d8a5' }}><small>{process.env.REACT_APP_GESUNDHEITSNEWS}</small></h5>
                    <h5
                        style={{
                            "overflow": "hidden",
                            "textOverflow": "ellipsis",
                            "display": "-webkit-box",
                            "WebkitLineClamp": "2",
                            "WebkitBoxOrient": "vertical"
                        }}
                        className="text-left"><small>{props.data.headline}</small></h5>
                </div>
            </span>
        </Link>
    );
}

const NavBarStacked = (props) => {
    return (
        <Navbar style={{ backgroundColor: '#a5d8a5', display: 'flex', flexDirection: 'column' }}>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    {true ? <Link to="/article-form" className="text-decoration-none text-secondary p-4">Protected: Article Form</Link> : 'none'}
                </NavItem>
                <NavItem>
                    {true ? <Link to="/profile-form" className="text-decoration-none text-secondary p-4">Protected: Profile Form</Link> : 'none'}
                </NavItem>
            </Nav>
        </Navbar>
    );
}
const ButtonWithEventHandler = (props) => {
    return (
        <button type="button" onClick={() => props.onClickInput()}>choose file</button>
    );
}


class TimePickerExample extends React.Component {
    format = 'HH:mm';
    onChange(value) {
        // console.log(value._i);
        this.props.onChange(value._i);
    }
    render() {
        return (
            <TimePicker
                defaultValue={moment(this.props.officeTime, this.format)}
                format={this.format}
                // onChange={this.props.handleChangeInputValue}
                onChange={(date, dateString) => this.props.handleChangeInputValue(date, dateString, this.props.name)}
                name={this.props.name}
                id={this.props.name}
                disabled={this.props.confirmed ? "" : "disabled"}
            />
        );
    }
};
const TimePickerCheckBox = (props) => {
    // console.log(props.confirmed);
    return (
        <div class="solo" style={{ 'color': props.showText ? 'black' : 'white' }}>
            <label class="containero">{props.name}
                <input
                    type="checkbox" checked={props.confirmed}
                    onChange={props.handleChangeInputValue}
                    value={props.value}
                    name={props.name}
                ></input>
                <span class="checkmark"></span>
            </label>
        </div>
    );
}
export default FormForProfiles;
export {
    FormButton,
    ImageUploadHandler,
    ImageHiddenUploadHandler,
    ProfileFolderNameHandler,
    OptionsSelector,
    SpecificationSelector,
    OptionCategorySelector,
    PaginationComponent,
    ArticleSelecter,
    CheckBox,
    OptionSelectorWithSelectedCategory,
    SearchFormForDoctor,
    ArtikelAboutHealth,
    StartPageMainArticle,
    StartPageHorizontalBlock,
    StartPageSideBar,
    NavBarStacked,
    ButtonWithEventHandler,
    TimePickerExample,
    TimePickerCheckBox
};

{/* <ul>
    <li>
        {true ? <Link to="/article-form" className="text-decoration-none text-secondary p-4">Protected: Article Form</Link> : 'none'}
    </li>
    <li>
        {true ? <Link to="/profile-form" className="text-decoration-none text-secondary p-4">Protected: Profile Form</Link> : 'none'}
    </li>
</ul> */}