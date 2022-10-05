import groq from "groq";
import pageFragment from "./pageFragment";

const linkedFrontPageQuery = groq`
        *[_id == "global-config"][0]{
          frontpage -> {
            ${pageFragment}
          }
        }
      `;

export default linkedFrontPageQuery;
