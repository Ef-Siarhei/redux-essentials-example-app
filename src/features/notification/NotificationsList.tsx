import {useAppSelector} from "@/app/hooks";
import {selectAllNotifications} from "@/features/notification/notificationsSlice";
import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";

export const NotificationsList = () => {
  const notification = useAppSelector(selectAllNotifications)

  const renderNotifications = notification.map(notification => {
    return (
      <div key={notification.id} className={'notification'}>
        <div>
          <b>
            <PostAuthor userId={notification.user} showPrefix={false}/>
          </b>{' '}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date}/>
      </div>
    )
  })

  return (
    <section className={'notificationsList'}>
      <h2>Notifications</h2>
      {renderNotifications}
    </section>
  )
}
