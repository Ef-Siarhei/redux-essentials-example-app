import React from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {postAdded} from "@/features/posts/postsSlice";
import {selectAllUsers} from "@/features/users/usersSlice";

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
  // Получаем метод `dispatch` из хранилища
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    // Запретить отправку на сервер
    e.preventDefault()

    const {elements} = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const userId = elements.postAuthor.value

    dispatch(postAdded(title, content, userId))

    e.currentTarget.reset()
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor={'postTitle'}>Post Title:</label>
        <input type={'text'} id={'postTitle'} defaultValue={''} required/>
        <label htmlFor={'postAuthor'}>Author</label>
        <select id={'postAuthor'} name={'postAuthor'} required>
          <option value={''}></option>
          {usersOptions}
        </select>
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
