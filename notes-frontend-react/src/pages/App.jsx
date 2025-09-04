import React, { useEffect, useState } from 'react'
import { listNotes, createNote, updateNote, deleteNote, shareNote } from '../api'

export default function NotesApp() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editing, setEditing] = useState(null)

  async function load(){ const res = await listNotes(); setNotes(res.data) }
  useEffect(() => { load() }, [])

  async function save(e){
    e.preventDefault()
    if(editing){
      await updateNote(editing.id, { title, content })
      setEditing(null)
    }else{
      await createNote({ title, content })
    }
    setTitle(''); setContent(''); load()
  }

  function onEdit(n){ setEditing(n); setTitle(n.title||''); setContent(n.content||'') }

  async function onDelete(id){ await deleteNote(id); load() }

  async function onShare(id){
    const res = await shareNote(id)
    const token = res.data.token
    const link = `${window.location.origin}/shared/${token}`
    try {
      await navigator.clipboard.writeText(link)
      alert('Public link copied to clipboard:\n' + link)
    } catch {
      prompt('Copy this link:', link)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Notes</h1>
        <a href="https://vercel.com" target="_blank" rel="noreferrer">Deployed on Vercel</a>
      </div>

      <form onSubmit={save} className="card">
        <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="textarea" placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
        <div>
          <button className="btn" type="submit">{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" className="btn" onClick={()=>{setEditing(null); setTitle(''); setContent('')}}>Cancel</button>}
        </div>
      </form>

      {notes.map(n => (
        <div key={n.id} className="card">
          <strong>{n.title || '(No title)'}</strong>
          <p>{n.content}</p>
          <div>
            <button className="btn" onClick={()=>onEdit(n)}>Edit</button>
            <button className="btn" onClick={()=>onDelete(n.id)}>Delete</button>
            <button className="btn" onClick={()=>onShare(n.id)}>Share</button>
          </div>
        </div>
      ))}
    </div>
  )
}
