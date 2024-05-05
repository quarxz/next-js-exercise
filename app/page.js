'use client'
import squirrel from '@/public/squirrel-lol.png'
import Image from 'next/image'

import clsx from 'clsx'

import { initialJokes } from '../data/data.js'
import { useEffect, useState, useCallback } from 'react'

import { Joke } from '@/components/Joke.js'

export default function Home() {
  const [jokes, setJokes] = useState([])

  const [newJoke, setNewJoke] = useState({
    id: Math.random().toString(36).substring(2),
    content: '',
    highlight: '',
  })

  const [selectedString, setSelectedString] = useState()

  const loadJokes = useCallback(() => {
    setJokes(initialJokes)
  })

  useEffect(() => {
    loadJokes()
  }, [])

  function makeMeBeautiful({ content, highlight }) {
    const emojis = ['😭', '😁', '😍', '😆']

    if (makeMeBeautiful.current === undefined) makeMeBeautiful.current = 0
    else makeMeBeautiful.current = ++makeMeBeautiful.current % 4

    const start = content.indexOf(highlight)
    const before = content.substring(0, start)
    const after = content.substring(start + highlight.length)

    return (
      <p
        key={Math.random().toString(36).substring(2)}
        className="relative rounded-md bg-slate-600 p-2"
      >
        {before}
        {highlight && (
          <span
            className={clsx('inline-block -rotate-2 rounded-sm p-2', {
              'bg-amber-500': makeMeBeautiful.current === 0,
              'bg-sky-500': makeMeBeautiful.current === 1,
              'bg-green-500': makeMeBeautiful.current === 2,
              'bg-teal-500': makeMeBeautiful.current === 3,
            })}
          >
            {highlight}
          </span>
        )}

        {after}
        <span className="absolute -right-2 -top-3">
          {emojis[makeMeBeautiful.current]}
        </span>
      </p>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 bg-gray-900 p-24">
      <h1 className="relative text-2xl font-bold tracking-wide">
        The Notebook for
        <span className="ml-2 inline-block rotate-[-3deg] border-2 border-white bg-gray-100 p-3 font-bold text-black">
          a chuckle
          <span className="absolute -right-5 -top-5 rotate-12">🤣</span>
        </span>
      </h1>
      <Image src={squirrel} alt="squirrel" width="500" priority />

      {jokes.map((individualJoke) => makeMeBeautiful(individualJoke))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setJokes([...jokes, newJoke])
          setNewJoke({
            ...newJoke,
            id: Math.random().toString(36).substring(2),
            content: '',
            highlight: '',
          })
        }}
      >
        <input
          className="rounded-md px-2 py-1 leading-8 text-black"
          name="joke"
          value={newJoke.content}
          onChange={(e) => {
            setNewJoke({
              ...newJoke,
              content: e.target.value,
              highlight: '',
            })
          }}
        />
        <button
          type="submit"
          className="ml-2 rounded-md bg-gray-200 px-6 py-2 font-medium text-black"
        >
          Add Joke
        </button>
      </form>
      <div
        onMouseUp={(e) => {
          setNewJoke({
            ...newJoke,
            highlight: window.getSelection().toString(),
          })
        }}
      >
        {newJoke.content && (
          <span className="rounded-sm selection:bg-red-500">
            {makeMeBeautiful(newJoke)}
          </span>
        )}
      </div>
    </main>
  )
}
