import * as yup from 'yup';
import { DateTime } from 'luxon';


<<<<<<< HEAD
export const bookYupSchema = yup.object().shape({
    id: yup.mixed().nullable(true).default(null),
    title: yup.string().ensure().required("Mora se uneti naslov knjige"),
    authors: yup.string().ensure().required("Mora se uneti ime autora"),
    publishDate: yup.date().max(DateTime.now(), "Ne može datum skoriji od danas"),
    rating: yup.number().min(1).max(5).required("Mora se uneti rejting"),
    genre: yup.string().ensure().required("Mora se uneti zanr"),
    isbn: yup.string().length(13).ensure().required("Mora se uneti ISBN"),
    available: yup.boolean().required("Mora se uneti da li je knjiga dostupna"),
    pages: yup.number().integer().nullable(false).required("Mora se uneti broj strana")        
});
=======
 export const bookYupSchema = yup.object().shape({
     id: yup.mixed().nullable(true).default(null),
     title: yup.string().ensure().required("Mora se uneti naslov knjige"),
     authors: yup.string().ensure().required("Mora se uneti ime autora"),
     publishDate: yup.date().max(DateTime.now(), "Ne može datum skoriji od danas"),
     rating: yup.number().required("Mora se uneti rejting"),
     genre: yup.string().ensure().required("Mora se uneti zanr"),
     isbn: yup.string().ensure().required("Mora se uneti ISBN"),
     available: yup.boolean().required("Mora se uneti da li je knjiga dostupna"),
     pages: yup.number().integer().nullable(false).required("Mora se uneti broj strana")        
 });
>>>>>>> 262aa95aa27ee5419a330c20579653adc5cfdb57

export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}