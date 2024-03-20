"use strict";
// import axios from "axios";
// const config = {
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization:
//       "Basic " +
//       Buffer.from(
//         `${process.env.JIRA_USER_EMAIL}:${process.env.JIRA_API_TOKEN}`
//       ).toString("base64"),
//   },
// };
// export async function addCommentToJira(issueKey: string, comment: string) {
//   const data = {
//     body: {
//       content: [
//         {
//           content: [
//             {
//               text: `${comment}`,
//               type: "text",
//             },
//           ],
//           type: "paragraph",
//         },
//       ],
//       type: "doc",
//       version: 1,
//     },
//   };
//   try {
//     const addComment = await axios.post(
//       `https://${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueKey}/comment`,
//       data,
//       config
//     );
//     return addComment;
//   } catch (error) {
//     return error;
//   }
// }
