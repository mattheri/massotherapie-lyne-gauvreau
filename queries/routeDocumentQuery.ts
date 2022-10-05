import groq from "groq";
import pageFragment from "./pageFragment";

const routeDocumentQuery = groq`*[_type == "route" && slug.current in $possibleSlugs][0]{
          page-> {
            ${pageFragment}
          }
        }`;

export default routeDocumentQuery;
