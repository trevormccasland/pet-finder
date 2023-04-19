import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/Home'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(<Home />)