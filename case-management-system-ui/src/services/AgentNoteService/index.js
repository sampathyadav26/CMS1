import { onGetAgentNotes, onPostAgentNotes } from "..";
import { GET_NOTES_URL, POST_NOTES_URL } from "../../configBase";

export const fetchAgentNotes = (callback, requestParam) => {
  console.log("requestParam", requestParam);
  onGetAgentNotes(GET_NOTES_URL, callback, requestParam);
};

export const postAgentNotes = (callback, requestParam) => {
  console.log("Request Param for postAgentNotes", requestParam);
  onPostAgentNotes(POST_NOTES_URL, callback, requestParam);
}
