import {formatDistanceToNow, parseISO} from "date-fns";

// parseISO(str:string) : Date
// parseISO Создает объект Date, представляющий указанное время в формате ISO.
// str Строка, представляющая дату в формате, сгенерированном toISOString (JavaScript) .

// formatDistanceToNow Вернет расстояние между указанной датой и настоящим моментом словами.

interface TimeAgoProps {
  timestamp: string
}

export const TimeAgo = ({timestamp}: TimeAgoProps) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <time dateTime={timestamp} title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </time>
  )

};
