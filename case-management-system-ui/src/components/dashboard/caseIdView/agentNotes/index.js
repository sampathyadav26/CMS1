import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import ExistingNotes from "./existingNotes";
import EditButton from "./editButton";
import AddNewNote from "./newNote";
import {
  fetchAgentNotes,
  postAgentNotes,
} from "../../../../services/AgentNoteService";
import ToasterAlert from "../../../common/ToasterAlert";

const AgentNotes = ({ caseId }) => {
  const { user } = useSelector((state) => state.userState);
  const { firstName = "", lastName = "", email = "" } = user || {};
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState({});

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const [notesData, setNotesData] = useState({
    agentNotes: [],
    error: undefined,
  });

  useEffect(() => {
    console.log("Fetching notes for case id:", caseId);
    fetchAgentNotes(setNotesData, caseId);
  }, [caseId]);

  console.log(notesData);

  const handleUpdateNote = (newNote) => {
    const updatedNote = {
      caseId: caseId,
      firstName: firstName,
      lastName: lastName,
      createdBy: email,
      note: newNote,
    };
    postAgentNotes(getNotesUpdate, updatedNote);
  };

  const getNotesUpdate = (response) => {
    console.log(response);
    let dialogType = "success";
    let dialogMessage = "Note added successfully.";
    if (!response) {
      dialogType = "Error";
      dialogMessage = "Couldn't add note... Please try again!!";
    }

    setShowAlert({ type: dialogType, message: dialogMessage });
  };

  const onCloseHandle = () => {
    setShowAlert({});
    fetchAgentNotes(setNotesData, caseId);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{
        maxWidth: "559px",
        maxHeight: "584px",
        margin: "16px",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <ToasterAlert showAlert={showAlert} onClose={onCloseHandle} />
      <Grid container direction="column" item xs={11}>
        <Grid
          sx={{
            gap: "32px",
          }}
        >
          <ExistingNotes notesData={notesData} />
        </Grid>

        {isEditing && (
          <Grid>
            <AddNewNote
              isEditing={isEditing}
              onCancel={handleCancel}
              onUpdate={handleUpdateNote}
            />
          </Grid>
        )}
      </Grid>

      <Grid>
        <EditButton onEditButtonClick={handleEditButtonClick} />
      </Grid>
    </Grid>
  );
};

export default AgentNotes;
