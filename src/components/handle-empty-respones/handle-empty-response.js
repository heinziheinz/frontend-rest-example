const HandleEmptyResponse = (props) => {
    console.log('Handle empty response props');
    console.log(props);
    if (Array.isArray(props)) {
        // console.log('isArray');
        if (props.length > 0) {
            // console.log('longer Tahn');
            return props;
        }
    }
    // console.log('default');
    return [{
        name: 'Leider kein Suchergebnis zu diesem Suchbegriffen.',
        bundesland: 'Leider kein Ort verfügbar',
        imagelink: 'empty',
        imagebackgroundlink: ['empty'],
        adresse: '',
        postleitzahl: '',
        stadt: '',
        suchanwesungen: {
            richtigeAnwendung: <div>
                <ul><li>Bitte verwenden Sie die Suchfelder richtig:</li>
                </ul>
                <div style={{ "textIndent": "50px" }}>
                    <b >Name / Spezialisierung? Suchfeld:</b> z.B. "Psychotherapeut" oder "Dr. Mayer"<br></br>
                    <b>Welche PLZ / Ort? Suchfeld:</b> z.B. "Wien" oder "1070"<br></br>
                    <b>Welches Bundesland? Suchfeld:</b> z.B. "Oberösterreich"<br></br>
                    <b>Welcher Bezirk? Suchfeld:</b> z.B. "5. Margarten 1050 Wien"<br></br>
                    <b>Welches Thema? Suchfeld: </b> z.B. "Alkoholismus"<br></br>
                </div>
                <ul><li>Beachten Sie die richtige Schreibweise</li>
                    <li>Reduzieren Sie die Anzahl der ausgefüllten Felder.</li>
                    <li>Verwenden Sie einen anderen Suchbegriff.</li>
                </ul>
            </div>,
            solchEineAnwendung: <div>
                <ul><li>Bitte verwenden Sie die Suchfelder richtig:</li>
                </ul>
                <div style={{ "textIndent": "30px" }}>
                    <p><b >Name / Spezialisierung? Suchfeld:</b> z.B. "Psychotherapeut" oder "Dr. Mayer"<br></br></p>
                    <p><b>Welche PLZ / Ort? Suchfeld:</b> z.B. "Wien" oder "1070"<br></br></p>
                    <p><b>Welches Bundesland? Suchfeld:</b> z.B. "Oberösterreich"<br></br></p>
                    <p><b>Welcher Bezirk? Suchfeld:</b> z.B. "5. Margarten 1050 Wien"<br></br></p>
                    <p><b>Welches Thema? Suchfeld: </b> z.B. "Alkoholismus"<br></br></p>
                </div>
                <ul><li>Beachten Sie die richtige Schreibweise</li>
                    <li>Reduzieren Sie die Anzahl der ausgefüllten Felder.</li>
                    <li>Verwenden Sie einen anderen Suchbegriff.</li>
                </ul>
            </div>

        }
    }];
}

export default HandleEmptyResponse;
