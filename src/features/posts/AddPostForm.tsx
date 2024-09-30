import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
// import {postAdded} from "@/features/posts/postsSlice";
import {selectCurrentUsername} from "@/features/auth/authSlice";
import {addNewPost} from "@/features/posts/postsSlice";
import {Spinner} from "@/components/Spinner";

// Типы TS для ввода полей
// См.: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  // postAuthor: HTMLSelectElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>('idle')

  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUsername)

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    // Запретить отправку на сервер
    e.preventDefault()

    const {elements} = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    const form = e.currentTarget

    try {
      setAddRequestStatus('pending')
      //Redux Toolkit добавляет .unwrap() функцию к возвращаемому Promise
      // которая возвращает новый Promise, который либо имеет фактическое action.payload
      // значение из fulfilled действия, либо выдает ошибку, если это действие rejected.
      // Это позволяет нам обрабатывать успех и неудачу в компоненте, используя обычную try/catch логику.
      await dispatch(addNewPost({title, content, user: userId})).unwrap()

      form.reset()
    } catch (error) {
      console.error('Failed to save the post: ', error)
    } finally {
      setAddRequestStatus('idle')
    }
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
        <button disabled={addRequestStatus === 'pending'}>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm
