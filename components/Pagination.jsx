import Link from "next/link";

const Pagination = ({ page, total, pageSize }) => {
    const totalPages = Math.ceil(total / pageSize);
    return (
        <section className="container mx-auto flex justify-center items-center my-8">

            { page > 1 ? (<Link href={`/properties?page=${page - 1}`} className="mr-2 px-2 py-1 border border-gray-300">
                Previous
            </Link>) : null
            }



            <span className="mx-2">Page {page} of 0f {totalPages}</span>

            { page > totalPages ? null : (<Link href={`/properties?page=${page + 1}`} className="ml-2 px-2 py-1 border border-gray-300">
                Next
            </Link>)
            }


        </section>
     );
}

export default Pagination;