import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { Store } from '../store'
import Clock from './Clock'

type PageProps = {
  store?: Store
  title: string
  linkTo: string
}
const Page = inject('store')(
  observer((props: PageProps) => {
    const {
      title,
      linkTo,
      store: {
        timeString,
        start,
        stop,
        light,
        incrementCount,
        decrementCount,
        count
      }
    } = props
    useEffect(() => {
      start()
      incrementCount()
      return () => stop()
    }, [])
    return (
      <div>
        <h1>{title}</h1>
        <Clock count={count} timeString={timeString} light={light} />
        <nav>
          <Link href={linkTo}>
            <a>Navigate</a>
          </Link>
        </nav>
        <button onClick={incrementCount}>+1</button>
        <button onClick={decrementCount}>-1</button>
      </div>
    )
  })
)

export default Page
