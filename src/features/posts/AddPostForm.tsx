import React from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {postAdded} from "@/features/posts/postsSlice";
import {selectCurrentUsername} from "@/features/auth/authSlice";

// Типы TS для ввода полей
// См.: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUsername)

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    // Запретить отправку на сервер
    e.preventDefault()

    const {elements} = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    dispatch(postAdded(title, content, userId))

    e.currentTarget.reset()
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor={'postTitle'}>Post Title:</label>
        <input type={'text'} id={'postTitle'} defaultValue={''} required/>
        <label htmlFor={'postContent'}>Content:</label>
        <textarea
          id={'postContent'}
          name={'postContent'}
          defaultValue={''}
          required
        />
        <button>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm
