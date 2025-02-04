export default function composeClassNames(classes: (string | boolean | undefined)[]): string {
  const classNames = classes.filter(Boolean)
  return classNames.join(' ')
}
