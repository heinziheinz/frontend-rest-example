import React from 'react';
import axios from 'axios';
import ViewForStartPageIndex from './Atoms';
import { PaginationComponent, ArticleSelecter } from 'components/atoms';
import Pagination from 'components/pagination-component';
import ErrorBoundary from 'components/error-boundary';
var CancelToken;
var source;


class FormForStartPageIndex extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            data: [],
            update: props.update,
            articleselecter: 'category_aussuchen'
        }
    }
    static getDerivedStateFromProps(props, state) {
        // console.log(props.update);
        // console.log(state.update);
        if (props.update !== state.update) {
            // console.log('doe SOMETHING');
            return {
                data: ['undefined'],
                update: props.update,
            };
        }
        // No state update necessary
        return null;
    }
    doFetch = (url, option) => {
        const { articleselecter } = this.state;
        fetch(url + articleselecter, option)
            .then((response) => {
                // console.log(response);
                return response.json()
            })
            .then((res) => {
                // console.log('hi try');
                // console.log(res);
                // TODO if unauthenticated, then redirect
                // wie kann ich hier einen redirect mechanismus einführen
                this.setState({
                    show: true,
                    data: res
                });
            })
            .catch((err) => {
                // console.log(err);
                return err;
            });
    }
    componentDidMount() {
        // console.log('SUB MOUNT');
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        this.qurrieDataBase();
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log('SUB DID UPDATE');
        // console.log(this.state.data);

        if (this.state.data[0] === 'undefined') {
            // console.log('console inside');
            this.qurrieDataBase();
        }
    }
    handler = (event) => {
        const { name, value } = event.target;
        // console.log(value);
        // console.log(name);
        this.setState({
            [name]: value
        },
            () => {
                // console.log('HANDLER');
                const { articleselecter } = this.state;
                this.qurrieDataBase(articleselecter);
            });
    }

    componentWillUnmount() {
        // console.log('component  WILL UNMOUNT');
        source.cancel();
    }
    qurrieDataBase() {
        // Schauen, ob nicht show API besser wäre
        const { articleselecter } = this.state;
        // console.log(articleselecter);
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            axios.get(process.env.REACT_APP_URL + 'api/startpage/startpage/{startpage}?' + articleselecter, {
                cancelToken: source.token
            })
                .then(res => {
                    // if (res.status === 404) console.log('he 404');
                    // console.log(res);
                    // console.log(res.data.length);

                    this.setState({
                        show: true,
                        data: res.data
                    });
                    return res;

                }).catch(err => {
                    console.error(err);
                    // console.log(err.toJSON());
                });
        } catch (e) {
            // console.log(e.message);
        }
    }
    render() {
        // Check
        const { show, data } = this.state;

        // console.log(data.length === 0);
        // console.log(data);
        if (show === false || data === undefined) {
            return (
                <ArticleSelecter handler={this.handler} />
            );
        }
        if (show && data) {
            // console.log(data);
            if (data.length === 0) {
                return (<React.Fragment>
                    <ArticleSelecter handler={this.handler} />
                    <h2>{'Diese Kategorie nicht vorhanden'}</h2>;
                </React.Fragment>);
            }
            if (data !== 'category_aussuchen') {
                // console.log('CONDITION FPR PAGINATION HIT');
                return (
                    <React.Fragment>
                        <ArticleSelecter handler={this.handler} />
                        {/* <ViewForStartPageIndex data={data} /> */}
                        <Pagination data={data} />
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <ArticleSelecter handler={this.handler} />
                        <h2>{data}</h2>
                    </React.Fragment>
                );
                ;
            }
        } else {
            return (
                <ArticleSelecter handler={this.handler} />
            );
        }
    }
}
export default FormForStartPageIndex;


// https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror
