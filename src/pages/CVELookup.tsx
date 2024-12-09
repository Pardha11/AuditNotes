import React, { useState } from "react";
import { NoteTextField } from "components";
import { createBrowserHistory } from "history";
import {Button} from "@material-ui/core";

const CVELookup = () => {
    const [noteText, setNoteText] = useState("");
    const [result, setResult] = useState("");
    const CVESubmit = () => {
        console.log(noteText);

        fetch("https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=Microsoft", {method: "GET", redirect: "follow"})
            .then((response) => response.text())
            .then((result) => setResult(result))
            .catch((error) => console.error(error));
        console.log(result);
    };

    return (
        <div>
            <h1 style={{padding:"10px"}}>CVE Lookup</h1>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px"
            }}>
                <NoteTextField
                    style={{
                        textAlign: "center",
                        flex: 1
                    }}
                    value={noteText}
                />
                <Button variant="outlined" onClick={CVESubmit}>Submit</Button>
            </div>
            <p>{result}</p>
        </div>
    );
};

export default CVELookup;