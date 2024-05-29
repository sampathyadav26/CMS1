import React from "react";
import { Grid, Typography, Container, Avatar } from "@mui/material";

const formatCreatedTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(/,([^,]*)$/, " |$1");
};

const ExistingNotes = ({ notesData }) => {
  console.log("NotesData: ", notesData);
  console.log("NotesData.agentNotes: ", notesData.agentNotes);
  return (
    <Grid
      container
      direction="column"
      sx={{
        maxWidth: "503px",
        maxHeight: "584px",
        padding: "0px",
        margin: "0px",
      }}
    >
      {/* Grid for Heading */}
      <Grid
        sx={{
          width: "503px",
          maxHeight: "584px",
          padding: "8px 8px 8px 12px",
          borderRadius: "8px",
          background: "#1B4F911A",
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            width: "96px",
            height: "19px",
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "19px",
            textAlign: "left",
            color: "#1B4F91",
          }}
        >
          Agent Notes
        </Typography>
      </Grid>

      <Grid>
        {/* Grid for existing notes */}
        <Container
          style={{
            width: "503px",
            maxHeight: "300px",
            overflowY: "auto",
            margin: "12px 0px",
            paddingRight: "-1px",
            paddingLeft: "0px",
          }}
        >
          {notesData &&
          notesData.agentNotes &&
          notesData.agentNotes.length > 0 ? (
            notesData.agentNotes.map((note, index) => (
              <Grid
                key={index}
                sx={{
                  minHeight: "76px",
                  maxWidth: "503px",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "5px",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "24px",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <Avatar
                    sx={{
                      width: "24px",
                      height: "24px",
                      background: "#FCE5E5",
                      color: "#FFFFFF",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "17px",
                        height: "17px",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "16.94px",
                        textAlign: "center",
                        color: "#000000",
                      }}
                    >
                      {note.firstName.charAt(0) + note.lastName.charAt(0)}
                    </Typography>
                  </Avatar>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      width: "100px",
                      height: "18px",
                      font: "Inter",
                      weight: "400",
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#1B4F91",
                    }}
                  >
                    {note.firstName} {note.lastName}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      width: "200px",
                      height: "18px",
                      font: "Inter",
                      weight: "400",
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: "#0B234299",
                      marginLeft: "8px",
                    }}
                  >
                    {formatCreatedTime(note.createdTime)}
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    maxWidth: "500px",
                    minheight: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #1B4F9140",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "24px",
                      letterSpacing: "0em",
                      textAlign: "left",
                      color: "#000000",
                    }}
                  >
                    {note.noteDescription}
                  </Typography>
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "24px",
                letterSpacing: "0em",
                textAlign: "center",
                color: "#000000",
                margin: "16px",
              }}
            >
              No notes added
            </Typography>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default ExistingNotes;
