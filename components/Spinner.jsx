'use client';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "100px auto",
    borderColor: "blue",
}
const Spinner = () => {
    return <ClipLoader color="#34d399" cssOverride={override} size={150}
    aria-label=" Loading Spinner" />;
}

export default Spinner;