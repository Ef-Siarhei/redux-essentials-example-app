
import {Link} from "react-router-dom";

import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";

import {useGetPostsQuery, Post} from "@/features/api/apiSlice";

import {ReactionButtons} from "@/features/posts/ReactionButtons";
import React, {useMemo} from "react";
import {Spinner} from "@/components/Spinner";

// Возвращаемся к передаче объекта `post` в качестве реквизита
interface PostExcerptProps {
  post: Post
}

let PostExcerpt =  ({post}: PostExcerptProps) => {
  // const post = useAppSelector(state => selectPostById(state, postId))
  return (
    <article className={'post-excerpt'}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className={'post-content'}>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} showPrefix/>
      <TimeAgo timestamp={post.date}/>
      <ReactionButtons post={post}/>
    </article>
  )
}

const PostsList = () => {
  // Вызов хука `useGetPostsQuery()` автоматически извлекает данные!
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  const sortedPosts = useMemo(()=>{
    const sortedPosts = posts.slice()
    // Сортируем сообщения в хронологическом порядке по убыванию
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  },[posts])

  let content: React.ReactNode

  // Показываем состояние тревоги на основе флагов состояния перехватчика
  if (isLoading) {
    content = <Spinner text={'Loading...'}/>
  } else if (isSuccess) {
       content = sortedPosts.map(post => (
      <PostExcerpt post={post} key={post.id}/>
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className={'posts-list'}>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
