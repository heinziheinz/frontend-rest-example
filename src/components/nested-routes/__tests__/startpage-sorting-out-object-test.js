import SortingSidebarOutObjects, { SortingMainOut, SortingHorizontalBlockOut, SortingOutdownToSpecificNumber } from './../startpage-sorting-out-objects';
import { fakeData } from './../fake-data-from-fetch';

xtest('adds 1 + 2 to equal 3', () => {
    const soem = SortingSidebarOutObjects(fakeData);
    // console.log(soem);
    expect(SortingSidebarOutObjects(fakeData)).toHaveLength(1);

});
xtest('adds 1 + 2 to equal 3', () => {
    const soem = SortingMainOut(fakeData);
    // console.log(soem);
    expect(SortingMainOut(fakeData)).toHaveLength(1);

});
xtest('adds 1 + 2 to equal 3', () => {
    const soem = SortingHorizontalBlockOut(fakeData);
    console.log(soem);
    expect(SortingMainOut(fakeData)).toHaveLength(1);

});
xtest('adds 1 + 2 to equal 3', () => {
    const horizontal = SortingHorizontalBlockOut(fakeData);
    const sidebar = SortingSidebarOutObjects(fakeData);
    const main = SortingMainOut(fakeData);
    let newArray = [];
    newArray.push(horizontal, sidebar, main);
    console.log(newArray);
    expect(newArray).toHaveLength(3);

});
xtest('adds 1 + 2 to equal 3', () => {
    const sortingOutDownToFour = SortingOutdownToSpecificNumber(fakeData, 4, 'horizontalblock');
    console.log(sortingOutDownToFour);
    const startpagesidebar = sortingOutDownToFour.map((data, index) => {
        // console.log(data.blockoftext);
        if (!(data === null) && data.category === 'horizontalblock' && data.confirmed === 1) {
            return (
                'juhu'
            );
        } else {
            return (null);
        }
    });
    // console.log(startpagesidebar);
    // expect(sortingOutDownToFour).toBeObject();

});
test('adds 1 + 2 to equal 3', () => {
    const main = SortingOutdownToSpecificNumber(fakeData, 1, 'main');
    const sidebar = SortingOutdownToSpecificNumber(fakeData, 4, 'sidebar');
    const horizontal = SortingOutdownToSpecificNumber(fakeData, 3, 'horizontalblock');


    const startpageArticleComponents = main.concat(sidebar, horizontal);
    console.log(startpageArticleComponents);
});