import HandleEmptyResponse from './../handle-empty-response';
import { EmptyArray, LoadedArray } from './../fake-data';
describe('HandleEmptyResponse', () => {
    xit('testing handle empty response', () => {

        var response = HandleEmptyResponse(EmptyArray);
        expect(response.name).toBe('Leider kein Ergebnis');
    });
    it('handle Loaded response', () => {
        var response = HandleEmptyResponse(LoadedArray);
        console.log(response);
        expect(response[0].name).toBe("Loaded Response");
    });
});