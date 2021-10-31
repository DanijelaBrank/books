import React, { useState } from "react";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from "@mui/material";
//import { Button } from "@mui/material";
import TableDropdown from "./TableDropdown";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './BookCard.css';
import { Rating, RatingView } from 'react-simple-star-rating';
import { useParams } from "react-router";


function MyStarRating(r) {
  return (
    <div >
      <RatingView ratingValue={r} /* RatingView Props */ />
    </div>
  )
}


  const AuthorsArray = (props) => {   
    console.log(props.authors);
    let aut=String(props.authors).split(",  ");
//   let aut=props.authors.map((author)=>author+", ");
// aut=aut.trim();

  //aut=String(aut).substring(0,aut.length-1);
  
    return (
      <div >
       Author(s): {aut}
      </div>
    )
  }


  const BookCard = ({ list, onDelete }) => {

    return (
      <div className="books" >
        {list.map((card) => (

          <Card className="card" key={card.id} sx={{display:'flex', justiyContent:'space-between', flexDirection:'column'}}>
            <CardContent>
              {/* <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                id={card.id}
              </Typography> */}
              <Typography variant="h6" sx={{ textAlign: 'center' }} component="div">
                {card.title}
              </Typography>
              <Typography >
              <AuthorsArray authors={card.authors}/>
              </Typography>
              <Typography variant="body2">
                published: {card.publishDate}
              </Typography>
              <Typography className="star-button" variant="body2">
                <RatingView ratingValue={card.rating} size={20}  /* RatingView Props */ />
                <span style={{ flexGrow: 1 }} />
                <Button size="small"><TableDropdown text="..."
                  items={
                    [
                      { text: "Pregledaj...", link: true, path: `/book/${card.id}/view` },
                      { text: "Izmeni...", link: true, path: `/book/${card.id}/edit` },
                      { text: "Obrisi", link: false, action: () => onDelete(card.id) }
                    ]
                  }
                /></Button>
              </Typography>
            </CardContent>





            {/* <CardActions>
        <Button size="small"><TableDropdown text="..."
                  items={
                      [
                        {text: "Pregledaj...", link: true, path: `/book/${card.id}/view`},
                        {text: "Izmeni...", link: true, path: `/book/${card.id}/edit`},
                        {text: "Obrisi", link: false, action: () => onDelete(card.id)}
                      ]
                  }
                  /></Button>
      </CardActions> */}
          </Card>
        ))}
      </div>
    );
  }



  // const BookList = ({list, onDelete}) => {
  //     return <div>
  //     <TableContainer component={Paper}>
  //       <Table sx={{ minWidth: 650 }}>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>id</TableCell>
  //             <TableCell>Authors</TableCell>
  //             <TableCell>PublishDate</TableCell>
  //             <TableCell>Rating</TableCell>
  //             <TableCell>Genre</TableCell>
  //             <TableCell>Title</TableCell>
  //             <TableCell>ISBN</TableCell>
  //             <TableCell>Available</TableCell>
  //             <TableCell>ISBN</TableCell>
  //             <TableCell></TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {list.map((row) => (
  //             <TableRow
  //               key={row.id}
  //               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  //             >
  //               <TableCell component="th" scope="row">
  //                 {row.id}
  //               </TableCell>
  //               <TableCell>{row.firstName}</TableCell>
  //               <TableCell>{row.lastName}</TableCell>
  //               <TableCell>{row.email}</TableCell>
  //               <TableCell>
  //                   <TableDropdown text="..."
  //                   items={
  //                       [
  //                         {text: "Pregledaj...", link: true, path: `/book/${row.id}/view`},
  //                         {text: "Izmeni...", link: true, path: `/book/${row.id}/edit`},
  //                         {text: "Obrisi", link: false, action: () => onDelete(row.id)}
  //                       ]
  //                   }
  //                   />
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //     </div>
  // }

  export default BookCard;