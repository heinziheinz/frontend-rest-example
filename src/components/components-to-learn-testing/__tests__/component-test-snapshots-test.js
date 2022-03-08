
import user from './../check-object';
it(
    'check-snapshot', () => {
        // const user = {
        //     createdAt: new Date(),
        //     id: Math.floor(Math.random() * 20),
        //     name: 'Jochen Knochen'
        // };
        expect(user).toMatchSnapshot({
            createdAt: expect.any(Date),
            id: expect.any(Number),
            name: 'Jochen Knochen'
        });
    }
);