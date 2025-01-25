import React, { useContext } from 'react'
import { LanguageContext } from '../App'

const LangueSelector = () => {
    const {Langues, langue, setLangue} = useContext(LanguageContext)
  return (
    <select className={`px-5 py-2 rounded`} name="langue" value={langue} onChange={(e)=>setLangue(e.target.value)}>
    {Langues.map(lang=>(
      <option value={lang}> {lang} </option>
    ))}
    </select>
  )
}

export default LangueSelector