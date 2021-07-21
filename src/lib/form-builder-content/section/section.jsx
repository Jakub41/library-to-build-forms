import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SectionHeader from "../components/page-header";
import { actionCreators } from "../useBuilder";
import InsertBlockDialog from "./insert-block-dialog";
import modes from "./insert-block-dialog/insert-block-dialog.static";
import SectionBlock from "./section-block";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxSizing: "border-box",
    margin: theme.spacing(3, 0, 0, 0),
  },
  dragAndDropButton: {
    transform: "rotate(90deg)",
  },
  sectionContainer: {
    backgroundColor: theme.palette.background.default,
  },
  leftSideHeader: {
    padding: theme.spacing(1.5, 1),
    marginRight: theme.spacing(4),
  },
}));

const Section = ({ section, index, dispatch, signatureOptions }) => {
  const classes = useStyles();

  const addSectionAfterSection = useCallback(
    (section) => dispatch(actionCreators.addSectionAfterSection(section)),
    [dispatch]
  );
  const updateSection = useCallback(
    (section) => dispatch(actionCreators.updateSection(section)),
    [dispatch]
  );
  const deleteSection = useCallback(
    (section) => dispatch(actionCreators.deleteSection(section)),
    [dispatch]
  );
  const addBlock = useCallback(
    (sectionIndex, blockType, afterBlockIndex) => {
      return dispatch(
        actionCreators.addBlock(sectionIndex, blockType, afterBlockIndex)
      );
    },
    [dispatch]
  );
  const updateBlock = useCallback(
    (block) => dispatch(actionCreators.updateBlock(block)),
    [dispatch]
  );
  const duplicateBlock = useCallback(
    (block) => dispatch(actionCreators.duplicateBlock(block)),
    [dispatch]
  );
  const deleteBlock = useCallback(
    (block) => dispatch(actionCreators.deleteBlock(block)),
    [dispatch]
  );

  const handleInsertBlock = (blockType, afterBlockIndex) => {
    if (blockType === "newPage") {
      addSectionAfterSection(section);
    } else {
      addBlock(section.sectionIndex, blockType, afterBlockIndex);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      section.blocks,
      result.source.index,
      result.destination.index
    );

    const blocks = items.map((item, index) => {
      item.sortOrder = index;
      item.blockIndex = index;
      return item;
    });

    section.blocks = blocks;
    updateSection(section);
  };

  return (
    <div className={classes.root}>
      <SectionHeader
        section={section}
        index={index}
        onChange={updateSection}
        onDelete={deleteSection}
      />

      <Box my={3} textAlign="center">
        <InsertBlockDialog
          onInsertBlock={handleInsertBlock}
          mode={section.blocks.length ? modes.sectionStart : modes.lastBlock}
          blockIndex={-1}
        />
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {section.blocks.map((block, index) => (
                <Draggable
                  style={{ position: "static" }}
                  key={block.formBuilderContextId}
                  draggableId={block.formBuilderContextId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Grid container direction="column">
                        <Grid item>
                          <Box>
                            <Grid
                              container
                              direction="row"
                              justify="flex-start"
                              alignContent="stretch"
                            >
                              <Grid item className={classes.leftSideHeader}>
                                <Typography variant="overline">
                                  Page {parseInt(block.sectionIndex) + 1}
                                </Typography>
                              </Grid>
                              <Grid item xs md lg>
                                <SectionBlock
                                  draggableIndicator={
                                    <div style={{ textAlign: "center" }}>
                                      <span {...provided.dragHandleProps}>
                                        <IconButton
                                          className={classes.dragAndDropButton}
                                        >
                                          <DragIndicatorIcon />
                                        </IconButton>
                                      </span>
                                    </div>
                                  }
                                  block={block}
                                  signatureOptions={signatureOptions}
                                  onChange={updateBlock}
                                  onDelete={deleteBlock}
                                  onDuplicate={duplicateBlock}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs md lg>
                          <Box my={3} textAlign="center">
                            <InsertBlockDialog
                              onInsertBlock={handleInsertBlock}
                              mode={
                                index < section.blocks.length - 1
                                  ? modes.block
                                  : modes.lastBlock
                              }
                              blockIndex={index}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Section;
