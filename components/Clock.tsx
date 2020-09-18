import { observer } from 'mobx-react'

interface ClockProps {
  light: boolean
  timeString: string
  count: number
}

const Clock = observer(({ light, timeString, count }: ClockProps) => (
  <div className={light ? 'light' : ''}>
    <>
      <h6>Count {count}</h6>
      <h1>{timeString}</h1>
    </>
    <style jsx>{`
      div {
        padding: 15px;
        color: #82fa58;
        display: inline-block;
        font: 50px menlo, monaco, monospace;
        background-color: #000;
      }
      .light {
        background-color: #999;
      }
    `}</style>
  </div>
))
export default Clock
