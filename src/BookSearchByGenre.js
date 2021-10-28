import React, {useState, useMemo, useRef, useEffect} from "react";
import { deleteBook, usePagedSearchBookList} from "./accessHooks";
import BookCard from "./BookCard";
import TablePagination from '@mui/material/TablePagination';
import { useAuth } from "./useAuth";


const BookSearchByGenre = ({genre}) => { 
   const [query, setQuery] = useState(genre);
   useEffect(() => {
       setQuery(genre);       
   }, [genre])
      
    const [login] = useAuth();
    const [
        list,
        location,
        loading,
        error,
        pages,
        page,
        forward,
        back,
        goToPage,
        length,
        pageSize,
        setPageSize,
        reload
    ] = usePagedSearchBookList(10, query);
    
    if(loading){
        return <h3>Loading...</h3>;
    }else{
        return <div>
           <BookCard list={list} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            <TablePagination
                component="div"
                count={length}
                page={page-1}
                onPageChange={(e, p) => goToPage(p)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                }}
                labelDisplayedRows={({from, to, count, page}) => `Prikazujem stranicu ${page+1} (${from}-${to+1} od ukupno ${count})`}
                labelRowsPerPage="Redova po stranici: "
            />
        </div>
    }
}

export default BookSearchByGenre;