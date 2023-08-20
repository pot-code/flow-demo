/* eslint-disable jsx-a11y/no-static-element-interactions */
export interface NameInputProps {
  defaultValue: string
  onBlur?: (value: string) => void
}

export default forwardRef<HTMLInputElement, NameInputProps>(({ defaultValue, ...rest }, ref) => {
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
  }, [])
  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.currentTarget.textContent === "") {
        e.currentTarget.textContent = defaultValue
        rest.onBlur?.(defaultValue)
      }
      rest.onBlur?.(e.currentTarget.textContent as string)
    },
    [defaultValue, rest],
  )

  // why nest div in div?
  // https://stackoverflow.com/questions/34354085/clicking-outside-a-contenteditable-div-stills-give-focus-to-it
  return (
    <div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="outline-none whitespace-pre text-foreground"
        ref={ref}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      >
        {defaultValue}
      </div>
    </div>
  )
})
