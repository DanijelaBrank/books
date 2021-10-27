// import React, {useState, useMemo, useRef, useEffect} from "react";
// import { usePagedBookList, deleteBook} from "./accessHooks";
// import BookCard from "./BookCard";
// import TablePagination from '@mui/material/TablePagination';
// import { Button } from "@mui/material";
// import {Link as RouterLink} from 'react-router-dom';
// import { TextField } from "@mui/material";
// import { Box } from "@mui/material";
// import { useAuth } from "./useAuth";

// const BookSearchPage = () => {
//     const [query, setQuery] = useState("");
//     const [searchQuery, setSearchQuery] = useState("")
//     const [login] = useAuth();
//     const [
//         list,
//         location,
//         loading,
//         error,
//         pages,
//         page,
//         forward,
//         back,
//         goToPage,
//         length,
//         pageSize,
//         setPageSize,
//         reload
//     ] = usePagedSearchBookList(10, searchQuery);
//     if(loading){
//         return <h3>Loading...</h3>;
//     }else{
//         return <div>
//             <Box sx={{display: "flex", flexDirection:"row", padding: "10px", alignItems: "baseline"}}>
//                 <TextField
//                     sx={{flexGrow: 1}}
//                     margin="normal"
//                     name="search"
//                     label="Pretraga"
//                     value={query}
//                     onChange={(e) => {
//                         const val = e.target.value;
//                         setQuery(val);
//                     }}
//                     variant="outlined"
//                 />
//                 <Button sx={{marginLeft: "20px"}} variant="contained" onClick={() => setSearchQuery(query)}>Pokreni pretragu</Button>
//                 </Box>
//             <BookCard list={list} onDelete={(id) => {
//                 deleteBook(id, login);
//                 reload();
//                 }}/>
//             <TablePagination
//                 component="div"
//                 count={length}
//                 page={page-1}
//                 onPageChange={(e, p) => goToPage(p)}
//                 rowsPerPage={pageSize}
//                 onRowsPerPageChange={(e) => {
//                     setPageSize(parseInt(e.target.value, 10));
//                 }}
//                 labelDisplayedRows={({from, to, count, page}) => `Prikazujem stranicu ${page+1} (${from}-${to+1} od ukupno ${count})`}
//                 labelRowsPerPage="Redova po stranici: "
//             />
//         </div>
//     }
// }

// export default BookSearchPage;

// const Sidebar = () => {
//     const ctg=["All books"];   //"Science Fiction","Fantasy","Computing","Mystery","Horror"];
//     const [category, setCategory]  = useState();  
//     const [categories, setCategories]=useState(ctg);    
//     const [login] = useAuth();
//     const [
//         list,
//         location,
//         loading,
//         error,
//         pages,
//         page,
//         forward,
//         back,
//         goToPage,
//         length,
//         pageSize,
//         setPageSize,
//         reload
//     ] = usePagedBookList(10);
//     list.forEach(book => {
//         setCategory(book.genre)
//     });
//     const category=

//     const renderItem = (name, current, props = {}) => {
//         return (
//           <li
//             className={name === current ? 'active': ''}
//             onClick={() => {
//               if (!selected) setCategory(name)
//             }}
//             {...props}
//           >
//             {name}
//           </li>
//         )
//       }

//     if(loading){
//         return <h3>Loading...</h3>;
//     }else{
//         <div className="sidebar">      
//           <h5>Categories</h5>
//           <ul>
//             {renderItem('All', category)}
//             {categories.map(cat => renderItem(cat, category, { key: cat }))}
//           </ul>        
//       </div>
//     }
// }



        // return <div sx={{width: '100%',
        //     height: '100%'}} >
        //     {/* <Button component={RouterLink} to="/book/new" variant="contained">Dodaj</Button> */}
        //     <BookCard list={list} onDelete={(id) => {
        //         deleteBook(id, login);
        //         reload();
        //         }}/>


    
  
  export default Sidebar;