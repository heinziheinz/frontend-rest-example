
const testFunction = () => {

    // Converting multiple images

    // let imagesNames = imageList.map((images) => {
    //     return images.name;
    // });

    let imagesNames = ['cat.jpg', 'dog.jpg', 'bird.jpg']
    let base64MultipleFile = ['catto', 'doggy', 'mr.bird'];

    var myBlobArray = base64MultipleFile.map((singleBase64File) => {
        console.log(singleBase64File);
        return ({ singleBase64File: 'mr bird' });
    });
    console.log(myBlobArray);
    // converting image end
    return "Hi";
}
it('renders without crashing', () => {
    console.log(testFunction);
    expect(testFunction()).toEqual('Hi');
});