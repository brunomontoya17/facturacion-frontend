import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


function PageViewerField(props) {
    const navigate = useNavigate();
    console.log(props.formatlink);
    console.log(props.current);
    console.log(props.totalP);

    return (
        <Pagination className='pagination justify-content-center'>
            {props.current > 1 ? <>
                <LinkContainer key={"FIRST"} to={`${props.formatlink}${1}`}>
                    <Pagination.First />
                </LinkContainer>
            </> : <></>}
            {props.current > 2 ? <>
                <LinkContainer key={"PREVIOUS"} to={`${props.formatlink}${props.current - 1}`}>
                    <Pagination.Prev />
                </LinkContainer>
                </> : <></>}
            {(() => {
                const pages = [];
                console.log(props.current);
                if (props.current <= 3) {
                    console.log(props.current);
                    const constraint = props.current + 3;
                    console.log(constraint);
                    for (var i=1;(i<constraint); i++) {
                        pages.push(<LinkContainer key={i} to={`${props.formatlink}${i}`}>
                                <Pagination.Item>{i}</Pagination.Item>
                            </LinkContainer>)
                    }
                    pages.push(<LinkContainer key={"ELLIPSISPLUS"} to={`${props.formatlink}${props.current + 3}`}>
                        <Pagination.Ellipsis />
                    </LinkContainer>);
                    console.log(pages.length + " First IF");
                    return (<>{pages.map(pg => pg)}</>);
                }
                if (props.current > 3 && props.current <= props.totalP - 3) { 
                    console.log(props.current);
                    pages.push(<LinkContainer key={"ELLIPSISMINUS"} to={`${props.formatlink}${props.current - 3}`}>
                            <Pagination.Ellipsis />
                        </LinkContainer>);
                    for (var i=props.current-2;(i<props.current+3); i++) {
                        pages.push(<LinkContainer key={i} to={`${props.formatlink}${i}`}>
                            <Pagination.Item>{i}</Pagination.Item>
                        </LinkContainer>)
                    }
                    pages.push(<LinkContainer key={"ELLIPSISPLUS"} to={`${props.formatlink}${props.current + 3}`}>
                        <Pagination.Ellipsis />
                    </LinkContainer>);
                    console.log(pages.length + " Second IF");
                    return (<>{pages.map(pg => pg)}</>);
                }
                if (props.current > props.totalP - 3) {
                    console.log(props.current);
                    pages.push(<LinkContainer key={"ELLIPSISMINUS"} to={`${props.formatlink}${props.current - 3}`}>
                        <Pagination.Ellipsis />
                    </LinkContainer>);
                    for (var i = props.current-2;( i < props.totalP + 1); i++) {
                        pages.push(<LinkContainer key={i} to={`${props.formatlink}${i}`}>
                            <Pagination.Item>{i}</Pagination.Item>
                        </LinkContainer>)
                    }
                    console.log(pages.length + " Third IF");
                    return (<>{pages.map(pg => pg)}</>);
                }
            })()}
            {props.current < props.totalP-1  ? <>
                <LinkContainer key={"NEXT"} to={`${props.formatlink}${props.current + 1}`}>
                    <Pagination.Next />
                </LinkContainer>
            </> : <></>}
            {props.current < props.totalP ? <>
                <LinkContainer key={"FINAL"} to={`${props.formatlink}${props.totalP}`}>
                    <Pagination.Last />
                </LinkContainer>
            </> : <></>}
        </Pagination>
    )
}

export default PageViewerField