function Currency({ value }: { value: number }) {
  return (
    <>
      {Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(value)}
    </>
  )
}

export { Currency }
