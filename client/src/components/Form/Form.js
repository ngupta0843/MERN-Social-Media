import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentId);
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };
  

  if (!user?.result?.name) {
    return (
      <Paper
        sx={(theme) => ({
          padding: theme.spacing(2),
        })}
      >
        <Typography variant="h6" align="center">
          Please Sign in to create your own memories and like other memories.
        </Typography>
      </Paper>
    );
  }


  const onTitleChange = (e) => {
    setPostData({
      ...postData,
      title: e.target.value,
    });
  };
  const onMessageChange = (e) => {
    setPostData({
      ...postData,
      message: e.target.value,
    });
  };
  const onTagsChange = (e) => {
    setPostData({
      ...postData,
      tags: e.target.value.split(","),
    });
  };
  return (
    <Paper
      sx={(theme) => ({
        padding: theme.spacing(2),
      })}
    >
      <form
        autoComplete="off"
        noValidate
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={onTitleChange}
          sx={{ mb: 1 }}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={onMessageChange}
          sx={{ mb: 1 }}
          multiline
          rows={3}
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={onTagsChange}
        />
        <div style={{ width: "97%", margin: "10px 0" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          sx={{ marginBottom: 1 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
