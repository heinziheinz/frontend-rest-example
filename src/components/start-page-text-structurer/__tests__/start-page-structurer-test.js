
import StartPageStructurer from './../start-page-structurer';
import data from './../test-data';
describe('start-pageS-structurer', () => {
    it('start-page-structurer returns something', () => {
        const myReturnedStuff = StartPageStructurer(data[0]);
        console.log(myReturnedStuff);
        expect(true);
    });
});