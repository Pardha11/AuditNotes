import React from "react";
import {
  makeStyles,
  createStyles,
  IconButton,
  Typography,
  Hidden,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import CloseIcon from "@material-ui/icons/Close";
import OpenIcon from "@material-ui/icons/Menu";
import LightModeIcon from "@material-ui/icons/Brightness7";
import DarkModeIcon from "@material-ui/icons/Brightness5";
import CreateNoteIcon from "@material-ui/icons/NoteAdd";
import { useThemeContext } from "hooks";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: theme.spacing(2),
      flexDirection: (expanded: boolean) =>
        expanded ? "row" : "column-reverse",
    },
    header: {
      marginRight: "auto",
      "& h6": {
        fontFamily: "'Arial';",
      },
      "& h5": {
        fontFamily: "'Arial';",
      },
    },
  })
);

interface Props {
  onClose(): void;
  onOpen(): void;
  expanded: boolean;
}

export const SideMenuHeader: React.FC<Props> = ({
  onClose,
  onOpen,
  expanded,
}) => {
  const classes = useStyles(expanded);
  const { paletteType, togglePalette } = useThemeContext();

  return (
    <div className={classes.root}>
      {!expanded && (
        <Hidden smDown>
          <IconButton component={Link} to="/create">
            <CreateNoteIcon />
          </IconButton>
        </Hidden>
      )}
      {expanded && (
        <div className={classes.header}>
          <Typography variant="h5">
            AuditNotes
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Notetaking for Pentesters
          </Typography>
        </div>
      )}
      <IconButton onClick={() => togglePalette()}>
        {paletteType === "dark" ? (
          <LightModeIcon titleAccess="set light theme" />
        ) : (
          <DarkModeIcon titleAccess="set dark theme" />
        )}
      </IconButton>
    <IconButton>t
      <LightModeIcon titleAccess="set light theme" />
    </IconButton>
      {expanded ? (
        <IconButton onClick={() => onClose()}>
          <CloseIcon titleAccess="close menu" />
        </IconButton>
      ) : (
        <IconButton onClick={() => onOpen()}>
          <OpenIcon titleAccess="open menu" />
        </IconButton>
      )}
    </div>
  );
};
