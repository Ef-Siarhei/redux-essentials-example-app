import {Link} from "react-router-dom";

import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";

import {useGetPostsQuery, Post} from "@/features/api/apiSlice";

import {ReactionButtons} from "@/features/posts/ReactionButtons";
import React, {useMemo} from "react";
import {Spinner} from "@/components/Spinner";
import classNames from "classnames";

// Возвращаемся к передаче объекта `post` в качестве реквизита
interface PostExcerptProps {
  post: Post
}

let PostExcerpt = ({post}: PostExcerptProps) => {
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
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Сортируем сообщения в хронологическом порядке по убыванию
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content: React.ReactNode

  // Показываем состояние тревоги на основе флагов состояния перехватчика
  if (isLoading) {
    content = <Spinner text={'Loading...'}/>
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map(post => (
      <PostExcerpt post={post} key={post.id}/>
    ))

    const containerClassname = classNames('posts-container', {
      disabled: isFetching
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className={'posts-list'}>
      <h2>Posts</h2>
      <button onClick={refetch}>Re fetch Posts</button>
      {content}
    </section>
  )
}

export default PostsList
