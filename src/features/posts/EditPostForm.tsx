import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEditPostMutation, useGetPostQuery} from "@/features/api/apiSlice";

// Типы TS для ввода полей
// См.: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

const EditPostForm = () => {
  const {postId} = useParams()

  const {data: post} = useGetPostQuery(postId!)
  const [updatePost, {isLoading}] = useEditPostMutation()

  const navigate = useNavigate()

  if (!post) {
    return (
      <section>
        <h2> Post not found! </h2>
      </section>
    )
  }

  const onSavePostClicked = async (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault()
    const {elements} = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      await updatePost({id: post.id, title, content})
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor={'postTitle'}>Post Title:</label>
        <input
          type={'text'}
          id={'postTitle'}
          name={'postTitle'}
          defaultValue={post.title}
          required/>

        <label htmlFor={'postContent'}>Content:</label>
        <textarea
          id={'postContent'}
          name={'postContent'}
          defaultValue={post.content}
          required/>

        <button>Save Post</button>
      </form>
    </section>
  );
}

export default EditPostForm
