import { generatePages } from "../modules/pagination";

interface PaginationProps {
    totalPages: number,
    currentPage: number,
    onChange: Function
}

function Pagination(props: PaginationProps) {
    return (
        <div className="text-white text-sm max-sm:text-[12px] font-medium flex gap-2">
            <span className="bg-darkocean px-2 py-1 rounded cursor-pointer text-center hover:text-rose-500 transition-all" onClick={() => props.onChange(0)}>
                {'<<'}
            </span>
                {generatePages(props.currentPage, props.totalPages).map((page: number) => (
                    page != props.currentPage ? 
                        <span className="bg-darkocean px-2 py-1 rounded cursor-pointer text-center hover:text-rose-500 transition-all" 
                            onClick={() => props.onChange(page)} key={page}>
                                {page}
                        </span> 
                        :
                        <span className="bg-midnight px-2 py-1 rounded text-center hover:text-rose-500 transition-all" key={page}>
                            {page}
                        </span>
                ))}
            <span className="bg-darkocean px-2 py-1 rounded cursor-pointer text-center hover:text-rose-500 transition-all" 
                onClick={() => props.onChange(props.totalPages)}>
                    {'>>'}
            </span>
        </div>
    )
}

export default Pagination;