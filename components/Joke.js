export function Joke({ joke }) {
  console.log(joke)
  let highlight = joke.highlight
  // let regex = new RegExp(highlight, 'gi')
  let text = joke.content //.replace(highlight, '')

  let text_before = text.substring(0, text.indexOf(highlight))
  let text_after = text.substring(text.indexOf(highlight), text.length)

  return (
    <p className="relative">
      {text_before}
      <span className=" rounded-mdrelative ml-1 inline-block rotate-[-3deg] border-2 border-white bg-gray-100 p-3 font-bold text-black">
        {highlight}
        <span className="absolute -right-5 -top-5 rotate-12">🤣</span>
      </span>
      {text_after.replace(highlight, '')}
    </p>
  )
}
