import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import Link from 'quill/formats/link'

import './RichTextEditorQuill.scss'

const Parchment = Quill.import('parchment') as any
const SizeStyle = new Parchment.StyleAttributor('size', 'font-size', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['0.75em', '1.5em', '2.5em'],
})
Quill.register({ 'formats/size': SizeStyle }, true)

const bindings = {
  tab: {
    key: 9,
    handler: () => true,
  },
}

const defaultModules = {
  toolbar: [['bold', 'italic'], [{ size: ['0.75em', false, '1.5em', '2.5em'] }], [{ list: 'ordered' }, { list: 'bullet' }], ['link']],
  keyboard: {
    bindings: bindings,
  },
}
const defaultFormats = ['bold', 'italic', 'size', 'list', 'link']

type Props = {
  onTextChange: (html: string, rawText: string) => void
  defaultValue?: any
  className?: string
  toolbar?: (string[] | { list: string }[])[]
  formats?: string[]
  onBlur?: () => void
  error?: boolean
}

const RichTextEditorQuill = forwardRef(function TempComp(
  { onTextChange, defaultValue, className, toolbar, formats, onBlur, error }: Props,
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onTextChangeRef = useRef(onTextChange)
  const defaultValueRef = useRef(defaultValue)

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange
  })

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      console.error('Invalid Quill container')
      return
    }

    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'))

    const quill = new Quill(editorContainer, {
      modules: toolbar ? { ...defaultModules, toolbar: toolbar } : defaultModules,
      formats: formats ? formats : defaultFormats,
      theme: 'snow',
    })

    if (ref && typeof ref === 'function') {
      ref(quill)
    } else if (ref && 'current' in ref) {
      ;(ref as React.RefObject<Quill | null>).current = quill
    }

    if (defaultValueRef.current) {
      const htmlAsDelta = quill.clipboard.convert({ html: defaultValueRef.current })
      quill.setContents(htmlAsDelta)
    }

    quill.on(Quill.events.TEXT_CHANGE, () => {
      onTextChange(quill.root.innerHTML, quill.getText())
    })

    Link.sanitize = (url) => {
      if (url.startsWith('https://') || url.startsWith('http://')) return url
      else return `https://${url}`
    }

    return () => {
      if (ref && 'current' in ref) {
        ;(ref as React.RefObject<Quill | null>).current = null
      }
      container.innerHTML = ''
    }
  }, [ref])

  return onBlur ? (
    <div className={`quill-wrapper${error ? ' quill-wrapper--error' : ''}`}>
      <div ref={containerRef} className={className} onBlur={() => onBlur()} />
    </div>
  ) : (
    <div className={`quill-wrapper${error ? ' quill-wrapper--error' : ''}`}>
      <div ref={containerRef} className={className} />
    </div>
  )
})

export default RichTextEditorQuill
