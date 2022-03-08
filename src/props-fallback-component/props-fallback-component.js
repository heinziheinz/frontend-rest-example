
function getDefaultProps(props) {
    return (
        props.delay !== undefined
            ? props.delay
            : (props.trigger === 'hover' ? 100 : 0)
    )
}

export default getDefaultProps;