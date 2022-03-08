import React from 'react';
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
        // console.log(this.props);
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
        // console.log('PAGINATION-FOR-PRIME-CUSTOMER DID MOUNT Yeah');
    }
    componentDidUpdate(prevProps, prevState) {
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
                            // console.log(process.env.REACT_APP_URL + data.imagebackgroundlink[0]);
                            return (<div className="data-slice" style={{
                                width: "200px",
                                marginLeft: "10px"
                            }} key={index}>
                                <Card key={data.name + index}>
                                    <CardImg key={process.env.REACT_APP_URL + data.imagebackgroundlink} top width="200px" src={process.env.REACT_APP_URL + data.imagebackgroundlink[0]} alt="Card image cap" />
                                    <h6 key={data.category}>{data.bundesland}</h6>
                                    <h4 key={data.name + index}><small>{data.name}</small></h4>
                                    <p key={data.subheadline}
                                        className="font-weight-lighter text-secondary"
                                    ><small>{data.subheadline}</small></p>
                                    <Link to={{ pathname: `/all-prime-customers/${data.id}`, query: { data } }} >{"Zum Artikel: " + data.name}</Link>

                                    <Switch>
                                    </Switch>
                                </Card>
                            </div>);
                        }
                        )}
                </div>
            </React.Fragment>

        );

    }

}

export default App;
