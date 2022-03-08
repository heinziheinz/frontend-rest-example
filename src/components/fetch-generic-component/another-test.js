import React from 'react';
// wenn lämnger als 5000 dauert, dann error, so kann man das auf beliebig ausweiten
// jest.setTimeout(8000);

export default () => {
    const [done, setDone] = React.useState(false);
    setTimeout(() => setDone(true), 1000);
    return done;
};
