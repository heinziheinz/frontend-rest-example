export default (data) => {
    const filteredData = data.filter((data) => {
        if (data.category === 'sidebar' && data.confirmed === 1) {
            return data;
        }
    });
    const myfiltered = filteredData.reduce((result) => {
        return result;
    });
    return myfiltered;
}
export const SortingMainOut = (data) => {
    const filteredData = data.filter((data) => {
        if (data.category === 'main' && data.confirmed === 1) {
            return data;
        }
    });
    const myfiltered = filteredData.reduce((result) => {
        return result;
    });
    return myfiltered;
}
export const SortingHorizontalBlockOut = (data) => {
    const filteredData = data.filter((data) => {
        if (data.category === 'horizontalblock' && data.confirmed === 1) {
            return data;
        }
    });
    const myfiltered = filteredData.reduce((result) => {
        return result;
    });
    // console.log(myfiltered)
    return myfiltered;
}
export const SortingOutdownToSpecificNumber = (data, number, category) => {
    const filteredData = data.filter((data) => {
        if (data.category === category && data.confirmed === 1) {
            return data;
        }
    });
    const myfiltered = filteredData.filter((
        each,
        index,
        all
    ) => {
        if (index < number) {
            return data;
        }
    });
    return myfiltered;
}