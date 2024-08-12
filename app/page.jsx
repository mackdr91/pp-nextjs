import Link from "next/link";


const HomePage = () => {
    return ( <div>
        <h1>Home Page</h1>
        <Link href={{pathname: '/properties'}}>Properties</Link>
    </div> );
}

export default HomePage;