import * as yup from 'yup';
import { DateTime } from 'luxon';


 export const bookYupSchema = yup.object().shape({
     id: yup.mixed().nullable(true).default(null),
     authors: yup.string().ensure().required("Mora se uneti ime autora"),
     publishDate: yup.date().max(DateTime.now(), "Ne može datum skoriji od danas"),
     rating: yup.number().ensure().required("Mora se uneti rejting"),
     genre: yup.string().ensure().required("Mora se uneti zanr"),
     isbn: yup.string().ensure().required("Mora se uneti ISBN"),
     available: yup.boolean.ensure.required("Mora se uneti da li je knjiga dostupna"),
     pages: yup.number().ensure().required("Mora se uneti broj strana")    
 });

export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}