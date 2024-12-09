import React from "react";
import { useSwipeable } from "react-swipeable";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Paper, Divider, Button } from "@material-ui/core";

import { SideMenuHeader, SideMenuFilter, NoteList } from "components";
import { useSidebarContext, useNoteContext } from "hooks";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      flex: (expanded: boolean) => (expanded ? "0 0 350px" : "0 0 auto"),
      overflowY: "auto",
      backgroundColor: '#8e2100',

      zIndex: 1000,
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        transition: "left 0.5s",
        maxWidth: "350px",
        width: "100%",
        left: (expanded: boolean) => (expanded ? "0" : "-350px"),
      },
    },
    swipe: {
      width: 40,
      height: "100%",
      position: "absolute",
      zIndex: 20,
    },
  })
);

export const SideMenu: React.FC = () => {
  const { expanded, setExpanded } = useSidebarContext();
  const { notes, filter, onFilterChange } = useNoteContext();

  const classes = useStyles(expanded);

  const swipeHandler = useSwipeable({
    onSwipedRight: () => setExpanded(true),
  });
  const menuHandler = useSwipeable({
    onSwipedLeft: () => setExpanded(false),
    onSwipedRight: () => setExpanded(true),
  });
  const handlepdfClick = () => {
    const serializedData = JSON.stringify(notes);
    sessionStorage.setItem('notes', serializedData);
    window.open('blank.html');
    }
  return (
      <>
        {!expanded && <div className={classes.swipe} {...swipeHandler} />}
        <Paper classes={{root: classes.container}} {...menuHandler}>
          <SideMenuHeader
          onClose={() => setExpanded(false)}
          onOpen={() => setExpanded(true)}
          expanded={expanded}
        />
        {expanded && (
          <>
            <SideMenuFilter value={filter} onChange={onFilterChange} />
            <Button variant="outlined" fullWidth={true} onClick={handlepdfClick}>Generate the report</Button>
            <NoteList notes={notes} />
          </>
        )}
      </Paper>
    </>
  );
};
