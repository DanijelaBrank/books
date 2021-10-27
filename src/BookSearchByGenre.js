import React, {useState, useMemo, useRef, useEffect} from "react";
import { usePagedBookList, deleteBook, usePagedSearchBookList} from "./accessHooks";
import BookCard from "./BookCard";
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useAuth } from "./useAuth";
import { useParams } from 'react-router-dom';

const BookSearchByGenre = ({genre}) => {
 
   const [query, setQuery] = useState(genre);
      
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
            {/* <Box sx={{display: "flex", flexDirection:"row", padding: "10px", alignItems: "baseline"}}>
                <TextField
                    sx={{flexGrow: 1}}
                    margin="normal"
                    name="search"
                    label="Pretraga"
                    value={query}
                    onChange={(e) => {
                        const val = e.target.value;
                      //  setQuery(genre);
                    }}
                    variant="outlined"
                />
                <Button sx={{marginLeft: "20px"}} variant="contained" onClick={() => setSearchQuery(genre)}>Pokreni pretragu</Button>
                </Box> */}
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