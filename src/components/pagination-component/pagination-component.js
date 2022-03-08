import React from 'react';
// import './pagination-component.css';
import { Badge } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Jumbotron,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from 'reactstrap';
import ArtikleComponent from 'components/article-component';
class App extends React.PureComponent {

    constructor(props) {
        super(props);
        // console.log(this.props.data);
        // create data set of random length
        this.pageSize = 20;
        this.pagesCount = Math.ceil(this.props.data.length / this.pageSize);
        this.state = {
            currentPage: 0,
            pagesCount: this.pagesCount
        };
        // this.dataSet = this.props.data;

        // console.log(this.state.pagesCount);
        // console.log(this.pagesCount);
    }
    componentDidMount() {
        // console.log('PAGINATION DID MOUNT Yeah');
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps);
        // console.log(this.state.currentPage);
        // console.log(prevState);
        // console.log(this.state.pagesCount);
        // console.log('PAGINATION DID UPDATE');
        if (this.state.currentPage >= this.state.pagesCount) {
            this.setState({
                currentPage: 0,
                pagesCount: Math.ceil(this.props.data.length / this.pageSize)
            });
        } else {
            this.setState({
                pagesCount: Math.ceil(this.props.data.length / this.pageSize)
            });
        }
    }
    handleClick(e, index) {

        e.preventDefault();

        this.setState({
            currentPage: index
        });

    }

    render() {
        // console.log('PADINATION DID RENDER');
        const { currentPage } = this.state;
        // console.log(this.props.data);
        // console.log('pagination component');
        // console.log(currentPage);//SOMETHIN
        return (

            <React.Fragment>

                <div className="pagination-wrapper">

                    <Pagination aria-label="Page navigation example">

                        <PaginationItem disabled={currentPage <= 0}>

                            <PaginationLink
                                onClick={e => this.handleClick(e, currentPage - 1)}
                                previous
                                href="#"
                            />

                        </PaginationItem>

                        {[...Array(this.state.pagesCount)].map((page, i) =>
                            <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        <PaginationItem disabled={currentPage >= this.pagesCount - 1}>

                            <PaginationLink
                                onClick={e => this.handleClick(e, currentPage + 1)}
                                next
                                href="#"
                            />

                        </PaginationItem>

                    </Pagination>

                </div >
                <div style={{
                    display: "flex",
                    marginTop: "40px",
                    flexWrap: "wrap"
                }}>
                    {this.props.data
                        .slice(
                            currentPage * this.pageSize,
                            (currentPage + 1) * this.pageSize
                        )
                        .map((data, index) => {
                            // console.log(data.confirmed);
                            return (<div className="data-slice" style={{
                                width: "200px",
                                marginLeft: "10px"
                            }} key={index}>

                                <Card key={data.category + index}
                                    style={{
                                        "height": "260px",
                                        "overflow": "hidden",
                                        "margin": "5px"
                                    }}
                                >
                                    <Link
                                        style={{
                                            "position": "absolute",
                                            "top": "10%",
                                            "lefu": "3px",
                                            "background": "rgb(255, 255, 255, .4)"
                                        }}
                                        to={{ pathname: `/all-articles/${data.id}`, query: { data } }} >
                                        <Badge color={data.confirmed ? "success" : "danger"}>{data.confirmed ? "Displayed" : "Not Diplayed"}</Badge>
                                        <CardImg key={process.env.REACT_APP_URL + data.imagelink} top width="200px" src={process.env.REACT_APP_URL + data.imagelink} alt="Image not found" />
                                        <h6 key={data.category}>{data.category}</h6>
                                        <h4 key={data.headline + index}><small>{data.headline}</small></h4>
                                        <div key={data.caption}
                                            className="font-weight-lighter text-secondary"
                                        ><small>{data.caption}</small></div>
                                        {/* <Link
                                        style={{
                                            "position": "absolute",
                                            "top": "10%",
                                            "lefu": "3px",
                                            "background": "rgb(255, 255, 255, .4)"
                                        }}
                                        to={{ pathname: `/all-articles/${data.id}`, query: { data } }} >{"Zum Artikel: " + data.headline} */}
                                    </Link>

                                    <Switch>
                                        {/* <Route path={"/" + data.id} children={<ArtikleComponent />} /> */}
                                        {/* <Route path="/:id" render={props => <ArtikleComponent {...props} items={data} />} /> */}
                                    </Switch>
                                </Card>
                            </div>);
                        }
                        )}
                    {/* <Route path="/:id" render={props => <ArtikleComponent {...props} />} items={this.props.data} /> */}
                </div>
            </React.Fragment>

        );

    }

}

export default App;
